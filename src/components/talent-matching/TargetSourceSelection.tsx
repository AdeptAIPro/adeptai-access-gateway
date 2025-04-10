
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getTalentSources } from "@/services/talent/TalentSearchService";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, Building, Database, Users } from "lucide-react";

interface TargetSourceSelectionProps {
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
}

const DEFAULT_SOURCES = [
  "Internal Database",
  "LinkedIn",
  "Indeed",
  "GitHub",
  "AngelList"
];

const TargetSourceSelection: React.FC<TargetSourceSelectionProps> = ({
  selectedSources,
  setSelectedSources
}) => {
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSources = async () => {
      setIsLoading(true);
      try {
        const fetchedSources = await getTalentSources();
        if (fetchedSources && fetchedSources.length > 0) {
          setSources(fetchedSources);
        } else {
          // Use default sources if API returns empty
          setSources(DEFAULT_SOURCES);
        }
      } catch (error) {
        console.error("Error loading talent sources:", error);
        // Use default sources if API fails
        setSources(DEFAULT_SOURCES);
      } finally {
        setIsLoading(false);
      }
    };

    loadSources();
  }, []);

  // Ensure at least one source is selected by default
  useEffect(() => {
    if (sources.length > 0 && selectedSources.length === 0) {
      setSelectedSources([sources[0]]);
    }
  }, [sources, selectedSources, setSelectedSources]);

  const handleSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setSelectedSources([...selectedSources, source]);
    } else {
      // Don't allow deselecting the last source
      if (selectedSources.length > 1) {
        setSelectedSources(selectedSources.filter(s => s !== source));
      }
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'linkedin':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'github':
        return <Globe className="h-4 w-4 text-purple-500" />;
      case 'internal database':
        return <Database className="h-4 w-4 text-green-500" />;
      default:
        return <Building className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="mt-6 border-adept/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Globe className="h-5 w-5 mr-2 text-adept" />
          Candidate Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Select talent pools to search for matching candidates
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sources.map((source) => (
              <div key={source} className="flex items-center space-x-2">
                <Checkbox
                  id={`source-${source}`}
                  checked={selectedSources.includes(source)}
                  onCheckedChange={(checked) => 
                    handleSourceChange(source, checked as boolean)
                  }
                  className="data-[state=checked]:bg-adept data-[state=checked]:border-adept"
                />
                <Label
                  htmlFor={`source-${source}`}
                  className="flex items-center text-sm font-medium cursor-pointer"
                >
                  {getSourceIcon(source)}
                  <span className="ml-2">{source}</span>
                </Label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TargetSourceSelection;
