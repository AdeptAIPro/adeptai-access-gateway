
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImportFormValues, importFormSchema } from '@/components/talent-matching/data-acquisition/import/types';
import { useToast } from '@/hooks/use-toast';
import { DataSource, ImportStats } from '@/components/talent-matching/types';
import React from 'react';

export const useImportForm = (
  selectedSource: DataSource | null,
  onImportComplete: (stats: ImportStats) => void
) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const form = useForm<ImportFormValues>({
    resolver: zodResolver(importFormSchema),
    defaultValues: {
      sourceType: selectedSource?.type || "",
      sourceName: selectedSource?.name || "",
      resumeText: "",
      sourceUrl: selectedSource?.url || "",
    },
  });
  
  React.useEffect(() => {
    if (selectedSource) {
      form.setValue("sourceType", selectedSource.type);
      form.setValue("sourceName", selectedSource.name);
      form.setValue("sourceUrl", selectedSource.url || "");
    }
  }, [selectedSource, form]);

  return {
    form,
    isProcessing,
    setIsProcessing,
    previewMode,
    setPreviewMode,
    toast
  };
};
