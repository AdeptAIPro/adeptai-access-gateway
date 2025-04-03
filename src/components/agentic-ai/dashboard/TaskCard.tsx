
import React from 'react';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import TaskStatusBadge, { formatTaskType } from './TaskStatusBadge';
import TaskGoalPreview from './TaskGoalPreview';
import TaskErrorDisplay from './TaskErrorDisplay';
import TaskActionButton from './TaskActionButton';
import TaskActionsMenu from './TaskActionsMenu';

interface TaskCardProps {
  task: AgentTask;
  onProcess: () => void;
  isProcessing: boolean;
  onRetry?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onProcess, 
  isProcessing,
  onRetry,
  onDelete,
  onSave
}) => {
  return (
    <Card className={`
      border
      ${task.status === 'failed' ? 'border-destructive/40 bg-destructive/5' : ''}
      ${isProcessing ? 'shadow-md border-primary/30' : ''}
      transition-all hover:shadow-sm
    `}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">
            {task.title || formatTaskType(task.taskType)}
          </CardTitle>
          <TaskActionsMenu 
            status={task.status}
            onRetry={onRetry}
            onSave={onSave}
            onDelete={onDelete}
          />
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
          <div className="flex items-center">
            <div className="mr-2">
              <TaskStatusBadge status={task.status} />
            </div>
            {task.agent && (
              <span className="text-xs">Agent: {task.agent}</span>
            )}
          </div>
          {task.createdAt && (
            <span className="text-xs">
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 pt-0">
        <div className="space-y-2">
          <TaskGoalPreview goal={task.goal} />
          
          {task.error && (
            <TaskErrorDisplay error={task.error} />
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <TaskActionButton 
          status={task.status} 
          isProcessing={isProcessing}
          onAction={task.status === 'failed' && onRetry ? onRetry : onProcess}
        />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
