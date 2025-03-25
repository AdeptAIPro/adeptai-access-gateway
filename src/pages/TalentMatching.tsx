
import React from "react";
import TalentMatchingContainer from "@/components/talent-matching/TalentMatchingContainer";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TalentMatching: React.FC = () => {
  return (
    <>
      <TalentMatchingHero />
      <Tabs defaultValue="matching" className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto mb-6">
          <TabsTrigger value="matching" className="flex-1">AI Job Matching</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1">Performance Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="matching">
          <TalentMatchingContainer />
        </TabsContent>
        <TabsContent value="analytics">
          <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">Talent Matching Analytics</h2>
            <p className="text-muted-foreground mb-8">Analytics dashboard coming soon. Track your matching efficiency, quality of hire metrics, and ROI.</p>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard visualizations will appear here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TalentMatching;
