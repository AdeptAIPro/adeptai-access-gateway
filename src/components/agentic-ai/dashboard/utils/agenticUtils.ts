
import { AgentTask } from '@/services/agentic-ai/AgenticService';

export const groupTasksByType = (tasks: AgentTask[]): Record<string, AgentTask[]> => {
  return tasks.reduce((acc: Record<string, AgentTask[]>, task) => {
    if (!acc[task.taskType]) {
      acc[task.taskType] = [];
    }
    acc[task.taskType].push(task);
    return acc;
  }, {});
};

export const filterTasksByStatus = (tasks: AgentTask[], status: AgentTask['status']): AgentTask[] => {
  return tasks.filter(task => task.status === status);
};
