
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
    <div className="h-full flex flex-col overflow-hidden">
      <SidebarHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-y-auto">
        <SidebarItems />
      </div>
      <SidebarFooter theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Sidebar;
