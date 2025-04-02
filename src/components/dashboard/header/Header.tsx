
import React from "react";
import { Button } from "@/components/ui/button";
import { BellRing, Menu, MessageSquare } from "lucide-react";
import ResourcesMenu from "./ResourcesMenu";
import UserMenu from "./UserMenu";

interface HeaderProps {
  title: string;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  setSidebarOpen, 
  theme, 
  toggleTheme 
}) => {
  return (
    <header className="flex h-16 items-center justify-between bg-card border-b border-border px-4 md:px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 block lg:hidden"
          onClick={() => setSidebarOpen(prevState => !prevState)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white truncate">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <ResourcesMenu />

        <Button variant="ghost" size="icon" className="rounded-full relative">
          <BellRing className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
          <MessageSquare className="h-5 w-5" />
        </Button>
        
        <UserMenu theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
