
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
  return (
    <Card className="shadow border bg-white dark:bg-gray-900 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-adept" />
          Matching Performance Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} wrapperStyle={{ zIndex: 20 }} />
                <Legend />
                <Bar dataKey="matches" name="Total Matches" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hires" name="Successful Hires" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip wrapperStyle={{ zIndex: 20 }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="matches" 
                  name="Total Matches"
                  stroke="#8884d8" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
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
