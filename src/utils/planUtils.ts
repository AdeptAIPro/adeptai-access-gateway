
import { PlanType } from "@/services/integrations/IntegrationValidationService";

export interface PlanRequirement {
  planName: string;
  planLevel: number;
  isIncluded: boolean;
}

// Plan level mapping for comparison operations
export const planLevelMap: Record<string, number> = {
  "free_trial": 1,
  "pro": 2,
  "business": 3,
  "enterprise": 4,
  "null": 0
};

// Display names for plans
export const planDisplayNames: Record<string, string> = {
  "free_trial": "Free Trial",
  "pro": "Professional",
  "business": "Business",
  "enterprise": "Enterprise",
  "null": "No Plan"
};

// Check if user plan meets the requirement
export const doesPlanMeetRequirement = (
  userPlan: PlanType,
  requiredPlan: PlanRequirement
): boolean => {
  const userPlanLevel = userPlan ? planLevelMap[userPlan] : planLevelMap["null"];
  return userPlanLevel >= requiredPlan.planLevel;
};

// Get feature requirements
export const getFeatureRequirement = (feature: string): PlanRequirement => {
  // Mapping of features to their plan requirements
  const featureRequirements: Record<string, PlanRequirement> = {
    // Talent features
    "advanced_search": { planName: "Professional", planLevel: 2, isIncluded: true },
    "saved_searches": { planName: "Professional", planLevel: 2, isIncluded: true },
    "talent_export": { planName: "Professional", planLevel: 2, isIncluded: true },
    
    // Talent Matching features
    "advanced_matching": { planName: "Business", planLevel: 3, isIncluded: true },
    "match_export": { planName: "Professional", planLevel: 2, isIncluded: true },
    "custom_algorithms": { planName: "Business", planLevel: 3, isIncluded: true },
    "bulk_matching": { planName: "Business", planLevel: 3, isIncluded: true },
    
    // Payroll features
    "payroll_automation": { planName: "Business", planLevel: 3, isIncluded: true },
    "multi_country_payroll": { planName: "Enterprise", planLevel: 4, isIncluded: true },
    "tax_automation": { planName: "Business", planLevel: 3, isIncluded: true },
    
    // Agentic AI features
    "ai_agents": { planName: "Professional", planLevel: 2, isIncluded: true },
    "custom_agents": { planName: "Business", planLevel: 3, isIncluded: true },
    "multi_agent_workflows": { planName: "Enterprise", planLevel: 4, isIncluded: true },
    
    // Analytics features
    "basic_analytics": { planName: "Free Trial", planLevel: 1, isIncluded: true },
    "advanced_analytics": { planName: "Professional", planLevel: 2, isIncluded: true },
    "custom_reports": { planName: "Business", planLevel: 3, isIncluded: true },
    "predictive_analytics": { planName: "Enterprise", planLevel: 4, isIncluded: true },
    
    // Professional Skills features
    "skills_assessment": { planName: "Professional", planLevel: 2, isIncluded: true },
    "skills_development": { planName: "Professional", planLevel: 2, isIncluded: true },
    "custom_learning_paths": { planName: "Business", planLevel: 3, isIncluded: true },
    
    // Compliance features
    "compliance_monitoring": { planName: "Business", planLevel: 3, isIncluded: true },
    "automated_compliance": { planName: "Enterprise", planLevel: 4, isIncluded: true },
    
    // Onboarding features
    "basic_onboarding": { planName: "Professional", planLevel: 2, isIncluded: true },
    "custom_workflows": { planName: "Business", planLevel: 3, isIncluded: true },
    "integration_onboarding": { planName: "Business", planLevel: 3, isIncluded: true },
    
    // CRM features
    "basic_crm": { planName: "Free Trial", planLevel: 1, isIncluded: true },
    "advanced_crm": { planName: "Professional", planLevel: 2, isIncluded: true },
    "crm_automation": { planName: "Business", planLevel: 3, isIncluded: true },
  };
  
  return featureRequirements[feature] || { planName: "Enterprise", planLevel: 4, isIncluded: true };
};

// Format plan name for display
export const formatPlanName = (planName: string): string => {
  return planName === "Free Trial" ? "Free" : `${planName}+`;
};
