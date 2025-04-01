
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
        "bg-card border-r border-border h-full w-64 overflow-y-auto",
        sidebarOpen ? "block" : "hidden md:block"
      )}
    >
      <SidebarHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <SidebarItems />
      <SidebarFooter theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Sidebar;
