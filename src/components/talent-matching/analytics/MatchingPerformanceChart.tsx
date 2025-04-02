
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from "recharts";
import { BarChart3 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MatchingPerformanceChartProps {
  data: {
    month: string;
    matches: number;
    hires: number;
    avgTime: number;
  }[];
  chartType: string;
}

const MatchingPerformanceChart: React.FC<MatchingPerformanceChartProps> = ({ data, chartType }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="shadow border bg-white dark:bg-gray-900 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center text-base md:text-lg">
          <BarChart3 className="mr-2 h-4 w-4 md:h-5 md:w-5 text-adept" />
          Matching Performance Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] md:h-[350px] relative">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data} margin={{ 
                top: 10, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 0 : 0, 
                bottom: isMobile ? 0 : 10 
              }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: isMobile ? 10 : 12 }} 
                  interval={isMobile ? 1 : 0}
                />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={35} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
                  wrapperStyle={{ zIndex: 20 }} 
                />
                <Legend 
                  wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
                  verticalAlign={isMobile ? "bottom" : undefined}
                  height={36}
                />
                <Bar 
                  dataKey="matches" 
                  name="Total Matches" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 15 : 20}
                />
                <Bar 
                  dataKey="hires" 
                  name="Successful Hires" 
                  fill="#82ca9d" 
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 15 : 20}
                />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ 
                top: 10, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 0 : 0, 
                bottom: isMobile ? 0 : 10 
              }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: isMobile ? 10 : 12 }} 
                  interval={isMobile ? 1 : 0}
                />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={35} />
                <Tooltip wrapperStyle={{ zIndex: 20 }} />
                <Legend 
                  wrapperStyle={{ fontSize: isMobile ? 10 : 12 }}
                  verticalAlign={isMobile ? "bottom" : undefined}
                  height={36}
                />
                <Line 
                  type="monotone" 
                  dataKey="matches" 
                  name="Total Matches"
                  stroke="#8884d8" 
                  strokeWidth={2}
                  activeDot={{ r: isMobile ? 6 : 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="hires" 
                  name="Successful Hires"
                  stroke="#82ca9d" 
                  strokeWidth={2} 
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchingPerformanceChart;
