
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";

interface LoadingResultsProps {
  loadingText?: string;
}

const LoadingResults: React.FC<LoadingResultsProps> = ({ 
  loadingText = "Processing AI talent matching..." 
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed min-h-[200px]">
      <Loader className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground text-center">{loadingText}</p>
    </div>
  );
};

export default LoadingResults;
