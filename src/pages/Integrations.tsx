import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  FileCheck, 
  GoogleIcon, 
  LinkedInIcon, 
  FacebookIcon, 
  SlackIcon,
  SAPIcon,
  WorkdayIcon,
  CompanyLogo
} from "@/utils/icons";
import { 
  Link as LinkIcon, 
  X as XIcon
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
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  connected: boolean;
}

// Helper function to get icon for integration
const getIconForIntegration = (name: string): React.ComponentType<{ className?: string }> => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    // Social
    "LinkedIn": LinkedInIcon,
    "Facebook": FacebookIcon,
    "X": ({ className }: { className?: string }) => (
      <CompanyLogo name="X" className={className} />
    ),
    "Instagram": ({ className }: { className?: string }) => (
      <CompanyLogo name="Instagram" className={className} />
    ),
    "TikTok": ({ className }: { className?: string }) => (
      <CompanyLogo name="TikTok" className={className} />
    ),
    "YouTube": ({ className }: { className?: string }) => (
      <CompanyLogo name="YouTube" className={className} />
    ),
    "Business Whatsapp": ({ className }: { className?: string }) => (
      <CompanyLogo name="WhatsApp" className={className} />
    ),
    
    // Productivity
    "Slack": SlackIcon,
    "Microsoft Teams": ({ className }: { className?: string }) => (
      <CompanyLogo name="Microsoft" className={className} />
    ),
    "Jira": ({ className }: { className?: string }) => (
      <CompanyLogo name="Jira" className={className} />
    ),
    "Asana": ({ className }: { className?: string }) => (
      <CompanyLogo name="Asana" className={className} />
    ),
    "Trello": ({ className }: { className?: string }) => (
      <CompanyLogo name="Trello" className={className} />
    ),
    "Monday.com": ({ className }: { className?: string }) => (
      <CompanyLogo name="Monday" className={className} />
    ),
    "Basecamp": ({ className }: { className?: string }) => (
      <CompanyLogo name="Basecamp" className={className} />
    ),
    "Google Workplace": GoogleIcon,
    "Notion": ({ className }: { className?: string }) => (
      <CompanyLogo name="Notion" className={className} />
    ),
    "Clickup": ({ className }: { className?: string }) => (
      <CompanyLogo name="Clickup" className={className} />
    ),
    "Zoom": ({ className }: { className?: string }) => (
      <CompanyLogo name="Zoom" className={className} />
    ),
    
    // Job Boards
    "LinkedIn Jobs": LinkedInIcon,
    "Indeed": ({ className }: { className?: string }) => (
      <CompanyLogo name="Indeed" className={className} />
    ),
    "Glassdoor": ({ className }: { className?: string }) => (
      <CompanyLogo name="Glassdoor" className={className} />
    ),
    "Dice": ({ className }: { className?: string }) => (
      <CompanyLogo name="Dice" className={className} />
    ),
    "Zip Recruiter": ({ className }: { className?: string }) => (
      <CompanyLogo name="ZipRecruiter" className={className} />
    ),
    "CareerBuilder": ({ className }: { className?: string }) => (
      <CompanyLogo name="CareerBuilder" className={className} />
    ),
    "SimplyHired": ({ className }: { className?: string }) => (
      <CompanyLogo name="SimplyHired" className={className} />
    ),
    "Adzuna": ({ className }: { className?: string }) => (
      <CompanyLogo name="Adzuna" className={className} />
    ),
    "The Ladders": ({ className }: { className?: string }) => (
      <CompanyLogo name="Ladders" className={className} />
    ),
    "Google for Jobs": GoogleIcon,
    "Craigslist": ({ className }: { className?: string }) => (
      <CompanyLogo name="Craigslist" className={className} />
    ),
    "Jora": ({ className }: { className?: string }) => (
      <CompanyLogo name="Jora" className={className} />
    ),
    "AngelList": ({ className }: { className?: string }) => (
      <CompanyLogo name="AngelList" className={className} />
    ),
    
    // ATS
    "Ceipal": ({ className }: { className?: string }) => (
      <CompanyLogo name="Ceipal" className={className} />
    ),
    "Workday": WorkdayIcon,
    "Taleo": ({ className }: { className?: string }) => (
      <CompanyLogo name="Taleo" className={className} />
    ),
    "ICIMS": ({ className }: { className?: string }) => (
      <CompanyLogo name="ICIMS" className={className} />
    ),
    "Lever": ({ className }: { className?: string }) => (
      <CompanyLogo name="Lever" className={className} />
    ),
    "Smart Recruiters": ({ className }: { className?: string }) => (
      <CompanyLogo name="SmartRecruiters" className={className} />
    ),
    "Bullhorn ATS": ({ className }: { className?: string }) => (
      <CompanyLogo name="Bullhorn" className={className} />
    ),
    "Pinpoint": ({ className }: { className?: string }) => (
      <CompanyLogo name="Pinpoint" className={className} />
    ),
    "Jobvite": ({ className }: { className?: string }) => (
      <CompanyLogo name="Jobvite" className={className} />
    ),
    "JazzHR": ({ className }: { className?: string }) => (
      <CompanyLogo name="JazzHR" className={className} />
    ),
    "Zoho Recruit": ({ className }: { className?: string }) => (
      <CompanyLogo name="Zoho" className={className} />
    ),
    
    // VMS
    "Stafferlink": ({ className }: { className?: string }) => (
      <CompanyLogo name="Stafferlink" className={className} />
    ),
    "SAP Field glass": SAPIcon,
    "Beeline": ({ className }: { className?: string }) => (
      <CompanyLogo name="Beeline" className={className} />
    ),
    "IQNavigator": ({ className }: { className?: string }) => (
      <CompanyLogo name="IQNavigator" className={className} />
    ),
    "PRO Unlimited VMS": ({ className }: { className?: string }) => (
      <CompanyLogo name="PROUnlimited" className={className} />
    ),
    "Pontoon": ({ className }: { className?: string }) => (
      <CompanyLogo name="Pontoon" className={className} />
    ),
    "KellyOCG VMS": ({ className }: { className?: string }) => (
      <CompanyLogo name="KellyOCG" className={className} />
    ),
    
    // Compliance
    "HR360": ({ className }: { className?: string }) => (
      <CompanyLogo name="HR360" className={className} />
    ),
    "ADP Compliance": ({ className }: { className?: string }) => (
      <CompanyLogo name="ADP" className={className} />
    ),
    "ComplianceQuest": ({ className }: { className?: string }) => (
      <CompanyLogo name="ComplianceQuest" className={className} />
    ),
    "BambooHR Compliance": ({ className }: { className?: string }) => (
      <CompanyLogo name="BambooHR" className={className} />
    ),
    "Zenefits": ({ className }: { className?: string }) => (
      <CompanyLogo name="Zenefits" className={className} />
    ),
    "Gusto Compliance": ({ className }: { className?: string }) => (
      <CompanyLogo name="Gusto" className={className} />
    ),
    
    // Background Checks
    "HireRight": ({ className }: { className?: string }) => (
      <CompanyLogo name="HireRight" className={className} />
    ),
    "Checkr": ({ className }: { className?: string }) => (
      <CompanyLogo name="Checkr" className={className} />
    ),
    "GoodHire": ({ className }: { className?: string }) => (
      <CompanyLogo name="GoodHire" className={className} />
    ),
    "Sterling": ({ className }: { className?: string }) => (
      <CompanyLogo name="Sterling" className={className} />
    ),
    "Accurate Background": ({ className }: { className?: string }) => (
      <CompanyLogo name="AccurateBackground" className={className} />
    ),
    "First Advantage": ({ className }: { className?: string }) => (
      <CompanyLogo name="FirstAdvantage" className={className} />
    ),
    "IntelliCorp": ({ className }: { className?: string }) => (
      <CompanyLogo name="IntelliCorp" className={className} />
    ),
    "Verifitech": ({ className }: { className?: string }) => (
      <CompanyLogo name="Verifitech" className={className} />
    ),
    "ESR": ({ className }: { className?: string }) => (
      <CompanyLogo name="ESR" className={className} />
    ),
    "PreCheck": ({ className }: { className?: string }) => (
      <CompanyLogo name="PreCheck" className={className} />
    ),
    
    // Onboarding
    "BambooHR Onboarding": ({ className }: { className?: string }) => (
      <CompanyLogo name="BambooHR" className={className} />
    ),
    "Click Boarding": ({ className }: { className?: string }) => (
      <CompanyLogo name="ClickBoarding" className={className} />
    ),
    "WorkBright": ({ className }: { className?: string }) => (
      <CompanyLogo name="WorkBright" className={className} />
    ),
    "ClearCompany": ({ className }: { className?: string }) => (
      <CompanyLogo name="ClearCompany" className={className} />
    ),
    "Zenefits Onboarding": ({ className }: { className?: string }) => (
      <CompanyLogo name="Zenefits" className={className} />
    ),
    "Gusto Onboarding": ({ className }: { className?: string }) => (
      <CompanyLogo name="Gusto" className={className} />
    ),
    "Sapling HR": ({ className }: { className?: string }) => (
      <CompanyLogo name="Sapling" className={className} />
    ),
    "Talmundo": ({ className }: { className?: string }) => (
      <CompanyLogo name="Talmundo" className={className} />
    ),
    "Breezy HR Onboarding": ({ className }: { className?: string }) => (
      <CompanyLogo name="BreezyHR" className={className} />
    ),
    "Namely": ({ className }: { className?: string }) => (
      <CompanyLogo name="Namely" className={className} />
    ),
    
    // CRM & HRMS
    "SAP SuccessFactors": SAPIcon,
    "Salesforce (CRM)": ({ className }: { className?: string }) => (
      <CompanyLogo name="Salesforce" className={className} />
    ),
    "Workday HCM": WorkdayIcon,
    "Oracle HCM Cloud": ({ className }: { className?: string }) => (
      <CompanyLogo name="Oracle" className={className} />
    ),
    "ADP Workforce Now": ({ className }: { className?: string }) => (
      <CompanyLogo name="ADP" className={className} />
    ),
    "BambooHR": ({ className }: { className?: string }) => (
      <CompanyLogo name="BambooHR" className={className} />
    ),
    "Ceridian Dayforce": ({ className }: { className?: string }) => (
      <CompanyLogo name="Ceridian" className={className} />
    ),
    "UltiPro": ({ className }: { className?: string }) => (
      <CompanyLogo name="UltiPro" className={className} />
    ),
    "Kronos Workforce Ready": ({ className }: { className?: string }) => (
      <CompanyLogo name="Kronos" className={className} />
    )
  };
  
  return iconMap[name] || (({ className }: { className?: string }) => (
    <CompanyLogo name={name} className={className} />
  ));
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
  const crmHrms = ["SAP SuccessFactors", "Salesforce (CRM)", "Workday HCM", "Oracle HCM Cloud", "ADP Workforce Now", "BambooHR", "Ceridian Dayforce", "UltiPro", "Kronos Workforce Ready"]
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
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
                    <div className="bg-primary/10 p-2 rounded-md h-12 w-12 flex items-center justify-center">
                      <integration.icon className="h-8 w-8" />
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
