
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import TalentMatchingContainer from "@/components/talent-matching/TalentMatchingContainer";
import AnalyticsTabContent from "@/components/talent-matching/analytics/AnalyticsTabContent";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const TalentMatching: React.FC = () => {
  return (
    <DashboardLayout title="AI Talent Matchmaking">
      <TalentMatchingHero />
      
      <Alert className="mb-4 bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-500" />
        <AlertDescription>
          New! Cross-Source Talent Intelligence is now available. Enable it in the matching panel to leverage AI-powered candidate analysis across multiple talent sources.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="matching" className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto mb-6">
          <TabsTrigger value="matching" className="flex-1 py-3">
            AI Job Matching
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 py-3">
            Performance Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="matching">
          <TalentMatchingContainer />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTabContent />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TalentMatching;
