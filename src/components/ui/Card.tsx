import { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

export default function Card({
  children,
  className,
  padding = "md",
  ...props
}: CardProps) {
  const padClasses = { sm: "p-4", md: "p-6", lg: "p-8" };
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-sm border border-mint/30",
        padClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
