
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ImportFormValues, importFormSchema } from "./import/types";
import { DataSource, ImportStats, ResumeParsingResult } from "@/components/talent-matching/types";
import { parseResumeText } from "@/services/talent/TalentDataAcquisitionService";
import ImportFormHeader from "./import/ImportFormHeader";
import ImportSourceFields from "./import/ImportSourceFields";
import ImportUrlField from "./import/ImportUrlField";
import ImportPreview from "./import/ImportPreview";
import UploadDocumentTab from "../job-description/UploadDocumentTab";

interface ImportFormProps {
  dataSources: DataSource[];
  onImportComplete: (stats: ImportStats) => void;
  selectedSource: DataSource | null;
  onBulkUpload?: (files: File[]) => Promise<void>;
}

const ImportForm: React.FC<ImportFormProps> = ({ 
  dataSources, 
  onImportComplete,
  selectedSource,
  onBulkUpload
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResults, setParsedResults] = useState<ResumeParsingResult[]>([]);
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

  const onSubmit = async (data: ImportFormValues) => {
    setIsProcessing(true);
    setParsedResults([]);
    setPreviewMode(false);
    
    try {
      if (data.resumeText) {
        const result = await parseResumeText(data.resumeText, data.sourceName, data.sourceUrl);
        setParsedResults([result]);
        setPreviewMode(true);
      } else {
        toast({
          title: "No Data",
          description: "Please provide resume text to parse",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast({
        title: "Error",
        description: "Failed to parse resume text",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkUpload = async (files: File[]) => {
    setIsProcessing(true);
    setParsedResults([]);
    setPreviewMode(false);
    
    try {
      const sourceName = form.getValues("sourceName");
      
      for (const file of files) {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          const text = e.target?.result as string;
          if (text) {
            const result = await parseResumeText(text, sourceName);
            setParsedResults(prev => [...prev, result]);
          }
        };
        
        reader.readAsText(file);
      }
      
      setPreviewMode(true);
    } catch (error) {
      console.error("Error processing files:", error);
      toast({
        title: "Error",
        description: "Failed to process uploaded files",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = async () => {
    if (parsedResults.length === 0) return;
    
    setIsProcessing(true);
    try {
      const sourceName = form.getValues("sourceName");
      onImportComplete({
        totalProcessed: parsedResults.length,
        successfulImports: parsedResults.filter(r => !r.error).length,
        failedImports: parsedResults.filter(r => r.error).length,
        duplicatesFound: 0,
        enrichmentPerformed: parsedResults.length,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        sources: [sourceName],
      });
      
      form.reset();
      setParsedResults([]);
      setPreviewMode(false);
      
      toast({
        title: "Import Complete",
        description: `Successfully imported ${parsedResults.length} resumes`,
      });
    } catch (error) {
      console.error("Error importing candidates:", error);
      toast({
        title: "Import Failed",
        description: "Failed to import candidates",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!previewMode ? (
        <Card>
          <ImportFormHeader />
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ImportSourceFields form={form} isProcessing={isProcessing} />
                <ImportUrlField form={form} isProcessing={isProcessing} />
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Upload Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Single Resume</h4>
                        <FormField
                          control={form.control}
                          name="resumeText"
                          render={({ field }) => (
                            <Textarea 
                              placeholder="Paste resume text here" 
                              className="min-h-[200px]"
                              {...field}
                              disabled={isProcessing}
                            />
                          )}
                        />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Bulk Upload</h4>
                        <UploadDocumentTab
                          fileUploaded={null}
                          setFileUploaded={() => {}}
                          onBulkUpload={handleBulkUpload}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <ImportPreview 
          parsedResults={parsedResults}
          isProcessing={isProcessing}
          onConfirm={handleConfirmImport}
          onCancel={() => {
            setParsedResults([]);
            setPreviewMode(false);
          }}
        />
      )}
    </div>
  );
};

export default ImportForm;
