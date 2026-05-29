"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import StatusBadge from "@/components/ui/StatusBadge";

interface PraiseReport {
  id: number;
  content: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
}

export default function PraiseReportsPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [reports, setReports] = useState<PraiseReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  async function fetchReports() {
    try {
      const res = await fetch("/api/praise-reports");
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      }
    } finally {
      setLoadingReports(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/praise-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Your praise report has been submitted for review!" });
        setContent("");
        fetchReports();
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
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Praise Reports</h1>
      <p className="text-gray-600 mb-8">Share what God has done and encourage your community.</p>

      <Card className="mb-8">
        <h2 className="font-serif text-xl text-forest font-semibold mb-4">Share a Praise Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            label="What has God done for you?"
            placeholder="Share your testimony..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
          />
          {message && (
            <div
              className={`rounded-md px-4 py-3 text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
          <Button type="submit" loading={loading}>
            Submit Praise Report
          </Button>
        </form>
      </Card>

      <h2 className="font-serif text-xl text-forest font-semibold mb-4">Your Submissions</h2>
      {loadingReports ? (
        <p className="text-gray-500">Loading...</p>
      ) : reports.length === 0 ? (
        <Card><p className="text-gray-500 text-center py-4">You haven&apos;t submitted any praise reports yet.</p></Card>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-700 flex-1">{r.content}</p>
                <StatusBadge status={r.status} />
              </div>
              <p className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-serif text-xl text-forest font-semibold mb-4">Community Praise Reports</h2>
        <CommunityReports />
      </div>
    </div>
  );
}

function CommunityReports() {
  const [reports, setReports] = useState<PraiseReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/praise-reports?approved=true")
      .then((r) => r.json())
      .then((data) => setReports(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (reports.length === 0)
    return <Card><p className="text-gray-500 text-center py-4">No approved praise reports yet.</p></Card>;

  return (
    <div className="space-y-3">
      {reports.map((r) => (
        <Card key={r.id} className="bg-green-50/30 border-green-200/50">
          <p className="text-gray-700">{r.content}</p>
          <p className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
        </Card>
      ))}
    </div>
  );
}
