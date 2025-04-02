
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardMetricsCards from "@/components/dashboard/DashboardMetricsCards";
import DashboardAnalyticsChart from "@/components/dashboard/DashboardAnalyticsChart";
import DashboardFeatureCards from "@/components/dashboard/DashboardFeatureCards";
import useDashboardAnalytics from "@/hooks/use-dashboard-analytics";
import { getDashboardCards } from "@/components/dashboard/DashboardCardsData";

const Dashboard = () => {
  const { user } = useAuth();
  const { analyticsData, timeframe, setTimeframe, isLoading } = useDashboardAnalytics();
  const dashboardCards = getDashboardCards();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-4 md:gap-8 animate-fade-in-up">
        <DashboardMetricsCards />
        <DashboardAnalyticsChart 
          analyticsData={analyticsData} 
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          userName={user.name}
        />
        <DashboardFeatureCards dashboardCards={dashboardCards} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
