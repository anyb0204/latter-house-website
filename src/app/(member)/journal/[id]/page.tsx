"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
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

export default function JournalEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch(`/api/journal/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setEntry(data);
          setForm({ title: data.title, content: data.content });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setEntry(updated);
        setEditing(false);
        setMessage({ type: "success", text: "Entry updated!" });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Could not update entry." });
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this journal entry? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/journal/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/journal");
      }
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <p className="text-gray-500 py-8">Loading...</p>;
  if (!entry) return <p className="text-gray-500 py-8">Entry not found.</p>;

  return (
    <div>
      <button
        onClick={() => router.push("/journal")}
        className="text-sage hover:text-forest text-sm mb-6 inline-flex items-center gap-1"
      >
        ← Back to Journal
      </button>

      {editing ? (
        <Card>
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Textarea
              label="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              required
            />
            {message && (
              <div className={`rounded-md px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {message.text}
              </div>
            )}
            <div className="flex gap-3">
              <Button type="submit" loading={saving}>Save Changes</Button>
              <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="font-serif text-2xl text-forest font-bold">{entry.title}</h1>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>Edit</Button>
              <Button variant="danger" size="sm" loading={deleting} onClick={handleDelete}>Delete</Button>
            </div>
          </div>
          {message && (
            <div className={`rounded-md px-4 py-3 text-sm mb-4 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {message.text}
            </div>
          )}
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
          <p className="text-xs text-gray-400 mt-6 border-t border-mint/30 pt-4">
            Created {new Date(entry.createdAt).toLocaleDateString()} · Updated {new Date(entry.updatedAt).toLocaleDateString()}
          </p>
        </Card>
      )}
    </div>
  );
}
