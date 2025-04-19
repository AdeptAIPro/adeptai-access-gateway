
import { useCallback } from 'react';
import { DataSource } from '@/components/talent-matching/types';
import { useToast } from '@/hooks/use-toast';

export const useSourceActions = (
  dataSources: DataSource[],
  setSelectedSource: (source: DataSource | null) => void,
  startScraper: (sourceId: string) => Promise<boolean>,
  refreshDataSources: () => void
) => {
  const { toast } = useToast();

  const handleUpdateSource = useCallback(async (id: string) => {
    try {
      await startScraper(id);
      refreshDataSources();
      toast({
        title: 'Source Update',
        description: 'Started updating data source',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update data source',
        variant: 'destructive',
      });
    }
  }, [startScraper, refreshDataSources, toast]);

  const handleDeleteSource = useCallback(async (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete source:", id);
    toast({
      title: 'Not Implemented',
      description: 'Delete functionality coming soon',
      variant: 'default',
    });
  }, [toast]);

  const handleEditSource = useCallback((id: string) => {
    const source = dataSources.find(s => s.id === id);
    if (source) {
      setSelectedSource(source);
      toast({
        title: 'Edit Source',
        description: 'Selected source for editing',
      });
    }
  }, [dataSources, setSelectedSource, toast]);

  const handleExportSource = useCallback((id: string) => {
    // TODO: Implement export functionality
    console.log("Export source:", id);
    toast({
      title: 'Not Implemented',
      description: 'Export functionality coming soon',
      variant: 'default',
    });
  }, [toast]);

  return {
    handleUpdateSource,
    handleDeleteSource,
    handleEditSource,
    handleExportSource,
  };
};
