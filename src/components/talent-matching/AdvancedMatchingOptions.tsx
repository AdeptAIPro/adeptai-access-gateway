
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAvailableMatchingModels } from "@/services/talent-matching/MatchingService";
import { MatchingOptions, MatchingModel } from "./types";
import { Brain, Filter, Gauge, Shield, Sparkles } from "lucide-react";

interface AdvancedMatchingOptionsProps {
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
}

const AdvancedMatchingOptions: React.FC<AdvancedMatchingOptionsProps> = ({
  matchingOptions,
  setMatchingOptions,
}) => {
  const [matchingModels, setMatchingModels] = useState<MatchingModel[]>([]);
  
  // Fetch matching models when component mounts
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await getAvailableMatchingModels();
        setMatchingModels(models);
      } catch (error) {
        console.error("Error fetching matching models:", error);
        setMatchingModels([]);
      }
    };
    
    fetchModels();
  }, []);

  const handleToggleChange = (option: keyof MatchingOptions) => {
    setMatchingOptions({
      ...matchingOptions,
      [option]: !matchingOptions[option as keyof MatchingOptions],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-primary" />
          Advanced Matching Options
        </CardTitle>
        <CardDescription>
          Configure AI-powered matching algorithms and processing techniques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="algorithms" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="algorithms">
              <Brain className="mr-2 h-4 w-4" />
              Algorithms
            </TabsTrigger>
            <TabsTrigger value="filters">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </TabsTrigger>
            <TabsTrigger value="models">
              <Gauge className="mr-2 h-4 w-4" />
              ML Models
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="algorithms" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="filters" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="skill-based">Skill-Based Filtering</Label>
                  <p className="text-sm text-muted-foreground">
                    Match candidates based on explicit skills in their profile
                  </p>
                </div>
                <Switch
                  id="skill-based"
                  checked={matchingOptions.useSkillBasedFiltering}
                  onCheckedChange={() => handleToggleChange("useSkillBasedFiltering")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compliance">Compliance Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Ensure candidates meet regulatory and certification requirements
                  </p>
                </div>
                <Switch
                  id="compliance"
                  checked={matchingOptions.useComplianceVerification}
                  onCheckedChange={() => handleToggleChange("useComplianceVerification")}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="min-score">Minimum Match Score: {matchingOptions.minMatchScore}%</Label>
                </div>
                <Slider
                  id="min-score"
                  min={50}
                  max={95}
                  step={5}
                  value={[matchingOptions.minMatchScore]}
                  onValueChange={(value) => 
                    setMatchingOptions({
                      ...matchingOptions,
                      minMatchScore: value[0],
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="models" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedMatchingOptions;
