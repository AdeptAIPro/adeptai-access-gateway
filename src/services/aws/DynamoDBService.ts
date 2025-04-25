
import { 
  PutCommand, 
  GetCommand, 
  UpdateCommand, 
  QueryCommand, 
  ScanCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";
import { docClient, TASKS_TABLE, AGENTS_TABLE, RESULTS_TABLE } from "./AwsConfigService";
import { v4 as uuid } from "uuid";
import { AgentTask, Agent } from "@/services/agentic-ai/types/AgenticTypes";

// Task operations
export const createTask = async (task: Omit<AgentTask, "id" | "createdAt" | "updatedAt">): Promise<AgentTask> => {
  const timestamp = new Date().toISOString();
  const id = uuid();
  
  const newTask: AgentTask = {
    id,
    ...task,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  
  const command = new PutCommand({
    TableName: TASKS_TABLE,
    Item: newTask,
  });
  
  try {
    await docClient.send(command);
    return newTask;
  } catch (error) {
    console.error("Error creating task in DynamoDB:", error);
    throw error;
  }
};

export const getTaskById = async (taskId: string): Promise<AgentTask | null> => {
  const command = new GetCommand({
    TableName: TASKS_TABLE,
    Key: { id: taskId },
  });
  
  try {
    const response = await docClient.send(command);
    return response.Item as AgentTask || null;
  } catch (error) {
    console.error(`Error getting task ${taskId} from DynamoDB:`, error);
    throw error;
  }
};

export const updateTaskStatus = async (
  taskId: string, 
  status: AgentTask["status"], 
  result?: any, 
  error?: string
): Promise<boolean> => {
  const timestamp = new Date().toISOString();
  
  const updateExpression = [
    "set #status = :status", 
    "#updatedAt = :updatedAt"
  ];
  
  const expressionAttributeNames: Record<string, string> = {
    "#status": "status",
    "#updatedAt": "updatedAt",
  };
  
  const expressionAttributeValues: Record<string, any> = {
    ":status": status,
    ":updatedAt": timestamp,
  };
  
  if (result !== undefined) {
    updateExpression.push("#result = :result");
    expressionAttributeNames["#result"] = "result";
    expressionAttributeValues[":result"] = result;
  }
  
  if (error !== undefined) {
    updateExpression.push("#error = :error");
    expressionAttributeNames["#error"] = "error";
    expressionAttributeValues[":error"] = error;
  }
  
  const command = new UpdateCommand({
    TableName: TASKS_TABLE,
    Key: { id: taskId },
    UpdateExpression: updateExpression.join(", "),
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  });
  
  try {
    await docClient.send(command);
    return true;
  } catch (error) {
    console.error(`Error updating task ${taskId} in DynamoDB:`, error);
    throw error;
  }
};

export const getUserTasks = async (userId: string): Promise<AgentTask[]> => {
  const command = new QueryCommand({
    TableName: TASKS_TABLE,
    IndexName: "UserIdIndex", // Assumes a GSI on userId
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
    ScanIndexForward: false, // Sort by most recent first (if using timestamp in sort key)
  });
  
  try {
    const response = await docClient.send(command);
    return (response.Items as AgentTask[]) || [];
  } catch (error) {
    console.error(`Error getting tasks for user ${userId} from DynamoDB:`, error);
    
    // If GSI doesn't exist, fall back to scan with filter (less efficient)
    try {
      const scanCommand = new ScanCommand({
        TableName: TASKS_TABLE,
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      });
      
      const scanResponse = await docClient.send(scanCommand);
      return (scanResponse.Items as AgentTask[]) || [];
    } catch (fallbackError) {
      console.error("Fallback scan failed:", fallbackError);
      throw fallbackError;
    }
  }
};

// Agent operations
export const getAgents = async (): Promise<Agent[]> => {
  const command = new ScanCommand({
    TableName: AGENTS_TABLE,
  });
  
  try {
    const response = await docClient.send(command);
    return (response.Items as Agent[]) || [];
  } catch (error) {
    console.error("Error getting agents from DynamoDB:", error);
    throw error;
  }
};

export const getAgentById = async (agentId: string): Promise<Agent | null> => {
  const command = new GetCommand({
    TableName: AGENTS_TABLE,
    Key: { id: agentId },
  });
  
  try {
    const response = await docClient.send(command);
    return response.Item as Agent || null;
  } catch (error) {
    console.error(`Error getting agent ${agentId} from DynamoDB:`, error);
    throw error;
  }
};

// Task result operations
export const saveTaskResult = async (taskId: string, resultData: any): Promise<string> => {
  const resultId = uuid();
  const timestamp = new Date().toISOString();
  
  const resultItem = {
    id: resultId,
    taskId,
    data: resultData,
    createdAt: timestamp,
  };
  
  const command = new PutCommand({
    TableName: RESULTS_TABLE,
    Item: resultItem,
  });
  
  try {
    await docClient.send(command);
    return resultId;
  } catch (error) {
    console.error("Error saving task result to DynamoDB:", error);
    throw error;
  }
};

export const getTaskResults = async (taskId: string): Promise<any[]> => {
  const command = new QueryCommand({
    TableName: RESULTS_TABLE,
    IndexName: "TaskIdIndex", // Assumes a GSI on taskId
    KeyConditionExpression: "taskId = :taskId",
    ExpressionAttributeValues: {
      ":taskId": taskId,
    },
  });
  
  try {
    const response = await docClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.error(`Error getting results for task ${taskId} from DynamoDB:`, error);
    throw error;
  }
};
