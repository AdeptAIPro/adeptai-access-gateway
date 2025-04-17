
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SourceCategoryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const SourceCategoryTabs: React.FC<SourceCategoryTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    onTabChange(value);
    
    // Show a toast notification with suggestions based on tab
    if (value === "healthcare" && value !== activeTab) {
      toast({
        title: "Healthcare Sources Loaded",
        description: "We've loaded specialized healthcare talent sources for better matching.",
        variant: "default"
      });
    } else if (value === "it" && value !== activeTab) {
      toast({
        title: "IT Sources Loaded",
        description: "We've loaded specialized IT talent sources for better matching.",
        variant: "default"
      });
    }
  };

  return (
    <Tabs defaultValue={activeTab} className="mb-6" onValueChange={handleTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="healthcare">
          Healthcare
          <Badge variant="outline" className="ml-2 bg-red-50">New</Badge>
        </TabsTrigger>
        <TabsTrigger value="it">
          IT
          <Badge variant="outline" className="ml-2 bg-blue-50">New</Badge>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SourceCategoryTabs;
