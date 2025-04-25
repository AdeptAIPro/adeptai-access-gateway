
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MatchingOptions } from "../types";
import { Shield } from "lucide-react";

interface ModelsTabProps {
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
}

const ModelsTab: React.FC<ModelsTabProps> = ({
  matchingOptions,
  setMatchingOptions,
}) => {
  // Default matching models
  const defaultModels = [
    {
      id: "openai-ada-002",
      name: "OpenAI Ada 002",
      description: "Fast embedding model for semantic search"
    },
    {
      id: "tensorflow-bert",
      name: "TensorFlow BERT",
      description: "Industry-trained model for technical roles"
    },
    {
      id: "pytorch-roberta",
      name: "PyTorch RoBERTa",
      description: "Specialized in technical skill extraction"
    },
    {
      id: "hybrid-rag",
      name: "Hybrid RAG System",
      description: "Advanced retrieval-augmented generation"
    }
  ];
  
  const [matchingModels, setMatchingModels] = useState(defaultModels);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="matching-model">AI Model Selection</Label>
        <Select
          value={matchingOptions.matchingModel}
          onValueChange={(value) => 
            setMatchingOptions({
              ...matchingOptions,
              matchingModel: value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent>
            {matchingModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span>{model.name}</span>
                  <span className="text-xs text-muted-foreground">{model.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-4 border rounded-md bg-muted/50">
        <h4 className="font-medium mb-2 flex items-center">
          <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
          Model Information
        </h4>
        <p className="text-sm text-muted-foreground">
          {matchingOptions.matchingModel === "openai-ada-002" && 
            "OpenAI's embedding model creates high-quality vector representations for semantic search."}
          {matchingOptions.matchingModel === "tensorflow-bert" && 
            "Custom BERT model trained on industry data for technical role matching."}
          {matchingOptions.matchingModel === "pytorch-roberta" && 
            "Fine-tuned RoBERTa model specialized in extracting and matching technical skills."}
          {matchingOptions.matchingModel === "hybrid-rag" && 
            "Advanced RAG system combining vector search with LLM reasoning for contextual matching."}
        </p>
      </div>
    </div>
  );
};

export default ModelsTab;
