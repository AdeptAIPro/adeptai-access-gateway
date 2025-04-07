
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Upload, Filter, BarChart } from "lucide-react";

interface TalentMarketplaceTabsProps {
  activeTab: "jobs" | "upload" | "insights" | "saved";
  setActiveTab: (tab: "jobs" | "upload" | "insights" | "saved") => void;
}

const TalentMarketplaceTabs: React.FC<TalentMarketplaceTabsProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <div className="mb-8">
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "jobs" | "upload" | "insights" | "saved")}>
        <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4">
          <TabsTrigger value="jobs" className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Browse Jobs
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Resume
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center">
            <BarChart className="h-4 w-4 mr-2" />
            Market Insights
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Saved Jobs
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TalentMarketplaceTabs;
