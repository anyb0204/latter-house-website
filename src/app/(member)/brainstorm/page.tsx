import { db } from "@/lib/db";
import { brainstormPrompts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Card from "@/components/ui/Card";
import MemberPageLayout from "@/components/layout/MemberPageLayout";

const categoryColors: Record<string, string> = {
  ministry: "bg-sage/10 border-sage/30 text-forest",
  gratitude: "bg-champagne/20 border-champagne/40 text-forest",
  action: "bg-mint/20 border-mint/40 text-forest",
  community: "bg-cream-dark border-sage/20 text-forest",
  spiritual: "bg-sage/15 border-sage/25 text-forest",
  service: "bg-champagne/15 border-champagne/30 text-forest",
  general: "bg-cream border-sage/15 text-forest",
};

export default async function BrainstormPage() {
  let prompts: typeof brainstormPrompts.$inferSelect[] = [];

  try {
    prompts = await db
      .select()
      .from(brainstormPrompts)
      .where(eq(brainstormPrompts.isActive, true))
      .orderBy(brainstormPrompts.sortOrder);
  } catch {
    // Database may not be configured
  }

  const grouped = prompts.reduce<Record<string, typeof prompts>>((acc, p) => {
    const cat = p.category || "general";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <MemberPageLayout
      title="Forward Motion Ideas"
      subtitle="Practical prompts to keep you moving forward in faith and purpose. Pick one and act on it today."
    >
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="font-serif text-heading-sm text-forest font-semibold mb-4 capitalize">{category}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((p) => (
              <div
                key={p.id}
                className={`rounded-xl border p-4 flex items-start gap-3 ${categoryColors[p.category] ?? categoryColors.general}`}
              >
                <span className="text-champagne mt-0.5 text-lg" aria-hidden>✦</span>
                <p className="text-body-sm font-medium">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {prompts.length === 0 && (
        <Card>
          <p className="text-forest/50 text-center py-8">No prompts available yet. Check back soon for fresh inspiration.</p>
        </Card>
      )}
    </MemberPageLayout>
  );
}
