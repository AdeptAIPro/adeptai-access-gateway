
import { MatchingModel } from "@/components/talent-matching/types";
import { supabase } from "@/lib/supabase";

export async function getAvailableMatchingModelsFromDatabase(): Promise<MatchingModel[]> {
  try {
    const { data, error } = await supabase
      .from('matching_models')
      .select('*');
    
    if (error) {
      console.error("Error fetching matching models from database:", error);
      throw error;
    }
    
    return data as MatchingModel[];
  } catch (error) {
    console.error("Failed to fetch matching models:", error);
    return [];
  }
}

export function getDefaultMatchingModels(): MatchingModel[] {
  return [
    {
      id: "semantic-match-1",
      name: "Semantic Matching",
      description: "Uses NLP to match based on meaning rather than keywords",
      complexity: "Advanced",
      performance: 85,
      accuracyScore: 0.79,
      type: "semantic"
    },
    {
      id: "skill-match-1",
      name: "Skill-Based Matching",
      description: "Matches candidates based on skills alignment",
      complexity: "Basic",
      performance: 92,
      accuracyScore: 0.82,
      type: "skill"
    },
    {
      id: "hybrid-match-1",
      name: "Hybrid Matching",
      description: "Combined skill and semantic matching approach",
      complexity: "Advanced",
      performance: 91,
      accuracyScore: 0.88,
      type: "hybrid"
    },
    {
      id: "rag-enhanced-1",
      name: "RAG-Enhanced Matching",
      description: "Retrieval Augmented Generation for candidate matching",
      complexity: "Experimental",
      performance: 81,
      accuracyScore: 0.91,
      type: "rag"
    }
  ];
}
