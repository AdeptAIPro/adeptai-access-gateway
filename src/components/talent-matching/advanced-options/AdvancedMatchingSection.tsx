
import { useState, useEffect } from "react";
import { MatchingModel, MatchingOptions } from "../types";
import AdvancedOptionsToggle from "../AdvancedOptionsToggle";
import { getAvailableMatchingModels } from "@/services/talent-matching/MatchingService";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

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
        // Use default models if API fails - ensure they have ALL required properties
        const defaultModels: MatchingModel[] = [
          { 
            id: "basic", 
            name: "Standard Matching", 
            description: "Basic matching algorithm",
            complexity: "Basic",
            performance: 75,
            accuracyScore: 0.7,
            type: "standard"
          },
          { 
            id: "advanced", 
            name: "Advanced Matching", 
            description: "Enhanced semantic matching",
            complexity: "Advanced",
            performance: 85,
            accuracyScore: 0.82,
            type: "semantic"
          },
          { 
            id: "ai-cross-source", 
            name: "Cross-Source Intelligence", 
            description: "AI-powered verification across multiple sources",
            complexity: "Advanced+",
            performance: 92,
            accuracyScore: 0.94,
            type: "ai-enhanced"
          }
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
    <>
      {useCrossSourceIntelligence && (
        <Alert className="mb-4 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-700" />
          <AlertTitle className="text-blue-800">Cross-Source Intelligence Enabled</AlertTitle>
          <AlertDescription className="text-blue-700">
            Your search will be verified across multiple sources including social media, job boards, and internal databases to ensure the highest quality of candidates.
          </AlertDescription>
        </Alert>
      )}
      
      <AdvancedOptionsToggle
        showAdvancedOptions={showAdvancedOptions}
        matchingOptions={matchingOptions}
        setMatchingOptions={setMatchingOptions}
        matchingModels={availableModels}
        useCrossSourceIntelligence={useCrossSourceIntelligence}
        setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
      />
    </>
  );
};

export default AdvancedMatchingSection;
