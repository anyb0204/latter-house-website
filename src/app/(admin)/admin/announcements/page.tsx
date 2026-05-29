"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface Announcement {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.ok) setAnnouncements(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Announcement created!" });
        setForm({ title: "", body: "" });
        setShowForm(false);
        fetchAnnouncements();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Could not create announcement." });
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this announcement?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/announcements?id=${id}`, { method: "DELETE" });
      fetchAnnouncements();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif text-3xl text-forest font-bold">Announcements</h1>
        <Button onClick={() => setShowForm(!showForm)} variant="secondary" size="sm">
          {showForm ? "Cancel" : "+ New"}
        </Button>
      </div>
      <p className="text-gray-600 mb-8">Create and manage community announcements.</p>

      {showForm && (
        <Card className="mb-8">
          <h2 className="font-serif text-xl text-forest font-semibold mb-4">New Announcement</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Textarea
              label="Body"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={6}
              required
            />
            {message && (
              <div className={`rounded-md px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {message.text}
              </div>
            )}
            <Button type="submit" loading={saving}>Publish Announcement</Button>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : announcements.length === 0 ? (
        <Card><p className="text-gray-500 text-center py-4">No announcements yet.</p></Card>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <Card key={a.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-forest">{a.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-3">{a.body}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(a.createdAt).toLocaleDateString()}</p>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  loading={deletingId === a.id}
                  onClick={() => handleDelete(a.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
