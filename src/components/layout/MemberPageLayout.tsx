import BackToDashboard from "@/components/layout/BackToDashboard";

interface MemberPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function MemberPageLayout({ title, subtitle, children, action }: MemberPageLayoutProps) {
  return (
    <div className="min-h-screen bg-cream animate-room-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <BackToDashboard />
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-display-md text-forest font-semibold mb-2">{title}</h1>
            {subtitle && <p className="text-body-lg text-forest/65">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
}
