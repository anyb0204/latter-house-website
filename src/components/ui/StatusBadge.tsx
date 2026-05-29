import Badge from "./Badge";

interface StatusBadgeProps {
  status: "pending" | "approved" | "declined";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const map = {
    pending: { variant: "warning" as const, label: "Pending" },
    approved: { variant: "success" as const, label: "Approved" },
    declined: { variant: "danger" as const, label: "Declined" },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}
