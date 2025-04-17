
import { useState, useEffect } from "react";
import { getTalentSources } from "@/services/talent/TalentSearchService";
import { DEFAULT_SOURCES, HEALTHCARE_SOURCES, IT_SOURCES } from "./sourcesData";

export const useSourceSelection = (
  initialSelectedSources: string[] = []
) => {
  const [sources, setSources] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>(initialSelectedSources);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("general");

  // Load sources based on selected tab
  useEffect(() => {
    switch(activeTab) {
      case "healthcare":
        setSources(HEALTHCARE_SOURCES);
        setIsLoading(false);
        break;
      case "it":
        setSources(IT_SOURCES);
        setIsLoading(false);
        break;
      default:
        loadGeneralSources();
        break;
    }
  }, [activeTab]);

  // Ensure at least one source is selected by default
  useEffect(() => {
    if (sources.length > 0 && selectedSources.length === 0) {
      setSelectedSources([sources[0]]);
    }
  }, [sources, selectedSources]);

  const loadGeneralSources = async () => {
    setIsLoading(true);
    try {
      const fetchedSources = await getTalentSources();
      if (fetchedSources && fetchedSources.length > 0) {
        setSources(fetchedSources);
      } else {
        setSources(DEFAULT_SOURCES);
      }
    } catch (error) {
      console.error("Error loading talent sources:", error);
      setSources(DEFAULT_SOURCES);
    } finally {
      setIsLoading(false);
    }
  };

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

  return {
    sources,
    selectedSources,
    isLoading,
    activeTab,
    setActiveTab,
    handleSourceChange,
    setSelectedSources
  };
};
