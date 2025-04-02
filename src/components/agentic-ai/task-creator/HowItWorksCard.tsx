
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorksCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How It Works</CardTitle>
        <CardDescription>Understanding the Agentic AI workflow</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">1. Select Task Type</h3>
          <p className="text-sm text-muted-foreground">
            Choose the type of task you want the AI to perform based on your needs.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">2. Choose an Agent</h3>
          <p className="text-sm text-muted-foreground">
            Select an AI agent that specializes in the task type you've selected.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">3. Define Your Goal</h3>
          <p className="text-sm text-muted-foreground">
            Clearly describe what you want the AI to accomplish with specific details.
          </p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">4. Monitor Progress</h3>
          <p className="text-sm text-muted-foreground">
            Track your task's status and review results in the dashboard tab.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorksCard;
