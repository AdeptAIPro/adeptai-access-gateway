
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Zap } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface SidebarHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="p-4 border-b border-border flex items-center justify-between">
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
    </>
  );
};

export default SidebarHeader;
