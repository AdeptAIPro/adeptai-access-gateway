
import { supabase } from "@/lib/supabase";

// Sample chatbot responses for common questions
const CHATBOT_RESPONSES = {
  default: "I'm AdeptAI's assistant. I can answer questions about our platform, features, pricing, and more. How can I help you today?",
  greeting: "Hello! I'm AdeptAI's virtual assistant. How can I help you today?",
  notUnderstood: "I'm sorry, I didn't understand that. Could you please rephrase your question?",
  features: "AdeptAI offers intelligent automation, advanced analytics, and seamless integrations with your existing tools. Our key features include smart automation, intelligent analysis, and seamless integration capabilities.",
  pricing: "We offer flexible pricing plans tailored to businesses of all sizes. You can check our detailed pricing information on our pricing page.",
  integration: "AdeptAI connects with a wide range of systems including VMS, ATS, job boards, social platforms, compliance systems, and more. Visit our integrations page for more details.",
  support: "We provide 24/7 customer support through email, chat, and phone. Our team is ready to assist you with any questions or issues you may have.",
  trial: "Yes, we offer a free trial period so you can experience the full benefits of AdeptAI before committing. Sign up on our website to get started.",
  security: "Security is our top priority. AdeptAI employs enterprise-grade encryption, regular security audits, and complies with industry standards to keep your data safe.",
  dataPrivacy: "We take data privacy seriously. AdeptAI complies with GDPR, CCPA, and other privacy regulations. We never sell your data and maintain strict access controls.",
  about: "AdeptAI is a leading provider of AI-powered automation solutions for businesses. Our mission is to help organizations streamline workflows and make smarter decisions.",
  contact: "You can reach our team via email at support@adeptai.com, by phone at (555) 123-4567, or through the contact form on our website.",
  careers: "We're always looking for talented individuals to join our team. Check out our careers page for current openings and opportunities.",
  demo: "We'd be happy to schedule a personalized demo of AdeptAI for your team. Please visit our contact page to request a demo."
};

// Categories for understanding user intent
const INTENT_CATEGORIES = {
  greeting: ["hello", "hi", "hey", "greetings", "howdy", "good morning", "good afternoon", "good evening"],
  features: ["feature", "capabilities", "what can", "do you offer", "services", "provide", "functions"],
  pricing: ["price", "cost", "subscription", "payment", "plan", "package", "fee", "charge", "billing", "how much"],
  integration: ["integrate", "connection", "connect", "api", "third-party", "platforms", "systems", "work with"],
  support: ["support", "help", "assistance", "customer service", "ticket", "contact", "reach", "request help"],
  trial: ["trial", "free", "demo", "try out", "test", "evaluation", "sample", "preview"],
  security: ["security", "secure", "protection", "data security", "encryption", "safe", "vulnerability"],
  dataPrivacy: ["privacy", "data protection", "personal information", "data usage", "GDPR", "CCPA", "confidential"],
  about: ["about", "company", "who are you", "background", "history", "mission", "vision", "team"],
  contact: ["contact", "email", "phone", "call", "message", "reach out", "talk to"],
  careers: ["career", "job", "position", "hiring", "employment", "work at", "join team"],
  demo: ["demonstration", "show me", "presentation", "showcase", "walkthrough"]
};

// Determine the intent of the user's message
const determineIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  for (const [category, keywords] of Object.entries(INTENT_CATEGORIES)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return category;
    }
  }
  
  // If we're connected to Supabase, we could use more sophisticated intent detection here
  
  return "default";
};

// Process the user's message and return a response
export const processMessage = async (message: string): Promise<string> => {
  try {
    // For a real implementation, we might connect to an LLM API here
    // For now, we'll use simple intent matching with predefined responses
    
    const intent = determineIntent(message);
    
    // Return the appropriate response based on intent
    return CHATBOT_RESPONSES[intent as keyof typeof CHATBOT_RESPONSES] || CHATBOT_RESPONSES.notUnderstood;
  } catch (error) {
    console.error("Error processing chatbot message:", error);
    return "I'm sorry, I'm experiencing some technical difficulties. Please try again later.";
  }
};

// Future enhancement: Store chat history in Supabase when properly connected
export const saveChatHistory = async (sessionId: string, messages: any[]): Promise<boolean> => {
  try {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      // Skip saving if no real Supabase connection
      console.log("Mock: Chat history would be saved to Supabase");
      return true;
    }
    
    // This would be implemented when connected to a real Supabase instance
    // const { error } = await supabase
    //   .from('chat_history')
    //   .upsert({ 
    //     session_id: sessionId,
    //     messages: messages,
    //     updated_at: new Date()
    //   });
    
    // return !error;
    
    return true;
  } catch (error) {
    console.error("Error saving chat history:", error);
    return false;
  }
};
