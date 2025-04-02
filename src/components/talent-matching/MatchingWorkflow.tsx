
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Cog, Play, Loader2, Sparkles } from "lucide-react";
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
    <Card className="p-4 border-adept/20 shadow-md hover:shadow-lg transition-shadow">
      <div className={cn("flex justify-between items-center", isProcessing && "mb-4")}>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center font-normal text-adept hover:bg-adept/10"
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
            <Button variant="outline" size="sm" onClick={onCancel} className="border-red-300 text-red-500 hover:bg-red-50">
              Cancel
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={onStartMatching}
              disabled={!isReadyToStart}
              className={cn(
                "bg-adept hover:bg-adept/90 text-white transition-all",
                isReadyToStart && "animate-pulse duration-700",
                !isReadyToStart && "opacity-50 cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start AI Matching
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="space-y-2 mt-4">
          <Progress value={progress} className="h-2 bg-gray-200" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-adept font-medium">{progressText}</span>
            <span className="font-bold">{progress}%</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MatchingWorkflow;
