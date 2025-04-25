
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, Zap } from "lucide-react";

const TalentMatchingHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-6 px-4 mb-6 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Talent Matchmaking
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionize your hiring process with our advanced AI matching algorithm that finds the perfect candidates for any job description.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {benefits.slice(0, 3).map((benefit, index) => (
              <Card key={index} className="p-4 transition-all hover:shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 bg-indigo-100 rounded-full mb-3">
                    <benefit.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const benefits = [
  {
    title: "Faster Hiring Process",
    description: "Reduce time-to-hire by automating candidate matching and screening.",
    icon: Clock
  },
  {
    title: "Cost Reduction",
    description: "Lower recruitment costs by eliminating manual screening process.",
    icon: DollarSign
  },
  {
    title: "Higher Quality Matches",
    description: "Our AI algorithm identifies the best candidates based on multiple factors.",
    icon: Zap
  }
];

export default TalentMatchingHero;
