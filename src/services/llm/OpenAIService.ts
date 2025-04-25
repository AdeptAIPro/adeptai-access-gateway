
import OpenAI from "openai";
import { toast } from "sonner";

// Initialize OpenAI client
let openai: OpenAI | null = null;

// Initialize OpenAI with API key
export const initializeOpenAI = (apiKey: string): boolean => {
  try {
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Note: In production, API calls should be made from a backend
    });
    return true;
  } catch (error) {
    console.error("Failed to initialize OpenAI:", error);
    return false;
  }
};

// Check if OpenAI is initialized
export const isOpenAIInitialized = (): boolean => {
  return openai !== null;
};

// Generate text using OpenAI
export const generateText = async (
  prompt: string,
  model: string = "gpt-4o",
  temperature: number = 0.7,
  maxTokens: number = 1000
): Promise<string> => {
  if (!openai) {
    toast.error("OpenAI is not initialized. Please set your API key.");
    throw new Error("OpenAI is not initialized");
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model,
      temperature,
      max_tokens: maxTokens,
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenAI API error:", error);
    toast.error("Failed to generate text with OpenAI");
    throw error;
  }
};

// Run function with tool calling
export const runFunctionCall = async (
  prompt: string,
  tools: OpenAI.ChatCompletionTool[],
  model: string = "gpt-4o"
): Promise<any> => {
  if (!openai) {
    toast.error("OpenAI is not initialized. Please set your API key.");
    throw new Error("OpenAI is not initialized");
  }

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      tools,
      tool_choice: "auto",
    });

    const responseMessage = response.choices[0].message;
    
    // Check if the model wanted to call a function
    if (responseMessage.tool_calls) {
      return {
        toolCalls: responseMessage.tool_calls,
        content: responseMessage.content
      };
    }

    return {
      content: responseMessage.content,
      toolCalls: null
    };
  } catch (error) {
    console.error("OpenAI function calling error:", error);
    toast.error("Failed to execute function call with OpenAI");
    throw error;
  }
};
