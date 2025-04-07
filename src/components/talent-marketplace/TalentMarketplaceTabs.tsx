
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Upload } from "lucide-react";

interface TalentMarketplaceTabsProps {
  activeTab: "jobs" | "upload";
  setActiveTab: (tab: "jobs" | "upload") => void;
}

const TalentMarketplaceTabs: React.FC<TalentMarketplaceTabsProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <div className="mb-8">
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "jobs" | "upload")}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="jobs" className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Browse Jobs
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Resume
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TalentMarketplaceTabs;
