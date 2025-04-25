
import { Card } from "@/components/ui/card";

const RecentSearchesCard = () => {
  return (
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
  );
};

export default RecentSearchesCard;
