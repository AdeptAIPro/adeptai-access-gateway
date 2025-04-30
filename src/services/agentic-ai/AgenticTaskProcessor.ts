
import { AgentTask } from './types/AgenticTypes';
import { generateAgenticPlan, executeAgenticPlan } from './planning/PlanExecutor';
import { isOpenAIInitialized } from '../llm/OpenAIService';
import { updateTaskStatus, getTaskById } from '../aws/DynamoDBService';

export const processAgenticTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing agentic task: ${task.id} of type ${task.taskType}`);
  
  if (!isOpenAIInitialized()) {
    console.error("OpenAI is not initialized. Cannot process task.");
    return {
      ...task,
      status: "failed",
      error: { message: "OpenAI is not initialized. Please set your API key." }
    };
  }
  
  try {
    // Mark the task as processing
    await updateTaskStatus(task.id, "processing");
    
    // Generate a plan based on the task type and goal
    const plan = await generateAgenticPlan(task);
    
    // Execute the plan
    const result = await executeAgenticPlan(task, plan);
    
    // Store the results in DynamoDB
    await updateTaskStatus(task.id, "completed", result);
    
    // Return the updated task
    return await getTaskById(task.id) as AgentTask;
  } catch (error) {
    console.error(`Error processing agentic task ${task.id}:`, error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    await updateTaskStatus(
      task.id, 
      "failed", 
      undefined, 
      { message: errorMessage }
    );
    
    return {
      ...task,
      status: "failed",
      error: { message: errorMessage }
    };
  }
};
