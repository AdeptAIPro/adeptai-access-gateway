
import React from "react";
import { ResumeParsingResult } from "@/components/talent-matching/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, CheckCircle, AlertCircle, User, Mail, Phone, MapPin, BookOpen, Clock } from "lucide-react";

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
  const successCount = parsedResults.filter(r => !r.error).length;
  const failureCount = parsedResults.filter(r => r.error).length;
  
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          Import Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {parsedResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No resume data to preview</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Processing Complete</h3>
                  <p className="text-sm text-muted-foreground">
                    {successCount} of {parsedResults.length} resumes processed successfully
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                    {successCount} Successful
                  </Badge>
                  {failureCount > 0 && (
                    <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700">
                      {failureCount} Failed
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {parsedResults.map((result) => (
                  <div key={result.id} className="border rounded-md p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2 items-center">
                        {result.error ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                        <h4 className="font-medium">{result.name || result.candidateName || result.filename}</h4>
                      </div>
                      <Badge variant={result.error ? "destructive" : "outline"}>
                        {result.error ? "Failed" : "Processed"}
                      </Badge>
                    </div>
                    
                    {!result.error ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{result.name || result.candidateName || "Unknown"}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{result.email || (result.contact && result.contact.email) || "Not provided"}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{result.phone || (result.contact && result.contact.phone) || "Not provided"}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{result.location || "Not specified"}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <h5 className="text-sm font-medium">Skills</h5>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(result.extractedSkills || result.skills || []).map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                              ))}
                              {(result.extractedSkills || result.skills || []).length === 0 && (
                                <span className="text-xs text-muted-foreground">No skills identified</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <span className="text-sm font-medium">Experience</span>
                              <p className="text-xs">
                                {result.inferredExperience ? `${result.inferredExperience} years` : "Not determined"}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <span className="text-sm font-medium">Education</span>
                              <p className="text-xs">
                                {result.education ? (
                                  Array.isArray(result.education) ? result.education[0] : result.education
                                ) : "Not specified"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 p-3 rounded border border-red-200 text-red-700 text-sm">
                        <strong>Error:</strong> {result.error}
                      </div>
                    )}
                    
                    {result.originalText && (
                      <div className="mt-3">
                        <details>
                          <summary className="text-xs font-medium cursor-pointer text-muted-foreground">Show Original Text</summary>
                          <div className="mt-2 p-2 rounded bg-muted text-xs font-mono overflow-auto max-h-40">
                            {result.originalText.slice(0, 500)}{result.originalText.length > 500 ? '...' : ''}
                          </div>
                        </details>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isProcessing || parsedResults.length === 0}
        >
          <Check className="mr-2 h-4 w-4" />
          Confirm Import
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImportPreview;
