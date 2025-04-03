
import { IntegrationItem } from "@/types/integration";

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
