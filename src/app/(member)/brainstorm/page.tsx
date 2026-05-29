import { db } from "@/lib/db";
import { brainstormPrompts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Card from "@/components/ui/Card";

const categoryColors: Record<string, string> = {
  ministry: "bg-blue-50 border-blue-200 text-blue-800",
  gratitude: "bg-amber-50 border-amber-200 text-amber-800",
  action: "bg-green-50 border-green-200 text-green-800",
  community: "bg-purple-50 border-purple-200 text-purple-800",
  spiritual: "bg-teal-50 border-teal-200 text-teal-800",
  service: "bg-rose-50 border-rose-200 text-rose-800",
  general: "bg-gray-50 border-gray-200 text-gray-800",
};

export default async function BrainstormPage() {
  const prompts = await db
    .select()
    .from(brainstormPrompts)
    .where(eq(brainstormPrompts.isActive, true))
    .orderBy(brainstormPrompts.sortOrder);

  const grouped = prompts.reduce<Record<string, typeof prompts>>((acc, p) => {
    const cat = p.category || "general";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-serif text-3xl text-forest font-bold mb-2">Forward Motion Ideas</h1>
      <p className="text-gray-600 mb-8">
        Practical prompts to keep you moving forward in faith and purpose. Pick one and act on it today.
      </p>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="font-serif text-xl text-forest font-semibold mb-4 capitalize">{category}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((p) => (
              <div
                key={p.id}
                className={`rounded-xl border p-4 flex items-start gap-3 ${categoryColors[p.category] ?? categoryColors.general}`}
              >
                <span className="text-gold mt-0.5 text-lg">✦</span>
                <p className="text-sm font-medium">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {prompts.length === 0 && (
        <Card>
          <p className="text-gray-500 text-center py-8">No prompts available yet. Run the seed script to populate brainstorm prompts.</p>
        </Card>
      )}
    </div>
  );
}
