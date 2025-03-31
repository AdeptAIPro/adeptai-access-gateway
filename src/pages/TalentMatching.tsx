
import React, { useState } from "react";
import TalentMatchingContainer from "@/components/talent-matching/TalentMatchingContainer";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  Download, 
  Calendar,
  ChevronDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/DashboardLayout";

const TalentMatching: React.FC = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [chartType, setChartType] = useState("bar");

  // Sample data for analytics
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
    <DashboardLayout title="AI Talent Matchmaking">
      <TalentMatchingHero />
      <Tabs defaultValue="matching" className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto mb-6">
          <TabsTrigger value="matching" className="flex-1 py-3">
            AI Job Matching
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 py-3">
            Performance Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="matching">
          <TalentMatchingContainer />
        </TabsContent>
        <TabsContent value="analytics">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <h2 className="text-2xl font-bold">Talent Matching Analytics</h2>
              
              <div className="flex flex-wrap gap-3">
                <Select value={timeframe} onValueChange={handleTimeframeChange}>
                  <SelectTrigger className="w-[150px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Chart Type
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleChartTypeChange("bar")}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Bar Chart
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChartTypeChange("line")}>
                      <LineChartIcon className="mr-2 h-4 w-4" />
                      Line Chart
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Total Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">624</div>
                  <p className="text-sm text-green-500 mt-1">↑ 12% from previous period</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Successful Hires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">238</div>
                  <p className="text-sm text-green-500 mt-1">↑ 8% from previous period</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Average Match Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">87%</div>
                  <p className="text-sm text-green-500 mt-1">↑ 3% from previous period</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Time-to-Hire (Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3.7</div>
                  <p className="text-sm text-green-500 mt-1">↓ 15% from previous period</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-adept" />
                    Matching Performance Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === "bar" ? (
                        <BarChart data={matchingData}>
                          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="matches" name="Total Matches" fill="#8884d8" />
                          <Bar dataKey="hires" name="Successful Hires" fill="#82ca9d" />
                        </BarChart>
                      ) : (
                        <LineChart data={matchingData}>
                          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
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
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="mr-2 h-5 w-5 text-adept" />
                    Match Quality Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={matchQualityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {matchQualityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-adept" />
                  Matching Efficiency by Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={sourceMatchingData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="source" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                      <Bar 
                        dataKey="efficiency" 
                        name="Matching Efficiency" 
                        fill="#5E19E6"
                        background={{ fill: '#eee' }}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TalentMatching;
