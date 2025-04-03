
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AgentTask } from '@/services/agentic-ai/AgenticService';
import { FileDown, RefreshCcw, Star, Copy, Share2, Loader } from 'lucide-react';
import { toast } from 'sonner';
import AgenticErrorHandler from '../AgenticErrorHandler';
import StateHandler from '@/components/shared/StateHandler';

interface TaskResultDisplayProps {
  task: AgentTask;
  isLoading?: boolean;
  onRetry?: () => void;
  onSave?: () => void;
  onExport?: () => void;
}

const EnhancedTaskResultDisplay: React.FC<TaskResultDisplayProps> = ({
  task,
  isLoading = false,
  onRetry,
  onSave,
  onExport
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'json' | 'text'>('pdf');
  const [resultSections, setResultSections] = useState<Record<string, string>>({});
  
  // Parse result into sections if it's a JSON string
  useEffect(() => {
    if (task.result && typeof task.result === 'string') {
      try {
        const parsedResult = JSON.parse(task.result);
        if (typeof parsedResult === 'object' && !Array.isArray(parsedResult)) {
          setResultSections(parsedResult);
        }
      } catch (e) {
        // If not valid JSON, treat as plain text
        setResultSections({ result: task.result });
      }
    }
  }, [task.result]);
  
  // Copy result to clipboard
  const handleCopy = () => {
    if (task.result) {
      navigator.clipboard.writeText(typeof task.result === 'string' ? task.result : JSON.stringify(task.result, null, 2));
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Export the results
  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }
    
    // Fallback if no export handler provided
    if (task.result) {
      const resultText = typeof task.result === 'string' ? task.result : JSON.stringify(task.result, null, 2);
      const blob = new Blob([resultText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `task-result-${task.id}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Results exported successfully");
    }
  };
  
  // Handle saving/favoriting
  const handleSave = () => {
    if (onSave) {
      onSave();
      toast.success("Task result saved successfully");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Processing Task</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Processing your task...</p>
          <p className="text-sm text-muted-foreground mt-1">This may take a few moments</p>
        </CardContent>
      </Card>
    );
  }
  
  // Show error state
  if (task.status === 'failed') {
    return (
      <AgenticErrorHandler
        error={task.error || "Task processing failed without a specific error message."}
        onRetry={onRetry}
        title="Task Failed"
      />
    );
  }

  // Show incomplete state
  if (task.status !== 'completed' || !task.result) {
    return (
      <StateHandler
        isError={true}
        error="Task hasn't been completed yet or no results are available."
        onRetry={onRetry}
      >
        <div></div> {/* This won't render because isError is true */}
      </StateHandler>
    );
  }

  // Render completed task result
  return (
    <Card className="border-success/30 bg-success/5">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{task.title || "Task Result"}</CardTitle>
          <Badge variant="success">Completed</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Show as sections if parsed as JSON object, otherwise as single result */}
          {Object.keys(resultSections).length > 0 ? (
            Object.entries(resultSections).map(([key, value], index) => (
              <div key={key}>
                {index > 0 && <Separator className="my-4" />}
                <h3 className="text-sm font-medium mb-2 capitalize">{key.replace(/_/g, ' ')}</h3>
                <div className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-md">
                  {value}
                </div>
              </div>
            ))
          ) : (
            <div className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-md">
              {typeof task.result === 'string' ? task.result : JSON.stringify(task.result, null, 2)}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <div className="flex gap-2">
          <Button onClick={handleCopy} size="sm" variant="outline">
            <Copy className="h-4 w-4 mr-1" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button onClick={handleExport} size="sm" variant="outline">
            <FileDown className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
        <div className="flex gap-2">
          {onRetry && (
            <Button onClick={onRetry} size="sm" variant="outline">
              <RefreshCcw className="h-4 w-4 mr-1" />
              Run Again
            </Button>
          )}
          {onSave && (
            <Button onClick={handleSave} size="sm">
              <Star className="h-4 w-4 mr-1" />
              Save Result
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedTaskResultDisplay;
