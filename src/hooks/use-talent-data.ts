
import { useState, useEffect } from 'react';
import { 
  DataSource, 
  ImportStats 
} from '@/components/talent-matching/types';
import { 
  getDataSources,
  startDataSourceScraper
} from '@/services/talent/TalentDataAcquisitionService';
import { useToast } from '@/hooks/use-toast';

export const useTalentData = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [importHistory, setImportHistory] = useState<ImportStats[]>([]);
  
  useEffect(() => {
    loadDataSources();
  }, []);
  
  const loadDataSources = async () => {
    setIsLoading(true);
    try {
      const sources = await getDataSources();
      setDataSources(sources);
    } catch (error) {
      console.error('Error loading data sources:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data sources',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const startScraper = async (sourceId: string, options = {}) => {
    setIsLoading(true);
    try {
      const success = await startDataSourceScraper(sourceId, options);
      
      if (success) {
        toast({
          title: 'Scraper Started',
          description: 'The data acquisition process has started successfully',
        });
        return true;
      } else {
        throw new Error('Failed to start scraper');
      }
    } catch (error) {
      console.error('Error starting scraper:', error);
      toast({
        title: 'Error',
        description: 'Failed to start the data acquisition process',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const addImportStats = (stats: ImportStats) => {
    setImportHistory(prev => [stats, ...prev]);
  };
  
  return {
    isLoading,
    dataSources,
    selectedSource,
    setSelectedSource,
    importHistory,
    addImportStats,
    startScraper,
    refreshDataSources: loadDataSources
  };
};
