
import React from 'react';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from 'lucide-react';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: AgentTask[];
  activeTaskId: string | null;
  processTask: (taskId: string) => void;
  emptyMessage?: string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  activeTaskId, 
  processTask, 
  emptyMessage = "No AI Tasks Yet" 
}) => {
  if (tasks.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center pt-6">
          <Bot className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">{emptyMessage}</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Your AI agents are ready to assist you. Create a new task to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
};

export default TaskList;
