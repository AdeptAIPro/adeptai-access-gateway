
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getLeadPriority } from "@/services/crm/LeadScoringService";

interface LeadScoreIndicatorProps {
  score: number;
  factors?: string[];
  showDetails?: boolean;
}

const LeadScoreIndicator: React.FC<LeadScoreIndicatorProps> = ({ 
  score, 
  factors = [],
  showDetails = false
}) => {
  const priority = getLeadPriority(score);
  
  const getPriorityColor = () => {
    switch(priority) {
      case 'high': return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'medium': return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case 'low': return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${getPriorityColor()} cursor-help`} variant="outline">
            {score} {showDetails && `(${priority} priority)`}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="w-64">
          <div className="space-y-2">
            <p className="font-medium">AI Lead Score: {score}/100</p>
            <p className="text-sm capitalize">{priority} priority lead</p>
            {factors && factors.length > 0 && (
              <>
                <p className="text-xs mt-2 font-medium">Scoring factors:</p>
                <ul className="text-xs list-disc list-inside">
                  {factors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LeadScoreIndicator;
