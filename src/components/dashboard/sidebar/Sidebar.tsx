
import React from "react";
import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import SidebarItems from "./SidebarItems";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  theme, 
  toggleTheme 
}) => {
  return (
    <div 
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out overflow-y-auto h-screen fixed md:sticky top-0 z-30",
        sidebarOpen ? "left-0" : "-left-64",
        "md:left-0 md:w-64"
      )}
    >
      <SidebarHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <SidebarItems />
      <SidebarFooter theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Sidebar;
