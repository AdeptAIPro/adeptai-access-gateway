
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

const SidebarItems = () => {
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Integrations", icon: Puzzle, href: "/dashboard/integrations" },
    { title: "Talent Search", icon: Search, href: "/dashboard/talent-search" },
    { 
      title: "Talent Matchmaking", 
      icon: Users, 
      href: "/dashboard/talent-matching",
      badge: "AI",
      badgeVariant: "secondary"
    },
    { title: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
    { title: "Professional Skills", icon: GraduationCap, href: "/dashboard/skills" },
    { 
      title: "Compliance", 
      icon: ShieldCheck, 
      href: "/dashboard/compliance",
      badge: "New",
      badgeVariant: "outline"
    },
    { title: "Onboarding", icon: UserPlus, href: "/dashboard/onboarding" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" }
  ];

  return (
    <nav className="py-4">
      <ul className="space-y-1 px-2">
        {sidebarItems.map((item) => (
          <li key={item.title}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-md transition-colors group",
                location.pathname === item.href
                  ? "bg-adept text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <div className="flex items-center">
                <item.icon className={cn(
                  "h-5 w-5 mr-3",
                  location.pathname === item.href
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400 group-hover:text-adept dark:group-hover:text-white"
                )} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <Badge variant={item.badgeVariant || "default"} className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

import { 
  LayoutDashboard, 
  Puzzle, 
  Users, 
  BarChart, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  Settings,
  Search
} from "lucide-react";

export default SidebarItems;
