
import { AgentTask } from '../types/AgenticTypes';
import { generateText, runFunctionCall } from '../../llm/OpenAIService';
import { agenticTools } from '../tools/AgenticTools';
import { executeToolFunction } from '../tools/ToolExecutor';

export const generateAgenticPlan = async (task: AgentTask): Promise<string[]> => {
  const prompt = `You are an AI agent creating a step-by-step plan to accomplish this task:
    Task Type: ${task.taskType}
    Goal: ${task.goal}
    
    Create a detailed plan with 3-7 sequential steps that would accomplish this goal.
    Format your response as a JSON array of strings, where each string is a step in the plan.`;
  
  const planResponse = await generateText(prompt, "gpt-4o");
  try {
    // In a real implementation, we would parse JSON from the response
    // Here, we'll return a simplified set of steps for demonstration
    return [
      "Analyze requirements and constraints",
      "Gather necessary information",
      "Process data and identify patterns",
      "Generate recommendations",
      "Format results in a structured report"
    ];
  } catch (e) {
    console.error("Failed to parse agentic plan:", e);
    return ["Analyze requirements", "Execute task", "Format results"];
  }
};

export const executeAgenticPlan = async (task: AgentTask, plan: string[]): Promise<any> => {
  console.log(`Executing plan for task ${task.id}:`, plan);
  
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
  
  for (let i = 0; i < plan.length; i++) {
    context.currentStep = i;
    const step = plan[i];
    
    console.log(`Executing step ${i + 1}/${plan.length}: ${step}`);
    
    try {
      const stepPrompt = `You are an AI agent executing step ${i + 1} of your plan: "${step}"
        Task Type: ${task.taskType}
        Goal: ${task.goal}
        
        Current context:
        ${JSON.stringify(context, null, 2)}
        
        Execute this step and return the results. You can use tools like search_candidates, analyze_job_description, or generate_compliance_report if needed.`;
      
      const response = await runFunctionCall(stepPrompt, agenticTools);
      
      if (response.toolCalls) {
        for (const toolCall of response.toolCalls) {
          const functionName = toolCall.function.name;
          const argumentsJson = toolCall.function.arguments;
          
          try {
            const args = JSON.parse(argumentsJson);
            const toolResult = await executeToolFunction(functionName, args);
            
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
  
  return await generateTaskSummary(task, context);
};

const generateTaskSummary = async (task: AgentTask, context: any): Promise<any> => {
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
  
  // Since this is a mock implementation, return a structured summary
  return {
    summary: "Task execution completed successfully",
    findings: [
      "Found 5 potential candidates matching the criteria",
      "Identified key required skills from job description",
      "Determined compliance requirements for the position"
    ],
    recommendations: [
      "Interview the top 3 candidates based on skill match",
      "Consider additional training for specific technical areas",
      "Implement compliance verification process before hiring"
    ],
    status: "success",
    context,
    executedAt: new Date().toISOString()
  };
};
