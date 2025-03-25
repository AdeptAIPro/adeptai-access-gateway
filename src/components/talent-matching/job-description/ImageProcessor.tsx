
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { extractTextFromImage } from "@/services/talent-matching/ImageProcessingService";

interface ImageProcessorProps {
  fileUploaded: File | null;
  setFileUploaded: (file: File | null) => void;
  setExtractedText: (text: string) => void;
  className?: string;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({
  fileUploaded,
  setFileUploaded,
  setExtractedText,
  className,
}) => {
  const { toast } = useToast();
  const [processingImage, setProcessingImage] = useState(false);

  const processImageFile = async (imageFile: File) => {
    setProcessingImage(true);
    try {
      const extractedText = await extractTextFromImage(imageFile);
      
      if (extractedText.trim().length > 0) {
        setExtractedText(extractedText);
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

  // Start processing immediately if there's a file
  React.useEffect(() => {
    if (fileUploaded && fileUploaded.type.startsWith('image/')) {
      processImageFile(fileUploaded);
    }
  }, [fileUploaded]);

  return (
    <div className={className}>
      {fileUploaded && fileUploaded.type.startsWith('image/') && (
        <div className="space-y-4">
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
          
          {processingImage && (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Image...
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;
