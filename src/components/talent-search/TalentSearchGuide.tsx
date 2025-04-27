
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Send, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TalentSearchStep {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  points: string[];
}

interface TalentSearchGuideProps {
  onClose?: () => void;
  useAgenticIntelligence?: boolean;
}

const TalentSearchGuide: React.FC<TalentSearchGuideProps> = ({ onClose, useAgenticIntelligence = false }) => {
  const steps: TalentSearchStep[] = [
    {
      icon: BookOpen,
      title: "Define Your Search Criteria",
      description: "Enter the skills and requirements you're looking for",
      points: [
        "Add specific skills candidates should have",
        "Specify location preferences or remote options",
        "Set minimum experience levels to narrow results"
      ]
    },
    {
      icon: Filter,
      title: "Apply Advanced Filters",
      description: "Refine your search with additional parameters",
      points: [
        "Filter by data source to target specific talent pools",
        "Use keyword filters for more precise matching",
        "Toggle cross-source intelligence for wider reach"
      ]
    },
    {
      icon: Search,
      title: "Review Candidates",
      description: "Evaluate matching profiles from search results",
      points: [
        "Browse candidate cards with key information highlighted",
        "View detailed profiles to assess fit with requirements",
        "Compare candidates side-by-side using comparison view"
      ]
    },
    {
      icon: Send,
      title: "Take Action",
      description: "Reach out to promising candidates",
      points: [
        "Contact candidates directly through the platform",
        "Save promising profiles to talent pools for later",
        "Export candidate data for team collaboration"
      ]
    }
  ];

  return (
    <Card className="border-0 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900 shadow-sm overflow-hidden mb-8">
      <div className="relative">
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 z-10"
            onClick={onClose}
          >
            Hide Guide
          </Button>
        )}
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
        
        <CardContent className="p-6 relative z-0">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-indigo-500 text-white p-2 rounded-full mb-3">
              <Search className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {useAgenticIntelligence ? "AI-Enhanced Talent Search" : "Talent Search Guide"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
              {useAgenticIntelligence 
                ? "Leverage AI-powered cross-source intelligence to find the perfect candidates faster" 
                : "Follow these steps to find and connect with the perfect candidates"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="mb-3 flex justify-between">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
                      <StepIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700 font-normal">Step {index + 1}</Badge>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{step.description}</p>
                  <ul className="space-y-2 mt-4">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="h-1.5 w-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default TalentSearchGuide;
