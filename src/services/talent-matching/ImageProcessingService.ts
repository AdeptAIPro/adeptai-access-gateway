
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use browser environment
env.allowLocalModels = false;
env.useBrowserCache = false;

/**
 * Service for extracting text from images using HuggingFace transformers
 */
export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  try {
    console.log('Starting image processing for OCR...');
    
    // Create an image element from the file
    const imageElement = await loadImageFromFile(imageFile);
    
    // Initialize the OCR pipeline with Hugging Face's vision transformer
    const processor = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning', {
      device: 'webgpu',
    });
    
    // Process the image
    console.log('Processing image with OCR model...');
    const result = await processor(imageElement.src);
    
    // Extract and clean the text
    let extractedText = '';
    if (Array.isArray(result) && result.length > 0) {
      extractedText = result.map(item => item.generated_text).join('\n');
      console.log('Text extracted successfully:', extractedText.substring(0, 100) + '...');
    } else {
      console.log('No text was extracted from the image');
    }
    
    return extractedText;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error('Failed to extract text from image: ' + (error instanceof Error ? error.message : String(error)));
  }
};

// Helper function to load an image file into an HTMLImageElement
const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(new Error('Failed to load image: ' + error));
    img.src = URL.createObjectURL(file);
  });
};
