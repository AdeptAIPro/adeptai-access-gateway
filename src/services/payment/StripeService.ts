
import { supabase } from "@/lib/supabase";

export interface CheckoutOptions {
  planId: string;
  billingPeriod?: "monthly" | "yearly";
  successUrl?: string;
  cancelUrl?: string;
}

export const createCheckoutSession = async (options: CheckoutOptions): Promise<{ url: string } | { error: string }> => {
  try {
    const { planId, billingPeriod = "monthly", successUrl, cancelUrl } = options;
    
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: {
        planId,
        billingPeriod,
        successUrl: successUrl || window.location.origin + '/payment-success',
        cancelUrl: cancelUrl || window.location.origin + '/payment-canceled'
      }
    });

    if (error) {
      console.error("Stripe checkout error:", error);
      return { error: error.message || "Failed to create checkout session" };
    }

    return { url: data.url };
  } catch (error: any) {
    console.error("Stripe service error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
};

export const createPayPerUseCheckout = async (): Promise<{ url: string } | { error: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-pay-per-use', {
      body: {
        successUrl: window.location.origin + '/payment-success',
        cancelUrl: window.location.origin + '/payment-canceled'
      }
    });

    if (error) {
      console.error("Pay-per-use checkout error:", error);
      return { error: error.message || "Failed to create pay-per-use checkout" };
    }

    return { url: data.url };
  } catch (error: any) {
    console.error("Pay-per-use service error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
};

export const createApiPayAsYouGoCheckout = async (): Promise<{ url: string } | { error: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-api-pay-as-you-go', {
      body: {
        successUrl: window.location.origin + '/payment-success',
        cancelUrl: window.location.origin + '/payment-canceled'
      }
    });

    if (error) {
      console.error("API pay-as-you-go checkout error:", error);
      return { error: error.message || "Failed to create API pay-as-you-go checkout" };
    }

    return { url: data.url };
  } catch (error: any) {
    console.error("API pay-as-you-go service error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
};

export const checkSubscription = async (): Promise<{ subscribed: boolean; plan?: string } | { error: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-subscription');
    
    if (error) {
      console.error("Check subscription error:", error);
      return { error: error.message || "Failed to check subscription status" };
    }
    
    return data;
  } catch (error: any) {
    console.error("Subscription check error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
};
