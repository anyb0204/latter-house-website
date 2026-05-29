"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";

interface PraiseReport {
  id: number;
  content: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
  userName?: string;
}

export default function AdminPraiseReportsPage() {
  const [reports, setReports] = useState<PraiseReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/admin/praise-reports");
      if (res.ok) setReports(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReports(); }, []);

  async function handleAction(id: number, action: "approve" | "decline") {
    setActionId(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/praise-reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: `Report ${action}d.` });
        fetchReports();
      } else {
        setMessage({ type: "error", text: "Action failed." });
      }
    } finally {
      setActionId(null);
    }
  }

  const pending = reports.filter((r) => r.status === "pending");
  const reviewed = reports.filter((r) => r.status !== "pending");

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Praise Reports</h1>
      <p className="text-gray-600 mb-8">Review and approve member praise reports.</p>

      {message && (
        <div className={`rounded-md px-4 py-3 text-sm mb-6 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      {loading ? <p className="text-gray-500">Loading...</p> : (
        <>
          <h2 className="font-serif text-xl text-forest font-semibold mb-4">Pending ({pending.length})</h2>
          {pending.length === 0 ? (
            <Card className="mb-8"><p className="text-gray-500 text-center py-4">No pending reports.</p></Card>
          ) : (
            <div className="space-y-3 mb-8">
              {pending.map((r) => (
                <Card key={r.id}>
                  {r.userName && <p className="text-xs text-gray-400 mb-2">From: {r.userName}</p>}
                  <p className="text-gray-700 mb-4">{r.content}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      loading={actionId === r.id}
                      onClick={() => handleAction(r.id, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      loading={actionId === r.id}
                      onClick={() => handleAction(r.id, "decline")}
                    >
                      Decline
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {reviewed.length > 0 && (
            <>
              <h2 className="font-serif text-xl text-forest font-semibold mb-4">Reviewed</h2>
              <div className="space-y-3">
                {reviewed.map((r) => (
                  <Card key={r.id}>
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-gray-700 flex-1 line-clamp-2">{r.content}</p>
                      <StatusBadge status={r.status} />
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
