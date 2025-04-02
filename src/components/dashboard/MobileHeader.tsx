
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, BellRing } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

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
        
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={user?.email ? `https://ui-avatars.com/api/?name=${user.name}&background=random` : undefined} 
            alt={user?.name || 'User'} 
          />
          <AvatarFallback>{getUserInitials()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default MobileHeader;
