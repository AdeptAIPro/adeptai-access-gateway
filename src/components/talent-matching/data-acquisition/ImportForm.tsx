
import React from "react";
import { Card } from "@/components/ui/card";
import { useImportForm } from "@/hooks/talent-matching/use-import-form";
import { useFileUpload } from "@/hooks/talent-matching/use-file-upload";
import { DataSource, ImportStats } from "@/components/talent-matching/types";
import ImportFormHeader from "./import/ImportFormHeader";
import ImportSourceFields from "./import/ImportSourceFields";
import ImportUrlField from "./import/ImportUrlField";
import ImportPreview from "./import/ImportPreview";
import UploadMethods from "./import/UploadMethods";
import { Form } from "@/components/ui/form";
import { useImportSubmission } from "@/hooks/talent-matching/use-import-submission";

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
    uploadProgress,
    isUploading,
    error,
    handleFileUpload
  } = useFileUpload((results) => {
    setParsedResults(results);
    setPreviewMode(true);
  });

  const {
    parsedResults,
    setParsedResults,
    handleSubmitText,
    handleBulkUpload,
    handleConfirmImport
  } = useImportSubmission(onImportComplete);

  const onSubmit = async (data) => {
    await handleSubmitText(data);
  };

  const onBulkUpload = async () => {
    const sourceName = form.getValues("sourceName");
    await handleBulkUpload(bulkFiles, sourceName);
  };

  const onConfirmImport = async () => {
    const sourceName = form.getValues("sourceName");
    await handleConfirmImport(sourceName);
    form.reset();
  };

  const onCancelPreview = () => {
    setParsedResults([]);
    setPreviewMode(false);
  };

  return (
    <div className="space-y-6">
      {!previewMode ? (
        <Card>
          <ImportFormHeader />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ImportSourceFields form={form} isProcessing={isProcessing} />
              <ImportUrlField form={form} isProcessing={isProcessing} />
              
              <div className="grid grid-cols-1 gap-6">
                <UploadMethods
                  form={form}
                  isProcessing={isProcessing}
                  bulkFiles={bulkFiles}
                  uploadProgress={uploadProgress}
                  isUploading={isUploading}
                  error={error}
                  onUpload={onBulkUpload}
                  onCancel={() => setBulkFiles([])}
                  onFileSelect={handleFileUpload}
                />
              </div>
            </form>
          </Form>
        </Card>
      ) : (
        <ImportPreview 
          parsedResults={parsedResults}
          isProcessing={isProcessing}
          onConfirm={onConfirmImport}
          onCancel={onCancelPreview}
        />
      )}
    </div>
  );
};

export default ImportForm;
