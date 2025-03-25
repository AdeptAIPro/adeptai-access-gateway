
import React from "react";
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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Handle unauthorized access
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sample data for analytics
  const analyticsData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 280 },
    { name: "May", value: 590 },
    { name: "Jun", value: 350 },
  ];

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
      title: "Talent Matching",
      description: "Match jobs with candidates using AI",
      icon: Users,
      route: "/dashboard/talent-matching",
      color: "bg-purple-500",
    },
    {
      title: "Analytics",
      description: "Insights and performance metrics",
      icon: BarChartIcon,
      route: "/dashboard/analytics",
      color: "bg-yellow-500",
    },
    {
      title: "Professional Skills",
      description: "Enhance your team's professional skills",
      icon: GraduationCap,
      route: "/dashboard/skills",
      color: "bg-indigo-500",
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
      color: "bg-teal-500",
    },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
        {/* Welcome Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome back, {user.name}</CardTitle>
            <CardDescription>
              Here's an overview of your AdeptAI Pro platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ChartContainer config={{ value: { theme: { light: '#3498db', dark: '#60a5fa' } } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
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
