
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Header from "@/components/dashboard/header/Header";
import MobileHeader from "@/components/dashboard/MobileHeader";
import Footer from "@/components/dashboard/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle('dark');
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === "dark" ? "dark" : ""} bg-background text-foreground`}>
      {/* Mobile header */}
      <MobileHeader 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarOpen ? "md:ml-0" : "md:ml-0",
      )}>
        {/* Desktop header */}
        <Header 
          title={title} 
          setSidebarOpen={setSidebarOpen} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />

        {/* Page content */}
        <main className="p-6 bg-background">{children}</main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
