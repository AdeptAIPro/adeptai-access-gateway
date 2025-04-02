
import React, { useState, useEffect } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Close sidebar by default on mobile, open by default on desktop
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle('dark');
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""} bg-background text-foreground`}>
      {/* Mobile header - fixed to top */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <MobileHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 pt-16 md:pt-0">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 z-40 bg-card border-r border-border h-full w-64 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
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
          {/* Desktop header */}
          <div className="hidden md:block sticky top-0 z-30">
            <Header 
              title={title} 
              setSidebarOpen={setSidebarOpen} 
              theme={theme} 
              toggleTheme={toggleTheme} 
            />
          </div>

          {/* Page content - with proper padding to avoid header overlap */}
          <main className="flex-1 p-4 md:p-6 bg-background">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
