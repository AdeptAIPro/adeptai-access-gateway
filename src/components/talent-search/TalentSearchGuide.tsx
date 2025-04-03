
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Send, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TalentSearchStep {
  icon: React.ElementType;
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
                : "Follow these simple steps to find your ideal candidates efficiently"}
            </p>
            
            {useAgenticIntelligence && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  Cross-Source Verification
                </Badge>
                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  Intelligent Candidate Matching
                </Badge>
                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  Automated Skill Assessment
                </Badge>
                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  Candidate Insights
                </Badge>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="border border-indigo-100 dark:border-indigo-900/30 bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-md transition-all"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex items-center space-x-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-md">
                      <step.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                      Step {index + 1}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{step.description}</p>
                  
                  <div className="mt-auto">
                    <ul className="space-y-2">
                      {step.points.map((point, i) => (
                        <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-1 mr-2 flex-shrink-0 mt-0.5">
                            <div className="h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
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
        </CardContent>
      </div>
    </Card>
  );
};

export default TalentSearchGuide;
