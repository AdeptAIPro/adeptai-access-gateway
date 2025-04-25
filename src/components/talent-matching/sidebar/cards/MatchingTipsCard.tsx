
import { Card } from "@/components/ui/card";

const MatchingTipsCard = () => {
  return (
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
  );
};

export default MatchingTipsCard;
