
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  requiredPermission: "viewDashboard" | "viewCRM" | "viewAnalytics" | "editLeads";
}

const SidebarItems = () => {
  const location = useLocation();
  const { hasPermission } = useAuth();

  const sidebarItems: SidebarItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard", requiredPermission: "viewDashboard" },
    { title: "Integrations", icon: Puzzle, href: "/dashboard/integrations", requiredPermission: "viewDashboard" },
    { 
      title: "Workflow Management", 
      icon: FileText, 
      href: "/dashboard/workflows",
      badge: "New",
      badgeVariant: "default", 
      requiredPermission: "viewDashboard"
    },
    { title: "Talent Search", icon: Search, href: "/dashboard/talent-search", requiredPermission: "viewDashboard" },
    { 
      title: "Talent Matchmaking", 
      icon: Users, 
      href: "/dashboard/talent-matching",
      badge: "AI",
      badgeVariant: "secondary",
      requiredPermission: "viewDashboard"
    },
    { 
      title: "Payroll", 
      icon: DollarSign, 
      href: "/dashboard/payroll",
      badge: "New",
      badgeVariant: "outline",
      requiredPermission: "viewDashboard"
    },
    { 
      title: "Agentic AI Platform", 
      icon: Bot, 
      href: "/dashboard/agentic-ai",
      badge: "New",
      badgeVariant: "default",
      requiredPermission: "viewDashboard"
    },
    { title: "Analytics", icon: BarChart, href: "/dashboard/analytics", requiredPermission: "viewAnalytics" },
    { title: "Professional Skills", icon: GraduationCap, href: "/dashboard/skills", requiredPermission: "viewDashboard" },
    { 
      title: "Compliance", 
      icon: ShieldCheck, 
      href: "/dashboard/compliance",
      requiredPermission: "viewDashboard"
    },
    { title: "Onboarding", icon: UserPlus, href: "/dashboard/onboarding", requiredPermission: "viewDashboard" },
    { 
      title: "CRM", 
      icon: Users2, 
      href: "/dashboard/crm",
      requiredPermission: "viewCRM"
    },
    { title: "Settings", icon: Settings, href: "/dashboard/settings", requiredPermission: "viewDashboard" }
  ];

  // Filter sidebar items based on user permissions
  const filteredItems = sidebarItems.filter(item => hasPermission(item.requiredPermission));

  // Function to check if a route is active, accounting for nested routes
  const isActive = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/dashboard";
  };

  return (
    <nav className="py-4">
      <ul className="space-y-1 px-2">
        {filteredItems.map((item) => (
          <li key={item.title}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-md transition-colors group",
                isActive(item.href)
                  ? "bg-adept text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <div className="flex items-center">
                <item.icon className={cn(
                  "h-5 w-5 mr-3",
                  isActive(item.href)
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
  Users2,
  BarChart, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  Settings,
  Search,
  DollarSign,
  Bot,
  FileText
} from "lucide-react";

export default SidebarItems;
