
import React, { useState } from "react";
import { OnboardingWorkflow, updateWorkflowStatus } from "@/services/onboarding/OnboardingService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, CheckCircle, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

interface OnboardingWorkflowDetailProps {
  workflow: OnboardingWorkflow;
  clientId: string;
  onBack: () => void;
}

const OnboardingWorkflowDetail: React.FC<OnboardingWorkflowDetailProps> = ({
  workflow,
  clientId,
  onBack
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState<OnboardingWorkflow>(workflow);

  const handleStepToggle = async (stepId: string, completed: boolean) => {
    setIsUpdating(true);
    
    try {
      const success = await updateWorkflowStatus(clientId, workflow.id, stepId, completed);
      
      if (success) {
        // Update local state with the new completion status
        const updatedWorkflow = {
          ...currentWorkflow,
          steps: currentWorkflow.steps.map(step => 
            step.id === stepId 
              ? { ...step, completed } 
              : step
          )
        };
        
        // Recalculate progress
        const completedSteps = updatedWorkflow.steps.filter(s => s.completed).length;
        const totalSteps = updatedWorkflow.steps.length;
        updatedWorkflow.progress = Math.round((completedSteps / totalSteps) * 100);
        
        setCurrentWorkflow(updatedWorkflow);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBack} 
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{currentWorkflow.title}</h2>
          <p className="text-sm text-muted-foreground">{currentWorkflow.description}</p>
        </div>
        
        <Badge variant={
          currentWorkflow.sector === 'healthcare'
            ? 'default'
            : currentWorkflow.sector === 'it'
            ? 'secondary'
            : 'outline'
        }>
          {currentWorkflow.sector === 'healthcare' ? 'Healthcare' : currentWorkflow.sector === 'it' ? 'IT' : 'General'}
        </Badge>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Progress Overview</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>
              {currentWorkflow.steps.filter(s => s.completed).length} of {currentWorkflow.steps.length} steps completed
            </CardDescription>
            <span className="text-sm font-medium">{currentWorkflow.progress}%</span>
          </div>
          <Progress value={currentWorkflow.progress} className="h-2" />
        </CardHeader>
        
        <CardContent className="pt-4">
          <div className="space-y-6">
            {currentWorkflow.steps.map((step) => (
              <div key={step.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="pt-0.5">
                  <Checkbox 
                    id={`step-${step.id}`}
                    checked={step.completed}
                    onCheckedChange={(checked) => {
                      handleStepToggle(step.id, checked === true);
                    }}
                    disabled={isUpdating}
                  />
                </div>
                
                <div className="flex-1">
                  <label
                    htmlFor={`step-${step.id}`}
                    className={`font-medium ${step.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {step.title}
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  
                  {step.due && !step.completed && (
                    <div className="flex items-center gap-1 mt-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Due by {new Date(step.due).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingWorkflowDetail;
