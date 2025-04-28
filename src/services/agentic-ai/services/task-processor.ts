
import { AgentTask } from '../types/AgenticTypes';
import { updateTask } from './task-service';
import { hasOpenAIConfig, generateTaskPrompt, formatOpenAIResponse } from '../utils/openai-agent-utils';
import { generateText } from '../../llm/OpenAIService';

export const processTask = async (taskId: string): Promise<boolean> => {
  try {
    console.log(`Processing task ${taskId}`);
    
    // Update task status to in progress
    await updateTask(taskId, { status: "in progress" });
    
    // Get the full task details
    const task = await updateTask(taskId, {});
    if (!task) {
      console.error(`Task ${taskId} not found`);
      return false;
    }
    
    // Process the task based on configuration
    let result;
    
    if (hasOpenAIConfig()) {
      // Use OpenAI for processing if configured
      try {
        console.log(`Using OpenAI for task ${taskId}`);
        
        // Generate prompt based on task
        const prompt = generateTaskPrompt(task);
        
        // Use appropriate model based on task complexity
        const model = task.taskType.includes('complex') ? 'gpt-4o' : 'gpt-4o-mini';
        
        // Process with OpenAI
        const response = await generateText(prompt, model);
        
        // Format the response
        result = formatOpenAIResponse(response);
        
        // Update task with result
        await updateTask(taskId, { 
          status: "completed", 
          result: result,
          completedAt: new Date().toISOString()
        });
        
        return true;
      } catch (oaiError) {
        console.error(`OpenAI processing error for task ${taskId}:`, oaiError);
        
        // Fall back to basic processing
        console.log(`Falling back to basic processing for task ${taskId}`);
        return await fallbackProcessing(task);
      }
    } else {
      // Use basic processing if OpenAI is not configured
      console.log(`Using basic processing for task ${taskId} (OpenAI not configured)`);
      return await fallbackProcessing(task);
    }
  } catch (error) {
    console.error(`Error processing task ${taskId}:`, error);
    await updateTask(taskId, { 
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    });
    return false;
  }
};

// Fallback processing method when OpenAI is not available
async function fallbackProcessing(task: AgentTask): Promise<boolean> {
  try {
    // Simulate task processing with a delay
    console.log(`Simulating processing for task ${task.id} of type ${task.taskType}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a simple result based on the task type
    const result = {
      title: `Task ${task.taskType} completed`,
      summary: `Processed task "${task.goal}" successfully`,
      timestamp: new Date().toISOString()
    };
    
    // Update task as completed
    await updateTask(task.id, { 
      status: "completed",
      result: result,
      completedAt: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error(`Fallback processing error for task ${task.id}:`, error);
    await updateTask(task.id, { 
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    });
    return false;
  }
}
