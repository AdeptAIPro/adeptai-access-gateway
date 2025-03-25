
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { 
  Puzzle, 
  Users, 
  BarChart as BarChartIcon, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  ArrowRight,
  Search,
  Clock,
  ChevronRight,
  CalendarDays,
  BriefcaseBusiness,
  UserCheck,
  BadgeCheck,
  Activity
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
    { name: "Jan", value: 400, candidates: 120 },
    { name: "Feb", value: 300, candidates: 98 },
    { name: "Mar", value: 500, candidates: 142 },
    { name: "Apr", value: 280, candidates: 89 },
    { name: "May", value: 590, candidates: 170 },
    { name: "Jun", value: 350, candidates: 110 },
  ];

  // Sample pie data
  const sourcesData = [
    { name: "LinkedIn", value: 45, color: "#8884d8" },
    { name: "Ceipal", value: 25, color: "#82ca9d" },
    { name: "JobDiva", value: 15, color: "#ffc658" },
    { name: "Stafferlink", value: 15, color: "#ff8042" },
  ];

  // Upcoming events
  const upcomingEvents = [
    { title: "Candidate Interview", time: "Today, 2:00 PM", type: "interview" },
    { title: "Team Training Session", time: "Tomorrow, 10:00 AM", type: "training" },
    { title: "New Talent Onboarding", time: "June 15, 9:30 AM", type: "onboarding" },
    { title: "Compliance Review", time: "June 18, 11:00 AM", type: "compliance" },
  ];

  // Dashboard card data
  const dashboardCards = [
    {
      title: "Integrations",
      description: "Connect your systems and automate workflows",
      icon: Puzzle,
      route: "/dashboard/integrations",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Talent Search",
      description: "Find the right talent for your projects",
      icon: Search,
      route: "/dashboard/talent-search",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Talent Matching",
      description: "Match jobs with candidates using AI",
      icon: Users,
      route: "/dashboard/talent-matching",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Analytics",
      description: "Insights and performance metrics",
      icon: BarChartIcon,
      route: "/dashboard/analytics",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Professional Skills",
      description: "Enhance your team's professional skills",
      icon: GraduationCap,
      route: "/dashboard/skills",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Compliance",
      description: "Stay compliant with regulations",
      icon: ShieldCheck,
      route: "/dashboard/compliance",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Onboarding",
      description: "Streamline your onboarding process",
      icon: UserPlus,
      route: "/dashboard/onboarding",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <DashboardLayout title="Executive Dashboard">
      <div className="grid gap-6 animate-fade-in-up">
        {/* Welcome and Summary Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-adept to-adept-dark text-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">Welcome back, {user.name}</CardTitle>
                  <CardDescription className="text-white/80 mt-1">
                    Here's your AdeptAI Pro dashboard overview
                  </CardDescription>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Activity className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[240px] w-full">
                <ChartContainer config={{ value: { theme: { light: '#5E19E6', dark: '#60a5fa' } } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#5E19E6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Job Postings"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="candidates" 
                        stroke="#4F46E5" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }}
                        name="Candidates" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Job Postings</p>
                  <p className="text-2xl font-bold text-adept">1,872</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Candidates</p>
                  <p className="text-2xl font-bold text-green-600">4,256</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Interviews</p>
                  <p className="text-2xl font-bold text-blue-600">342</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Hires</p>
                  <p className="text-2xl font-bold text-purple-600">128</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
              <div className="flex justify-between items-start">
                <CardTitle>Upcoming Events</CardTitle>
                <div className="bg-white/20 p-3 rounded-full">
                  <CalendarDays className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {upcomingEvents.map((event, i) => (
                  <li key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full 
                        ${event.type === 'interview' ? 'bg-green-100 text-green-600' : 
                          event.type === 'training' ? 'bg-blue-100 text-blue-600' : 
                          event.type === 'onboarding' ? 'bg-purple-100 text-purple-600' : 
                          'bg-yellow-100 text-yellow-600'}`
                      }>
                        {event.type === 'interview' ? <UserCheck className="h-4 w-4" /> : 
                         event.type === 'training' ? <GraduationCap className="h-4 w-4" /> : 
                         event.type === 'onboarding' ? <UserPlus className="h-4 w-4" /> : 
                         <ShieldCheck className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {event.time}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4">
              <Button variant="outline" className="w-full justify-center" onClick={() => navigate("/dashboard/calendar")}>
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Candidate Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BriefcaseBusiness className="h-5 w-5 mr-2 text-blue-500" />
                Candidate Sources
              </CardTitle>
              <CardDescription>
                Distribution of candidates by source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BadgeCheck className="h-5 w-5 mr-2 text-green-500" />
                Top Performing Hires
              </CardTitle>
              <CardDescription>
                Recent hires with outstanding performance ratings
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Sarah Johnson</td>
                      <td className="px-4 py-3 whitespace-nowrap">Senior Developer</td>
                      <td className="px-4 py-3 whitespace-nowrap">May 15, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">9.8/10</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Michael Chen</td>
                      <td className="px-4 py-3 whitespace-nowrap">UX Designer</td>
                      <td className="px-4 py-3 whitespace-nowrap">April 23, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">9.5/10</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap">Jessica Williams</td>
                      <td className="px-4 py-3 whitespace-nowrap">Project Manager</td>
                      <td className="px-4 py-3 whitespace-nowrap">June 2, 2023</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">9.2/10</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-2">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md"
            >
              <CardHeader className={`bg-gradient-to-r ${card.color} text-white p-5`}>
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <Button className="bg-white/20 hover:bg-white/30 text-white h-9 w-9 p-0 rounded-full" onClick={() => navigate(card.route)}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                <CardDescription className="text-sm">{card.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
