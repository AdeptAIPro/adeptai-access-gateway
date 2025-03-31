
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, change, isPositive = true }) => (
  <Card className="shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      <p className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"} mt-1`}>
        {change}
      </p>
    </CardContent>
  </Card>
);

const AnalyticsOverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnalyticsCard 
        title="Total Matches" 
        value="624" 
        change="↑ 12% from previous period" 
      />
      <AnalyticsCard 
        title="Successful Hires" 
        value="238" 
        change="↑ 8% from previous period" 
      />
      <AnalyticsCard 
        title="Average Match Score" 
        value="87%" 
        change="↑ 3% from previous period" 
      />
      <AnalyticsCard 
        title="Time-to-Hire (Days)" 
        value="3.7" 
        change="↓ 15% from previous period" 
        isPositive={true}
      />
    </div>
  );
};

export default AnalyticsOverviewCards;
