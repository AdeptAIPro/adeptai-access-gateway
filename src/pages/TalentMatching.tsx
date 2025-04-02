
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import TalentMatchingContainer from "@/components/talent-matching/TalentMatchingContainer";
import AnalyticsTabContent from "@/components/talent-matching/analytics/AnalyticsTabContent";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Sparkles } from "lucide-react";

const TalentMatching: React.FC = () => {
  return (
    <DashboardLayout title="AI Talent Matchmaking">
      <TalentMatchingHero />
      
      <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 shadow-sm">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
          <AlertDescription className="text-amber-800 font-medium">
            New! Cross-Source Talent Intelligence is now available. Enable it in the matching panel to leverage AI-powered candidate analysis across multiple talent sources.
          </AlertDescription>
        </div>
      </Alert>
      
      <Tabs defaultValue="matching" className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto mb-6 bg-background border border-border p-1 rounded-lg overflow-x-auto flex md:inline-flex shadow-sm">
          <TabsTrigger value="matching" className="flex-1 py-3 data-[state=active]:bg-adept data-[state=active]:text-white">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Job Matching
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 py-3 data-[state=active]:bg-adept data-[state=active]:text-white">
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
