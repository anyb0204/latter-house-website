import { RoomSubPage } from "@/components/layout/RoomHubPage";
import { PlaylistItem } from "@/components/content/RoomContent";
import { getRoomById } from "@/lib/navigation";

const playlist = [
  { title: "Morning Peace — Instrumental Worship", type: "music" as const, duration: "45 min" },
  { title: "Renewing Your Mind — Podcast Episode", type: "podcast" as const, duration: "32 min" },
  { title: "The Latter House — Author Teaching", type: "sermon" as const, duration: "28 min" },
  { title: "Sabbath Rest — Piano & Nature", type: "music" as const, duration: "60 min" },
  { title: "Neuroscience & Faith — Interview", type: "podcast" as const, duration: "40 min" },
  { title: "Building God's House — Sunday Message", type: "sermon" as const, duration: "35 min" },
];

export default function PlaylistPage() {
  const room = getRoomById("devotionals")!;
  return (
    <RoomSubPage room={room} title="Worship Playlist" subtitle="Music, podcasts & sermons curated for your journey">
      <p className="text-body-base text-forest/65 mb-8">
        Press play and let these selections wash over you. Perfect for morning devotion,
        afternoon rest, or evening reflection.
      </p>
      <div className="space-y-3">
        {playlist.map((item) => (
          <PlaylistItem key={item.title} {...item} />
        ))}
      </div>
    </RoomSubPage>
  );
}
