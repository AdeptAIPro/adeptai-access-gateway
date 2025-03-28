
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, User, X, Zap, LogOut, Moon, Sun } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

interface MobileHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme?: "light" | "dark";
  toggleTheme?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  sidebarOpen, 
  setSidebarOpen,
  theme = "light",
  toggleTheme 
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border shadow-sm">
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
          {toggleTheme && (
            <>
              <DropdownMenuItem onClick={toggleTheme} className="flex justify-between items-center">
                <div className="flex items-center">
                  {theme === "light" ? (
                    <Sun className="mr-2 h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4 text-blue-400" />
                  )}
                  <span>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <Switch 
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  aria-label="Toggle theme"
                  className="ml-2"
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileHeader;
