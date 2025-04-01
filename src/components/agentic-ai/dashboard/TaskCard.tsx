
import React from 'react';
import { AgentTask } from '@/services/agentic-ai/AgenticService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Loader2 } from 'lucide-react';

interface TaskCardProps {
  task: AgentTask;
  onProcess: () => void;
  isProcessing: boolean;
}

const TaskCard = ({ task, onProcess, isProcessing }: TaskCardProps) => {
  const statusColors = {
    'pending': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'failed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  
  const priorityColors = {
    'low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'medium': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'high': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{formatTaskType(task.taskType)}</CardTitle>
            <CardDescription className="mt-1">{task.goal}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
            <Badge className={statusColors[task.status]}>{task.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {task.status === 'in-progress' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Processing</span>
              <span className="text-sm text-muted-foreground">Working...</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        )}
        
        {task.result && (
          <div className="border rounded-md p-2 bg-muted/30 text-sm">
            <div>
              <strong>Result Summary:</strong> {Object.keys(task.result).length} items processed
            </div>
          </div>
        )}
        
        {task.error && (
          <div className="border border-red-200 rounded-md p-2 bg-red-50 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900">
            <div><strong>Error:</strong> {task.error}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="text-xs text-muted-foreground">
          Created {new Date(task.createdAt).toLocaleString()}
        </div>
        
        {task.status === 'pending' && (
          <Button 
            size="sm" 
            onClick={onProcess}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Now
              </>
            )}
          </Button>
        )}
        
        {task.status === 'completed' && (
          <Button size="sm" variant="outline">View Results</Button>
        )}
        
        {task.status === 'failed' && (
          <Button size="sm" variant="outline" onClick={onProcess}>Retry</Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Helper to format task type for display
export const formatTaskType = (taskType: string): string => {
  switch (taskType) {
    case 'talent-search':
      return 'Talent Search';
    case 'talent-matching':
      return 'Talent Matching';
    case 'payroll-processing':
      return 'Payroll Processing';
    case 'integration-setup':
      return 'Integration Setup';
    case 'skills-recommendation':
      return 'Skills Recommendation';
    case 'analytics-insight':
      return 'Analytics Insight';
    case 'compliance-check':
      return 'Compliance Check';
    case 'onboarding-customization':
      return 'Onboarding Customization';
    default:
      return taskType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
};

export default TaskCard;
