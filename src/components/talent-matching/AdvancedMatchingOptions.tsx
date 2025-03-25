
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAvailableMatchingModels } from "@/services/talent-matching/MatchingService";
import { MatchingOptions, MatchingModel } from "./types";
import { Brain, Filter, Gauge, Sparkles } from "lucide-react";
import AlgorithmsTab from "./advanced-options/AlgorithmsTab";
import FiltersTab from "./advanced-options/FiltersTab";
import ModelsTab from "./advanced-options/ModelsTab";

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
              Models
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="algorithms">
            <AlgorithmsTab 
              matchingOptions={matchingOptions} 
              handleToggleChange={handleToggleChange} 
            />
          </TabsContent>
          
          <TabsContent value="filters">
            <FiltersTab 
              matchingOptions={matchingOptions}
              handleToggleChange={handleToggleChange}
              setMatchingOptions={setMatchingOptions}
            />
          </TabsContent>
          
          <TabsContent value="models">
            <ModelsTab 
              matchingOptions={matchingOptions}
              setMatchingOptions={setMatchingOptions}
              matchingModels={matchingModels}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedMatchingOptions;
