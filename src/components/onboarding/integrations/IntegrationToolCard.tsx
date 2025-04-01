
import React from "react";
import { Check, Puzzle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OnboardingTool } from "@/services/onboarding/OnboardingService";

interface IntegrationToolCardProps {
  tool: OnboardingTool;
  isSelected: boolean;
  onClick: () => void;
}

const IntegrationToolCard: React.FC<IntegrationToolCardProps> = ({
  tool,
  isSelected,
  onClick
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="rounded-md p-1 bg-primary/10 flex items-center justify-center">
            <Puzzle className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base">{tool.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2 text-xs text-muted-foreground">
        {tool.description}
      </CardContent>
      <CardFooter className="px-4 py-2 flex justify-between items-center">
        <Badge variant="outline">{tool.category}</Badge>
        {isSelected && (
          <Check className="h-4 w-4 text-primary" />
        )}
      </CardFooter>
    </Card>
  );
};

export default IntegrationToolCard;
