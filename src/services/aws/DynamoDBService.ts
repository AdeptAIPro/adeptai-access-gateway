
import { AgentTask } from '../agentic-ai/types/AgenticTypes';

// Mock database for storing tasks
const taskDatabase: Record<string, AgentTask> = {};

/**
 * Updates the status of a task in the database
 * @param taskId The ID of the task to update
 * @param status The new status of the task
 * @param result Optional result data to store
 * @param error Optional error message to store
 */
export const updateTaskStatus = async (
  taskId: string, 
  status: AgentTask['status'],
  result?: any,
  error?: string
): Promise<void> => {
  // Check if the task exists
  if (!taskDatabase[taskId]) {
    console.error(`Task ${taskId} not found`);
    throw new Error(`Task ${taskId} not found`);
  }

  // Update the task status and other fields
  taskDatabase[taskId] = {
    ...taskDatabase[taskId],
    status,
    updatedAt: new Date().toISOString()
  };

  // Add result if provided
  if (result) {
    taskDatabase[taskId].result = result;
  }

  // Add error if provided
  if (error) {
    taskDatabase[taskId].error = error;
  }

  // Add completedAt timestamp if task is completed
  if (status === 'completed') {
    taskDatabase[taskId].completedAt = new Date().toISOString();
  }

  console.log(`Task ${taskId} status updated to ${status}`);
};

/**
 * Gets a task by ID from the database
 * @param taskId The ID of the task to retrieve
 * @returns The task object if found, null otherwise
 */
export const getTaskById = async (taskId: string): Promise<AgentTask | null> => {
  return taskDatabase[taskId] || null;
};

/**
 * Creates a new task in the database
 * @param task The task object to create
 * @returns The created task
 */
export const createTask = async (task: Partial<AgentTask>): Promise<AgentTask> => {
  const taskId = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  const newTask: AgentTask = {
    id: taskId,
    taskType: task.taskType || 'cv-analysis',
    title: task.title || '',
    goal: task.goal || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    params: task.params || {},
    agent: task.agent,
    ...(task.result && { result: task.result })
  };

  taskDatabase[taskId] = newTask;
  console.log(`Task ${taskId} created`);
  return newTask;
};

/**
 * Gets all tasks from the database
 * @returns Array of all tasks
 */
export const getAllTasks = async (): Promise<AgentTask[]> => {
  return Object.values(taskDatabase);
};

/**
 * Deletes a task from the database
 * @param taskId The ID of the task to delete
 * @returns True if successful, false otherwise
 */
export const deleteTask = async (taskId: string): Promise<boolean> => {
  if (!taskDatabase[taskId]) {
    return false;
  }

  delete taskDatabase[taskId];
  console.log(`Task ${taskId} deleted`);
  return true;
};
