
import { getDynamoDBClient } from '../AwsConfigService';
import { ScanCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { Agent } from '@/services/agentic-ai/types/AgenticTypes';
import { createMockAgents } from '@/services/agentic-ai/db/mockAgentsData';
import { executeDynamoDBOperation } from './operations';

const AGENTS_TABLE = 'adeptai-agents';

export const getAgents = async (): Promise<Agent[]> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      const command = new ScanCommand({
        TableName: AGENTS_TABLE
      });
      
      const response = await client.send(command);
      return (response.Items || []).map(item => unmarshall(item) as Agent);
    }, "Getting available agents");
  } catch (error) {
    console.log("Falling back to mock agent data");
    return createMockAgents();
  }
};

export const getAgentById = async (agentId: string): Promise<Agent | null> => {
  try {
    return await executeDynamoDBOperation(async () => {
      const client = getDynamoDBClient();
      const command = new GetItemCommand({
        TableName: AGENTS_TABLE,
        Key: marshall({ id: agentId })
      });
      
      const response = await client.send(command);
      return response.Item ? unmarshall(response.Item) as Agent : null;
    }, `Getting agent with id: ${agentId}`);
  } catch (error) {
    console.log("Falling back to mock agent data for getAgentById");
    const mockAgents = createMockAgents();
    return mockAgents.find(a => a.id === agentId) || null;
  }
};
