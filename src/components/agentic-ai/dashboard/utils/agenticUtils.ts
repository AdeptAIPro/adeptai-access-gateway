
import { AgentTask } from '@/services/agentic-ai/AgenticService';

export const groupTasksByType = (tasks: AgentTask[]): Record<string, AgentTask[]> => {
  return tasks.reduce((acc: Record<string, AgentTask[]>, task) => {
    const taskType = task.taskType || 'unknown';
    if (!acc[taskType]) {
      acc[taskType] = [];
    }
    acc[taskType].push(task);
    return acc;
  }, {});
};

export const filterTasksByStatus = (tasks: AgentTask[], status: AgentTask['status']): AgentTask[] => {
  return tasks.filter(task => task.status === status);
};
