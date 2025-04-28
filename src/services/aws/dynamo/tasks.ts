
import { getDynamoDBClient } from '../AwsConfigService';
import { QueryCommand, GetItemCommand, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { AgentTask } from '@/services/agentic-ai/types/AgenticTypes';
import { executeDynamoDBOperation } from './operations';

const TASKS_TABLE = 'adeptai-tasks';

export const getUserTasks = async (userId: string): Promise<AgentTask[]> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      const command = new QueryCommand({
        TableName: TASKS_TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: marshall({
          ":userId": userId
        })
      });
      
      const response = await client.send(command);
      return (response.Items || []).map(item => unmarshall(item) as AgentTask);
    }, `Getting tasks for user: ${userId}`);
  } catch (error) {
    console.log("Falling back to mock data for user tasks");
    return [];
  }
};

export const createTask = async (task: AgentTask): Promise<AgentTask> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      const command = new PutItemCommand({
        TableName: TASKS_TABLE,
        Item: marshall(task)
      });
      
      await client.send(command);
      return task;
    }, "Creating new task");
  } catch (error) {
    console.log("Failed to create task in DynamoDB, returning task object", task);
    return task;
  }
};

export const getTaskById = async (taskId: string): Promise<AgentTask | null> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      const command = new GetItemCommand({
        TableName: TASKS_TABLE,
        Key: marshall({ id: taskId })
      });
      
      const response = await client.send(command);
      return response.Item ? unmarshall(response.Item) as AgentTask : null;
    }, `Getting task with id: ${taskId}`);
  } catch (error) {
    console.log("Falling back to null for getTaskById");
    return null;
  }
};

export const updateTaskStatus = async (
  taskId: string, 
  status: string,
  result?: any,
  error?: string
): Promise<boolean> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      
      const updateExpressions = ["set #status = :status", "#updatedAt = :updatedAt"];
      const attributeNames: Record<string, string> = {
        "#status": "status",
        "#updatedAt": "updatedAt"
      };
      
      const attributeValues: Record<string, any> = {
        ":status": status,
        ":updatedAt": new Date().toISOString()
      };
      
      if (result !== undefined) {
        updateExpressions.push("#result = :result");
        attributeNames["#result"] = "result";
        attributeValues[":result"] = result;
      }
      
      if (error !== undefined) {
        updateExpressions.push("#error = :error");
        attributeNames["#error"] = "error";
        attributeValues[":error"] = error;
      }
      
      const command = new UpdateItemCommand({
        TableName: TASKS_TABLE,
        Key: marshall({ id: taskId }),
        UpdateExpression: updateExpressions.join(", "),
        ExpressionAttributeNames: attributeNames,
        ExpressionAttributeValues: marshall(attributeValues)
      });
      
      await client.send(command);
      return true;
    }, `Updating task ${taskId} status`);
  } catch (error) {
    console.log("Failed to update task status in DynamoDB");
    return true;
  }
};
