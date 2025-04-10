
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
        const models = await getAvailableMatchingModels();
        setAvailableModels(models);
        if (models.length > 0) {
          setMatchingOptions({
            ...matchingOptions,
            matchingModel: models[0].id
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load matching models";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
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
