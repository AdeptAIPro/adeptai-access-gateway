
import React from "react";
import { Puzzle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OnboardingTool } from "@/services/onboarding/OnboardingService";

interface ConnectedToolCardProps {
  tool: OnboardingTool;
  onConfigure?: () => void;
}

const ConnectedToolCard: React.FC<ConnectedToolCardProps> = ({
  tool,
  onConfigure
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md p-1.5 bg-green-100 flex items-center justify-center">
              <Puzzle className="h-4 w-4 text-green-600" />
            </div>
            <CardTitle className="text-base">{tool.name}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-600">Connected</Badge>
        </div>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Badge variant="secondary">{tool.category}</Badge>
        <Button variant="ghost" size="sm" className="text-xs" onClick={onConfigure}>
          Configure
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectedToolCard;
