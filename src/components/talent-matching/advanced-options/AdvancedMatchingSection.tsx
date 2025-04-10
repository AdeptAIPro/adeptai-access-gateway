
import { useState, useEffect } from "react";
import { MatchingModel, MatchingOptions } from "../types";
import AdvancedOptionsToggle from "../AdvancedOptionsToggle";
import { getAvailableMatchingModels } from "@/services/talent-matching/MatchingService";
import { useToast } from "@/hooks/use-toast";

interface AdvancedMatchingSectionProps {
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
  useCrossSourceIntelligence: boolean;
  setUseCrossSourceIntelligence: (value: boolean) => void;
}

const AdvancedMatchingSection: React.FC<AdvancedMatchingSectionProps> = ({
  showAdvancedOptions,
  setShowAdvancedOptions,
  matchingOptions,
  setMatchingOptions,
  useCrossSourceIntelligence,
  setUseCrossSourceIntelligence,
}) => {
  const { toast } = useToast();
  const [availableModels, setAvailableModels] = useState<MatchingModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoadingModels(true);
      setError(null);
      
      try {
        console.log("Fetching matching models...");
        const models = await getAvailableMatchingModels();
        console.log("Fetched models:", models);
        setAvailableModels(models);
        if (models.length > 0) {
          setMatchingOptions({
            ...matchingOptions,
            matchingModel: models[0].id
          });
        }
      } catch (err) {
        console.error("Error fetching matching models:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to load matching models";
        setError(errorMessage);
        // Use default models if API fails
        const defaultModels = [
          { id: "basic", name: "Standard Matching", description: "Basic matching algorithm" },
          { id: "advanced", name: "Advanced Matching", description: "Enhanced semantic matching" }
        ];
        setAvailableModels(defaultModels);
        setMatchingOptions({
          ...matchingOptions,
          matchingModel: defaultModels[0].id
        });
        
        toast({
          title: "Using default models",
          description: "Couldn't connect to server, using default matching models",
          variant: "default",
        });
      } finally {
        setIsLoadingModels(false);
      }
    };

    loadModels();
  }, [toast, matchingOptions, setMatchingOptions]);

  return (
    <AdvancedOptionsToggle
      showAdvancedOptions={showAdvancedOptions}
      matchingOptions={matchingOptions}
      setMatchingOptions={setMatchingOptions}
      matchingModels={availableModels}
      useCrossSourceIntelligence={useCrossSourceIntelligence}
      setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
    />
  );
};

export default AdvancedMatchingSection;
