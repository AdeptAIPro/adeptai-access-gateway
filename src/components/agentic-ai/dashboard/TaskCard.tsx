
import React, { useMemo } from 'react';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from '@/utils/date-polyfill';
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

const TaskCard = React.memo(({ 
  task, 
  onProcess, 
  isProcessing,
  onRetry,
  onDelete,
  onSave
}: TaskCardProps) => {
  // Memoize the card classes since they depend on task status and processing state
  const cardClasses = useMemo(() => `
    border
    ${task.status === 'failed' ? 'border-destructive/40 bg-destructive/5' : ''}
    ${isProcessing ? 'shadow-md border-primary/30' : ''}
    transition-all hover:shadow-sm
  `, [task.status, isProcessing]);

  // Memoize the formatted time since it only needs to update when task.createdAt changes
  const formattedTime = useMemo(() => (
    task.createdAt ? formatDistanceToNow(new Date(task.createdAt)) : ''
  ), [task.createdAt]);

  return (
    <Card className={cardClasses}>
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
          {formattedTime && (
            <span className="text-xs">
              {formattedTime}
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
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
