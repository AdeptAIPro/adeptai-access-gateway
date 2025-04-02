
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, BellRing } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface MobileHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  theme,
  toggleTheme
}) => {
  const { user } = useAuth();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border px-4 flex items-center justify-between z-30">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => setSidebarOpen(prevState => !prevState)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <span className="font-bold text-lg text-adept">AdeptAI Pro</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <BellRing className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full p-1 h-8 w-8 overflow-hidden"
        >
          <img 
            src={user?.avatarUrl || 'https://via.placeholder.com/32'} 
            alt={user?.name || 'User'} 
            className="h-full w-full object-cover rounded-full" 
          />
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
