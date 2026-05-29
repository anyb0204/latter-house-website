import { requireRole } from "@/lib/auth/helpers";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole("admin");

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <main className="flex-1 md:ml-56 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
