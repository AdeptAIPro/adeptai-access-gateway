
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { 
  Puzzle, 
  Users, 
  BarChart as BarChartIcon, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  ArrowRight,
  Search,
  TrendingUp,
  Zap
} from "lucide-react";
import { getJobMetrics, getCandidateMetrics } from "@/services/dashboard/AnalyticsService";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState([]);
  const [timeframe, setTimeframe] = useState("month");
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle unauthorized access
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const data = await getJobMetrics(timeframe);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeframe]);

  // Custom tooltip style for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-4 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-adept font-semibold">{`${payload[0].value} jobs`}</p>
        </div>
      );
    }
    return null;
  };

  // Dashboard card data
  const dashboardCards = [
    {
      title: "Integrations",
      description: "Connect your systems and automate workflows",
      icon: Puzzle,
      route: "/dashboard/integrations",
      color: "from-blue-500 to-blue-700",
      stats: "12 active",
    },
    {
      title: "Talent Search",
      description: "Find the right talent for your projects",
      icon: Search,
      route: "/dashboard/talent-search",
      color: "from-green-500 to-green-700",
      stats: "3.2k candidates",
    },
    {
      title: "Analytics",
      description: "Insights and performance metrics",
      icon: BarChartIcon,
      route: "/dashboard/analytics",
      color: "from-purple-500 to-purple-700",
      stats: "+18% this month",
    },
    {
      title: "Professional Skills",
      description: "Enhance your team's professional skills",
      icon: GraduationCap,
      route: "/dashboard/skills",
      color: "from-yellow-500 to-yellow-700",
      stats: "85 courses",
    },
    {
      title: "Compliance",
      description: "Stay compliant with regulations",
      icon: ShieldCheck,
      route: "/dashboard/compliance",
      color: "from-red-500 to-red-700",
      stats: "100% compliant",
    },
    {
      title: "Onboarding",
      description: "Streamline your onboarding process",
      icon: UserPlus,
      route: "/dashboard/onboarding",
      color: "from-indigo-500 to-indigo-700",
      stats: "15 in progress",
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-8 animate-fade-in-up">
        {/* Welcome Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Job Postings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">1,872</span>
                <span className="text-sm text-green-500 font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  +12% from last month
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Candidates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">4,256</span>
                <span className="text-sm text-blue-500 font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  +8% from last month
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <UserPlus className="h-5 w-5 mr-2 text-purple-500" />
                New Hires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">342</span>
                <span className="text-sm text-purple-500 font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  +5% from last month
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <ShieldCheck className="h-5 w-5 mr-2 text-adept" />
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">98%</span>
                <span className="text-sm text-adept font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-1" />
                  +2% from last audit
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Chart - With proper fixed height and styling */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">Welcome back, {user.name}</CardTitle>
                <CardDescription className="text-base">
                  Here's an overview of your job posting analytics
                </CardDescription>
              </div>
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button 
                  variant={timeframe === "week" ? "default" : "ghost"} 
                  size="sm" 
                  className={timeframe === "week" ? "bg-adept text-white" : ""}
                  onClick={() => setTimeframe("week")}
                >
                  Week
                </Button>
                <Button 
                  variant={timeframe === "month" ? "default" : "ghost"} 
                  size="sm" 
                  className={timeframe === "month" ? "bg-adept text-white" : ""}
                  onClick={() => setTimeframe("month")}
                >
                  Month
                </Button>
                <Button 
                  variant={timeframe === "year" ? "default" : "ghost"} 
                  size="sm" 
                  className={timeframe === "year" ? "bg-adept text-white" : ""}
                  onClick={() => setTimeframe("year")}
                >
                  Year
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-4 h-[350px] w-full"> {/* Fixed height to prevent overflow */}
              <ChartContainer config={{ value: { theme: { light: '#5E19E6', dark: '#4F46E5' } } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={analyticsData} 
                    margin={{ top: 20, right: 30, bottom: 35, left: 20 }}
                    barSize={40}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fontWeight: 500, fill: '#666' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: 15 }} />
                    <Bar 
                      dataKey="value" 
                      fill="url(#colorGradient)" 
                      name="Job Postings" 
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5E19E6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#5E19E6" stopOpacity={0.4}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Section Cards - Enhanced with gradients and better spacing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md group hover:-translate-y-1"
            >
              <CardHeader className={`bg-gradient-to-r ${card.color} text-white p-6`}>
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-xs font-medium">{card.stats}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                <CardDescription className="mb-6 text-sm">{card.description}</CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full justify-between group-hover:border-adept group-hover:text-adept transition-colors"
                  onClick={() => navigate(card.route)}
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
