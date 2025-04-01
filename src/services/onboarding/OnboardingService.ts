import { toast } from "@/components/ui/use-toast";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  due?: string;
}

export interface OnboardingWorkflow {
  id: string;
  title: string;
  description: string;
  progress: number;
  steps: OnboardingStep[];
  sector: 'healthcare' | 'it' | 'general';
  assignee?: string;
  connectedTools?: string[];
}

export interface OnboardingTool {
  id: string;
  name: string;
  description: string;
  category: string;
  apiKeyRequired: boolean;
  apiUrlRequired: boolean;
  webhookSupport: boolean;
  logo?: string;
}

export interface OnboardingClient {
  id: string;
  name: string;
  logo?: string;
  workflows: OnboardingWorkflow[];
  activeSince: string;
  subscription: 'basic' | 'professional' | 'enterprise';
  connectedOnboardingTools?: OnboardingTool[];
}

// Mock onboarding tools data
const mockOnboardingTools: OnboardingTool[] = [
  {
    id: 'bamboohr',
    name: 'BambooHR',
    description: 'Comprehensive HR and onboarding platform',
    category: 'HRMS',
    apiKeyRequired: true,
    apiUrlRequired: false,
    webhookSupport: true,
    logo: 'bamboohr.png'
  },
  {
    id: 'workday',
    name: 'Workday',
    description: 'Enterprise human capital management',
    category: 'HRMS',
    apiKeyRequired: true,
    apiUrlRequired: true,
    webhookSupport: true,
    logo: 'workday.png'
  },
  {
    id: 'zenefits',
    name: 'Zenefits',
    description: 'All-in-one HR platform for small businesses',
    category: 'HRMS',
    apiKeyRequired: true,
    apiUrlRequired: false,
    webhookSupport: true,
    logo: 'zenefits.png'
  },
  {
    id: 'gusto',
    name: 'Gusto',
    description: 'Payroll, benefits, and HR management',
    category: 'HRMS',
    apiKeyRequired: true,
    apiUrlRequired: false,
    webhookSupport: true,
    logo: 'gusto.png'
  },
  {
    id: 'clickboarding',
    name: 'Click Boarding',
    description: 'Mobile-first onboarding experience platform',
    category: 'Onboarding',
    apiKeyRequired: true,
    apiUrlRequired: true,
    webhookSupport: false,
    logo: 'clickboarding.png'
  },
  {
    id: 'workbright',
    name: 'WorkBright',
    description: 'Digital employee onboarding for high-volume hiring',
    category: 'Onboarding',
    apiKeyRequired: true,
    apiUrlRequired: true,
    webhookSupport: true,
    logo: 'workbright.png'
  },
  {
    id: 'sapling',
    name: 'Sapling HR',
    description: 'People operations platform for mid-market companies',
    category: 'HRMS',
    apiKeyRequired: true,
    apiUrlRequired: false,
    webhookSupport: true,
    logo: 'sapling.png'
  },
  {
    id: 'talmundo',
    name: 'Talmundo',
    description: 'Employee onboarding software',
    category: 'Onboarding',
    apiKeyRequired: true,
    apiUrlRequired: true,
    webhookSupport: false,
    logo: 'talmundo.png'
  },
  {
    id: 'clearcompany',
    name: 'ClearCompany',
    description: 'Talent management platform for recruiting and onboarding',
    category: 'ATS',
    apiKeyRequired: true,
    apiUrlRequired: true,
    webhookSupport: true,
    logo: 'clearcompany.png'
  },
  {
    id: 'custom',
    name: 'Custom Integration',
    description: 'Connect your custom onboarding system via API',
    category: 'Custom',
    apiKeyRequired: true,
    apiUrlRequired: true,
    webhookSupport: true,
    logo: 'custom.png'
  }
];

// Mock data for client-specific onboarding workflows
const mockClients: OnboardingClient[] = [
  {
    id: 'client-1',
    name: 'HealthTech Solutions',
    activeSince: '2023-01-15',
    subscription: 'enterprise',
    connectedOnboardingTools: [
      mockOnboardingTools.find(tool => tool.id === 'bamboohr')
    ].filter(Boolean) as OnboardingTool[],
    workflows: [
      {
        id: 'workflow-1',
        title: 'Nurse Practitioner Onboarding',
        description: 'Complete onboarding for new nurse practitioners',
        progress: 75,
        sector: 'healthcare',
        assignee: 'Sarah Johnson',
        connectedTools: ['BambooHR'],
        steps: [
          {
            id: 'step-1',
            title: 'License Verification',
            description: 'Verify nursing license through compliance system',
            completed: true,
          },
          {
            id: 'step-2',
            title: 'Background Check',
            description: 'Complete healthcare-specific background verification',
            completed: true,
          },
          {
            id: 'step-3',
            title: 'Credentialing',
            description: 'Complete provider credentialing process',
            completed: true,
          },
          {
            id: 'step-4',
            title: 'EMR Training',
            description: 'Complete Electronic Medical Record system training',
            completed: false,
            due: '2023-11-30',
          }
        ]
      },
      {
        id: 'workflow-2',
        title: 'Medical Assistant Onboarding',
        description: 'Onboarding workflow for medical assistants',
        progress: 50,
        sector: 'healthcare',
        assignee: 'Michael Chen',
        connectedTools: ['BambooHR'],
        steps: [
          {
            id: 'step-1',
            title: 'Certification Verification',
            description: 'Verify MA certification and credentials',
            completed: true,
          },
          {
            id: 'step-2',
            title: 'HIPAA Training',
            description: 'Complete mandatory HIPAA compliance training',
            completed: true,
          },
          {
            id: 'step-3',
            title: 'Clinical Skills Assessment',
            description: 'Complete in-person clinical skills assessment',
            completed: false,
            due: '2023-12-05',
          },
          {
            id: 'step-4',
            title: 'EMR Access Setup',
            description: 'Set up appropriate EMR access levels',
            completed: false,
            due: '2023-12-10',
          }
        ]
      }
    ]
  },
  {
    id: 'client-2',
    name: 'TechForward Inc.',
    activeSince: '2023-03-22',
    subscription: 'professional',
    connectedOnboardingTools: [
      mockOnboardingTools.find(tool => tool.id === 'workday')
    ].filter(Boolean) as OnboardingTool[],
    workflows: [
      {
        id: 'workflow-3',
        title: 'Software Developer Onboarding',
        description: 'Onboarding process for new development team members',
        progress: 60,
        sector: 'it',
        assignee: 'David Park',
        connectedTools: ['Workday'],
        steps: [
          {
            id: 'step-1',
            title: 'Technical Assessment Verification',
            description: 'Verify completion of technical assessment',
            completed: true,
          },
          {
            id: 'step-2',
            title: 'Code Repository Access',
            description: 'Set up GitHub/GitLab access and permissions',
            completed: true,
          },
          {
            id: 'step-3',
            title: 'Development Environment Setup',
            description: 'Configure local and cloud development environments',
            completed: true,
          },
          {
            id: 'step-4',
            title: 'Security Training',
            description: 'Complete mandatory security and data protection training',
            completed: false,
            due: '2023-11-25',
          },
          {
            id: 'step-5',
            title: 'Team Project Introduction',
            description: 'Introduction to current team projects and codebase',
            completed: false,
            due: '2023-11-28',
          }
        ]
      }
    ]
  },
  {
    id: 'client-3',
    name: 'Global Staffing Solutions',
    activeSince: '2023-05-10',
    subscription: 'basic',
    workflows: [
      {
        id: 'workflow-4',
        title: 'Administrative Staff Onboarding',
        description: 'General onboarding for administrative team members',
        progress: 90,
        sector: 'general',
        assignee: 'Jessica Williams',
        steps: [
          {
            id: 'step-1',
            title: 'Employment Verification',
            description: 'Verify previous employment history',
            completed: true,
          },
          {
            id: 'step-2',
            title: 'System Access Setup',
            description: 'Create accounts for required business systems',
            completed: true,
          },
          {
            id: 'step-3',
            title: 'HR Policy Review',
            description: 'Review and acknowledge company policies',
            completed: true,
          },
          {
            id: 'step-4',
            title: 'Department Introduction',
            description: 'Introduction to team and department processes',
            completed: true,
          },
          {
            id: 'step-5',
            title: '30-day Check-in',
            description: 'Schedule 30-day check-in with manager',
            completed: false,
            due: '2023-12-15',
          }
        ]
      }
    ]
  }
];

// Get all onboarding workflows for the current user's organization
export const getClientOnboardingData = async (clientId?: string): Promise<OnboardingClient[]> => {
  try {
    // In a real implementation, this would fetch from an API based on the authenticated user's organization
    // For now, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    if (clientId) {
      const client = mockClients.find(c => c.id === clientId);
      return client ? [client] : [];
    }
    
    return mockClients;
  } catch (error) {
    console.error("Error fetching onboarding data:", error);
    toast({
      title: "Error",
      description: "Failed to load onboarding data",
      variant: "destructive"
    });
    return [];
  }
};

// Create a new onboarding workflow
export const createOnboardingWorkflow = async (clientId: string, workflow: Omit<OnboardingWorkflow, 'id'>): Promise<boolean> => {
  try {
    // In a real implementation, this would send to an API
    console.log("Creating new workflow for client", clientId, workflow);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Success",
      description: "Onboarding workflow created successfully",
    });
    
    return true;
  } catch (error) {
    console.error("Error creating workflow:", error);
    toast({
      title: "Error",
      description: "Failed to create onboarding workflow",
      variant: "destructive"
    });
    return false;
  }
};

// Update an existing onboarding workflow
export const updateWorkflowStatus = async (clientId: string, workflowId: string, stepId: string, completed: boolean): Promise<boolean> => {
  try {
    // In a real implementation, this would send to an API
    console.log(`Updating workflow ${workflowId} step ${stepId} to ${completed ? 'completed' : 'incomplete'}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Success",
      description: `Step ${completed ? 'completed' : 'marked as incomplete'}`,
    });
    
    return true;
  } catch (error) {
    console.error("Error updating workflow:", error);
    toast({
      title: "Error",
      description: "Failed to update workflow status",
      variant: "destructive"
    });
    return false;
  }
};

// Get available onboarding tools
export const getOnboardingTools = async (): Promise<OnboardingTool[]> => {
  try {
    // In a real implementation, this would fetch from an API
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
    
    return mockOnboardingTools;
  } catch (error) {
    console.error("Error fetching onboarding tools:", error);
    toast({
      title: "Error",
      description: "Failed to load available onboarding tools",
      variant: "destructive"
    });
    return [];
  }
};

// Get client's connected tools
export const getClientConnectedTools = async (clientId: string): Promise<OnboardingTool[]> => {
  try {
    // In a real implementation, this would fetch from an API
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const client = mockClients.find(c => c.id === clientId);
    return client?.connectedOnboardingTools || [];
  } catch (error) {
    console.error("Error fetching connected tools:", error);
    toast({
      title: "Error",
      description: "Failed to load client's connected tools",
      variant: "destructive"
    });
    return [];
  }
};

// Connect an onboarding tool to a client
export const connectOnboardingTool = async (clientId: string, connectionDetails: any): Promise<boolean> => {
  try {
    // In a real implementation, this would send to an API
    console.log("Connecting onboarding tool for client", clientId, connectionDetails);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return true;
  } catch (error) {
    console.error("Error connecting tool:", error);
    return false;
  }
};

// Disconnect an onboarding tool from a client
export const disconnectOnboardingTool = async (clientId: string, toolId: string): Promise<boolean> => {
  try {
    // In a real implementation, this would send to an API
    console.log("Disconnecting onboarding tool", toolId, "for client", clientId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: "Success",
      description: "Onboarding tool disconnected successfully",
    });
    
    return true;
  } catch (error) {
    console.error("Error disconnecting tool:", error);
    toast({
      title: "Error",
      description: "Failed to disconnect onboarding tool",
      variant: "destructive"
    });
    return false;
  }
};
