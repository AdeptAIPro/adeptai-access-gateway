
import { TalentMatchingCallToAction } from "@/components/talent-matching";
import HiringBenefitsCard from "./cards/HiringBenefitsCard";
import RecentSearchesCard from "./cards/RecentSearchesCard";
import MatchingTipsCard from "./cards/MatchingTipsCard";

interface MatchingSidebarProps {
  showPremiumFeaturePrompt: boolean;
  dismissPremiumFeaturePrompt: () => void;
}

const MatchingSidebar = ({ 
  showPremiumFeaturePrompt, 
  dismissPremiumFeaturePrompt 
}: MatchingSidebarProps) => {
  return (
    <div className="space-y-6">
      {showPremiumFeaturePrompt ? (
        <TalentMatchingCallToAction onDismiss={dismissPremiumFeaturePrompt} />
      ) : (
        <div className="space-y-6">
          <HiringBenefitsCard />
          <RecentSearchesCard />
          <MatchingTipsCard />
        </div>
      )}
    </div>
  );
};

export default MatchingSidebar;
