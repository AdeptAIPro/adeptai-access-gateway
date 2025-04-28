
import { AgentTask } from '../types/AgenticTypes';
import { updateTask } from './task-service';

export const processTask = async (taskId: string): Promise<boolean> => {
  try {
    console.log(`Processing task ${taskId}`);
    await updateTask(taskId, { status: "in progress" });
    
    // Simulate task processing with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update task as completed
    await updateTask(taskId, { status: "completed" });
    return true;
  } catch (error) {
    console.error(`Error processing task ${taskId}:`, error);
    await updateTask(taskId, { status: "failed" });
    return false;
  }
};
