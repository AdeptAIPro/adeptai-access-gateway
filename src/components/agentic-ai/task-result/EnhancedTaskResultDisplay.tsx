
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TaskResultDisplay from "./TaskResultDisplay";
import { AgentTask } from "@/services/agentic-ai/types/AgenticTypes";
import { Progress } from "@/components/ui/progress";
import { RefreshCcw, Download, Save, Clock } from "@/utils/icon-polyfill";

interface EnhancedTaskResultDisplayProps {
  task: AgentTask;
  loading?: boolean;
  onRetry?: () => void;
  onSave?: () => void;
  onExport?: () => void;
}

const EnhancedTaskResultDisplay: React.FC<EnhancedTaskResultDisplayProps> = ({ 
  task, 
  loading = false, 
  onRetry, 
  onSave, 
  onExport 
}) => {
  const [activeTab, setActiveTab] = useState('result');
  
  // Simplify multiple conditional checks
  const isProcessing = task.status === 'processing' || task.status === 'pending' || loading;
  const hasResult = task.status === 'completed' && task.result;
  const hasError = task.status === 'failed' && task.error;
  
  // For progress indicator
  const getProgressValue = () => {
    if (task.status === 'completed') return 100;
    if (task.status === 'failed') return 100;
    if (task.status === 'processing') return 60;
    if (task.status === 'in-progress') return 40;
    return 20; // pending
  };

  return (
    <Card className={`border ${hasError ? 'border-destructive/40' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{task.title || `${task.taskType.charAt(0).toUpperCase() + task.taskType.slice(1).replace(/-/g, " ")} Results`}</CardTitle>
          
          {onSave && hasResult && (
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </div>
        
        {isProcessing && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Processing task...</span>
              <span className="text-xs font-medium">{getProgressValue()}%</span>
            </div>
            <Progress value={getProgressValue()} className="h-1" />
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="rounded-full bg-muted p-4">
              <Clock className="h-8 w-8 animate-pulse text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Processing Your Task</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our AI is analyzing your task. This may take a moment.
              </p>
            </div>
          </div>
        ) : hasError ? (
          <div className="space-y-4">
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              <h3 className="font-medium mb-1">Error Processing Task</h3>
              <p className="text-sm">{task.error}</p>
            </div>
            
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry} className="border-destructive/30 text-destructive hover:bg-destructive/10">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retry Task
              </Button>
            )}
          </div>
        ) : hasResult ? (
          <div className="space-y-4">
            <div className="flex space-x-2 mb-4">
              <Button
                variant={activeTab === 'result' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('result')}
              >
                Results
              </Button>
              <Button
                variant={activeTab === 'raw' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('raw')}
              >
                Raw Data
              </Button>
            </div>
            
            {activeTab === 'result' ? (
              <TaskResultDisplay task={task} />
            ) : (
              <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-96">
                {JSON.stringify(task.result, null, 2)}
              </pre>
            )}
            
            {onExport && (
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-sm text-muted-foreground text-center">
              No results available yet. Start processing the task to see results.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedTaskResultDisplay;
