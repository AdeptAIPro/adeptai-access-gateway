
export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  cta: string;
  planId: string;
  popular?: boolean;
  usageLimit: string;
  apiCalls?: string;
}
