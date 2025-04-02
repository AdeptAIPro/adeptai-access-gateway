
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MatchingOptions } from "../types";

interface AlgorithmsTabProps {
  matchingOptions: MatchingOptions;
  handleToggleChange: (option: keyof MatchingOptions) => void;
  setMatchingOptions: (options: MatchingOptions) => void;
}

const AlgorithmsTab: React.FC<AlgorithmsTabProps> = ({
  matchingOptions,
  handleToggleChange,
  setMatchingOptions,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="semantic-matching">Semantic Matching</Label>
          <p className="text-sm text-muted-foreground">
            Use NLP to understand the meaning behind job descriptions
          </p>
        </div>
        <Switch
          id="semantic-matching"
          checked={matchingOptions.useSemanticMatching}
          onCheckedChange={() => handleToggleChange("useSemanticMatching")}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="rag">Retrieval-Augmented Generation (RAG)</Label>
          <p className="text-sm text-muted-foreground">
            Combine vector search with LLM reasoning for better context
          </p>
        </div>
        <Switch
          id="rag"
          checked={matchingOptions.useRAG}
          onCheckedChange={() => handleToggleChange("useRAG")}
        />
      </div>
    </div>
  );
};

export default AlgorithmsTab;
