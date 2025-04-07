
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Briefcase, Users, DollarSign, Zap, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MarketInsights: React.FC = () => {
  // Sample data for the market insights
  const topSkills = [
    { name: "React", value: 85 },
    { name: "JavaScript", value: 80 },
    { name: "Python", value: 75 },
    { name: "AWS", value: 70 },
    { name: "TypeScript", value: 65 }
  ];

  const salaryRanges = [
    { range: "$0-$50K", percentage: 10 },
    { range: "$50K-$100K", percentage: 35 },
    { range: "$100K-$150K", percentage: 40 },
    { range: "$150K-$200K", percentage: 12 },
    { range: "$200K+", percentage: 3 }
  ];

  const jobTypes = [
    { type: "Full-time", percentage: 65 },
    { type: "Contract", percentage: 20 },
    { type: "Part-time", percentage: 10 },
    { type: "Internship", percentage: 5 }
  ];

  const locations = [
    { location: "Remote", percentage: 45 },
    { location: "New York", percentage: 15 },
    { location: "San Francisco", percentage: 12 },
    { location: "Austin", percentage: 8 },
    { location: "Seattle", percentage: 7 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Talent Market Insights</h2>
      <p className="text-gray-600">
        Explore current job market trends, in-demand skills, and salary information to help guide your career or hiring decisions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most In-Demand Skills */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Zap className="h-5 w-5 mr-2 text-amber-500" />
              Most In-Demand Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Salary Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              Salary Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryRanges.map((range) => (
                <div key={range.range}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{range.range}</span>
                    <span className="text-sm text-gray-500">{range.percentage}%</span>
                  </div>
                  <Progress value={range.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Types */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
              Job Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobTypes.map((jobType) => (
                <div key={jobType.type}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{jobType.type}</span>
                    <span className="text-sm text-gray-500">{jobType.percentage}%</span>
                  </div>
                  <Progress value={jobType.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-500" />
              Top Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locations.map((loc) => (
                <div key={loc.location}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{loc.location}</span>
                    <span className="text-sm text-gray-500">{loc.percentage}%</span>
                  </div>
                  <Progress value={loc.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-500" />
            Talent Marketplace Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10 space-y-6">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2,500+</div>
                <div className="text-sm text-gray-500">Active Employers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15,000+</div>
                <div className="text-sm text-gray-500">Active Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">5,000+</div>
                <div className="text-sm text-gray-500">Jobs Posted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">85%</div>
                <div className="text-sm text-gray-500">Placement Rate</div>
              </div>
            </div>
            
            <div className="w-full max-w-lg text-center mt-8">
              <p className="text-gray-600">
                Our AI-powered talent matching has helped thousands of companies 
                find the right talent, with a 85% success rate in placements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketInsights;
