
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import TaskStatusBadge from './TaskStatusBadge';
import TaskGoalPreview from './TaskGoalPreview';
import TaskActionButton from './TaskActionButton';
import TaskActionsMenu from './TaskActionsMenu';
import { formatDistanceToNow } from 'date-fns';
import { AgentTask } from '@/services/agentic-ai';

interface TaskCardProps {
  task: AgentTask;
  onProcess: () => void;
  isProcessing: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onProcess, isProcessing }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">
              {task.title || `${task.taskType} Task`}
            </h3>
            <p className="text-xs text-muted-foreground">
              Created {task.createdAt ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }) : 'recently'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <TaskStatusBadge status={task.status} />
            <TaskActionsMenu task={task} />
          </div>
        </div>
        
        <TaskGoalPreview goal={task.goal} />
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 px-4">
        <TaskActionButton 
          status={task.status} 
          isProcessing={isProcessing} 
          onAction={onProcess} 
        />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
