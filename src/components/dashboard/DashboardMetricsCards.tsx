
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, UserPlus, ShieldCheck, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardMetricsCards = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <MetricCard 
        title="Job Postings" 
        icon={TrendingUp} 
        iconColor="text-green-500" 
        value="1,872" 
        change="+12% from last month" 
        changeColor="text-green-500" 
      />
      
      <MetricCard 
        title="Candidates" 
        icon={Users} 
        iconColor="text-blue-500" 
        value="4,256" 
        change="+8% from last month" 
        changeColor="text-blue-500" 
      />
      
      <MetricCard 
        title="New Hires" 
        icon={UserPlus} 
        iconColor="text-purple-500" 
        value="342" 
        change="+5% from last month" 
        changeColor="text-purple-500" 
      />
      
      <MetricCard 
        title="Compliance Score" 
        icon={ShieldCheck} 
        iconColor="text-adept" 
        value="98%" 
        change="+2% from last audit" 
        changeColor="text-adept" 
      />
    </div>
  );
};

interface MetricCardProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  value: string;
  change: string;
  changeColor: string;
}

const MetricCard = ({ title, icon: Icon, iconColor, value, change, changeColor }: MetricCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="flex items-center text-base md:text-lg">
          <Icon className={`h-4 w-4 md:h-5 md:w-5 mr-2 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex flex-col">
          <span className="text-xl md:text-3xl font-bold">{value}</span>
          <span className={`text-xs md:text-sm ${changeColor} font-medium flex items-center`}>
            <Zap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMetricsCards;
