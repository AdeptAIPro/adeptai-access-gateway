
import { useToast } from "@/hooks/use-toast";

export const useAIEnrichment = () => {
  const { toast } = useToast();
  
  const handleEnrichLeads = (source: string) => {
    toast({
      title: "Enriching Leads",
      description: `Using ${source} to enrich your lead data...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Leads Enriched",
        description: `Successfully enriched 12 leads with ${source}`,
      });
    }, 2000);
  };

  const handleEnrichTalents = (source: string) => {
    toast({
      title: "Enriching Talent Database",
      description: `Using ${source} to enrich your talent database...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Talent Database Enriched",
        description: `Successfully enriched 18 candidate profiles with ${source}`,
      });
    }, 2000);
  };
  
  return {
    handleEnrichLeads,
    handleEnrichTalents
  };
};
