
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import ComingSoonSection from "@/components/ComingSoonSection";
import { BarChart } from "lucide-react";

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout title="Analytics">
      <ComingSoonSection 
        title="Analytics Dashboard" 
        description="Comprehensive analytics tools to track performance and make data-driven decisions."
        icon={BarChart}
      />
    </DashboardLayout>
  );
};

export default Analytics;
