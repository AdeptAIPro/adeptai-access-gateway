
import { Card } from "@/components/ui/card";
import { TalentMatchingCallToAction } from "@/components/talent-matching";

interface MatchingSidebarProps {
  showPremiumFeaturePrompt: boolean;
  dismissPremiumFeaturePrompt: () => void;
}

const MatchingSidebar = ({ showPremiumFeaturePrompt, dismissPremiumFeaturePrompt }: MatchingSidebarProps) => {
  return (
    <div className="space-y-6">
      {showPremiumFeaturePrompt ? (
        <TalentMatchingCallToAction onDismiss={dismissPremiumFeaturePrompt} />
      ) : (
        <div className="space-y-6">
          <Card className="p-6 bg-indigo-900 text-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-3">How AdeptAI Pro Transforms Hiring</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Reduces time-to-hire by up to 70%
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Improves quality of hire with precise matching
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Eliminates bias with objective AI assessment
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Streamlines the onboarding process
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Recent Searches</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium">Senior Software Engineer</div>
                <div className="text-xs text-gray-500 mt-1">43 candidates • 3 days ago</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium">Product Manager</div>
                <div className="text-xs text-gray-500 mt-1">28 candidates • 5 days ago</div>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 border-blue-100 p-6">
            <h3 className="text-lg font-semibold mb-3">AI Matching Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Use detailed job descriptions
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Include required and preferred skills
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Specify years of experience
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MatchingSidebar;
