
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { FileCheck } from "@/utils/icons";
import { 
  Puzzle, 
  Search, 
  Link as LinkIcon, 
  CheckCircle, 
  X as XIcon,
  Github,
  Slack,
  FileText,
  Database,
  Mail,
  Calendar,
  MessageSquare,
  HardDrive,
  CreditCard,
  Building,
  Phone,
  Briefcase,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Code,
  Upload,
  Download,
  Cloud,
  List,
  CheckSquare,
  Home,
  Shield,
  ShieldCheck,
  UserCheck,
  UserPlus,
  FilePlus,
  Star,
  Sun,
  Globe,
  Group,
  Compass,
  Route,
  Package,
  Ship,
  Anchor,
  LayoutList,
  Search as SearchIcon,
  Filter,
  Zap,
  TrendingUp,
  Share,
  Megaphone,
  MapPin,
  Target,
  ExternalLink,
  Heart,
  Info,
  HelpCircle,
  ArrowUp,
  Video,
  Film,
  Check,
  Clock,
  Google,
  Trello
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the categories and integrations
const categories = [
  "All",
  "VMS Systems",
  "ATS",
  "Paid Job Boards",
  "Free Job Posting",
  "Social",
  "Productivity",
  "Compliance Boards",
  "Background Boards",
  "Onboarding Boards",
  "CRM & HRMS"
];

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  connected: boolean;
}

// Helper function to get icon for integration
const getIconForIntegration = (name: string): React.ElementType => {
  const iconMap: { [key: string]: React.ElementType } = {
    // Social
    "LinkedIn": Building,
    "Facebook": Facebook,
    "X": Twitter,
    "Instagram": Instagram,
    "TikTok": Video,
    "YouTube": Youtube,
    "Business Whatsapp": MessageSquare,
    
    // Productivity
    "Slack": Slack,
    "Microsoft Teams": Users,
    "Jira": CheckSquare,
    "Asana": Check,
    "Trello": Trello,
    "Monday.com": Calendar,
    "Basecamp": Home,
    "Google Workplace": Google,
    "Notion": FileText,
    "Clickup": Check,
    "Zoom": Video,
    
    // Job Boards
    "LinkedIn Jobs": Building,
    "Indeed": Search,
    "Glassdoor": Building,
    "Dice": Code,
    "Zip Recruiter": Upload,
    "CareerBuilder": Briefcase,
    "SimplyHired": FileText,
    "Adzuna": Search,
    "The Ladders": TrendingUp,
    "Google for Jobs": Google,
    "Craigslist": List,
    "Jora": SearchIcon,
    "AngelList": Star,
    
    // ATS
    "Ceipal": FileText,
    "Workday": Calendar,
    "Taleo": List,
    "ICIMS": Search,
    "Lever": Zap,
    "Smart Recruiters": UserPlus,
    "Bullhorn ATS": Megaphone,
    "Pinpoint": MapPin,
    "Jobvite": ExternalLink,
    "JazzHR": Heart,
    "Zoho Recruit": Mail,
    
    // VMS
    "Stafferlink": Briefcase,
    "SAP Field glass": Database,
    "Beeline": Route,
    "IQNavigator": Compass,
    "PRO Unlimited VMS": Package,
    "Pontoon": Ship,
    "KellyOCG VMS": Users,
    
    // Compliance
    "HR360": Briefcase,
    "ADP Compliance": ShieldCheck,
    "ComplianceQuest": Shield,
    "BambooHR Compliance": FileCheck,
    "Zenefits": Shield,
    "Gusto Compliance": ShieldCheck,
    
    // Background Checks
    "HireRight": UserCheck,
    "Checkr": CheckCircle,
    "GoodHire": UserCheck,
    "Sterling": Shield,
    "Accurate Background": ShieldCheck,
    "First Advantage": UserCheck,
    "IntelliCorp": Building,
    "Verifitech": Shield,
    "ESR": FileText,
    "PreCheck": CheckCircle,
    
    // Onboarding
    "BambooHR Onboarding": UserPlus,
    "Click Boarding": Check,
    "WorkBright": Sun,
    "ClearCompany": Building,
    "Zenefits Onboarding": UserPlus,
    "Gusto Onboarding": UserPlus,
    "Sapling HR": Users,
    "Talmundo": Globe,
    "Breezy HR Onboarding": UserPlus,
    "Namely": Users,
    
    // CRM & HRMS
    "SAP SuccessFactors": Users,
    "Salesforce (CRM)": Cloud,
    "Workday HCM": Users,
    "Oracle HCM Cloud": Cloud,
    "ADP Workforce Now": Users,
    "BambooHR": Users,
    "Ceridian Dayforce": Users,
    "UltiPro": Users,
    "Kronos Workforce Ready": Users,
    "Zenefits": Shield,
  };
  
  return iconMap[name] || Puzzle;
};

// Create the list of integrations
const createIntegrationsList = (): IntegrationItem[] => {
  // VMS Systems
  const vmsSystems = ["Stafferlink", "SAP Field glass", "Beeline", "IQNavigator", "PRO Unlimited VMS", "Pontoon", "KellyOCG VMS"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect your ${name} VMS system`,
      icon: getIconForIntegration(name),
      category: "VMS Systems",
      connected: Math.random() > 0.8, // Random connection status for demo
    }));

  // ATS
  const ats = ["Ceipal", "Workday", "Taleo", "ICIMS", "Lever", "Smart Recruiters", "Bullhorn ATS", "Pinpoint", "Jobvite", "JazzHR", "Zoho Recruit"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Integrate with ${name} applicant tracking system`,
      icon: getIconForIntegration(name),
      category: "ATS",
      connected: Math.random() > 0.8,
    }));

  // Paid Job Boards
  const paidJobBoards = ["LinkedIn Jobs", "Indeed (Paid)", "Glassdoor", "Dice (IT)", "Zip Recruiter", "CareerBuilder", "SimplyHired (Paid)", "Adzuna", "The Ladders"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Post jobs to ${name}`,
      icon: getIconForIntegration(name.split(' ')[0]),
      category: "Paid Job Boards",
      connected: Math.random() > 0.8,
    }));

  // Free Job Posting
  const freeJobPosting = ["Indeed (Free)", "SimplyHired (Free)", "Google for Jobs", "Craigslist", "Jora", "AngelList"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Post jobs to ${name} for free`,
      icon: getIconForIntegration(name.split(' ')[0]),
      category: "Free Job Posting",
      connected: Math.random() > 0.8,
    }));

  // Social
  const social = ["LinkedIn", "Facebook", "X", "Instagram", "TikTok", "YouTube", "Business Whatsapp"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect your ${name} account`,
      icon: getIconForIntegration(name),
      category: "Social",
      connected: Math.random() > 0.8,
    }));

  // Productivity
  const productivity = ["Slack", "Microsoft Teams", "Jira", "Asana", "Trello", "Monday.com", "Basecamp", "Google Workplace", "Notion", "Clickup", "Zoom"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Integrate with ${name} for better productivity`,
      icon: getIconForIntegration(name),
      category: "Productivity",
      connected: Math.random() > 0.8,
    }));

  // Compliance Boards
  const complianceBoards = ["HR360", "ADP Compliance", "ComplianceQuest", "BambooHR Compliance", "Zenefits", "Gusto Compliance"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Ensure compliance with ${name}`,
      icon: getIconForIntegration(name),
      category: "Compliance Boards",
      connected: Math.random() > 0.8,
    }));

  // Background Boards
  const backgroundBoards = ["HireRight", "Checkr", "GoodHire", "Sterling", "Accurate Background", "First Advantage", "IntelliCorp", "Verifitech", "ESR", "PreCheck"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Perform background checks with ${name}`,
      icon: getIconForIntegration(name),
      category: "Background Boards",
      connected: Math.random() > 0.8,
    }));

  // Onboarding Boards
  const onboardingBoards = ["BambooHR Onboarding", "Click Boarding", "WorkBright", "ClearCompany", "Zenefits Onboarding", "Gusto Onboarding", "Sapling HR", "Talmundo", "Breezy HR Onboarding", "Namely"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Streamline onboarding with ${name}`,
      icon: getIconForIntegration(name),
      category: "Onboarding Boards",
      connected: Math.random() > 0.8,
    }));

  // CRM & HRMS
  const crmHrms = ["SAP SuccessFactors", "Salesforce (CRM)", "Workday HCM", "Oracle HCM Cloud", "ADP Workforce Now", "BambooHR", "Ceridian Dayforce", "UltiPro", "Kronos Workforce Ready", "Zenefits"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect your ${name} system`,
      icon: getIconForIntegration(name),
      category: "CRM & HRMS",
      connected: Math.random() > 0.8,
    }));

  return [
    ...vmsSystems,
    ...ats,
    ...paidJobBoards,
    ...freeJobPosting,
    ...social,
    ...productivity,
    ...complianceBoards,
    ...backgroundBoards,
    ...onboardingBoards,
    ...crmHrms
  ];
};

const Integrations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [integrationItems] = useState<IntegrationItem[]>(createIntegrationsList());
  
  if (!user) {
    navigate("/login");
    return null;
  }

  // Filter integrations based on search and category
  const filteredIntegrations = integrationItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle connection status
  const toggleConnection = (id: string) => {
    toast({
      title: "Integration Status Changed",
      description: "Your integration settings have been updated.",
      variant: "default",
    });
    console.log(`Toggling connection for ${id}`);
    // In a real app, this would update the state after calling an API
  };

  return (
    <DashboardLayout title="Integrations">
      <div className="space-y-6">
        {/* Search bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="bg-background/80 backdrop-blur-sm mb-4 overflow-auto flex flex-nowrap max-w-full">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            {/* Integrations grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-md transition-all overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <integration.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {integration.name}
                        {integration.connected && 
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Connected
                          </Badge>
                        }
                      </CardTitle>
                      <CardDescription className="text-xs">{integration.category}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                    <Button 
                      variant={integration.connected ? "destructive" : "default"}
                      className="w-full"
                      onClick={() => toggleConnection(integration.id)}
                    >
                      {integration.connected ? (
                        <>
                          <XIcon className="mr-2 h-4 w-4" /> Disconnect
                        </>
                      ) : (
                        <>
                          <LinkIcon className="mr-2 h-4 w-4" /> Connect
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
