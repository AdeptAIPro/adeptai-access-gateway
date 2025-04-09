
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Network, Database, Users } from "lucide-react";
import { getTalentSources } from "@/services/talent/TalentSourcesService";

interface TargetSourceSelectionProps {
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
}

const TargetSourceSelection: React.FC<TargetSourceSelectionProps> = ({
  selectedSources,
  setSelectedSources,
}) => {
  const [availableSources, setAvailableSources] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadSources = async () => {
      try {
        setIsLoading(true);
        const sources = await getTalentSources();
        setAvailableSources(sources);
        // Pre-select Internal Database by default
        if (selectedSources.length === 0 && sources.includes("Internal Database")) {
          setSelectedSources(["Internal Database"]);
        }
      } catch (error) {
        console.error("Error loading talent sources:", error);
        // Fallback to default sources if there's an error
        setAvailableSources([
          "LinkedIn",
          "Indeed",
          "Glassdoor",
          "ZipRecruiter",
          "Internal Database",
          "JobDiva",
          "Ceipal"
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSources();
  }, [setSelectedSources, selectedSources.length]);

  const handleSourceToggle = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter(s => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  return (
    <Card className="mb-6 border-adept/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Network className="h-5 w-5 text-adept mr-2" />
          Target Candidate Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Select where to search for matching candidates. Multiple sources can be selected.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-adept border-opacity-50 border-t-adept rounded-full"></div>
          </div>
        ) : (
          <ScrollArea className="h-[180px] pr-4">
            <div className="space-y-4">
              {availableSources.map((source) => (
                <div key={source} className="flex items-start space-x-2">
                  <Checkbox
                    id={`source-${source}`}
                    checked={selectedSources.includes(source)}
                    onCheckedChange={() => handleSourceToggle(source)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor={`source-${source}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {source}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {source === "Internal Database" 
                        ? "Your organization's candidate database" 
                        : `Candidate profiles from ${source}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <Database className="h-4 w-4 mr-1 text-adept" />
            <span>Selected: </span>
            <span className="font-medium ml-1">
              {selectedSources.length} {selectedSources.length === 1 ? "source" : "sources"}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1 text-adept" />
            <span>Est. Reach: </span>
            <span className="font-medium ml-1">
              {selectedSources.length > 0 
                ? `${(selectedSources.length * 1000).toLocaleString()}+ candidates`
                : "No sources selected"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetSourceSelection;
