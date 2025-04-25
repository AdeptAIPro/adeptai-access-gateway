
import { AgentTask } from './types/AgenticTypes';
import { 
  generateText, 
  runFunctionCall, 
  isOpenAIInitialized 
} from '../llm/OpenAIService';
import { 
  getTaskById, 
  updateTaskStatus, 
  saveTaskResult 
} from '../aws/DynamoDBService';
import { 
  uploadTaskData, 
  downloadTaskData 
} from '../aws/S3Service';
import { toast } from 'sonner';

// Tool definitions for OpenAI function calling
const tools = [
  {
    type: "function",
    function: {
      name: "search_candidates",
      description: "Search for candidates matching specific criteria",
      parameters: {
        type: "object",
        properties: {
          skills: {
            type: "array",
            items: {
              type: "string"
            },
            description: "List of skills required"
          },
          experience: {
            type: "number",
            description: "Minimum years of experience required"
          },
          location: {
            type: "string",
            description: "Preferred location"
          },
          sources: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Sources to search (LinkedIn, GitHub, Internal DB, etc.)"
          }
        },
        required: ["skills"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "analyze_job_description",
      description: "Extract key information from a job description",
      parameters: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "The job description text to analyze"
          }
        },
        required: ["text"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "generate_compliance_report",
      description: "Generate a compliance report for hiring requirements",
      parameters: {
        type: "object",
        properties: {
          role: {
            type: "string",
            description: "The role to check compliance for"
          },
          industry: {
            type: "string",
            description: "The industry sector"
          },
          location: {
            type: "string",
            description: "Location for legal jurisdiction"
          }
        },
        required: ["role", "industry"]
      }
    }
  }
];

// Helper to execute specific tools based on function name
const executeToolFunction = async (functionName: string, args: any): Promise<any> => {
  console.log(`Executing tool function: ${functionName}`, args);
  
  switch(functionName) {
    case "search_candidates":
      return await searchCandidates(args);
    case "analyze_job_description":
      return await analyzeJobDescription(args.text);
    case "generate_compliance_report":
      return await generateComplianceReport(args);
    default:
      throw new Error(`Unknown function: ${functionName}`);
  }
};

// Mock implementations of tool functions
const searchCandidates = async (criteria: any): Promise<any> => {
  // In a real implementation, this would query databases or APIs
  // For now, we'll generate mock data with LLM
  const prompt = `Generate JSON data for 5 realistic candidates matching these criteria:
    Skills: ${criteria.skills.join(", ")}
    Experience: ${criteria.experience || "any"} years
    Location: ${criteria.location || "any"}
    Format as a JSON array with name, title, skills array, years of experience, location.`;
  
  const jsonResponse = await generateText(prompt, "gpt-4o");
  try {
    // Extract JSON from the response
    const jsonMatch = jsonResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     jsonResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, jsonResponse];
    const jsonString = jsonMatch[1] || jsonResponse;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse candidate search results:", e);
    return [];
  }
};

const analyzeJobDescription = async (text: string): Promise<any> => {
  const prompt = `Analyze this job description and extract the following information as JSON:
    - required_skills: Array of required skills
    - preferred_skills: Array of preferred/nice-to-have skills
    - min_experience: Minimum years of experience required (number)
    - education: Education requirements
    - job_title: The position title
    - seniority_level: Junior, Mid, Senior, etc.
    - key_responsibilities: Array of key responsibilities
    
    Job description:
    ${text}`;
  
  const jsonResponse = await generateText(prompt, "gpt-4o");
  try {
    // Extract JSON from the response
    const jsonMatch = jsonResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     jsonResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, jsonResponse];
    const jsonString = jsonMatch[1] || jsonResponse;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse job description analysis:", e);
    return {};
  }
};

const generateComplianceReport = async (args: any): Promise<any> => {
  const prompt = `Generate a compliance report for hiring a ${args.role} in the ${args.industry} industry${args.location ? ` in ${args.location}` : ''}.
    Include sections on:
    - Required certifications
    - Legal requirements
    - Industry standards
    - Compliance risks
    - Recommended verification steps
    Format as a JSON object with these sections as keys.`;
  
  const jsonResponse = await generateText(prompt, "gpt-4o");
  try {
    // Extract JSON from the response
    const jsonMatch = jsonResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     jsonResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, jsonResponse];
    const jsonString = jsonMatch[1] || jsonResponse;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse compliance report:", e);
    return {};
  }
};

// Main task processor with agentic workflow
export const processAgenticTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing agentic task: ${task.id} of type ${task.taskType}`);
  
  if (!isOpenAIInitialized()) {
    console.error("OpenAI is not initialized. Cannot process task.");
    return {
      ...task,
      status: "failed",
      error: "OpenAI is not initialized. Please set your API key."
    };
  }
  
  try {
    // Mark the task as processing
    await updateTaskStatus(task.id, "processing");
    
    // Generate a plan based on the task type and goal
    const plan = await generateAgenticPlan(task);
    
    // Execute the plan
    const result = await executeAgenticPlan(task, plan);
    
    // Store the results in S3 if they are large
    if (result && JSON.stringify(result).length > 4000) {
      const s3Url = await uploadTaskData(task.id, result);
      await updateTaskStatus(task.id, "completed", { 
        summary: result.summary || "Task completed successfully", 
        dataUrl: s3Url 
      });
    } else {
      // Store results directly in DynamoDB
      await updateTaskStatus(task.id, "completed", result);
    }
    
    // Return the updated task
    return await getTaskById(task.id) as AgentTask;
  } catch (error) {
    console.error(`Error processing agentic task ${task.id}:`, error);
    await updateTaskStatus(
      task.id, 
      "failed", 
      undefined, 
      error instanceof Error ? error.message : "Unknown error"
    );
    
    return {
      ...task,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

// Generate a plan for executing the task
const generateAgenticPlan = async (task: AgentTask): Promise<string[]> => {
  const prompt = `You are an AI agent creating a step-by-step plan to accomplish this task:
    Task Type: ${task.taskType}
    Goal: ${task.goal}
    
    Create a detailed plan with 3-7 sequential steps that would accomplish this goal.
    Format your response as a JSON array of strings, where each string is a step in the plan.`;
  
  const planResponse = await generateText(prompt, "gpt-4o");
  try {
    // Extract JSON from the response
    const jsonMatch = planResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     planResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, planResponse];
    const jsonString = jsonMatch[1] || planResponse;
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse agentic plan:", e);
    return ["Analyze requirements", "Execute task", "Format results"];
  }
};

// Execute the agentic plan
const executeAgenticPlan = async (task: AgentTask, plan: string[]): Promise<any> => {
  console.log(`Executing plan for task ${task.id}:`, plan);
  
  // Initialize context for the agentic workflow
  let context: any = {
    task: {
      id: task.id,
      type: task.taskType,
      goal: task.goal,
      params: task.params
    },
    plan,
    currentStep: 0,
    results: {},
    intermediateResults: []
  };
  
  // Execute each step in the plan
  for (let i = 0; i < plan.length; i++) {
    context.currentStep = i;
    const step = plan[i];
    
    console.log(`Executing step ${i + 1}/${plan.length}: ${step}`);
    
    try {
      // Generate a prompt for this step
      const stepPrompt = `You are an AI agent executing step ${i + 1} of your plan: "${step}"
        Task Type: ${task.taskType}
        Goal: ${task.goal}
        
        Current context:
        ${JSON.stringify(context, null, 2)}
        
        Execute this step and return the results. You can use tools like search_candidates, analyze_job_description, or generate_compliance_report if needed.`;
      
      // Run with tool calling if tools might be needed
      const response = await runFunctionCall(stepPrompt, tools);
      
      // Execute any tool calls
      if (response.toolCalls) {
        for (const toolCall of response.toolCalls) {
          const functionName = toolCall.function.name;
          const argumentsJson = toolCall.function.arguments;
          
          try {
            const args = JSON.parse(argumentsJson);
            const toolResult = await executeToolFunction(functionName, args);
            
            // Add tool result to context
            context.results[functionName] = toolResult;
            context.intermediateResults.push({
              step: i,
              action: functionName,
              result: toolResult
            });
          } catch (toolError) {
            console.error(`Error executing tool ${functionName}:`, toolError);
            context.errors = context.errors || [];
            context.errors.push({
              step: i,
              action: functionName,
              error: toolError instanceof Error ? toolError.message : "Tool execution failed"
            });
          }
        }
      }
      
      // Add any text response to the context
      if (response.content) {
        context.intermediateResults.push({
          step: i,
          content: response.content
        });
      }
    } catch (stepError) {
      console.error(`Error executing step ${i + 1}:`, stepError);
      context.errors = context.errors || [];
      context.errors.push({
        step: i,
        error: stepError instanceof Error ? stepError.message : "Step execution failed"
      });
    }
  }
  
  // Generate a final summary of the task execution
  const summaryPrompt = `You are an AI agent summarizing the results of your task execution:
    Task Type: ${task.taskType}
    Goal: ${task.goal}
    
    Execution context:
    ${JSON.stringify(context, null, 2)}
    
    Create a concise summary of what was accomplished and any key findings or recommendations.
    Format your response as a JSON object with these fields:
    - summary: A brief text summary
    - findings: An array of key findings
    - recommendations: An array of recommendations
    - status: "success" or "partial" or "failed"`;
  
  const summaryResponse = await generateText(summaryPrompt);
  try {
    // Extract JSON from the response
    const jsonMatch = summaryResponse.match(/```json\n([\s\S]*?)\n```/) || 
                     summaryResponse.match(/```\n([\s\S]*?)\n```/) || 
                     [null, summaryResponse];
    const jsonString = jsonMatch[1] || summaryResponse;
    const summary = JSON.parse(jsonString);
    
    // Combine summary with results
    return {
      ...summary,
      context,
      executedAt: new Date().toISOString()
    };
  } catch (e) {
    console.error("Failed to parse summary:", e);
    return {
      summary: "Task execution completed with errors in summary generation",
      status: "partial",
      context,
      executedAt: new Date().toISOString()
    };
  }
};
