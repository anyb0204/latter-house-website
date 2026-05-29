"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function SubmitBookPage() {
  const [form, setForm] = useState({ title: "", author: "", reason: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "book", ...form }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Book suggestion submitted for review!" });
        setForm({ title: "", author: "", reason: "" });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error ?? "Something went wrong." });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Suggest a Book</h1>
      <p className="text-gray-600 mb-8">Recommend a book that has impacted your faith journey.</p>
      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Book Title"
            placeholder="Title of the book"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            label="Author"
            placeholder="Author name"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
          />
          <Textarea
            label="Why do you recommend this book?"
            placeholder="How has this book impacted you?"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            rows={4}
          />
          {message && (
            <div className={`rounded-md px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {message.text}
            </div>
          )}
          <Button type="submit" loading={loading}>Submit Suggestion</Button>
        </form>
      </Card>
    </div>
  );
}
