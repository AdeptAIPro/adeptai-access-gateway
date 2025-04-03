
import { IntegrationItem } from "@/types/integration";
import { PricingPlan } from "@/types/pricing";

type PlanType = "free_trial" | "pro" | "business" | "enterprise" | null;

/**
 * Check if an integration is available for the user's plan
 */
export const isIntegrationAvailableForPlan = (
  integration: IntegrationItem,
  userPlan: PlanType
): boolean => {
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
 */
export const getAvailableIntegrations = (
  integrations: IntegrationItem[],
  userPlan: PlanType
): IntegrationItem[] => {
  return integrations.filter(integration => 
    isIntegrationAvailableForPlan(integration, userPlan)
  );
};

/**
 * Get restricted categories based on user's plan
 */
export const getRestrictedCategories = (userPlan: PlanType): string[] => {
  if (!userPlan) {
    // All categories except free ones are restricted for users without a plan
    return ["VMS Systems", "ATS", "Paid Job Boards", "Compliance Boards", 
            "Background Boards", "Onboarding Boards", "CRM & HRMS"];
  }
  
  if (userPlan === "free_trial") {
    return ["VMS Systems", "ATS", "Paid Job Boards", "Compliance Boards", 
            "Background Boards", "Onboarding Boards", "CRM & HRMS", "Social"];
  }
  
  if (userPlan === "pro") {
    return ["VMS Systems", "ATS", "Paid Job Boards", "Compliance Boards", 
            "Background Boards", "Onboarding Boards"];
  }
  
  // Business and enterprise have access to everything
  return [];
};

/**
 * Get the most suitable plan for an integration
 * Returns the plan name and whether it's included with that plan
 */
export const getRequiredPlanForIntegration = (integration: IntegrationItem): { 
  planName: string; 
  isIncluded: boolean;
} => {
  switch (integration.category) {
    case "Free Job Posting":
      return { planName: "Free", isIncluded: true };
    case "Productivity":
      return { planName: "Free Trial", isIncluded: true };
    case "Social":
    case "CRM & HRMS":
      return { planName: "Pro", isIncluded: true };
    case "Compliance Boards":
    case "Background Boards":  
    case "Onboarding Boards":
      return { planName: "Enterprise", isIncluded: true };
    default:
      return { planName: "Business", isIncluded: true };
  }
};

/**
 * Determine if the integration needs an external authentication/authorization
 */
export const needsExternalAuth = (integration: IntegrationItem): boolean => {
  // This would be based on the actual integration implementation
  // For example, OAuth-based integrations would return true
  const oAuthBasedIntegrations = ["LinkedIn", "Twitter", "Google", "Microsoft"];
  
  return oAuthBasedIntegrations.some(name => 
    integration.name.toLowerCase().includes(name.toLowerCase())
  );
};

/**
 * Verify if an integration is configured correctly
 * In a real app, this would check if the integration has all
 * necessary configuration parameters
 */
export const isIntegrationConfiguredCorrectly = (
  integration: IntegrationItem
): boolean => {
  // This is just a placeholder implementation
  // In a real app, you would check if the integration has all
  // necessary API keys, endpoints, etc.
  return integration.connected;
};
