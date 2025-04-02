
import React, { useState } from "react";
import AnalyticsOverviewCards from "./AnalyticsOverviewCards";
import AnalyticsControls from "./AnalyticsControls";
import MatchingPerformanceChart from "./MatchingPerformanceChart";
import MatchQualityPieChart from "./MatchQualityPieChart";
import MatchingEfficiencyChart from "./MatchingEfficiencyChart";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data
const matchingData = [
  { month: "Jan", matches: 65, hires: 25, avgTime: 4.5 },
  { month: "Feb", matches: 78, hires: 30, avgTime: 4.2 },
  { month: "Mar", matches: 90, hires: 35, avgTime: 4.0 },
  { month: "Apr", matches: 81, hires: 28, avgTime: 3.8 },
  { month: "May", matches: 110, hires: 42, avgTime: 3.5 },
  { month: "Jun", matches: 95, hires: 40, avgTime: 3.2 },
  { month: "Jul", matches: 105, hires: 38, avgTime: 3.0 },
];

// Sample pie chart data
const matchQualityData = [
  { name: "Excellent Match (90%+)", value: 35, color: "#4ade80" },
  { name: "Good Match (75-89%)", value: 45, color: "#60a5fa" },
  { name: "Average Match (60-74%)", value: 15, color: "#f59e0b" },
  { name: "Poor Match (<60%)", value: 5, color: "#ef4444" },
];

// Matching efficiency by source
const sourceMatchingData = [
  { source: "LinkedIn", efficiency: 80 },
  { source: "Ceipal", efficiency: 75 },
  { source: "JobDiva", efficiency: 68 },
  { source: "Internal DB", efficiency: 92 },
  { source: "StafferLink", efficiency: 70 },
  { source: "Referrals", efficiency: 85 },
];

const AnalyticsTabContent: React.FC = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [chartType, setChartType] = useState("bar");
  const isMobile = useIsMobile();

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
  };

  const handleExport = () => {
    alert("Analytics data export started. The file will be ready for download shortly.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
      <AnalyticsControls 
        timeframe={timeframe}
        onTimeframeChange={handleTimeframeChange}
        onChartTypeChange={handleChartTypeChange}
        onExport={handleExport}
      />

      <AnalyticsOverviewCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <MatchingPerformanceChart 
          data={isMobile ? matchingData.slice(0, 5) : matchingData}
          chartType={chartType}
        />
        
        <MatchQualityPieChart 
          data={matchQualityData}
        />
      </div>
      
      <MatchingEfficiencyChart 
        data={isMobile ? sourceMatchingData.slice(0, 4) : sourceMatchingData}
      />
    </div>
  );
};

export default AnalyticsTabContent;
