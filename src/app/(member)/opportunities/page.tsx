"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import StatusBadge from "@/components/ui/StatusBadge";
import Badge from "@/components/ui/Badge";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  type: "job" | "volunteer" | "mission" | "other";
  status: "pending" | "approved" | "declined";
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  job: "Job",
  volunteer: "Volunteer",
  mission: "Mission",
  other: "Other",
};

export default function OpportunitiesPage() {
  const [form, setForm] = useState({ title: "", description: "", type: "other" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [myOpps, setMyOpps] = useState<Opportunity[]>([]);
  const [communityOpps, setCommunityOpps] = useState<Opportunity[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const [mine, community] = await Promise.all([
      fetch("/api/opportunities").then((r) => r.json()),
      fetch("/api/opportunities?approved=true").then((r) => r.json()),
    ]);
    setMyOpps(mine);
    setCommunityOpps(community);
  };

  useEffect(() => { fetchData(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage({ type: "success", text: "Opportunity submitted for review!" });
        setForm({ title: "", description: "", type: "other" });
        setShowForm(false);
        fetchData();
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
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-serif text-3xl text-forest font-bold">Opportunities</h1>
        <Button onClick={() => setShowForm(!showForm)} variant="secondary" size="sm">
          {showForm ? "Cancel" : "+ Submit Opportunity"}
        </Button>
      </div>
      <p className="text-gray-600 mb-8">Discover and share ministry, volunteer, and career opportunities.</p>

      {showForm && (
        <Card className="mb-8">
          <h2 className="font-serif text-xl text-forest font-semibold mb-4">Submit an Opportunity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              placeholder="Opportunity title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Textarea
              label="Description"
              placeholder="Describe the opportunity..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-forest mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-md border border-mint/60 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="job">Job</option>
                <option value="volunteer">Volunteer</option>
                <option value="mission">Mission</option>
                <option value="other">Other</option>
              </select>
            </div>
            {message && (
              <div className={`rounded-md px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {message.text}
              </div>
            )}
            <Button type="submit" loading={loading}>Submit</Button>
          </form>
        </Card>
      )}

      <h2 className="font-serif text-xl text-forest font-semibold mb-4">Community Opportunities</h2>
      {communityOpps.length === 0 ? (
        <Card><p className="text-gray-500 text-center py-4">No opportunities posted yet.</p></Card>
      ) : (
        <div className="space-y-3 mb-8">
          {communityOpps.map((o) => (
            <Card key={o.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-forest">{o.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{o.description}</p>
                </div>
                <Badge variant="info">{typeLabels[o.type]}</Badge>
              </div>
              <p className="text-xs text-gray-400 mt-2">{new Date(o.createdAt).toLocaleDateString()}</p>
            </Card>
          ))}
        </div>
      )}

      {myOpps.length > 0 && (
        <>
          <h2 className="font-serif text-xl text-forest font-semibold mb-4">My Submissions</h2>
          <div className="space-y-3">
            {myOpps.map((o) => (
              <Card key={o.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-forest">{o.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{o.description}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
