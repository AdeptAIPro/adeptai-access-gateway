
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
      {/* Mobile header - fixed to top */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <MobileHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>

      {/* Sidebar */}
      <div className={`md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-40 ${!sidebarOpen && "md:hidden"}`}>
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      </div>

      {/* Main content wrapper */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        sidebarOpen ? "md:ml-64" : "md:ml-0",
      )}>
        {/* Desktop header - fixed below mobile header */}
        <div className="hidden md:block md:sticky md:top-0 md:z-30">
          <Header 
            title={title} 
            setSidebarOpen={setSidebarOpen} 
            theme={theme} 
            toggleTheme={toggleTheme} 
          />
        </div>

        {/* Page content - with proper padding to avoid header overlap */}
        <main className="flex-1 p-6 mt-16 md:mt-0 bg-background">{children}</main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
