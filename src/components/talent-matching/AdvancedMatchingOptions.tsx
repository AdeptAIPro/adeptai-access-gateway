
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchingModel, MatchingOptions } from "./types";
import ModelsTab from "./advanced-options/ModelsTab";
import FiltersTab from "./advanced-options/FiltersTab";
import AlgorithmsTab from "./advanced-options/AlgorithmsTab";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles, Cpu, SlidersHorizontal, Network } from "lucide-react";

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
    <Card className="p-5 mb-6 border-adept/20 shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <h3 className="text-lg font-semibold flex items-center">
          <Cpu className="h-5 w-5 text-adept mr-2" />
          Advanced AI Matching Options
        </h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="cross-source-intel" className="flex items-center gap-2 cursor-pointer">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="font-medium">Cross-Source Intelligence</span>
          </Label>
          <Switch 
            id="cross-source-intel" 
            checked={useCrossSourceIntelligence}
            onCheckedChange={handleCrossSourceToggle}
            className="data-[state=checked]:bg-amber-500"
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 bg-gray-100 p-1 rounded-md">
          <TabsTrigger value="models" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Cpu className="h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="filters" className="flex items-center gap-2 data-[state=active]:bg-white">
            <SlidersHorizontal className="h-4 w-4" />
            Match Filters
          </TabsTrigger>
          <TabsTrigger value="algorithms" className="flex items-center gap-2 data-[state=active]:bg-white">
            <Network className="h-4 w-4" />
            Algorithms
          </TabsTrigger>
        </TabsList>
        <TabsContent value="models" className="border rounded-md p-4">
          <ModelsTab
            matchingOptions={matchingOptions}
            setMatchingOptions={setMatchingOptions}
            matchingModels={matchingModels}
          />
        </TabsContent>
        <TabsContent value="filters" className="border rounded-md p-4">
          <FiltersTab
            matchingOptions={matchingOptions}
            handleToggleChange={handleToggleChange}
            setMatchingOptions={setMatchingOptions}
          />
        </TabsContent>
        <TabsContent value="algorithms" className="border rounded-md p-4">
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
