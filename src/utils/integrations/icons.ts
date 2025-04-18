
import {
  Database,
  FileText,
  CheckSquare,
  Calendar,
  Users,
  MessageSquare,
  Globe,
  PenTool,
  Shield,
  Briefcase,
  ClipboardCheck,
  CreditCard,
  Building,
  Layers,
  Monitor,
  Share2,
  Clipboard,
  Lock,
  BarChart,
  Send,
  Search,
  ShoppingBag,
  Clock,
  Mail,
  Phone,
  Zap,
  Box,
  UserCheck,
  Award
} from "lucide-react";

export const getIconForIntegration = (name: string) => {
  // Map of integration names to icon components
  const iconMap: Record<string, any> = {
    // VMS Systems
    "Fieldglass": Database,
    "Beeline": Database,
    "PRO Unlimited": Database,
    "Wand": Database,
    "Coupa": Database,
    "Shiftwise": Database,
    "StayStaffed": Database,
    
    // ATS
    "Greenhouse": Users,
    "Workday": Calendar,
    "BambooHR": Users,
    "Lever": Users,
    "JazzHR": Users,
    "Recruitee": Users,
    "Workable": Users,
    
    // Job Boards
    "Indeed": Globe,
    "LinkedIn": Users,
    "ZipRecruiter": FileText,
    "Monster": Briefcase,
    "Glassdoor": Building,
    "CareerBuilder": Briefcase,
    "Dice": Search,
    
    // Free Job Posting
    "Google for Jobs": Search,
    "Facebook Jobs": Share2,
    "Craigslist": Globe,
    "Jooble": Search,
    "Adzuna": Search,
    "JobRapido": Clock,
    "Trovit": Search,
    
    // Social
    "Twitter": MessageSquare,
    "Facebook": Share2,
    "Instagram": Share2,
    "YouTube": Share2,
    "TikTok": Share2,
    "Reddit": MessageSquare,
    
    // Productivity
    "Slack": MessageSquare,
    "Microsoft Teams": Users,
    "Google Workspace": Layers,
    "Asana": CheckSquare,
    "Trello": Clipboard,
    "Monday.com": Calendar,
    "ClickUp": CheckSquare,
    
    // Compliance
    "Nursys": Shield,
    "OIG Exclusions": Shield,
    "SAM.gov": Shield,
    "NPDB": Shield,
    "E-Verify": UserCheck,
    "I-9 Compliance": ClipboardCheck,
    "Joint Commission": Award,
    
    // Background Checks
    "HireRight": Lock,
    "Sterling": Shield,
    "Checkr": ClipboardCheck,
    "GoodHire": UserCheck,
    "Accurate": CheckSquare,
    "Certn": Shield,
    "Cisive": Lock,
    
    // Onboarding
    "Zenefits": Users,
    "Rippling": Zap,
    "TriNet": Building,
    "GoCo": Users,
    "Deel": Globe,
    
    // CRM & HRMS
    "Salesforce": Building,
    "HubSpot": Users,
    "Zoho CRM": Users,
    "Oracle HCM": Database,
    "SAP SuccessFactors": Users,
    "Bullhorn": Phone,
    "ADP": Users,
  };
  
  // Default to a generic icon if not found
  return iconMap[name] || Layers;
};
