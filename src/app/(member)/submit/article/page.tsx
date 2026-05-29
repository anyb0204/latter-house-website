"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function SubmitArticlePage() {
  const [form, setForm] = useState({ title: "", content: "" });
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
        body: JSON.stringify({ type: "article", ...form }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Article submitted for review! We'll be in touch soon." });
        setForm({ title: "", content: "" });
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
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Submit an Article</h1>
      <p className="text-gray-600 mb-8">Share your insights, testimonies, or teachings with the community.</p>
      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Article Title"
            placeholder="What is your article about?"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Textarea
            label="Article Content"
            placeholder="Write your article here..."
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
          <Button type="submit" loading={loading}>Submit Article</Button>
        </form>
      </Card>
    </div>
  );
}
