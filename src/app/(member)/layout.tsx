import { requireRole } from "@/lib/auth/helpers";

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  await requireRole("member");

  return <>{children}</>;
}
