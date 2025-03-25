
import { pipeline, env } from '@huggingface/transformers';
import { supabase } from '@/lib/supabase';

// Configure transformers.js to use browser environment
env.allowLocalModels = false;
env.useBrowserCache = false;

/**
 * Service for extracting text from images using HuggingFace transformers
 * and storing results in Supabase
 */
export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  try {
    console.log('Starting image processing for OCR...');
    
    // Create an image element from the file
    const imageElement = await loadImageFromFile(imageFile);
    
    // Process the image with OCR
    const extractedText = await performOCR(imageElement);
    
    // Store the extracted text for future reference
    if (extractedText.length > 0) {
      await storeExtractedText(imageFile.name, extractedText);
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

// Perform OCR on the image using HuggingFace transformers
const performOCR = async (imageElement: HTMLImageElement): Promise<string> => {
  try {
    // Initialize the OCR pipeline with Hugging Face's vision transformer
    console.log('Initializing OCR pipeline...');
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
    console.error('Error in OCR processing:', error);
    throw error;
  }
};

// Store extracted text in Supabase for future reference
const storeExtractedText = async (filename: string, text: string) => {
  try {
    const { error } = await supabase
      .from('extracted_texts')
      .insert([
        { 
          filename, 
          text, 
          extraction_date: new Date().toISOString() 
        }
      ]);
    
    if (error) {
      console.error('Error storing extracted text:', error);
    } else {
      console.log('Extracted text stored successfully');
    }
  } catch (err) {
    console.error('Failed to store extracted text:', err);
    // We don't throw here to avoid breaking the main flow
  }
};
