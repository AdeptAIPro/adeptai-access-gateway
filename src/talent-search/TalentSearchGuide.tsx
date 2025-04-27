
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Step } from "@/components/talent-matching/guide/types";
import { Search, Filter, BookOpen, Database, User, Download } from "@/utils/lucide-polyfill";

interface TalentSearchGuideProps {
  steps?: Step[];
}

const TalentSearchGuide: React.FC<TalentSearchGuideProps> = ({ steps }) => {
  const defaultSteps: Step[] = [
    {
      icon: Search,
      title: "Search Effectively",
      description: "Use our powerful search features to find the right talent",
      points: [
        "Use keywords related to skills and experience",
        "Add location filters to find local talent",
        "Include industry-specific terms for better results"
      ]
    },
    {
      icon: Filter,
      title: "Filter Results",
      description: "Narrow down candidates with advanced filters",
      points: [
        "Filter by years of experience and education level",
        "Use salary range filters to match your budget",
        "Filter by availability and employment preferences"
      ]
    },
    {
      icon: BookOpen,
      title: "Review Profiles",
      description: "Analyze candidate profiles thoroughly",
      points: [
        "Check for skill relevance and experience",
        "Review portfolio work and past projects",
        "Note certifications and specialized training"
      ]
    },
    {
      icon: Database,
      title: "Save Searches",
      description: "Save your searches for future reference",
      points: [
        "Create named searches for different positions",
        "Set up alerts for new matching candidates",
        "Share saved searches with your team"
      ]
    }
  ];

  const stepsToShow = steps || defaultSteps;

  return (
    <Card className="border-0 bg-gradient-to-b from-blue-50 to-white shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-primary text-white p-2 rounded-full mb-3">
            <User className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Talent Search Guide</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Follow these steps to find and connect with the perfect candidates for your positions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stepsToShow.map((step, index) => (
            <div 
              key={index} 
              className="border border-gray-100 bg-white rounded-lg p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    {React.createElement(step.icon, { className: "h-5 w-5 text-primary" })}
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium">Step {index + 1}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{step.description}</p>
                
                <div className="mt-auto">
                  <ul className="space-y-2">
                    {step.points.map((point, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start">
                        <div className="bg-primary/10 rounded-full p-1 mr-2 flex-shrink-0 mt-0.5">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <button className="flex items-center text-sm text-primary font-medium hover:underline">
            <Download className="h-4 w-4 mr-1" />
            Download Complete Talent Search Guide PDF
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentSearchGuide;
