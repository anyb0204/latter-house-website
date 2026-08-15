from __future__ import annotations

import json
import os
import secrets
import sqlite3
from datetime import datetime, timezone
from functools import wraps
from pathlib import Path

from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / 'planner.db'

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', secrets.token_hex(32))
app.config['JSON_SORT_KEYS'] = False


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with db() as conn:
        conn.executescript('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS planner_state (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                scope_type TEXT NOT NULL,
                scope_key TEXT NOT NULL,
                state_json TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                UNIQUE(user_id, scope_type, scope_key),
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        ''')


def query_one(sql, params=()):
    with db() as conn:
        return conn.execute(sql, params).fetchone()


def has_users():
    row = query_one('SELECT COUNT(*) AS n FROM users')
    return bool(row['n'])


def current_user():
    uid = session.get('user_id')
    if not uid:
        return None
    return query_one('SELECT id, username FROM users WHERE id = ?', (uid,))


def login_required(fn):
    @wraps(fn)
    def inner(*a, **kw):
        if not current_user():
            return redirect(url_for('login'))
        return fn(*a, **kw)
    return inner


def api_auth(fn):
    @wraps(fn)
    def inner(*a, **kw):
        if not current_user():
            return jsonify({'ok': False, 'error': 'Not authenticated'}), 401
        return fn(*a, **kw)
    return inner


# ── Auth routes ──────────────────────────────────────────────────────────────

@app.route('/setup', methods=['GET', 'POST'])
def setup():
    if has_users():
        return redirect(url_for('login'))
    error = None
    if request.method == 'POST':
        username = (request.form.get('username') or '').strip() or 'owner'
        pw = request.form.get('password') or ''
        pw2 = request.form.get('confirm_password') or ''
        if len(pw) < 8:
            error = 'Password must be at least 8 characters.'
        elif pw != pw2:
            error = 'Passwords do not match.'
        else:
            with db() as conn:
                conn.execute(
                    'INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)',
                    (username, generate_password_hash(pw), now_iso()),
                )
            return redirect(url_for('login'))
    return render_template('login.html', mode='setup', error=error)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if not has_users():
        return redirect(url_for('setup'))
    if current_user():
        return redirect(url_for('planner'))
    error = None
    if request.method == 'POST':
        username = (request.form.get('username') or '').strip()
        pw = request.form.get('password') or ''
        row = query_one('SELECT * FROM users WHERE username = ?', (username,))
        if not row or not check_password_hash(row['password_hash'], pw):
            error = 'Incorrect username or password.'
        else:
            session['user_id'] = row['id']
            return redirect(url_for('planner'))
    return render_template('login.html', mode='login', error=error)


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return redirect(url_for('login'))


@app.route('/')
@login_required
def planner():
    return render_template('planner.html', user=current_user())


# ── State API ─────────────────────────────────────────────────────────────────

@app.route('/api/state/<scope_type>/<path:scope_key>', methods=['GET', 'POST'])
@api_auth
def api_state(scope_type, scope_key):
    user = current_user()
    if request.method == 'GET':
        row = query_one(
            'SELECT state_json, updated_at FROM planner_state '
            'WHERE user_id=? AND scope_type=? AND scope_key=?',
            (user['id'], scope_type, scope_key),
        )
        return jsonify({
            'ok': True,
            'state': json.loads(row['state_json']) if row else None,
            'updated_at': row['updated_at'] if row else None,
        })

    payload = (request.get_json(silent=True) or {}).get('state') or {}
    ts = now_iso()
    with db() as conn:
        conn.execute(
            '''INSERT INTO planner_state (user_id, scope_type, scope_key, state_json, updated_at)
               VALUES (?, ?, ?, ?, ?)
               ON CONFLICT(user_id, scope_type, scope_key)
               DO UPDATE SET state_json=excluded.state_json, updated_at=excluded.updated_at''',
            (user['id'], scope_type, scope_key, json.dumps(payload, ensure_ascii=False), ts),
        )
    return jsonify({'ok': True, 'updated_at': ts})


@app.get('/api/active-days')
@api_auth
def api_active_days():
    """Return all YYYY-MM-DD dates in a given month that have saved daily state."""
    user = current_user()
    month = (request.args.get('month') or '').strip()
    if not month:
        return jsonify({'ok': False, 'error': 'month required'}), 400
    with db() as conn:
        rows = conn.execute(
            'SELECT scope_key FROM planner_state '
            'WHERE user_id=? AND scope_type=? AND scope_key LIKE ?',
            (user['id'], 'today', f'{month}-%'),
        ).fetchall()
    return jsonify({'ok': True, 'days': [r[0] for r in rows]})


@app.post('/api/change-password')
@api_auth
def api_change_password():
    user = current_user()
    data = request.get_json(silent=True) or {}
    current_pw = data.get('current_password') or ''
    new_pw = data.get('new_password') or ''
    confirm_pw = data.get('confirm_password') or ''
    full = query_one('SELECT * FROM users WHERE id=?', (user['id'],))
    if not check_password_hash(full['password_hash'], current_pw):
        return jsonify({'ok': False, 'error': 'Current password is incorrect.'}), 400
    if len(new_pw) < 8:
        return jsonify({'ok': False, 'error': 'New password must be at least 8 characters.'}), 400
    if new_pw != confirm_pw:
        return jsonify({'ok': False, 'error': 'New passwords do not match.'}), 400
    with db() as conn:
        conn.execute('UPDATE users SET password_hash=? WHERE id=?',
                     (generate_password_hash(new_pw), user['id']))
    return jsonify({'ok': True})


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
