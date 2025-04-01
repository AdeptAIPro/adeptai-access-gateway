
import { AgentTask, AgentTaskType } from '../types/AgenticTypes';
import { processTalentMatchingTask } from "../talent/TalentMatchingAgenticService";
import { processPayrollTask } from '../payroll/PayrollAgenticService';
import { processCrossSourceTalentIntelligenceTask } from '../talent/CrossSourceTalentIntelligenceService';

const processAgentTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing task ${task.id} of type ${task.taskType}`);
  
  switch (task.taskType) {
    case "talent-matching":
      return await processTalentMatchingTask(task);
      
    case "payroll-processing":
      return await processPayrollTask(task);
      
    case "cross-source-talent-intelligence":
      return await processCrossSourceTalentIntelligenceTask(task);
      
    default:
      return processGenericTask(task);
  }
};

const processGenericTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing generic task: ${task.id}`);
  
  // Mark task as processing
  const updatedTask = { ...task, status: "processing" as const };
  
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple result for generic tasks
    return {
      ...updatedTask,
      status: "completed",
      result: {
        message: `Task ${task.id} completed successfully.`,
        completedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error(`Error processing generic task: ${error}`);
    return {
      ...updatedTask,
      status: "failed",
      error: `Failed to process task: ${error}`
    };
  }
};

export { processAgentTask };
