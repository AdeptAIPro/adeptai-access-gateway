
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Step, StepsGuideProps } from "./types";

const StepsGuide: React.FC<StepsGuideProps> = ({ steps }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900">How to Use AI Talent Matchmaking</h2>
      <p className="text-gray-600 mt-2">Follow these simple steps to find your perfect candidates</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {steps.map((step, index) => (
          <Card key={index} className="border-adept/20 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center mb-2">
                <div className="bg-adept/10 p-2 rounded-full mr-3">
                  <step.icon className="h-5 w-5 text-adept" />
                </div>
                <span className="bg-adept/10 text-adept text-xs font-medium px-2 py-1 rounded-full">Step {index + 1}</span>
              </div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {step.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StepsGuide;
