
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText } from "lucide-react";

interface UploadDocumentTabProps {
  fileUploaded: File | null;
  setFileUploaded: (file: File | null) => void;
}

const UploadDocumentTab: React.FC<UploadDocumentTabProps> = ({
  fileUploaded,
  setFileUploaded,
}) => {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploaded(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded`,
      });
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-10 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="h-12 w-12 text-gray-400" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Upload Job Description</h3>
          <p className="text-sm text-gray-500">
            Drag and drop your file here, or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: PDF, DOCX, TXT (Max 5MB)
          </p>
        </div>
        <Input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.docx,.txt"
          onChange={handleFileUpload}
        />
        <Button asChild>
          <label htmlFor="file-upload">Browse Files</label>
        </Button>
        {fileUploaded && (
          <div className="flex items-center p-2 bg-gray-100 rounded-md">
            <FileText className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{fileUploaded.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocumentTab;
