import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const books = [
  { title: "The Latter House", year: "2025", description: "Shedding old patterns to fulfill God's purpose" },
  { title: "Renewing the Mind", year: "2023", description: "A practical guide to faith-based neuroscience" },
  { title: "Forward Motion", year: "2021", description: "Daily practices for purposeful living" },
];

export default function AuthorBooksPage() {
  const room = getRoomById("author")!;
  return (
    <RoomSubPage room={room} title="Books & Writing" subtitle="Published works">
      <div className="space-y-4">
        {books.map((book) => (
          <Card key={book.title} className="hover:border-champagne/50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-heading-sm text-forest font-semibold">{book.title}</h3>
                <p className="text-body-sm text-forest/60 mt-1">{book.description}</p>
              </div>
              <span className="text-body-sm text-sage font-medium">{book.year}</span>
            </div>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
