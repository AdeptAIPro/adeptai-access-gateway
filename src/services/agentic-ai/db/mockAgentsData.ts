
import { Agent } from "../types/AgenticTypes";

// Create mock agents for testing when database is not connected
export function createMockAgents(): Agent[] {
  return [
    {
      id: "mock-agent-1",
      name: "TalentFinder AI",
      description: "Specialized AI agent for finding and filtering talent from multiple sources",
      type: "talent",
      capabilities: ["talent-search", "talent-matching", "cross-source-talent-intelligence"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-agent-2",
      name: "PayrollMaster AI",
      description: "AI agent that handles payroll processing with tax optimization capabilities",
      type: "finance",
      capabilities: ["payroll-processing"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-agent-3",
      name: "ComplianceGuard AI",
      description: "AI agent that monitors and ensures compliance with regulations",
      type: "legal",
      capabilities: ["compliance-check"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-agent-4",
      name: "InsightsEngine AI",
      description: "AI agent that generates insights from analytics data",
      type: "analytics",
      capabilities: ["analytics-insight", "skills-recommendation"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-agent-5",
      name: "OnboardingAssistant AI",
      description: "AI agent that customizes and manages employee onboarding processes",
      type: "hr",
      capabilities: ["onboarding-customization"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    }
  ];
}
