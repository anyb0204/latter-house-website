import RoomLayout from "@/components/layout/RoomLayout";
import { FeatureCard } from "@/components/content/RoomContent";
import { Room } from "@/lib/navigation";

interface RoomHubPageProps {
  room: Room;
  intro: string;
}

export default function RoomHubPage({ room, intro }: RoomHubPageProps) {
  return (
    <RoomLayout room={room} title={`Welcome to ${room.label}`} subtitle={intro}>
      <div className="grid sm:grid-cols-2 gap-5">
        {room.options.map((option) => (
          <FeatureCard
            key={option.href}
            title={option.label}
            description={option.description}
            href={option.href}
            icon={room.icon}
          />
        ))}
      </div>
    </RoomLayout>
  );
}

export function RoomSubPage({
  room,
  title,
  subtitle,
  children,
}: {
  room: Room;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <RoomLayout room={room} title={title} subtitle={subtitle}>
      {children}
    </RoomLayout>
  );
}
