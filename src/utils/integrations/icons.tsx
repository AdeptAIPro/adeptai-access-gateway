
import React from "react";
import { CompanyLogo, GoogleIcon, LinkedInIcon, FacebookIcon, SlackIcon, SAPIcon, WorkdayIcon } from "@/utils/icons";

// Map integration names to their respective icon components
export const getIconForIntegration = (name: string): React.ComponentType<{ className?: string }> => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
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
