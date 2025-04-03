
import React from 'react';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw, Save, Share2 } from 'lucide-react';

interface EnhancedTaskResultDisplayProps {
  task: AgentTask;
  isLoading: boolean;
  onRetry: () => void;
  onSave: () => void;
  onExport?: () => void;
}

const EnhancedTaskResultDisplay: React.FC<EnhancedTaskResultDisplayProps> = ({
  task,
  isLoading,
  onRetry,
  onSave,
  onExport
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Processing task...</p>
        </CardContent>
      </Card>
    );
  }

  if (task.status === 'failed') {
    return (
      <Card className="border-destructive/40 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-destructive">Task Failed</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="mb-4">The task could not be completed due to an error:</p>
          <div className="bg-background/80 p-4 rounded-md border border-destructive/30 text-sm font-mono">
            {task.error || "Unknown error occurred"}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10" onClick={onRetry}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry Task
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (task.status === 'completed' && task.result) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{task.title || "Task Results"}</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="mb-4">
            {typeof task.result === 'string' ? (
              <p>{task.result}</p>
            ) : (
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
                {JSON.stringify(task.result, null, 2)}
              </pre>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Result
          </Button>
          {onExport && (
            <Button variant="outline" onClick={onExport}>
              <Share2 className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-muted-foreground">
          {task.status === 'pending' ? 
            "This task is pending. Click 'Process Task' to start processing." :
            task.status === 'in-progress' || task.status === 'processing' ? 
              "Task is currently being processed..." : 
              "No results available yet for this task."}
        </p>
      </CardContent>
    </Card>
  );
};

export default EnhancedTaskResultDisplay;
