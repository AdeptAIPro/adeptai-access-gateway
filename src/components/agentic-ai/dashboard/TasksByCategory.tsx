
import React from 'react';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';
import TaskCard from './TaskCard';
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from 'lucide-react';
import { formatTaskType } from './TaskStatusBadge';

interface TasksByCategoryProps {
  tasksByType: Record<string, AgentTask[]>;
  activeTaskId: string | null;
  processTask: (taskId: string) => void;
}

const TasksByCategory: React.FC<TasksByCategoryProps> = ({ 
  tasksByType, 
  activeTaskId, 
  processTask 
}) => {
  if (Object.entries(tasksByType).length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center pt-6">
          <Bot className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No AI Tasks Yet</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Your AI agents are ready to assist you. Create a new task to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(tasksByType).map(([type, tasks]) => (
        <div key={type} className="space-y-2">
          <h3 className="text-lg font-medium capitalize">{formatTaskType(type)}</h3>
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onProcess={() => processTask(task.id)}
                isProcessing={activeTaskId === task.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksByCategory;
