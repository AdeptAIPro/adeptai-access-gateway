
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import BulkUploadModal from "../bulk-upload/BulkUploadModal";

interface PasteJobDescriptionProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
}

const PasteJobDescription: React.FC<PasteJobDescriptionProps> = ({
  jobDescription,
  setJobDescription,
}) => {
  const [showBulkUpload, setShowBulkUpload] = React.useState(false);

  const handleBulkUploadComplete = () => {
    // This will be called when the bulk upload is complete
    console.log("Bulk upload complete");
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="min-h-[200px] resize-none"
      />
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Min. 50 characters for AI matching
        </p>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowBulkUpload(true)}
        >
          <Upload className="h-4 w-4" />
          Bulk Upload Resumes
        </Button>
      </div>

      <BulkUploadModal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        onUploadComplete={handleBulkUploadComplete}
      />
    </div>
  );
};

export default PasteJobDescription;
