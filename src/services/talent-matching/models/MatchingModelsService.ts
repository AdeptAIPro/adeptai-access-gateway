
import { MatchingModel } from "../../../components/talent-matching/types";
import { Brain, Cpu, Network, LineChart } from "lucide-react";

// Define matching models with their characteristics
export const getAvailableMatchingModels = (): MatchingModel[] => {
  return [
    {
      id: "basic-skill-match",
      name: "Basic Skill Matching",
      description: "Simple keyword-based matching for skills and experience",
      complexity: "basic",
      performance: 70,
      accuracyScore: 65,
      icon: Brain,
      type: "keyword" // Add type property
    },
    {
      id: "advanced-semantic",
      name: "Advanced Semantic Matching",
      description: "Uses NLP to understand job requirements and candidate profiles semantically",
      complexity: "advanced",
      performance: 92,
      accuracyScore: 88,
      icon: Network,
      type: "semantic" // Add type property
    },
    {
      id: "hybrid-match",
      name: "Hybrid Matching Engine",
      description: "Combines keyword matching with semantic understanding",
      complexity: "intermediate",
      performance: 85,
      accuracyScore: 82,
      icon: Cpu,
      type: "hybrid" // Add type property
    },
    {
      id: "ml-prediction",
      name: "ML Prediction Model",
      description: "Uses machine learning to predict candidate success based on historical data",
      complexity: "advanced",
      performance: 95,
      accuracyScore: 89,
      icon: LineChart,
      type: "ml" // Add type property
    }
  ];
};

export const getDefaultMatchingModel = (): MatchingModel => {
  return getAvailableMatchingModels()[0];
};

export const getMatchingModelById = (id: string): MatchingModel | undefined => {
  return getAvailableMatchingModels().find(model => model.id === id);
};
