
import { PricingPlan } from "@/types/pricing";

export const getPricingPlans = (billingPeriod: "monthly" | "yearly"): PricingPlan[] => {
  return [
    {
      name: "Free Tier",
      price: "$0",
      description: "Best for individuals exploring AI automation",
      features: [
        { text: "Limited AI workflows & automations", included: true },
        { text: "Access to basic Agentic AI models", included: true },
        { text: "Community support", included: true },
        { text: "Basic documentation", included: true },
        { text: "No team collaboration", included: false },
        { text: "No custom integrations", included: false },
        { text: "No priority access", included: false },
      ],
      highlight: false,
      cta: "Start Free",
      planId: "free_trial",
      popular: false,
      usageLimit: "Limited",
      apiCalls: "100/month"
    },
    {
      name: "Pro Plan",
      price: billingPeriod === "monthly" ? "$49" : "$490",
      description: "Best for startups & small businesses",
      features: [
        { text: "50 AI workflows/month", included: true },
        { text: "5,000 API calls/month", included: true },
        { text: "Standard integrations (Zapier, Slack, Notion)", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Team collaboration", included: false },
        { text: "API access for custom integrations", included: false },
      ],
      highlight: false,
      cta: "Get Started",
      planId: "pro",
      popular: false,
      usageLimit: "50 workflows/month",
      apiCalls: "5,000/month"
    },
    {
      name: "Business Plan",
      price: billingPeriod === "monthly" ? "$199" : "$1,990",
      description: "Best for growing teams & mid-sized companies",
      features: [
        { text: "Unlimited AI workflows", included: true },
        { text: "50,000 API calls/month", included: true },
        { text: "Advanced automation & analytics", included: true },
        { text: "Priority support", included: true },
        { text: "Team collaboration", included: true },
        { text: "API access for custom integrations", included: true },
        { text: "Dedicated onboarding", included: true },
      ],
      highlight: true,
      cta: "Choose Business",
      planId: "business",
      popular: true,
      usageLimit: "Unlimited",
      apiCalls: "50,000/month"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Best for large organizations with high-scale AI needs",
      features: [
        { text: "Fully customizable AI solutions", included: true },
        { text: "Unlimited API calls & workflows", included: true },
        { text: "Dedicated account manager & SLAs", included: true },
        { text: "On-premise or private cloud deployment", included: true },
        { text: "White-label options", included: true },
        { text: "AI customization options", included: true },
        { text: "Custom integrations", included: true },
      ],
      highlight: false,
      cta: "Contact Sales",
      planId: "enterprise",
      popular: false,
      usageLimit: "Unlimited",
      apiCalls: "Unlimited"
    }
  ];
};
