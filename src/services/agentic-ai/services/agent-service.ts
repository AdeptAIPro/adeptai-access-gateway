
import { v4 as uuidv4 } from 'uuid';
import { Agent } from '../types/AgenticTypes';
import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { getEnvVar, executeDbOperation } from '../utils/db-utils';

const AGENTS_TABLE = getEnvVar('AGENTS_TABLE', 'agents');

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
