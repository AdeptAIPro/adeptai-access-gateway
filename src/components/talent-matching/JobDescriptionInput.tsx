
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Database } from "lucide-react";

interface JobDescriptionInputProps {
  tab: string;
  setTab: (tab: string) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  fileUploaded: File | null;
  setFileUploaded: (file: File | null) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  tab,
  setTab,
  jobDescription,
  setJobDescription,
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
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="paste">
          <FileText className="mr-2 h-4 w-4" />
          Paste Description
        </TabsTrigger>
        <TabsTrigger value="upload">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </TabsTrigger>
        <TabsTrigger value="fetch">
          <Database className="mr-2 h-4 w-4" />
          Fetch from ATS/VMS
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="paste" className="space-y-4">
        <Textarea 
          placeholder="Paste job description here..."
          className="min-h-[200px]"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </TabsContent>
      
      <TabsContent value="upload" className="space-y-4">
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
      </TabsContent>
      
      <TabsContent value="fetch" className="space-y-4">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Select ATS/VMS System</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceipal">Ceipal</SelectItem>
                  <SelectItem value="stafferlink">Stafferlink</SelectItem>
                  <SelectItem value="sapfieldglass">SAP Fieldglass</SelectItem>
                  <SelectItem value="beeline">Beeline</SelectItem>
                  <SelectItem value="pontoon">Pontoon</SelectItem>
                  <SelectItem value="jobdiva">JobDiva</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Job ID/Reference</label>
              <Input placeholder="Enter job ID or reference" />
            </div>
          </div>
          <Button className="w-full md:w-auto">
            <Database className="mr-2 h-4 w-4" />
            Fetch Job Details
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default JobDescriptionInput;
