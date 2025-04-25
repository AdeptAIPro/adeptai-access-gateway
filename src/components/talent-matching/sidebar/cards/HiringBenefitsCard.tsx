
import { Card } from "@/components/ui/card";

const HiringBenefitsCard = () => {
  return (
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
  );
};

export default HiringBenefitsCard;
