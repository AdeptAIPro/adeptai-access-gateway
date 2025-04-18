
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ImportFormValues } from "./types";
import SingleResumeUpload from "./SingleResumeUpload";
import BulkUpload from "./BulkUpload";

interface UploadMethodsProps {
  form: UseFormReturn<ImportFormValues>;
  isProcessing: boolean;
  bulkFiles: File[];
  uploadProgress: number;
  isUploading: boolean;
  error: string | null;
  onUpload: () => Promise<void>;
  onCancel: () => void;
  onFileSelect: (files: File[]) => void;
}

const UploadMethods: React.FC<UploadMethodsProps> = ({
  form,
  isProcessing,
  bulkFiles,
  uploadProgress,
  isUploading,
  error,
  onUpload,
  onCancel,
  onFileSelect
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileSelect(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Upload Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SingleResumeUpload form={form} isProcessing={isProcessing} />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Bulk Upload</h4>
          {bulkFiles.length > 0 ? (
            <BulkUpload
              files={bulkFiles}
              uploadProgress={uploadProgress}
              isUploading={isUploading}
              error={error}
              onUpload={onUpload}
              onCancel={onCancel}
            />
          ) : (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx,.txt"
                multiple
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-sm text-gray-600"
              >
                Drop files here or click to browse
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadMethods;
