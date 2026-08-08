import { RoomSubPage } from "@/components/layout/RoomHubPage";
import Card from "@/components/ui/Card";
import { getRoomById } from "@/lib/navigation";

const courses = [
  { title: "Foundations: The Latter House", lessons: 8, duration: "4 weeks", level: "Beginner" },
  { title: "Renewing Your Mind", lessons: 12, duration: "6 weeks", level: "Intermediate" },
  { title: "Building Community", lessons: 6, duration: "3 weeks", level: "All levels" },
  { title: "Discovering Your Calling", lessons: 10, duration: "5 weeks", level: "Intermediate" },
];

export default function CoursesPage() {
  const room = getRoomById("resources")!;
  return (
    <RoomSubPage room={room} title="Courses & Workshops" subtitle="Go deeper at your own pace">
      <div className="grid sm:grid-cols-2 gap-5">
        {courses.map((c) => (
          <Card key={c.title} className="hover:border-champagne/50 hover:shadow-md transition-all">
            <span className="text-xs bg-sage/10 text-sage px-3 py-1 rounded-full">{c.level}</span>
            <h3 className="font-serif text-heading-sm text-forest font-semibold mt-3 mb-2">{c.title}</h3>
            <p className="text-body-sm text-forest/55">{c.lessons} lessons · {c.duration}</p>
            <button className="mt-4 w-full py-2.5 rounded-full bg-sage text-white text-body-sm font-medium hover:bg-forest transition-colors">
              Enroll Free
            </button>
          </Card>
        ))}
      </div>
    </RoomSubPage>
  );
}
