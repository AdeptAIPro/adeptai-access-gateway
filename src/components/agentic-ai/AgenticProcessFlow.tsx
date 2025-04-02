
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, BrainCircuit, FileText, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";

const AgenticProcessFlow: React.FC = () => {
  return (
    <Card className="my-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Agentic AI Platform Workflow</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center max-w-[150px] p-2">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <step.icon className="h-6 w-6 text-purple-600" />
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
    title: "Define Task Goal",
    description: "Specify what you want the AI agent to accomplish for you",
    icon: FileText
  },
  {
    title: "Select AI Agent",
    description: "Choose the most appropriate AI agent for your specific task type",
    icon: Bot
  },
  {
    title: "Configure Parameters",
    description: "Provide any additional details or requirements for your task",
    icon: BrainCircuit
  },
  {
    title: "Process Task",
    description: "The AI agent processes your task using its specialized capabilities",
    icon: RefreshCw
  },
  {
    title: "Review Results",
    description: "Evaluate and utilize the output produced by your AI agent",
    icon: CheckCircle
  }
];

export default AgenticProcessFlow;
