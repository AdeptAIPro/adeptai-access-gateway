
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, User, UserCheck, CheckCircle, ArrowRight } from "lucide-react";

const MatchingWorkflow: React.FC = () => {
  return (
    <Card className="my-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Talent Matching Workflow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center max-w-[150px] p-2">
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
  );
};

const steps = [
  {
    title: "Import Job Description",
    description: "Upload, paste or extract job description from various sources",
    icon: FileText
  },
  {
    title: "AI Analysis",
    description: "Our AI analyses the job requirements and skills needed",
    icon: Search
  },
  {
    title: "Match Candidates",
    description: "AI matches the best candidates from our talent pool",
    icon: User
  },
  {
    title: "Verify & Shortlist",
    description: "Review and approve the most suitable candidates",
    icon: UserCheck
  },
  {
    title: "Hire & Onboard",
    description: "Complete the hiring process and start onboarding",
    icon: CheckCircle
  }
];

export default MatchingWorkflow;
