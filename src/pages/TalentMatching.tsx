
import React from "react";
import PageContainer from "@/components/talent-matching/layout/PageContainer";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import AlertNotification from "@/components/talent-matching/AlertNotification";
import MatchingToolSection from "@/components/talent-matching/MatchingToolSection";
import UserGuide from "@/components/talent-matching/guide/UserGuide";
import { Separator } from "@/components/ui/separator";

const TalentMatching: React.FC = () => {
  return (
    <PageContainer title="AI Talent Matchmaking">
      <TalentMatchingHero />
      <AlertNotification />
      <MatchingToolSection />
      <Separator className="my-12" />
      <UserGuide />
    </PageContainer>
  );
};

export default TalentMatching;
