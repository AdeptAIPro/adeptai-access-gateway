
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResumeParsingResult } from "@/components/talent-matching/types";

interface ImportPreviewProps {
  parsedResults: ResumeParsingResult[];
  isProcessing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ImportPreview: React.FC<ImportPreviewProps> = ({
  parsedResults,
  isProcessing,
  onConfirm,
  onCancel,
}) => {
  return (
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
          </div>
        ))}
      </CardContent>
      <div className="border-t pt-4 p-6 flex justify-between">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm}
          disabled={isProcessing || parsedResults.length === 0}
        >
          Confirm Import
        </Button>
      </div>
    </Card>
  );
};

export default ImportPreview;
