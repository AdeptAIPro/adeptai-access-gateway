
import React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & SectionCardProps
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-xl border border-gray-200 shadow-sm mb-12 p-6",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SectionCard.displayName = "SectionCard";

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  className,
}) => (
  <h2 className={cn("text-xl font-bold text-gray-900 mb-6 flex items-center", className)}>
    {icon && <span className="mr-2">{icon}</span>}
    {title}
  </h2>
);
