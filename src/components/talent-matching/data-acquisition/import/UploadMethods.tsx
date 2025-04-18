
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
  onFileSelect: (files: FileList) => void;
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
  const [activeTab, setActiveTab] = React.useState<'text' | 'file'>('text');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 border-b pb-4">
        <button
          type="button"
          className={`pb-2 font-medium text-sm ${activeTab === 'text' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('text')}
        >
          Paste Resume Text
        </button>
        <button
          type="button"
          className={`pb-2 font-medium text-sm ${activeTab === 'file' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('file')}
        >
          Upload Resume File(s)
        </button>
      </div>
      
      {activeTab === 'text' ? (
        <div className="space-y-4">
          <SingleResumeUpload 
            form={form} 
            isProcessing={isProcessing} 
          />
        </div>
      ) : (
        <div className="space-y-4">
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
            <div 
              className="border-2 border-dashed rounded-md p-8 flex flex-col items-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              <input
                id="resume-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.rtf"
                className="hidden"
                onChange={(e) => e.target.files && onFileSelect(e.target.files)}
              />
              <div className="text-center">
                <p className="text-sm font-medium">Drag & drop resume files, or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports PDF, Word, TXT, and RTF formats
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadMethods;
