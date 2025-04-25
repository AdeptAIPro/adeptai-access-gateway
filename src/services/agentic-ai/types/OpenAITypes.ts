
// Define OpenAI API related types

export interface ChatCompletionFunctionParameters {
  type: string;
  properties: Record<string, {
    type: string;
    description?: string;
    items?: {
      type: string;
    };
  }>;
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

export interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  name?: string;
  tool_calls?: Array<{
    id: string;
    type: string;
    function: {
      name: string;
      arguments: string;
    };
  }>;
  tool_call_id?: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatCompletionMessage[];
  tools?: ChatCompletionTool[];
  tool_choice?: 'auto' | 'none' | {
    type: string;
    function: {
      name: string;
    };
  };
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
  stop?: string | string[];
}

export interface FunctionCallResponse {
  name: string;
  arguments: string;
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
        function: FunctionCallResponse;
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
