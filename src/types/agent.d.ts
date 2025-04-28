
// Type definitions for Agent
import { Agent as AgenticAgent } from '../services/agentic-ai/types/AgenticTypes';

declare global {
  // Making global Agent compatible with the AgenticAgent interface
  interface Agent extends Omit<AgenticAgent, 'createdAt'> {
    createdAt: string;
  }
}

export {};
