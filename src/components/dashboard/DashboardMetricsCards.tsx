
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, UserPlus, ShieldCheck, Zap } from "lucide-react";

const DashboardMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Job Postings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">1,872</span>
            <span className="text-sm text-green-500 font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              +12% from last month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">4,256</span>
            <span className="text-sm text-blue-500 font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              +8% from last month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <UserPlus className="h-5 w-5 mr-2 text-purple-500" />
            New Hires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">342</span>
            <span className="text-sm text-purple-500 font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              +5% from last month
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <ShieldCheck className="h-5 w-5 mr-2 text-adept" />
            Compliance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="text-3xl font-bold">98%</span>
            <span className="text-sm text-adept font-medium flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              +2% from last audit
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetricsCards;
