
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchingModel, MatchingOptions } from "./types";
import ModelsTab from "./advanced-options/ModelsTab";
import FiltersTab from "./advanced-options/FiltersTab";
import AlgorithmsTab from "./advanced-options/AlgorithmsTab";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface AdvancedMatchingOptionsProps {
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
  matchingModels: MatchingModel[];
  useCrossSourceIntelligence: boolean;
  setUseCrossSourceIntelligence: (value: boolean) => void;
}

const AdvancedMatchingOptions: React.FC<AdvancedMatchingOptionsProps> = ({
  matchingOptions,
  setMatchingOptions,
  matchingModels,
  useCrossSourceIntelligence,
  setUseCrossSourceIntelligence
}) => {
  const [activeTab, setActiveTab] = useState("models");

  const handleCrossSourceToggle = (checked: boolean) => {
    setUseCrossSourceIntelligence(checked);
  };

  const handleToggleChange = (option: keyof MatchingOptions) => {
    setMatchingOptions({
      ...matchingOptions,
      [option]: !matchingOptions[option],
    });
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <h3 className="text-lg font-semibold">Advanced Matching Options</h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="cross-source-intel" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Cross-Source Intelligence
          </Label>
          <Switch 
            id="cross-source-intel" 
            checked={useCrossSourceIntelligence}
            onCheckedChange={handleCrossSourceToggle}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="filters">Match Filters</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
        </TabsList>
        <TabsContent value="models">
          <ModelsTab
            matchingOptions={matchingOptions}
            setMatchingOptions={setMatchingOptions}
            matchingModels={matchingModels}
          />
        </TabsContent>
        <TabsContent value="filters">
          <FiltersTab
            matchingOptions={matchingOptions}
            handleToggleChange={handleToggleChange}
            setMatchingOptions={setMatchingOptions}
          />
        </TabsContent>
        <TabsContent value="algorithms">
          <AlgorithmsTab
            matchingOptions={matchingOptions}
            handleToggleChange={handleToggleChange}
            setMatchingOptions={setMatchingOptions}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AdvancedMatchingOptions;
