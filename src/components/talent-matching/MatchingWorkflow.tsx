
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Cog, Play, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchingWorkflowProps {
  isStarted?: boolean;
  isProcessing?: boolean;
  isComplete?: boolean;
  currentStep?: number;
  progress?: number;
  progressText?: string;
  showAdvancedOptions?: boolean;
  setShowAdvancedOptions?: (show: boolean) => void;
  onStartMatching?: () => void;
  onCancel?: () => void;
  isReadyToStart?: boolean;
}

const MatchingWorkflow: React.FC<MatchingWorkflowProps> = ({
  isStarted = false,
  isProcessing = false,
  isComplete = false,
  currentStep = 1,
  progress = 0,
  progressText = "",
  showAdvancedOptions = false,
  setShowAdvancedOptions = () => {},
  onStartMatching = () => {},
  onCancel = () => {},
  isReadyToStart = false,
}) => {
  return (
    <Card className="p-4">
      <div className={cn("flex justify-between items-center", isProcessing && "mb-4")}>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center font-normal text-muted-foreground hover:text-foreground"
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          <Cog className="h-4 w-4 mr-2" />
          Advanced Options
          {showAdvancedOptions ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>

        <div className="flex items-center gap-2">
          {isProcessing ? (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onStartMatching}
              disabled={!isReadyToStart}
              className={cn(
                "bg-adept hover:bg-adept/90",
                !isReadyToStart && "opacity-50 cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Matching
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MatchingWorkflow;
