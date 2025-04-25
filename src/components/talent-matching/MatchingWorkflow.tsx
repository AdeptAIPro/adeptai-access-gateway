
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Cog, Loader2, Sparkles, Info, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MatchingOptions } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface MatchingWorkflowProps {
  jobDescription?: string;
  setJobDescription?: (desc: string) => void;
  tab?: string;
  setTab?: (tab: string) => void;
  matchingOptions?: MatchingOptions;
  setMatchingOptions?: (options: MatchingOptions) => void;
  fileUploaded?: File | null;
  setFileUploaded?: (file: File | null) => void;
  error?: string | null;
  setError?: (error: string | null) => void;
  handleStartMatching?: () => void;
  isReadyToStart?: boolean;
  showAdvancedOptions?: boolean;
  setShowAdvancedOptions?: (show: boolean) => void;
  selectedTargetSources?: string[];
  setSelectedTargetSources?: (sources: string[]) => void;
  useCrossSourceIntelligence?: boolean;
  setUseCrossSourceIntelligence?: (use: boolean) => void;
  isStarted?: boolean;
  isProcessing?: boolean;
  isComplete?: boolean;
  currentStep?: number;
  progress?: number;
  progressText?: string;
  onStartMatching?: () => void;
  onCancel?: () => void;
  isPremiumFeature?: boolean;
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
  handleStartMatching,
  isPremiumFeature = false,
}) => {
  // Use handleStartMatching if provided, otherwise use onStartMatching
  const handleStart = handleStartMatching || onStartMatching;

  return (
    <Card className="p-6 border-adept/20 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-slate-50 to-white">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
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
          
          {isPremiumFeature && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-amber-600 text-sm font-medium">
                    <Lock className="h-4 w-4 mr-1" />
                    Premium Feature
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Unlock advanced matching features with our Premium plan.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <Button
          size="lg"
          onClick={handleStart}
          disabled={!isReadyToStart}
          className={cn(
            "w-full bg-adept hover:bg-adept/90 text-white transition-all px-8 py-6 text-lg",
            isReadyToStart && "animate-pulse duration-700",
            !isReadyToStart && "opacity-50 cursor-not-allowed",
            isPremiumFeature && "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
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
              {isPremiumFeature ? "Unlock AI Matching" : "Start AI Matching"}
            </>
          )}
        </Button>

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
        
        {isPremiumFeature && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <h4 className="font-medium text-amber-800 mb-1">Premium Feature Benefits:</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Cross-source intelligence for better matches</li>
              <li>• Advanced AI algorithms with higher accuracy</li>
              <li>• Unlimited candidate searches</li>
              <li>• Priority processing and enhanced insights</li>
            </ul>
            <Button 
              variant="link" 
              className="text-amber-600 hover:text-amber-800 p-0 mt-2 h-auto"
              onClick={() => window.location.href = '/pricing'}
            >
              View Pricing Plans →
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MatchingWorkflow;
