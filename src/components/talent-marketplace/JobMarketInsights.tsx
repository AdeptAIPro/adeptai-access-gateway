
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Users, DollarSign, Zap, MapPin } from "lucide-react";

interface JobStatsProps {
  total: number;
  byJobType: {
    fullTime: number;
    partTime: number;
    contract: number;
    remote: number;
  };
}

const JobMarketInsights: React.FC<JobStatsProps> = ({ total, byJobType }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Job Market Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Full-time Jobs</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{byJobType.fullTime}</span>
              <Progress value={(byJobType.fullTime / total) * 100} className="h-2" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Part-time Jobs</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{byJobType.partTime}</span>
              <Progress value={(byJobType.partTime / total) * 100} className="h-2" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Contract Jobs</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{byJobType.contract}</span>
              <Progress value={(byJobType.contract / total) * 100} className="h-2" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Remote Jobs</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{byJobType.remote}</span>
              <Progress value={(byJobType.remote / total) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobMarketInsights;
