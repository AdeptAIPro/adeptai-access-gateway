
// Type definitions for OpenAI API calls

export interface ChatCompletionFunctionParameters {
  type: string;
  properties: Record<string, any>;
  required?: string[];
}

export interface ChatCompletionFunction {
  name: string;
  description?: string;
  parameters: ChatCompletionFunctionParameters;
}

export interface ChatCompletionTool {
  type: string;
  function: ChatCompletionFunction;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string | null;
      tool_calls?: Array<{
        id: string;
        type: string;
        function: {
          name: string;
          arguments: string;
        };
      }>;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
