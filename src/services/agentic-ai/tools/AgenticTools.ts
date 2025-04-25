
import { ChatCompletionTool } from "openai/resources";

export const agenticTools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "search_candidates",
      description: "Search for candidates matching specific criteria",
      parameters: {
        type: "object",
        properties: {
          skills: {
            type: "array",
            items: {
              type: "string"
            },
            description: "List of skills required"
          },
          experience: {
            type: "number",
            description: "Minimum years of experience required"
          },
          location: {
            type: "string",
            description: "Preferred location"
          },
          sources: {
            type: "array",
            items: {
              type: "string"
            },
            description: "Sources to search (LinkedIn, GitHub, Internal DB, etc.)"
          }
        },
        required: ["skills"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "analyze_job_description",
      description: "Extract key information from a job description",
      parameters: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "The job description text to analyze"
          }
        },
        required: ["text"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "generate_compliance_report",
      description: "Generate a compliance report for hiring requirements",
      parameters: {
        type: "object",
        properties: {
          role: {
            type: "string",
            description: "The role to check compliance for"
          },
          industry: {
            type: "string",
            description: "The industry sector"
          },
          location: {
            type: "string",
            description: "Location for legal jurisdiction"
          }
        },
        required: ["role", "industry"]
      }
    }
  }
];
