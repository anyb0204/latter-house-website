"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import Badge from "@/components/ui/Badge";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  type: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
  userName?: string;
}

export default function AdminOpportunitiesPage() {
  const [items, setItems] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/opportunities");
      if (res.ok) setItems(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  async function handleAction(id: number, action: "approve" | "decline") {
    setActionId(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: `Opportunity ${action}d.` });
        fetchItems();
      } else {
        setMessage({ type: "error", text: "Action failed." });
      }
    } finally {
      setActionId(null);
    }
  }

  const pending = items.filter((i) => i.status === "pending");
  const reviewed = items.filter((i) => i.status !== "pending");

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Opportunities</h1>
      <p className="text-gray-600 mb-8">Review and approve community opportunities.</p>

      {message && (
        <div className={`rounded-md px-4 py-3 text-sm mb-6 ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      {loading ? <p className="text-gray-500">Loading...</p> : (
        <>
          <h2 className="font-serif text-xl text-forest font-semibold mb-4">Pending ({pending.length})</h2>
          {pending.length === 0 ? (
            <Card className="mb-8"><p className="text-gray-500 text-center py-4">No pending opportunities.</p></Card>
          ) : (
            <div className="space-y-3 mb-8">
              {pending.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-forest">{item.title}</h3>
                      {item.userName && <p className="text-xs text-gray-400">From: {item.userName}</p>}
                    </div>
                    <Badge variant="info">{item.type}</Badge>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                  <div className="flex gap-2">
                    <Button size="sm" loading={actionId === item.id} onClick={() => handleAction(item.id, "approve")}>Approve</Button>
                    <Button size="sm" variant="danger" loading={actionId === item.id} onClick={() => handleAction(item.id, "decline")}>Decline</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {reviewed.length > 0 && (
            <>
              <h2 className="font-serif text-xl text-forest font-semibold mb-4">Reviewed</h2>
              <div className="space-y-3">
                {reviewed.map((item) => (
                  <Card key={item.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-forest">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-1">{item.description}</p>
                      </div>
                      <StatusBadge status={item.status} />
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
