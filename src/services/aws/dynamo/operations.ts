
import { getDynamoDBClient } from '../AwsConfigService';
import { ScanCommand, GetItemCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { reportApiError } from '@/services/error-reporting';

/**
 * Execute DynamoDB operations with error handling and logging
 */
export const executeDynamoDBOperation = async <T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    // Report error to centralized system
    reportApiError(`DynamoDB.${operationName}`, error);
    
    // Rethrow to allow calling code to handle
    throw error;
  }
};

/**
 * Generic function to scan a DynamoDB table
 */
export const scanDynamoTable = async <T>(
  tableName: string, 
  filterExpression?: string,
  expressionAttributeValues?: Record<string, any>
): Promise<T[]> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      
      const params: any = {
        TableName: tableName
      };
      
      if (filterExpression) {
        params.FilterExpression = filterExpression;
      }
      
      if (expressionAttributeValues) {
        params.ExpressionAttributeValues = marshall(expressionAttributeValues);
      }
      
      const command = new ScanCommand(params);
      const response = await client.send(command);
      
      return (response.Items || []).map(item => unmarshall(item) as T);
    }, `scanTable:${tableName}`);
  } catch (error) {
    console.error(`Error scanning DynamoDB table ${tableName}:`, error);
    return [];
  }
};

/**
 * Generic function to get an item from a DynamoDB table by ID
 */
export const getDynamoItem = async <T>(
  tableName: string,
  id: string,
  idField: string = 'id'
): Promise<T | null> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      
      const key: Record<string, any> = {};
      key[idField] = id;
      
      const command = new GetItemCommand({
        TableName: tableName,
        Key: marshall(key)
      });
      
      const response = await client.send(command);
      return response.Item ? unmarshall(response.Item) as T : null;
    }, `getItem:${tableName}`);
  } catch (error) {
    console.error(`Error getting item from DynamoDB table ${tableName}:`, error);
    return null;
  }
};

/**
 * Generic function to create an item in a DynamoDB table
 */
export const createDynamoItem = async <T>(
  tableName: string,
  item: T
): Promise<boolean> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      
      const command = new PutItemCommand({
        TableName: tableName,
        Item: marshall(item as Record<string, any>)
      });
      
      await client.send(command);
      return true;
    }, `createItem:${tableName}`);
  } catch (error) {
    console.error(`Error creating item in DynamoDB table ${tableName}:`, error);
    return false;
  }
};

/**
 * Generic function to update an item in a DynamoDB table
 */
export const updateDynamoItem = async <T>(
  tableName: string,
  id: string,
  updates: Partial<T>,
  idField: string = 'id'
): Promise<boolean> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      
      // Build the update expression
      let updateExpression = 'SET ';
      const expressionAttributeValues: Record<string, any> = {};
      const expressionAttributeNames: Record<string, string> = {};
      
      Object.entries(updates).forEach(([key, value], index) => {
        // Skip the ID field
        if (key === idField) return;
        
        const attrName = `#attr${index}`;
        const attrValue = `:val${index}`;
        
        updateExpression += `${attrName} = ${attrValue}, `;
        expressionAttributeNames[attrName] = key;
        expressionAttributeValues[attrValue] = value;
      });
      
      // Remove trailing comma and space
      updateExpression = updateExpression.slice(0, -2);
      
      // Build the key
      const key: Record<string, any> = {};
      key[idField] = id;
      
      const command = new UpdateItemCommand({
        TableName: tableName,
        Key: marshall(key),
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: marshall(expressionAttributeValues)
      });
      
      await client.send(command);
      return true;
    }, `updateItem:${tableName}`);
  } catch (error) {
    console.error(`Error updating item in DynamoDB table ${tableName}:`, error);
    return false;
  }
};

/**
 * Generic function to delete an item from a DynamoDB table
 */
export const deleteDynamoItem = async (
  tableName: string,
  id: string,
  idField: string = 'id'
): Promise<boolean> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      
      // Build the key
      const key: Record<string, any> = {};
      key[idField] = id;
      
      const command = new DeleteItemCommand({
        TableName: tableName,
        Key: marshall(key)
      });
      
      await client.send(command);
      return true;
    }, `deleteItem:${tableName}`);
  } catch (error) {
    console.error(`Error deleting item from DynamoDB table ${tableName}:`, error);
    return false;
  }
};
