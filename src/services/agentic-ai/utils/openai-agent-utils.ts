
import { AgentTask } from '../types/AgenticTypes';
import { getEnvVar } from './db-utils';

// Check if OpenAI API key is available
export const hasOpenAIConfig = (): boolean => {
  const apiKey = getEnvVar('OPENAI_API_KEY', '');
  return apiKey.length > 0;
};

// Generate prompt from task
export const generateTaskPrompt = (task: AgentTask): string => {
  const { taskType, goal, agent } = task;
  
  let prompt = `You are an AI agent responsible for ${agent || 'helping'} with the following task:\n\n`;
  prompt += `Task Type: ${taskType}\n`;
  prompt += `Goal: ${goal}\n\n`;
  prompt += `Please provide a detailed solution to this task. Be thorough and provide step-by-step guidance if appropriate.`;
  
  return prompt;
};

// Format OpenAI response
export const formatOpenAIResponse = (response: any): any => {
  try {
    if (typeof response === 'string') {
      // Try to parse as JSON if it looks like JSON
      if (response.trim().startsWith('{') || response.trim().startsWith('[')) {
        return JSON.parse(response);
      }
      return { text: response };
    }
    return response;
  } catch (error) {
    console.error('Error formatting OpenAI response:', error);
    return { text: response.toString(), error: 'Failed to format response' };
  }
};
