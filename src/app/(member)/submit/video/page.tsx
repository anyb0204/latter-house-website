"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function SubmitVideoPage() {
  const [form, setForm] = useState({ title: "", url: "", description: "" });
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
        body: JSON.stringify({ type: "video", ...form }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Video submitted for review!" });
        setForm({ title: "", url: "", description: "" });
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
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Submit a Video</h1>
      <p className="text-gray-600 mb-8">Share a video resource, sermon, or teaching with the community.</p>
      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Video Title"
            placeholder="Title of the video"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            label="Video URL"
            type="url"
            placeholder="https://youtube.com/..."
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            placeholder="Why are you recommending this video?"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />
          {message && (
            <div className={`rounded-md px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {message.text}
            </div>
          )}
          <Button type="submit" loading={loading}>Submit Video</Button>
        </form>
      </Card>
    </div>
  );
}
