
import { v4 as uuidv4 } from 'uuid';
import { Agent } from '../types/AgenticTypes';
import { DynamoDBClient, ScanCommand, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { getEnvVar, executeDbOperation } from '../utils/db-utils';
import { createMockAgents } from '../db/mockAgentsData';

const AGENTS_TABLE = getEnvVar('AGENTS_TABLE', 'agent_definitions');

export const fetchAgents = async (): Promise<Agent[]> => {
  try {
    return await getAllAgents();
  } catch (error) {
    console.error('Error fetching agents:', error);
    // Return mock agents if database connection fails
    return createMockAgents();
  }
};

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
    Key: marshall({ id }),
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
  const expressionAttributeValues: Record<string, any> = {};
  let expressionAttributeNames: Record<string, string> = {};
  let attributeCount = 0;

  for (const key in updates) {
    if (key !== 'id' && key !== 'createdAt') {
      const attributeName = `#attr${attributeCount}`;
      const attributeValue = `:val${attributeCount}`;
      updateExpression += `${attributeName} = ${attributeValue}, `;
      expressionAttributeValues[attributeValue] = updates[key as keyof Agent];
      expressionAttributeNames[attributeName] = key;
      attributeCount++;
    }
  }

  updateExpression = updateExpression.slice(0, -2);

  const params = {
    TableName: AGENTS_TABLE,
    Key: marshall({ id }),
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "ALL_NEW"
  };

  // Cast to appropriate ReturnValue type
  const returnValues: "ALL_NEW" = "ALL_NEW";
  const correctedParams = {
    ...params,
    ReturnValues: returnValues
  };

  const command = new UpdateItemCommand(correctedParams);
  const response = await executeDbOperation(command);

  return response.Attributes ? unmarshall(response.Attributes) as Agent : undefined;
};

export const deleteAgent = async (id: string): Promise<boolean> => {
  const params = {
    TableName: AGENTS_TABLE,
    Key: marshall({ id }),
  };

  const command = new DeleteItemCommand(params);
  await executeDbOperation(command);

  return true;
};
