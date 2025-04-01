
import { AgentTask } from '../types/AgenticTypes';
import agenticDatabaseService from '../database/AgenticDatabaseService';

export class TaskProcessorService {
  // Process a specific task based on its type
  public async processTask(taskId: string): Promise<boolean> {
    try {
      // Get the task
      const task = await agenticDatabaseService.getTaskById(taskId);
      
      if (!task) {
        console.error('Task not found:', taskId);
        return false;
      }
      
      // Update task to in-progress
      await agenticDatabaseService.updateTaskStatus(taskId, 'in-progress');
      
      // Process the task based on type
      let result: any = null;
      let processError: string | undefined = undefined;
      
      try {
        // Route to appropriate service based on task type
        switch (task.taskType) {
          case 'talent-search':
            const talentService = await import('../talent/TalentSearchAgenticService');
            result = await talentService.processTalentSearchTask(task);
            break;
          case 'talent-matching':
            const matchingService = await import('../talent/TalentMatchingAgenticService');
            result = await matchingService.processTalentMatchingTask(task);
            break;
          case 'payroll-processing':
            const payrollService = await import('../payroll/PayrollAgenticService');
            result = await payrollService.processPayrollTask(task);
            break;
          // Add other task types as needed
          default:
            throw new Error(`Unsupported task type: ${task.taskType}`);
        }
      } catch (e: any) {
        processError = e.message || 'Unknown error occurred';
        await agenticDatabaseService.updateTaskStatus(taskId, 'failed', null, processError);
        return false;
      }
      
      // Update task to completed with result
      await agenticDatabaseService.updateTaskStatus(taskId, 'completed', result);
      return true;
    } catch (error) {
      console.error('Error processing task:', error);
      return false;
    }
  }
}

export default new TaskProcessorService();
