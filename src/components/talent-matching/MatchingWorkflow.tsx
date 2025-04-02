
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Cog, Loader2, Sparkles, Info, CheckCircle2 } from "lucide-react";
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
    <Card className="p-6 border-adept/20 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-slate-50 to-white">
      <div className={cn("flex flex-col md:flex-row md:justify-between md:items-center gap-4", isProcessing && "mb-4")}>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center font-normal text-adept hover:bg-adept/10 border-adept/30"
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          <Cog className="h-4 w-4 mr-2" />
          Advanced Matching Options
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
                "bg-adept hover:bg-adept/90 text-white transition-all px-8 py-6 text-lg",
                isReadyToStart && "animate-pulse duration-700",
                !isReadyToStart && "opacity-50 cursor-not-allowed"
              )}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-6 w-6" />
                  Start AI Matching
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="space-y-2 mt-6">
          <Progress value={progress} className="h-3 bg-gray-200" />
          <div className="flex justify-between items-center text-sm">
            <span className="text-adept font-medium">{progressText}</span>
            <span className="font-bold">{progress}%</span>
          </div>
        </div>
      )}

      {!isProcessing && !isReadyToStart && (
        <div className="mt-4 text-sm text-gray-500 flex items-center">
          <Info className="h-4 w-4 mr-2" />
          Enter a job description to enable AI matching (minimum 50 characters)
        </div>
      )}

      {!isProcessing && isReadyToStart && (
        <div className="mt-4 text-sm text-green-600 flex items-center">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Job description ready for analysis! Click "Start AI Matching" to find candidates.
        </div>
      )}
    </Card>
  );
};

export default MatchingWorkflow;
