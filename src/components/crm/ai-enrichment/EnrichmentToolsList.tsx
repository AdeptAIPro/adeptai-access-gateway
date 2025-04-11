
import React from "react";
import EnrichmentTool from "./EnrichmentTool";
import { Globe, Database, UploadCloud } from "lucide-react";

interface EnrichmentToolsListProps {
  type: "leads" | "talents";
  onConfigure: (toolId: string) => void;
  onEnrich: (source: string, type: "leads" | "talents") => void;
  isProcessing: boolean;
}

const EnrichmentToolsList: React.FC<EnrichmentToolsListProps> = ({
  type,
  onConfigure,
  onEnrich,
  isProcessing,
}) => {
  // Define tools based on type (leads or talents)
  const tools = type === "leads" 
    ? [
        {
          id: "coldify",
          name: "Coldify AI (Free)",
          description: "AI-powered lead generation from company websites and social media",
          icon: <Globe className="mr-2 h-4 w-4 text-green-500" />,
          source: "Coldify AI"
        },
        {
          id: "hunter",
          name: "Hunter.io (Freemium)",
          description: "Find and verify professional email addresses (50 free requests/month)",
          icon: <Database className="mr-2 h-4 w-4 text-purple-500" />,
          source: "Hunter.io"
        },
        {
          id: "leadgpt",
          name: "LeadGPT (Open Source)",
          description: "Open-source AI for enriching leads with market intelligence",
          icon: <UploadCloud className="mr-2 h-4 w-4 text-blue-500" />,
          source: "LeadGPT"
        }
      ]
    : [
        {
          id: "openresume",
          name: "OpenResume.ai (Free)",
          description: "Extract structured data from candidate resumes and online profiles",
          icon: <Globe className="mr-2 h-4 w-4 text-blue-500" />,
          source: "OpenResume.ai"
        },
        {
          id: "talentharvest",
          name: "TalentHarvest (Open Source)",
          description: "Ethically scrape talent data from job boards and professional networks",
          icon: <Database className="mr-2 h-4 w-4 text-green-500" />,
          source: "TalentHarvest"
        },
        {
          id: "skillgraph",
          name: "SkillGraph (Freemium)",
          description: "AI-powered skill identification and validation (100 free lookups/month)",
          icon: <UploadCloud className="mr-2 h-4 w-4 text-amber-500" />,
          source: "SkillGraph"
        }
      ];

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <EnrichmentTool
          key={tool.id}
          name={tool.name}
          description={tool.description}
          icon={tool.icon}
          toolId={tool.id}
          onConfigure={onConfigure}
          onEnrich={() => onEnrich(tool.source, type)}
          isProcessing={isProcessing}
        />
      ))}
    </div>
  );
};

export default EnrichmentToolsList;
