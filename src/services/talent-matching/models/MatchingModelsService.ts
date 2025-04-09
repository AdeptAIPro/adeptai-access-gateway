
import { MatchingModel } from "@/components/talent-matching/types";
import { supabase } from "@/lib/supabase";

// Function to get available matching models from the database
export async function getAvailableMatchingModelsFromDatabase(): Promise<MatchingModel[]> {
  try {
    const { data, error } = await supabase.from('matching_models').select('*');
    
    if (error) {
      console.error('Error fetching matching models:', error);
      return [];
    }
    
    return data.map((model: any) => ({
      id: model.id,
      name: model.name,
      description: model.description,
      complexity: model.complexity || 'standard',
      performance: model.performance || 80,
      accuracyScore: model.accuracy_score || 75,
      type: model.type || 'ai'
    }));
  } catch (error) {
    console.error('Error in getAvailableMatchingModelsFromDatabase:', error);
    return [];
  }
}

// Function to get matching model by id
export async function getMatchingModelById(id: string): Promise<MatchingModel | null> {
  try {
    // First check the database
    const { data, error } = await supabase
      .from('matching_models')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      // If not found in database, check default models
      const defaultModels = getDefaultMatchingModels();
      return defaultModels.find(model => model.id === id) || null;
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      complexity: data.complexity || 'standard',
      performance: data.performance || 80,
      accuracyScore: data.accuracy_score || 75,
      type: data.type || 'ai'
    };
  } catch (error) {
    console.error('Error in getMatchingModelById:', error);
    return null;
  }
}

// Default matching models
export function getDefaultMatchingModels(): MatchingModel[] {
  return [
    {
      id: "openai-ada-002",
      name: "OpenAI Ada 002",
      description: "Embeddings model for semantic search",
      complexity: "advanced",
      performance: 90,
      accuracyScore: 85,
      type: "openai"
    },
    {
      id: "tensorflow-bert",
      name: "TensorFlow BERT",
      description: "BERT model for technical role matching",
      complexity: "advanced",
      performance: 88,
      accuracyScore: 84,
      type: "tensorflow"
    },
    {
      id: "pytorch-roberta",
      name: "PyTorch RoBERTa",
      description: "Fine-tuned model for technical skills",
      complexity: "advanced",
      performance: 92,
      accuracyScore: 86,
      type: "pytorch"
    },
    {
      id: "hybrid-rag",
      name: "Hybrid RAG System",
      description: "Advanced retrieval augmented generation",
      complexity: "advanced",
      performance: 94,
      accuracyScore: 89,
      type: "hybrid"
    }
  ];
}
