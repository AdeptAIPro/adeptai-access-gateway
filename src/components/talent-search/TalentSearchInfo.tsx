
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Filter, UserCheck, FileText, BadgeCheck, ArrowRight } from "lucide-react";

const TalentSearchInfo = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-indigo-50 to-white py-8 px-4 rounded-lg mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Intelligent Talent Search
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find the perfect candidates for your roles with our advanced AI-powered search platform. Filter by skills, location, experience, and more.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Search className="h-5 w-5 mr-2 text-indigo-600" />
            Search Workflow
          </CardTitle>
          <CardDescription>
            Follow these steps to find the perfect candidates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center max-w-[180px] p-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                    <step.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <ArrowRight className="text-gray-300 mx-2 hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-indigo-100 rounded-full mb-4">
                  <benefit.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const steps = [
  {
    title: "Define Search Criteria",
    description: "Specify skills, experience, location, and other requirements",
    icon: FileText
  },
  {
    title: "Apply Advanced Filters",
    description: "Use AI filters to narrow down your candidate pool",
    icon: Filter
  },
  {
    title: "Review Candidates",
    description: "Evaluate skills, experience, and fit with your requirements",
    icon: Search
  },
  {
    title: "Select Candidates",
    description: "Choose the best matches for your positions",
    icon: UserCheck
  },
  {
    title: "Contact & Hire",
    description: "Reach out to candidates and complete the hiring process",
    icon: BadgeCheck
  }
];

const benefits = [
  {
    title: "AI-Powered Search",
    description: "Our advanced algorithms help you find the best talent based on your specific requirements.",
    icon: Search
  },
  {
    title: "Rich Candidate Profiles",
    description: "View comprehensive profiles with verified skills, experience, and certifications.",
    icon: UserCheck
  },
  {
    title: "Multi-Source Talent Pool",
    description: "Access candidates from multiple sources including LinkedIn, JobDiva, Ceipal, and more.",
    icon: Filter
  }
];

export default TalentSearchInfo;
