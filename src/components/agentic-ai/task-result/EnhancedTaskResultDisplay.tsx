
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, AlertCircle, Clock } from '@/utils/icon-polyfill';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';

interface TaskResultDisplayProps {
  task: AgentTask;
}

const EnhancedTaskResultDisplay: React.FC<TaskResultDisplayProps> = ({ task }) => {
  if (!task) return null;
  
  const result = task.result || {};
  const { summary, findings, recommendations } = result;
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
      case 'in-progress':
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
      case 'in-progress':
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
          <CardTitle>Task Result</CardTitle>
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
        {/* Only show results if processing is completed */}
        {(task.status === 'completed') && (
          <>
            {summary && (
              <div>
                <h3 className="font-medium text-lg mb-2">Summary</h3>
                <p className="text-muted-foreground">{summary}</p>
              </div>
            )}
            
            {findings && findings.length > 0 && (
              <div>
                <h3 className="font-medium text-lg mb-2">Key Findings</h3>
                <ul className="space-y-2 list-disc pl-5">
                  {findings.map((finding: string, index: number) => (
                    <li key={index} className="text-muted-foreground">{finding}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {recommendations && recommendations.length > 0 && (
              <div>
                <h3 className="font-medium text-lg mb-2">Recommendations</h3>
                <ul className="space-y-2 list-disc pl-5">
                  {recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="text-muted-foreground">{recommendation}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* If there's custom structured data in the result */}
            {result.context && (
              <>
                <Separator />
                <div>
                  <h3 className="font-medium text-lg mb-2">Additional Details</h3>
                  <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
                    {JSON.stringify(result.context, null, 2)}
                  </pre>
                </div>
              </>
            )}
          </>
        )}
        
        {/* Show a message if the task is still processing */}
        {(task.status === 'processing' || task.status === 'in-progress') && (
          <div className="text-center py-6">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">The AI agent is currently working on this task...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedTaskResultDisplay;
