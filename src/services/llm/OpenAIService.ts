
import { ChatCompletionTool } from '../agentic-ai/types/OpenAITypes';

// Tracks whether OpenAI is initialized
let openAIInitialized = false;
let apiKey: string | null = null;

/**
 * Initialize the OpenAI service with an API key
 * @param key OpenAI API key
 */
export const initializeOpenAI = (key: string): void => {
  apiKey = key;
  openAIInitialized = true;
  console.log('OpenAI service initialized');
};

/**
 * Checks if OpenAI has been initialized with an API key
 * @returns True if initialized, false otherwise
 */
export const isOpenAIInitialized = (): boolean => {
  return openAIInitialized;
};

/**
 * Generates text using the OpenAI API
 * @param prompt The prompt for text generation
 * @param model The model to use (default: gpt-4o)
 * @returns Generated text
 */
export const generateText = async (
  prompt: string,
  model: string = 'gpt-4o'
): Promise<string> => {
  if (!openAIInitialized) {
    throw new Error('OpenAI is not initialized. Please set your API key.');
  }

  console.log(`Generating text with model: ${model}`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);
  
  // For demo purposes, return a simple mock response
  return `This is a simulated response from the OpenAI ${model} model.
  
  Since this is a mock implementation without actual API calls to OpenAI,
  we're returning this placeholder text. In a real application, this would
  contain the AI-generated response to your prompt.
  
  Your prompt was: "${prompt.substring(0, 50)}..."`;
};

/**
 * Runs function calling using OpenAI API
 * @param prompt The prompt to send
 * @param tools Array of tools available for function calling
 * @returns Response with content and potential tool calls
 */
export const runFunctionCall = async (
  prompt: string,
  tools?: ChatCompletionTool[]
): Promise<{
  content?: string;
  toolCalls?: Array<{
    function: {
      name: string;
      arguments: string;
    };
  }>;
}> => {
  if (!openAIInitialized) {
    throw new Error('OpenAI is not initialized. Please set your API key.');
  }

  console.log(`Running function call with ${tools?.length || 0} tools available`);
  
  // For demo purposes, simulate a function call
  if (tools && tools.length > 0) {
    // Simulate a decision to call a function based on the prompt content
    const functionToCall = tools[0];
    
    return {
      content: "I'm analyzing this request and have decided to use a tool to help answer it.",
      toolCalls: [
        {
          function: {
            name: functionToCall.function.name,
            arguments: JSON.stringify({
              // Mock arguments based on the function's parameters
              // This is a simplification and would be more intelligent with real AI
              ...(functionToCall.function.parameters?.properties?.skills && {
                skills: ['JavaScript', 'React', 'TypeScript']
              }),
              ...(functionToCall.function.parameters?.properties?.experience && {
                experience: 5
              }),
              ...(functionToCall.function.parameters?.properties?.location && {
                location: 'Remote'
              }),
              ...(functionToCall.function.parameters?.properties?.text && {
                text: prompt.substring(0, 100)
              }),
              ...(functionToCall.function.parameters?.properties?.role && {
                role: 'Software Engineer'
              }),
              ...(functionToCall.function.parameters?.properties?.industry && {
                industry: 'Technology'
              })
            })
          }
        }
      ]
    };
  }
  
  // If no tools provided, just return content
  return {
    content: `This is a simulated response from OpenAI. 
    In a real implementation, this would contain the AI-generated response to your prompt.`
  };
};
