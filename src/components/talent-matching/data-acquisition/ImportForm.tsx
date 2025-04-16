
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useImportForm } from "@/hooks/talent-matching/use-import-form";
import { useFileUpload } from "@/hooks/talent-matching/use-file-upload";
import { useResumeParser } from "@/hooks/talent-matching/use-resume-parser";
import { DataSource, ImportStats } from "@/components/talent-matching/types";
import ImportFormHeader from "./import/ImportFormHeader";
import ImportSourceFields from "./import/ImportSourceFields";
import ImportUrlField from "./import/ImportUrlField";
import ImportPreview from "./import/ImportPreview";
import UploadDocumentTab from "../job-description/UploadDocumentTab";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface ImportFormProps {
  dataSources: DataSource[];
  onImportComplete: (stats: ImportStats) => void;
  selectedSource: DataSource | null;
}

const ImportForm: React.FC<ImportFormProps> = ({ 
  dataSources, 
  onImportComplete,
  selectedSource,
}) => {
  const {
    form,
    isProcessing,
    setIsProcessing,
    previewMode,
    setPreviewMode,
    toast
  } = useImportForm(selectedSource, onImportComplete);

  const {
    bulkFiles,
    setBulkFiles,
    isUploading,
    handleFileUpload
  } = useFileUpload((results) => {
    setParsedResults(results);
    setPreviewMode(true);
  });

  const {
    parsedResults,
    setParsedResults,
    parseResumes,
    parseBulkResumes
  } = useResumeParser();

  const onSubmit = async (data: ImportFormValues) => {
    setIsProcessing(true);
    setParsedResults([]);
    setPreviewMode(false);
    
    try {
      if (data.resumeText) {
        const result = await parseResumes(data.resumeText, data.sourceName, data.sourceUrl);
        if (result) {
          setPreviewMode(true);
        }
      } else {
        toast({
          title: "No Data",
          description: "Please provide resume text to parse",
          variant: "destructive",
        });
      }
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
      await parseBulkResumes(files, sourceName);
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
