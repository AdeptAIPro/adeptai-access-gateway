
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle, LogOut, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch"; 
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

interface SidebarFooterProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();

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

  return (
    <div className="mt-auto p-4 border-t border-border">
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
        
        <div className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
          <div className="flex items-center">
            {theme === "light" ? (
              <Sun className="h-4 w-4 mr-2 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 mr-2 text-blue-400" />
            )}
            <span className="text-sm font-medium">
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
          </div>
          <Switch 
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
          />
        </div>
        
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
  );
};

export default SidebarFooter;
