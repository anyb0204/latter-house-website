import { requireRole } from "@/lib/auth/helpers";
import MemberSidebar from "@/components/layout/MemberSidebar";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  await requireRole("member");

  return (
    <div className="flex min-h-screen bg-cream">
      <MemberSidebar />
      <main className="flex-1 md:ml-56 pt-14 md:pt-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
