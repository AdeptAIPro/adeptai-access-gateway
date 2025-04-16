
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DataSource, ImportStats } from "@/components/talent-matching/types";
import { getDataSources, startDataSourceScraper } from "@/services/talent/TalentDataAcquisitionService";
import { useToast } from "@/hooks/use-toast";
import { Database, GithubIcon, Linkedin, FileText, Router, UserPlus, Upload, RefreshCw } from "lucide-react";
import ImportForm from "./ImportForm";
import DataSourcesList from "./DataSourcesList";
import ImportHistory from "./ImportHistory";

const TalentDataDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("sources");
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importStats, setImportStats] = useState<ImportStats[]>([]);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  
  // Load data sources on mount
  React.useEffect(() => {
    const loadDataSources = async () => {
      setIsLoading(true);
      try {
        const sources = await getDataSources();
        setDataSources(sources);
      } catch (error) {
        console.error("Error loading data sources:", error);
        toast({
          title: "Error",
          description: "Failed to load data sources",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDataSources();
  }, [toast]);
  
  const handleStartScraper = async (sourceId: string) => {
    setIsLoading(true);
    try {
      const success = await startDataSourceScraper(sourceId, { maxCandidates: 100 });
      
      if (success) {
        toast({
          title: "Scraper Started",
          description: "The data acquisition process has started successfully",
        });
      } else {
        throw new Error("Failed to start scraper");
      }
    } catch (error) {
      console.error("Error starting scraper:", error);
      toast({
        title: "Error",
        description: "Failed to start the data acquisition process",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImportComplete = (stats: ImportStats) => {
    setImportStats(prev => [stats, ...prev]);
    
    toast({
      title: "Import Complete",
      description: `Successfully imported ${stats.successfulImports} candidates from ${stats.sources.join(", ")}`,
    });
    
    // Switch to history tab
    setActiveTab("history");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Talent Data Acquisition</h2>
          <p className="text-muted-foreground">
            Manage your talent database and import candidates from various sources
          </p>
        </div>
        
        <Button onClick={() => setActiveTab("import")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Import Candidates
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Database className="mr-2 h-5 w-5 text-blue-500" />
              Talent Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {dataSources.reduce((acc, src) => acc + src.candidatesCount, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Total candidates in database</p>
          </CardContent>
          <CardFooter className="border-t pt-3 flex justify-between">
            <Badge variant="outline" className="px-2 py-1">
              {dataSources.filter(s => s.status === 'active').length} Active Sources
            </Badge>
            <Badge variant="secondary" className="px-2 py-1">
              {new Date().toLocaleDateString()} Last Updated
            </Badge>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <GithubIcon className="mr-2 h-5 w-5 text-gray-700" />
              GitHub Developers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {dataSources.find(s => s.type === 'github')?.candidatesCount.toLocaleString() || '0'}
            </div>
            <p className="text-sm text-muted-foreground">Developers from GitHub profiles</p>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleStartScraper('github-profiles')}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Linkedin className="mr-2 h-5 w-5 text-blue-600" />
              LinkedIn Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {dataSources.find(s => s.type === 'linkedin')?.candidatesCount.toLocaleString() || '0'}
            </div>
            <p className="text-sm text-muted-foreground">Profiles from LinkedIn search</p>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleStartScraper('linkedin-public')}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="import">Import</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sources" className="p-1">
          <DataSourcesList 
            dataSources={dataSources} 
            onStartScraper={handleStartScraper}
            isLoading={isLoading}
            onSelectSource={setSelectedSource}
          />
        </TabsContent>
        
        <TabsContent value="import" className="p-1">
          <ImportForm 
            dataSources={dataSources}
            onImportComplete={handleImportComplete}
            selectedSource={selectedSource}
          />
        </TabsContent>
        
        <TabsContent value="history" className="p-1">
          <ImportHistory 
            importStats={importStats}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentDataDashboard;
