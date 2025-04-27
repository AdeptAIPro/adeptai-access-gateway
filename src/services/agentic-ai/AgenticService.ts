
import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// Define types for Agentic AI entities
export interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  capabilities: string[];
  status: "active" | "inactive" | "busy";
  createdAt: string;
}

export interface AgentTask {
  id: string;
  agentId: string;
  description: string;
  status: "pending" | "in progress" | "completed" | "failed";
  createdAt: string;
  taskType?: string; // Added to align with other imports
  goal?: string;     // Added to align with other imports
  agent?: string;    // Added to align with other imports
}

// Add AgentTaskType type
export type AgentTaskType = string;

// Initialize DynamoDB client
const ddbClient = new DynamoDBClient({ 
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIAxxxxxxxxxxxxx",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  }
});

const AGENTS_TABLE = process.env.AGENTS_TABLE || "agents";
const TASKS_TABLE = process.env.TASKS_TABLE || "agent_tasks";

// Utility function to handle DynamoDB operations
const executeDbOperation = async (command: any) => {
  try {
    const response = await ddbClient.send(command);
    return response;
  } catch (error) {
    console.error("DynamoDB operation failed:", error);
    throw error;
  }
};

// --- Agent Operations ---
export const getAllAgents = async (): Promise<Agent[]> => {
  const params = {
    TableName: AGENTS_TABLE,
  };

  const command = new ScanCommand(params);
  const response = await executeDbOperation(command);

  return response.Items ? response.Items.map(item => unmarshall(item) as Agent) : [];
};

export const getAgentById = async (id: string): Promise<Agent | undefined> => {
  const params = {
    TableName: AGENTS_TABLE,
    Key: marshall({ id: id }),
  };

  const command = new GetItemCommand(params);
  const response = await executeDbOperation(command);

  return response.Item ? unmarshall(response.Item) as Agent : undefined;
};

export const createAgent = async (agentData: Omit<Agent, 'id' | 'createdAt'>): Promise<Agent> => {
  const agentId = uuidv4();
  const createdAt = new Date().toISOString();
  const newAgent: Agent = {
    id: agentId,
    createdAt,
    ...agentData,
  };

  const params = {
    TableName: AGENTS_TABLE,
    Item: marshall(newAgent),
  };

  const command = new PutItemCommand(params);
  await executeDbOperation(command);

  return newAgent;
};

export const updateAgent = async (id: string, updates: Partial<Agent>): Promise<Agent | undefined> => {
  const existingAgent = await getAgentById(id);
  if (!existingAgent) {
    return undefined;
  }

  // Prepare update expression
  let updateExpression = 'SET ';
  const expressionAttributeValues: any = {};
  let expressionAttributeNames: any = {};
  let attributeCount = 0;

  for (const key in updates) {
    if (key !== 'id' && key !== 'createdAt') {
      const attributeName = `#attr${attributeCount}`;
      const attributeValue = `:val${attributeCount}`;
      updateExpression += `${attributeName} = ${attributeValue}, `;
      expressionAttributeValues[attributeValue] = updates[key];
      expressionAttributeNames[attributeName] = key;
      attributeCount++;
    }
  }

  // Remove trailing comma and space
  updateExpression = updateExpression.slice(0, -2);

  const params = {
    TableName: AGENTS_TABLE,
    Key: marshall({ id: id }),
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "ALL_NEW"
  };

  const command = new UpdateItemCommand(params);
  const response = await executeDbOperation(command);

  return response.Attributes ? unmarshall(response.Attributes) as Agent : undefined;
};

export const deleteAgent = async (id: string): Promise<boolean> => {
  const params = {
    TableName: AGENTS_TABLE,
    Key: marshall({ id: id }),
  };

  const command = new DeleteItemCommand(params);
  await executeDbOperation(command);

  return true;
};

// --- Task Operations ---
export const getAllTasks = async (): Promise<AgentTask[]> => {
  const params = {
    TableName: TASKS_TABLE,
  };

  const command = new ScanCommand(params);
  const response = await executeDbOperation(command);

  return response.Items ? response.Items.map(item => unmarshall(item) as AgentTask) : [];
};

export const getTaskById = async (id: string): Promise<AgentTask | undefined> => {
  const params = {
    TableName: TASKS_TABLE,
    Key: marshall({ id: id }),
  };

  const command = new GetItemCommand(params);
  const response = await executeDbOperation(command);

  return response.Item ? unmarshall(response.Item) as AgentTask : undefined;
};

export const createTask = async (taskData: Omit<AgentTask, 'id' | 'createdAt'>): Promise<AgentTask> => {
  const taskId = uuidv4();
  const createdAt = new Date().toISOString();
  const newTask: AgentTask = {
    id: taskId,
    createdAt,
    ...taskData,
    taskType: taskData.taskType || 'default', // Ensure taskType is always set
    goal: taskData.description // Map description to goal for compatibility
  };

  const params = {
    TableName: TASKS_TABLE,
    Item: marshall(newTask),
  };

  const command = new PutItemCommand(params);
  await executeDbOperation(command);

  return newTask;
};

export const updateTask = async (id: string, updates: Partial<AgentTask>): Promise<AgentTask | undefined> => {
  const existingTask = await getTaskById(id);
  if (!existingTask) {
    return undefined;
  }

  // Prepare update expression
  let updateExpression = 'SET ';
  const expressionAttributeValues: any = {};
  let expressionAttributeNames: any = {};
  let attributeCount = 0;

  for (const key in updates) {
    if (key !== 'id' && key !== 'createdAt') {
      const attributeName = `#attr${attributeCount}`;
      const attributeValue = `:val${attributeCount}`;
      updateExpression += `${attributeName} = ${attributeValue}, `;
      expressionAttributeValues[attributeValue] = updates[key];
      expressionAttributeNames[attributeName] = key;
      attributeCount++;
    }
  }

  // Remove trailing comma and space
  updateExpression = updateExpression.slice(0, -2);

  const params = {
    TableName: TASKS_TABLE,
    Key: marshall({ id: id }),
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "ALL_NEW"
  };

  const command = new UpdateItemCommand(params);
  const response = await executeDbOperation(command);

  return response.Attributes ? unmarshall(response.Attributes) as AgentTask : undefined;
};

export const updateTaskStatus = async (
  id: string, 
  status: AgentTask['status'], 
  result?: any,
  error?: string
): Promise<boolean> => {
  try {
    let updateExp = 'SET #status = :status';
    let expAttrNames: Record<string, string> = { '#status': 'status' };
    let expAttrValues: Record<string, any> = { ':status': status };
    
    if (result !== undefined) {
      updateExp += ', #result = :result';
      expAttrNames['#result'] = 'result';
      expAttrValues[':result'] = result;
    }
    
    if (error) {
      updateExp += ', #error = :error';
      expAttrNames['#error'] = 'error';
      expAttrValues[':error'] = error;
    }
    
    // Add completion timestamp if completed or failed
    if (status === 'completed' || status === 'failed') {
      updateExp += ', #completedAt = :completedAt';
      expAttrNames['#completedAt'] = 'completedAt';
      expAttrValues[':completedAt'] = new Date().toISOString();
    }
    
    const params = {
      TableName: TASKS_TABLE,
      Key: marshall({ id }),
      UpdateExpression: updateExp,
      ExpressionAttributeNames: expAttrNames,
      ExpressionAttributeValues: marshall(expAttrValues)
    };
    
    const command = new UpdateItemCommand(params);
    await executeDbOperation(command);
    return true;
  } catch (error) {
    console.error(`Error updating task status: ${error}`);
    return false;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  const params = {
    TableName: TASKS_TABLE,
    Key: marshall({ id: id }),
  };

  const command = new DeleteItemCommand(params);
  await executeDbOperation(command);

  return true;
};

// Export a function to process tasks
export const processTask = async (taskId: string): Promise<boolean> => {
  try {
    console.log(`Processing task ${taskId}`);
    await updateTaskStatus(taskId, "in progress");
    
    // Simulate task processing with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update task as completed
    await updateTaskStatus(taskId, "completed");
    return true;
  } catch (error) {
    console.error(`Error processing task ${taskId}:`, error);
    await updateTaskStatus(taskId, "failed");
    return false;
  }
};

// Need to expose this for compatibility with other imports
export const getAgents = getAllAgents;
