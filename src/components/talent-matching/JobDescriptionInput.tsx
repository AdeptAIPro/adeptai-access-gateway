
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Database, Image as ImageIcon } from "lucide-react";
import PasteJobDescription from "./job-description/PasteJobDescription";
import UploadDocumentTab from "./job-description/UploadDocumentTab";
import ImageToTextTab from "./job-description/ImageToTextTab";
import FetchFromAtsTab from "./job-description/FetchFromAtsTab";

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
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="paste">
          <FileText className="mr-2 h-4 w-4" />
          Paste Description
        </TabsTrigger>
        <TabsTrigger value="upload">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </TabsTrigger>
        <TabsTrigger value="image">
          <ImageIcon className="mr-2 h-4 w-4" />
          Image to Text
        </TabsTrigger>
        <TabsTrigger value="fetch">
          <Database className="mr-2 h-4 w-4" />
          Fetch from ATS/VMS
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="paste">
        <PasteJobDescription 
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />
      </TabsContent>
      
      <TabsContent value="upload">
        <UploadDocumentTab 
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
        />
      </TabsContent>
      
      <TabsContent value="image">
        <ImageToTextTab 
          fileUploaded={fileUploaded}
          setFileUploaded={setFileUploaded}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />
      </TabsContent>
      
      <TabsContent value="fetch">
        <FetchFromAtsTab />
      </TabsContent>
    </Tabs>
  );
};

export default JobDescriptionInput;
