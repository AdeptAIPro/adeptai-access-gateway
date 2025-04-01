
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OnboardingWorkflow } from "@/services/onboarding/OnboardingService";
import { Calendar, FileCheck, UserCircle, Puzzle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OnboardingWorkflowCardProps {
  workflow: OnboardingWorkflow;
  onClick: (workflowId: string) => void;
}

const OnboardingWorkflowCard: React.FC<OnboardingWorkflowCardProps> = ({
  workflow,
  onClick
}) => {
  // Calculate due dates
  const pendingSteps = workflow.steps.filter(step => !step.completed);
  const nextDue = pendingSteps.length > 0 ? 
    pendingSteps.reduce((earliest, step) => {
      if (!step.due) return earliest;
      return !earliest || new Date(step.due) < new Date(earliest) ? step.due : earliest;
    }, "") : null;

  return (
    <Card className="hover:shadow-md transition-shadow border-l-4" 
      style={{ 
        borderLeftColor: workflow.sector === 'healthcare' 
          ? '#2563eb' // blue
          : workflow.sector === 'it'
          ? '#7c3aed' // purple
          : '#10b981' // green
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{workflow.title}</CardTitle>
            <CardDescription className="mt-1">{workflow.description}</CardDescription>
          </div>
          <Badge variant={
            workflow.sector === 'healthcare'
              ? 'default'
              : workflow.sector === 'it'
              ? 'secondary'
              : 'outline'
          }>
            {workflow.sector === 'healthcare' ? 'Healthcare' : workflow.sector === 'it' ? 'IT' : 'General'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Progress</span>
              <span className="font-medium">{workflow.progress}%</span>
            </div>
            <Progress value={workflow.progress} className="h-2" />
          </div>
          
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileCheck className="h-4 w-4" />
              <span>{workflow.steps.filter(s => s.completed).length} of {workflow.steps.length} steps completed</span>
            </div>
            
            {workflow.assignee && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserCircle className="h-4 w-4" />
                <span>Assignee: {workflow.assignee}</span>
              </div>
            )}
            
            {nextDue && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Next due: {new Date(nextDue).toLocaleDateString()}</span>
              </div>
            )}

            {workflow.connectedTools && workflow.connectedTools.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Puzzle className="h-4 w-4" />
                      <span>{workflow.connectedTools.length} integration{workflow.connectedTools.length > 1 ? 's' : ''}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold mb-1">Connected tools:</p>
                    <ul className="text-xs">
                      {workflow.connectedTools.map((tool, idx) => (
                        <li key={idx}>{tool}</li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onClick(workflow.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingWorkflowCard;
