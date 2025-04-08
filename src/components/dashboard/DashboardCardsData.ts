
import { 
  Puzzle, 
  Users, 
  BarChart as BarChartIcon, 
  GraduationCap,
  ShieldCheck,
  UserPlus,
  Search
} from "lucide-react";

export const getDashboardCards = () => [
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
    route: "/talent-search",
    color: "from-green-500 to-green-700",
    stats: "3.2k candidates",
  },
  {
    title: "Talent Matchmaking - AI",
    description: "Match jobs with candidates using AI",
    icon: Users,
    route: "/talent-matching",
    color: "from-purple-500 to-purple-700",
    stats: "+18% this month",
  },
  {
    title: "Analytics",
    description: "Insights and performance metrics",
    icon: BarChartIcon,
    route: "/analytics",
    color: "from-purple-500 to-purple-700",
    stats: "+18% this month",
  },
  {
    title: "Professional Skills",
    description: "Enhance your team's professional skills",
    icon: GraduationCap,
    route: "/skills",
    color: "from-yellow-500 to-yellow-700",
    stats: "85 courses",
  },
  {
    title: "Compliance",
    description: "Stay compliant with regulations",
    icon: ShieldCheck,
    route: "/compliance",
    color: "from-red-500 to-red-700",
    stats: "100% compliant",
  },
  {
    title: "Onboarding",
    description: "Streamline your onboarding process",
    icon: UserPlus,
    route: "/onboarding",
    color: "from-indigo-500 to-indigo-700",
    stats: "15 in progress",
  },
];
