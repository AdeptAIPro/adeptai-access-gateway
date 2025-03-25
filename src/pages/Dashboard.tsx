
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { 
  Puzzle, 
  Users, 
  BarChart as BarChartIcon, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  ArrowRight,
  Search
} from "lucide-react";
import { getJobMetrics } from "@/services/dashboard/AnalyticsService";

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

  // Dashboard card data
  const dashboardCards = [
    {
      title: "Integrations",
      description: "Connect your systems and automate workflows",
      icon: Puzzle,
      route: "/dashboard/integrations",
      color: "bg-blue-500",
    },
    {
      title: "Talent Search",
      description: "Find the right talent for your projects",
      icon: Search,
      route: "/dashboard/talent-search",
      color: "bg-green-500",
    },
    {
      title: "Analytics",
      description: "Insights and performance metrics",
      icon: BarChartIcon,
      route: "/dashboard/analytics",
      color: "bg-purple-500",
    },
    {
      title: "Professional Skills",
      description: "Enhance your team's professional skills",
      icon: GraduationCap,
      route: "/dashboard/skills",
      color: "bg-yellow-500",
    },
    {
      title: "Compliance",
      description: "Stay compliant with regulations",
      icon: ShieldCheck,
      route: "/dashboard/compliance",
      color: "bg-red-500",
    },
    {
      title: "Onboarding",
      description: "Streamline your onboarding process",
      icon: UserPlus,
      route: "/dashboard/onboarding",
      color: "bg-indigo-500",
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
        {/* Welcome Card with Chart - Fixed height to prevent overflow */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome back, {user.name}</CardTitle>
            <CardDescription>
              Here's an overview of your AdeptAI Pro platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full"> {/* Fixed height to prevent overflow */}
              <div className="flex justify-end mb-2 text-sm">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={timeframe === "week" ? "bg-muted" : ""}
                  onClick={() => setTimeframe("week")}
                >
                  Week
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={timeframe === "month" ? "bg-muted" : ""}
                  onClick={() => setTimeframe("month")}
                >
                  Month
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={timeframe === "year" ? "bg-muted" : ""}
                  onClick={() => setTimeframe("year")}
                >
                  Year
                </Button>
              </div>
              <div className="h-52 w-full"> {/* Fixed subcontainer height */}
                <ChartContainer config={{ value: { theme: { light: '#3498db', dark: '#60a5fa' } } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        formatter={(value) => [`${value} jobs`, 'Volume']}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar dataKey="value" fill="var(--color-value)" name="Job Postings" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Cards */}
        {dashboardCards.map((card, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
            <CardHeader className={`${card.color} text-white p-4`}>
              <div className="flex justify-between items-center">
                <card.icon className="h-8 w-8" />
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
              <CardDescription className="mb-4">{card.description}</CardDescription>
              <Button 
                variant="outline" 
                className="w-full justify-between"
                onClick={() => navigate(card.route)}
              >
                <span>View</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
