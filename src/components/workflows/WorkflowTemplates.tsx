
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, Play, UserCheck, Users, Check, FileCheck, ShoppingCart, Briefcase } from "lucide-react";

interface WorkflowTemplatesProps {
  onSelectTemplate: () => void;
}

interface TemplateProps {
  icon: React.ElementType;
  name: string;
  description: string;
  steps: number;
  category: string;
  popular?: boolean;
}

const templates: TemplateProps[] = [
  {
    icon: UserCheck,
    name: "Employee Onboarding",
    description: "Complete workflow for welcoming and setting up new employees",
    steps: 8,
    category: "HR",
    popular: true
  },
  {
    icon: FileCheck,
    name: "Document Approval",
    description: "Multi-stage document review and sign-off process",
    steps: 4,
    category: "Administrative",
    popular: true
  },
  {
    icon: ShoppingCart,
    name: "Purchase Request",
    description: "Structured approval chain for purchase requests",
    steps: 5,
    category: "Finance"
  },
  {
    icon: Clock,
    name: "Time Off Request",
    description: "Request and approval workflow for employee time off",
    steps: 3,
    category: "HR"
  },
  {
    icon: Users,
    name: "Training Approval",
    description: "Request and approval process for employee training",
    steps: 4,
    category: "Learning & Development"
  },
  {
    icon: Briefcase,
    name: "Client Onboarding",
    description: "Process for setting up new clients in your systems",
    steps: 6,
    category: "Sales"
  }
];

const TemplateCard: React.FC<TemplateProps & { onSelect: () => void }> = ({ 
  icon: Icon, name, description, steps, category, popular, onSelect 
}) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            {popular && (
              <Badge variant="secondary" className="ml-auto">Popular</Badge>
            )}
          </div>
          <h3 className="text-lg font-medium mb-1">{name}</h3>
          <p className="text-gray-500 text-sm mb-2">{description}</p>
          <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
            {category}
          </Badge>
        </div>
        <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{steps} steps</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4 mr-1" /> Preview
            </Button>
            <Button size="sm" onClick={onSelect}>
              <Play className="h-4 w-4 mr-1" /> Use
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WorkflowTemplates: React.FC<WorkflowTemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium">Workflow Templates</h2>
          <p className="text-gray-500">Start with a pre-built workflow template</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, i) => (
          <TemplateCard 
            key={i} 
            {...template} 
            onSelect={onSelectTemplate} 
          />
        ))}
      </div>
    </div>
  );
};

export default WorkflowTemplates;
