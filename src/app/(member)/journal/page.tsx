"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/journal");
      if (res.ok) setEntries(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Entry saved!" });
        setForm({ title: "", content: "" });
        setShowForm(false);
        fetchEntries();
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Could not save entry." });
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif text-3xl text-forest font-bold">My Journal</h1>
        <Button onClick={() => setShowForm(!showForm)} variant="secondary" size="sm">
          {showForm ? "Cancel" : "+ New Entry"}
        </Button>
      </div>
      <p className="text-gray-600 mb-8">Your private journal — only you can see these entries.</p>

      {showForm && (
        <Card className="mb-8">
          <h2 className="font-serif text-xl text-forest font-semibold mb-4">New Journal Entry</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              label="Title"
              placeholder="Entry title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Textarea
              label="Your thoughts"
              placeholder="Write freely..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              required
            />
            {message && (
              <div className={`rounded-md px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {message.text}
              </div>
            )}
            <Button type="submit" loading={saving}>Save Entry</Button>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-gray-500">Loading entries...</p>
      ) : entries.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-center py-8">No journal entries yet. Start writing!</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              <Card className="hover:border-sage/50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-forest">{entry.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{entry.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(entry.updatedAt).toLocaleDateString()}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
