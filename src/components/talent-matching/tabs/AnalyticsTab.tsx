
import { TalentMatchingCallToAction } from "@/components/talent-matching";

const AnalyticsTab = () => {
  return (
    <div className="flex items-center justify-center bg-gray-50 border rounded-lg p-12">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
        <p className="text-gray-500 mb-6">Get insights into your talent matching activities</p>
        <TalentMatchingCallToAction />
      </div>
    </div>
  );
};

export default AnalyticsTab;
