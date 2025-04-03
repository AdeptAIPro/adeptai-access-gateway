
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plug, Filter, Zap, Link, Settings } from "lucide-react";
import { Step } from "@/components/talent-matching/guide/types";

interface IntegrationsGuideProps {
  steps?: Step[];
}

const IntegrationsGuide: React.FC<IntegrationsGuideProps> = ({ steps }) => {
  const defaultSteps: Step[] = [
    {
      icon: Filter,
      title: "Browse Categories",
      description: "Filter integrations by category to find what you need",
      points: [
        "Use the tabs to switch between integration categories",
        "Search for specific integrations using the search bar",
        "All available integrations are organized by functionality"
      ]
    },
    {
      icon: Link,
      title: "Connect Services",
      description: "Link your external services with our platform",
      points: [
        "Click 'Connect' on any integration card",
        "Follow the authentication flow to grant access",
        "Once connected, the integration becomes active immediately"
      ]
    },
    {
      icon: Settings,
      title: "Configure Settings",
      description: "Customize how each integration works with your data",
      points: [
        "Access additional settings after connecting an integration",
        "Set data synchronization preferences",
        "Control permissions and access levels for each service"
      ]
    },
    {
      icon: Zap,
      title: "Automate Workflows",
      description: "Use connected integrations to automate your processes",
      points: [
        "Create automation rules between integrated systems",
        "Set up triggers and actions for automatic data flow",
        "Monitor automation performance in real-time"
      ]
    }
  ];

  const stepsToShow = steps || defaultSteps;

  return (
    <Card className="border-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800/50 dark:to-gray-900 shadow-sm mb-8">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center bg-blue-500 text-white p-2 rounded-full mb-3">
            <Plug className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Integration Center</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl mx-auto">
            Extend your platform's capabilities by connecting with your favorite tools and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stepsToShow.map((step, index) => (
            <div 
              key={index} 
              className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
                    <step.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                    Step {index + 1}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{step.description}</p>
                
                <div className="mt-auto">
                  <ul className="space-y-2">
                    {step.points.map((point, i) => (
                      <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1 mr-2 flex-shrink-0 mt-0.5">
                          <div className="h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
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
    </Card>
  );
};

export default IntegrationsGuide;
