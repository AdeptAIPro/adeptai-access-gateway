
import React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileDropZoneProps {
  onFileSelect: (files: File[]) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileSelect }) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileSelect(Array.from(e.target.files));
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-10 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="h-12 w-12 text-gray-400" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Upload Resumes</h3>
          <p className="text-sm text-gray-500">
            Drag and drop your files here, or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: PDF, DOCX, TXT
          </p>
        </div>
        
        <input
          type="file"
          id="bulk-resume-upload"
          className="hidden"
          accept=".pdf,.docx,.txt"
          multiple
          onChange={handleFileInputChange}
        />
        
        <Button asChild>
          <label htmlFor="bulk-resume-upload" className="cursor-pointer">Browse Files</label>
        </Button>
      </div>
    </div>
  );
};

export default FileDropZone;
