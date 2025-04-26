
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Clock, Bot, Search } from '@/utils/icon-polyfill';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';

interface TaskResultDisplayProps {
  task: AgentTask;
}

const TaskResultDisplay: React.FC<TaskResultDisplayProps> = ({ task }) => {
  if (!task) return null;
  
  const getTaskIcon = (taskType: string) => {
    switch(taskType) {
      // Using string comparisons since we're updating types
      case 'cv-analysis':
      case 'job-match':
      case 'talent-matching':
        return <Search className="h-4 w-4" />;
      case 'cross-source-talent-intelligence':
        return <Search className="h-4 w-4" />;
      case 'payroll-automation':
      case 'payroll-processing':
        return <Bot className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-amber-600 bg-amber-100';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="flex items-center gap-2">
            {getTaskIcon(task.taskType)}
            Task Result
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`flex items-center gap-1 ${getStatusColor(task.status)}`}
          >
            {getStatusIcon(task.status)}
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Badge>
        </div>
        
        {task.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {task.error}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display task goal */}
        <div>
          <h3 className="font-medium">Task Goal</h3>
          <p className="text-muted-foreground">{task.goal}</p>
        </div>
        
        {/* Only show results if processing is completed */}
        {task.status === 'completed' && task.result && (
          <div>
            <h3 className="font-medium">Results</h3>
            <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
              {typeof task.result === 'string' 
                ? task.result 
                : JSON.stringify(task.result, null, 2)}
            </pre>
          </div>
        )}
        
        {/* Show a message if the task is still processing */}
        {task.status === 'processing' && (
          <div className="text-center py-6">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Processing your request...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskResultDisplay;
