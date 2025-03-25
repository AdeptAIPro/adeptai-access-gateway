
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, Zap, Users, Award, BarChart } from "lucide-react";

const TalentMatchingHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-8 px-4 mb-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Talent Matchmaking
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Revolutionize your hiring process with our advanced AI matching algorithm that finds the perfect candidates for any job description.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 transition-all hover:shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-indigo-100 rounded-full mb-4">
                    <benefit.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="bg-indigo-900 text-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-3">How AdeptAI Pro Transforms Hiring</h2>
              <p className="mb-4">
                Our AI-powered talent matching system analyzes job descriptions and candidate profiles using advanced semantic matching to find the perfect fit for your organization.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reduces time-to-hire by up to 70%</li>
                <li>Improves quality of hire with precise matching</li>
                <li>Eliminates bias with objective AI assessment</li>
                <li>Streamlines the onboarding process</li>
                <li>Integrates with your existing ATS/VMS systems</li>
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                alt="AI-powered hiring" 
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const benefits = [
  {
    title: "Faster Hiring Process",
    description: "Reduce time-to-hire by automating candidate matching and screening, allowing your team to focus on high-value tasks.",
    icon: Clock
  },
  {
    title: "Cost Reduction",
    description: "Lower recruitment costs by eliminating manual screening and reducing the resources needed to find qualified candidates.",
    icon: DollarSign
  },
  {
    title: "Higher Quality Matches",
    description: "Our AI algorithm identifies the best candidates based on skills, experience, and cultural fit factors.",
    icon: Award
  },
  {
    title: "Smoother Onboarding",
    description: "Better matches lead to faster onboarding and higher retention rates, reducing long-term hiring costs.",
    icon: Users
  },
  {
    title: "Increased Productivity",
    description: "AI-matched employees reach full productivity faster, maximizing your return on investment.",
    icon: Zap
  },
  {
    title: "Data-Driven Decisions",
    description: "Gain insights into your hiring process with comprehensive analytics and reporting.",
    icon: BarChart
  }
];

export default TalentMatchingHero;
