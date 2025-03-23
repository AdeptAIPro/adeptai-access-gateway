
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, 
  PuzzlePiece, 
  Users, 
  BarChart, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  Settings,
  Menu,
  X,
  BellRing,
  User,
  LogOut
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarItems: SidebarItem[] = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Integrations", icon: PuzzlePiece, href: "/dashboard/integrations" },
    { title: "Talent Matchmaking", icon: Users, href: "/dashboard/talent" },
    { title: "Analytics", icon: BarChart, href: "/dashboard/analytics" },
    { title: "Professional Skills", icon: GraduationCap, href: "/dashboard/skills" },
    { title: "Compliance", icon: ShieldCheck, href: "/dashboard/compliance" },
    { title: "Onboarding", icon: UserPlus, href: "/dashboard/onboarding" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <span className="font-bold text-xl text-adept">AdeptAI Pro</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sidebar for desktop and mobile */}
      <div 
        className={cn(
          "bg-white dark:bg-gray-800 w-64 flex-shrink-0 border-r transition-all duration-300 ease-in-out overflow-y-auto h-screen fixed md:sticky top-0 z-30",
          sidebarOpen ? "left-0" : "-left-64",
          "md:left-0 md:w-64"
        )}
      >
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-adept">AdeptAI Pro</span>
          </Link>
        </div>
        <nav className="py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
                    location.pathname === item.href
                      ? "bg-adept text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-adept flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hidden md:flex"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "md:ml-0" : "md:ml-0",
      )}>
        {/* Header */}
        <header className="hidden md:flex h-16 items-center justify-between bg-white dark:bg-gray-800 border-b px-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <BellRing className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 dark:bg-gray-700">
                  {user?.name?.charAt(0) || "U"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
