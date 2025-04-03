
import { IntegrationItem } from "@/types/integration";
import { PricingPlan } from "@/types/pricing";

// Enhanced type definition for user plan types with null safety
export type PlanType = "free_trial" | "pro" | "business" | "enterprise" | null;

// Interface for plan requirements
export interface PlanRequirement {
  planName: string; 
  planLevel: number;
  isIncluded: boolean;
}

// Plan level mapping for comparison operations
const planLevelMap: Record<string, number> = {
  "free_trial": 1,
  "pro": 2,
  "business": 3,
  "enterprise": 4,
  "null": 0
};

/**
 * Check if an integration is available for the user's plan
 * Enhanced with better null safety and clearer logic structure
 */
export const isIntegrationAvailableForPlan = (
  integration: IntegrationItem,
  userPlan: PlanType
): boolean => {
  // Guard clause for missing integration
  if (!integration) {
    console.error("Integration object is undefined or null");
    return false;
  }

  // Free integrations available to all users
  if (integration.category === "Free Job Posting") {
    return true;
  }

  // Enterprise-only integrations
  const enterpriseOnlyCategories = [
    "Compliance Boards",
    "Background Boards",
    "Onboarding Boards"
  ];

  if (enterpriseOnlyCategories.includes(integration.category)) {
    return userPlan === "enterprise";
  }

  // Business and Enterprise plans get access to all integrations
  if (userPlan === "business" || userPlan === "enterprise") {
    return true;
  }

  // Pro plan gets access to standard integrations
  if (userPlan === "pro") {
    const proAvailableCategories = [
      "Social",
      "Productivity",
      "CRM & HRMS"
    ];
    return proAvailableCategories.includes(integration.category);
  }

  // Free trial gets limited integrations
  if (userPlan === "free_trial") {
    return integration.category === "Productivity";
  }

  // Default: no access for users without a plan
  return false;
};

/**
 * Get a list of integrations available for the current plan
 * Enhanced with error handling
 */
export const getAvailableIntegrations = (
  integrations: IntegrationItem[],
  userPlan: PlanType
): IntegrationItem[] => {
  if (!integrations || !Array.isArray(integrations)) {
    console.error("Invalid integrations array provided", integrations);
    return [];
  }
  
  try {
    return integrations.filter(integration => 
      isIntegrationAvailableForPlan(integration, userPlan)
    );
  } catch (error) {
    console.error("Error filtering available integrations:", error);
    return [];
  }
};

/**
 * Get restricted categories based on user's plan
 * Enhanced with more precise category restrictions
 */
export const getRestrictedCategories = (userPlan: PlanType): string[] => {
  if (!userPlan) {
    // All categories except free ones are restricted for users without a plan
    return ["VMS Systems", "ATS", "Paid Job Boards", "Compliance Boards", 
            "Background Boards", "Onboarding Boards", "CRM & HRMS", "Social"];
  }
  
  if (userPlan === "free_trial") {
    return ["VMS Systems", "ATS", "Paid Job Boards", "Compliance Boards", 
            "Background Boards", "Onboarding Boards", "CRM & HRMS", "Social"];
  }
  
  if (userPlan === "pro") {
    return ["VMS Systems", "ATS", "Paid Job Boards", "Compliance Boards", 
            "Background Boards", "Onboarding Boards"];
  }

  if (userPlan === "business") {
    return ["Compliance Boards", "Background Boards", "Onboarding Boards"];
  }
  
  // Enterprise has access to everything
  return [];
};

/**
 * Enhanced plan requirement function with normalized plan names and clearer return type
 * Get the most suitable plan for an integration
 * Returns the plan name, level and whether it's included with that plan
 */
export const getRequiredPlanForIntegration = (integration: IntegrationItem): PlanRequirement => {
  if (!integration) {
    console.error("Integration object is undefined or null");
    return { planName: "Unknown", planLevel: 0, isIncluded: false };
  }
  
  switch (integration.category) {
    case "Free Job Posting":
      return { planName: "Free", planLevel: 0, isIncluded: true };
    case "Productivity":
      return { planName: "Free Trial", planLevel: 1, isIncluded: true };
    case "Social":
    case "CRM & HRMS":
      return { planName: "Pro", planLevel: 2, isIncluded: true };
    case "Compliance Boards":
    case "Background Boards":  
    case "Onboarding Boards":
      return { planName: "Enterprise", planLevel: 4, isIncluded: true };
    default:
      return { planName: "Business", planLevel: 3, isIncluded: true };
  }
};

/**
 * Check if a user's plan meets the requirements for an integration
 * New helper function for clearer plan comparisons
 */
export const doesPlanMeetRequirements = (
  userPlan: PlanType,
  requiredPlan: PlanRequirement
): boolean => {
  const userPlanLevel = userPlan ? planLevelMap[userPlan] : planLevelMap["null"];
  return userPlanLevel >= requiredPlan.planLevel;
};

/**
 * Get formatted display name for the plan requirement
 * New helper for consistent plan display across components
 */
export const getPlanRequirementDisplay = (integration: IntegrationItem): string => {
  const { planName } = getRequiredPlanForIntegration(integration);
  return planName === "Free" ? planName : `${planName}+`;
};

/**
 * Determine if the integration needs an external authentication/authorization
 * Enhanced with more robust detection
 */
export const needsExternalAuth = (integration: IntegrationItem): boolean => {
  if (!integration) {
    console.error("Integration object is undefined or null");
    return false;
  }
  
  // Expanded list of OAuth-based integrations for better detection
  const oAuthBasedIntegrations = [
    "LinkedIn", "Twitter", "Google", "Microsoft", "Facebook", 
    "GitHub", "Slack", "Zoom", "Dropbox", "Box"
  ];
  
  // Check if the integration name contains any of the OAuth-based integration names
  return oAuthBasedIntegrations.some(name => 
    integration.name.toLowerCase().includes(name.toLowerCase())
  );
};

/**
 * Enhanced verification for integration configuration
 */
export const isIntegrationConfiguredCorrectly = (
  integration: IntegrationItem
): boolean => {
  if (!integration) {
    console.error("Integration object is undefined or null");
    return false;
  }
  
  // Basic check if the integration is connected
  if (!integration.connected) {
    return false;
  }
  
  // In a real app, would perform additional validation here
  // such as checking for required API keys, endpoints, etc.
  
  return true;
};

/**
 * Get error message for integration configuration issues
 * New helper for consistent error messages
 */
export const getIntegrationConfigurationError = (
  integration: IntegrationItem
): string | null => {
  if (!integration) {
    return "Invalid integration";
  }
  
  if (!integration.connected) {
    return "Integration not connected";
  }
  
  // Further validation could be done here in a real app
  
  return null;
};
