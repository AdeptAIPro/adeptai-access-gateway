
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard, 
  Puzzle, 
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
  LogOut,
  Search,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  Moon,
  Sun,
  Zap
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHelpClick = () => {
    toast({
      title: "Help & Support",
      description: "Support resources are being loaded. Our team will assist you shortly.",
    });
  };

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
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === "dark" ? "dark" : ""} bg-gray-50 dark:bg-gray-900`}>
      {/* Mobile sidebar toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div className="flex items-center">
          <span className="font-bold text-xl text-adept">
            <Zap className="inline-block mr-1 h-5 w-5" />AdeptAI Pro
          </span>
        </div>
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
          "bg-white dark:bg-gray-800 w-64 flex-shrink-0 border-r dark:border-gray-700 transition-all duration-300 ease-in-out overflow-y-auto h-screen fixed md:sticky top-0 z-30",
          sidebarOpen ? "left-0" : "-left-64",
          "md:left-0 md:w-64"
        )}
      >
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-adept" />
            <span className="font-bold text-xl text-adept">AdeptAI Pro</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 flex items-center space-x-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>
        
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

        <div className="mt-auto p-4 border-t dark:border-gray-700">
          <div className="flex flex-col space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={handleHelpClick}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light Mode
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
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
        <header className="hidden md:flex h-16 items-center justify-between bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://docs.example.com" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Documentation</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn how to use AdeptAI Pro to its full potential
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://help.example.com" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Help Center</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get help with any issues you encounter
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://api.example.com" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">API Reference</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Integrate with our platform using our APIs
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a 
                            href="https://community.example.com" 
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Community</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Join our community of users and share your experience
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button variant="ghost" size="icon" className="rounded-full relative">
              <BellRing className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center gap-2 pl-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{user?.name?.split(' ')[0] || "User"}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "light" ? (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light Mode</span>
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2023 AdeptAI Pro. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
