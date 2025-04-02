
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import AlertNotification from "@/components/talent-matching/AlertNotification";
import MatchingToolSection from "@/components/talent-matching/MatchingToolSection";
import UserGuide from "@/components/talent-matching/guide/UserGuide";

const TalentMatching: React.FC = () => {
  return (
    <DashboardLayout title="AI Talent Matchmaking">
      <TalentMatchingHero />
      <AlertNotification />
      <MatchingToolSection />
      <UserGuide />
    </DashboardLayout>
  );
};

export default TalentMatching;
