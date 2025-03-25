
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Camera, RotateCcw, Copy, Check, Loader2 } from "lucide-react";
import ImageProcessor from "./ImageProcessor";

interface ImageToTextTabProps {
  fileUploaded: File | null;
  setFileUploaded: (file: File | null) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
}

const ImageToTextTab: React.FC<ImageToTextTabProps> = ({
  fileUploaded,
  setFileUploaded,
  jobDescription,
  setJobDescription,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileUploaded(file);
      toast({
        title: "Image Uploaded",
        description: `${file.name} has been uploaded`,
      });
    }
  };

  const handleCaptureClick = () => {
    setIsCapturing(true);
    // In a real implementation, this would activate the camera
    setTimeout(() => {
      toast({
        title: "Camera Feature",
        description: "This is a demo of the camera capture feature. In production, this would access your device camera.",
      });
      setIsCapturing(false);
    }, 1500);
  };

  const handleCopyText = () => {
    if (jobDescription) {
      navigator.clipboard.writeText(jobDescription);
      setCopied(true);
      toast({
        title: "Text Copied",
        description: "Job description copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setFileUploaded(null);
    setJobDescription("");
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-indigo-100 p-4 rounded-full">
          <ImageIcon className="h-12 w-12 text-indigo-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Upload Job Description Image</h3>
          <p className="text-sm text-gray-500">
            Upload an image containing a job description or take a photo
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: PNG, JPEG, JPG (Max 5MB)
          </p>
        </div>
        
        <div className="flex gap-4 w-full justify-center">
          <div>
            <Input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload Image
              </label>
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleCaptureClick}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Camera className="mr-2 h-4 w-4" />
            )}
            Capture Photo
          </Button>
        </div>
        
        {fileUploaded && fileUploaded.type.startsWith('image/') && (
          <div className="mt-4 space-y-4 w-full">
            <div className="flex items-center p-2 bg-gray-100 rounded-md">
              <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">{fileUploaded.name}</span>
            </div>
            
            <ImageProcessor 
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
              setExtractedText={setJobDescription}
              className="mt-4"
            />
            
            {jobDescription && (
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Extracted Text:</h4>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCopyText}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-line max-h-64 overflow-y-auto bg-white p-3 rounded border">
                  {jobDescription}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToTextTab;
