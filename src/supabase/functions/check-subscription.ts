
// This code should be implemented as an Edge Function in Supabase
// File: supabase/functions/check-subscription/index.ts

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Map from Stripe price IDs to our plan IDs
// Replace these with your actual Stripe price IDs
const PRICE_TO_PLAN = {
  "price_basic_monthly": "basic",
  "price_basic_yearly": "basic",
  "price_professional_monthly": "professional",
  "price_professional_yearly": "professional",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    // Retrieve user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if an existing Stripe customer record exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length === 0) {
      return new Response(JSON.stringify({ 
        subscribed: false,
        plan: null
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customers.data[0].id,
      status: "active",
      expand: ["data.items.data.price"]
    });

    if (subscriptions.data.length === 0) {
      return new Response(JSON.stringify({ 
        subscribed: false,
        plan: null 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Get the price ID from the subscription to identify the plan
    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0].price.id;
    const plan = PRICE_TO_PLAN[priceId] || "unknown";

    // Check for Pay-Per-Use credits
    const payPerUseFunds = 0; // You would need to implement a system to track pay-per-use credits

    return new Response(
      JSON.stringify({
        subscribed: true,
        plan,
        expiresAt: new Date(subscription.current_period_end * 1000).toISOString(),
        payPerUseCredits: payPerUseFunds
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking subscription:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
