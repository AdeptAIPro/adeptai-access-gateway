
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getTalentSources } from "@/services/talent/TalentSearchService";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, Building, Database, Users, FileSpreadsheet, Stethoscope, Code, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import UploadDocumentTab from "@/components/talent-matching/job-description/UploadDocumentTab";
import { Button } from "@/components/ui/button";

interface TargetSourceSelectionProps {
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
  onShowBulkUpload?: () => void;
  bulkUploaded?: boolean;
}

// Enhanced source lists with industry-specific options
const DEFAULT_SOURCES = [
  "Internal Database",
  "LinkedIn",
  "Indeed",
  "GitHub",
  "AngelList"
];

const HEALTHCARE_SOURCES = [
  "Internal Database",
  "MedJobCafe",
  "Health eCareers",
  "Nursys Database",
  "LinkedIn Healthcare",
  "Healthcare Practitioners DB"
];

const IT_SOURCES = [
  "Internal Database",
  "GitHub",
  "Stack Overflow",
  "LinkedIn IT",
  "AngelList",
  "HackerRank",
  "IT Talent Pool"
];

const TargetSourceSelection: React.FC<TargetSourceSelectionProps> = ({
  selectedSources,
  setSelectedSources,
  onShowBulkUpload,
  bulkUploaded = false
}) => {
  const [sources, setSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("general");
  const { toast } = useToast();

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

  // Update sources based on selected tab
  useEffect(() => {
    switch(activeTab) {
      case "healthcare":
        setSources(HEALTHCARE_SOURCES);
        break;
      case "it":
        setSources(IT_SOURCES);
        break;
      default:
        loadGeneralSources();
        break;
    }
  }, [activeTab]);

  const loadGeneralSources = async () => {
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
    }
  };

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
    const sourceLC = source.toLowerCase();
    
    if (sourceLC.includes('linkedin')) return <Users className="h-4 w-4 text-blue-500" />;
    if (sourceLC.includes('github')) return <Code className="h-4 w-4 text-purple-500" />;
    if (sourceLC.includes('database') || sourceLC.includes('db')) return <Database className="h-4 w-4 text-green-500" />;
    if (sourceLC.includes('health') || sourceLC.includes('nurs') || sourceLC.includes('med')) return <Stethoscope className="h-4 w-4 text-red-500" />;
    if (sourceLC.includes('stack') || sourceLC.includes('hack')) return <Code className="h-4 w-4 text-orange-500" />;
    if (sourceLC.includes('spreadsheet') || sourceLC.includes('excel')) return <FileSpreadsheet className="h-4 w-4 text-green-700" />;
    if (sourceLC.includes('uploaded') || sourceLC.includes('resume')) return <Upload className="h-4 w-4 text-blue-600" />;
    
    return <Building className="h-4 w-4 text-gray-500" />;
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Show a toast notification with suggestions based on tab
    if (value === "healthcare" && selectedSources.length === 0) {
      toast({
        title: "Healthcare Sources Loaded",
        description: "We've loaded specialized healthcare talent sources for better matching.",
        variant: "default"
      });
    } else if (value === "it" && selectedSources.length === 0) {
      toast({
        title: "IT Sources Loaded",
        description: "We've loaded specialized IT talent sources for better matching.",
        variant: "default"
      });
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
        
        <Tabs defaultValue="general" className="mb-6" onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="healthcare">
              Healthcare
              <Badge variant="outline" className="ml-2 bg-red-50">New</Badge>
            </TabsTrigger>
            <TabsTrigger value="it">
              IT
              <Badge variant="outline" className="ml-2 bg-blue-50">New</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-3">
                <Checkbox
                  id="source-uploaded-resumes"
                  checked={selectedSources.includes("Uploaded Resumes")}
                  onCheckedChange={(checked) => 
                    handleSourceChange("Uploaded Resumes", checked as boolean)
                  }
                  className="data-[state=checked]:bg-adept data-[state=checked]:border-adept"
                />
                <Label
                  htmlFor="source-uploaded-resumes"
                  className="flex items-center text-sm font-medium cursor-pointer"
                >
                  <Upload className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Uploaded Resumes</span>
                  {bulkUploaded && <Badge variant="outline" className="ml-2 bg-green-50 text-green-800">Resumes Added</Badge>}
                </Label>
              </div>
              
              {onShowBulkUpload && selectedSources.includes("Uploaded Resumes") && !bulkUploaded && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-6 mb-3"
                  onClick={onShowBulkUpload}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resumes
                </Button>
              )}
            </div>
            
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TargetSourceSelection;
