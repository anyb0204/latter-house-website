import Link from "next/link";

export default function BackToDashboard() {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-2 text-sage hover:text-forest text-body-sm mb-6 transition-colors"
    >
      <span aria-hidden>←</span> Back to Dashboard
    </Link>
  );
}
