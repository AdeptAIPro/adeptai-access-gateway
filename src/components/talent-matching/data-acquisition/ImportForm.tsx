
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge"; // Added this import
import { useToast } from "@/hooks/use-toast";
import { 
  DataSource, 
  ImportStats, 
  ResumeParsingResult 
} from "@/components/talent-matching/types";
import { 
  parseResumeText, 
  batchImportCandidates 
} from "@/services/talent/TalentDataAcquisitionService";
import { Upload, FileText, AlertCircle, Loader2 } from "lucide-react";

// Define form schema with Zod
const importFormSchema = z.object({
  sourceType: z.string({
    required_error: "Please select a source type",
  }),
  sourceName: z.string().min(2, {
    message: "Source name must be at least 2 characters.",
  }),
  resumeText: z.string().min(50, {
    message: "Resume text must be at least 50 characters.",
  }).optional(),
  fileUpload: z.any().optional(),
  sourceUrl: z.string().url({
    message: "Please enter a valid URL",
  }).optional(),
});

type ImportFormValues = z.infer<typeof importFormSchema>;

interface ImportFormProps {
  dataSources: DataSource[];
  onImportComplete: (stats: ImportStats) => void;
  selectedSource: DataSource | null;
}

const ImportForm: React.FC<ImportFormProps> = ({ 
  dataSources, 
  onImportComplete,
  selectedSource 
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResults, setParsedResults] = useState<ResumeParsingResult[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Initialize form with default values
  const form = useForm<ImportFormValues>({
    resolver: zodResolver(importFormSchema),
    defaultValues: {
      sourceType: selectedSource?.type || "",
      sourceName: selectedSource?.name || "",
      resumeText: "",
      sourceUrl: selectedSource?.url || "",
    },
  });
  
  // Update form when selectedSource changes
  React.useEffect(() => {
    if (selectedSource) {
      form.setValue("sourceType", selectedSource.type);
      form.setValue("sourceName", selectedSource.name);
      form.setValue("sourceUrl", selectedSource.url || "");
    }
  }, [selectedSource, form]);
  
  const onSubmit = async (data: ImportFormValues) => {
    setIsProcessing(true);
    setParsedResults([]);
    setPreviewMode(false);
    
    try {
      // For demo purposes, we'll parse the resume text directly
      // In a real application, this would handle file uploads or API calls to scraping services
      if (data.resumeText) {
        const result = await parseResumeText(data.resumeText, data.sourceName, data.sourceUrl);
        setParsedResults([result]);
        setPreviewMode(true);
      } else {
        toast({
          title: "No Data",
          description: "Please provide resume text to parse",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast({
        title: "Error",
        description: "Failed to parse resume text",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleConfirmImport = async () => {
    if (parsedResults.length === 0) return;
    
    setIsProcessing(true);
    try {
      const sourceName = form.getValues("sourceName");
      const stats = await batchImportCandidates(parsedResults, sourceName);
      
      // Clear form and results
      form.reset();
      setParsedResults([]);
      setPreviewMode(false);
      
      // Notify parent component
      onImportComplete(stats);
    } catch (error) {
      console.error("Error importing candidates:", error);
      toast({
        title: "Import Failed",
        description: "Failed to import candidates",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCancel = () => {
    setParsedResults([]);
    setPreviewMode(false);
  };
  
  return (
    <div className="space-y-6">
      {!previewMode ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Import Talent Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sourceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={isProcessing}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a source type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="github">GitHub</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="indeed">Indeed</SelectItem>
                            <SelectItem value="monster">Monster</SelectItem>
                            <SelectItem value="portfolio">Portfolio Site</SelectItem>
                            <SelectItem value="dataset">Resume Dataset</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sourceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter source name" {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="sourceUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} disabled={isProcessing} />
                      </FormControl>
                      <FormDescription>
                        The URL where the resume or profile was found
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="resumeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Text</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste resume text here" 
                          className="min-h-[200px]"
                          {...field}
                          disabled={isProcessing}
                        />
                      </FormControl>
                      <FormDescription>
                        Paste the text content of a resume or profile to parse
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="submit" 
                    disabled={isProcessing}
                  >
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Parse Resume
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Parsed Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {parsedResults.map((result, index) => (
              <div key={index} className="border rounded-md p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Name</h3>
                    <p>{result.name || "Unknown"}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Contact Info</h3>
                    <p>{result.email || "No email"}</p>
                    <p>{result.phone || "No phone"}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium">Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {result.extractedSkills.length > 0 ? (
                      result.extractedSkills.map((skill, i) => (
                        <Badge key={i} variant="secondary">{skill}</Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No skills detected</span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Experience</h3>
                    <p>{result.inferredExperience ? `${result.inferredExperience} years` : "Unknown"}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p>{result.location || "Unknown"}</p>
                  </div>
                </div>
                
                {result.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{result.error}</AlertDescription>
                  </Alert>
                )}
                
                <div>
                  <h3 className="font-medium">Original Text Preview</h3>
                  <div className="mt-1 text-sm text-muted-foreground max-h-40 overflow-y-auto border p-2 rounded">
                    {result.originalText.substring(0, 200)}
                    {result.originalText.length > 200 && "..."}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Confidence Score:</span>
                  <div className="h-2 bg-gray-200 rounded-full w-full max-w-xs">
                    <div 
                      className={`h-2 rounded-full ${
                        result.confidence > 0.7 ? "bg-green-500" : 
                        result.confidence > 0.4 ? "bg-amber-500" : 
                        "bg-red-500"
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{Math.round(result.confidence * 100)}%</span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmImport}
              disabled={isProcessing || parsedResults.length === 0}
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Import
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ImportForm;
