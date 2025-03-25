
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { extractTextFromImage } from "@/services/talent-matching/ImageProcessingService";

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
  const [processingImage, setProcessingImage] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileUploaded(file);
      toast({
        title: "Image Uploaded",
        description: `${file.name} has been uploaded`,
      });
      processImageFile(file);
    }
  };

  const processImageFile = async (imageFile: File) => {
    setProcessingImage(true);
    try {
      const extractedText = await extractTextFromImage(imageFile);
      
      if (extractedText.trim().length > 0) {
        setJobDescription(extractedText);
        toast({
          title: "Image Processed",
          description: "Successfully extracted text from the image",
        });
      } else {
        toast({
          title: "Processing Warning",
          description: "No text could be extracted from this image",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Processing Error",
        description: "Failed to extract text from the image",
        variant: "destructive",
      });
    } finally {
      setProcessingImage(false);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-10 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <ImageIcon className="h-12 w-12 text-gray-400" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Upload Job Description Image</h3>
          <p className="text-sm text-gray-500">
            Upload an image containing a job description
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: PNG, JPEG, JPG (Max 5MB)
          </p>
        </div>
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <Button asChild disabled={processingImage}>
          <label htmlFor="image-upload">
            {processingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Image...
              </>
            ) : (
              <>Upload Image</>
            )}
          </label>
        </Button>
        {fileUploaded && fileUploaded.type.startsWith('image/') && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center p-2 bg-gray-100 rounded-md">
              <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
              <span className="text-sm">{fileUploaded.name}</span>
            </div>
            <div className="relative w-full max-w-md border rounded-md overflow-hidden">
              <img 
                src={URL.createObjectURL(fileUploaded)} 
                alt="Uploaded job description" 
                className="w-full object-contain max-h-64"
              />
              {processingImage && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                    <p className="mt-2">Extracting text...</p>
                  </div>
                </div>
              )}
            </div>
            {jobDescription && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2">Extracted Text:</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line max-h-64 overflow-y-auto">
                  {jobDescription}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToTextTab;
