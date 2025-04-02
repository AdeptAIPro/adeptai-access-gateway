
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasteJobDescription from "./job-description/PasteJobDescription";
import UploadDocumentTab from "./job-description/UploadDocumentTab";
import ImageToTextTab from "./job-description/ImageToTextTab";
import FetchFromAtsTab from "./job-description/FetchFromAtsTab";
import { FileText, Upload, Image, Database } from "lucide-react";

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
  tab: string;
  setTab: (tab: string) => void;
  fileUploaded: File | null;
  setFileUploaded: React.Dispatch<React.SetStateAction<File | null>>;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  setJobDescription,
  tab,
  setTab,
  fileUploaded,
  setFileUploaded
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Job Description Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 grid grid-cols-4">
            <TabsTrigger value="paste" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Paste</span>
              <span className="inline sm:hidden">📋</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Upload</span>
              <span className="inline sm:hidden">📄</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <Image className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Image</span>
              <span className="inline sm:hidden">📷</span>
            </TabsTrigger>
            <TabsTrigger value="ats" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">ATS</span>
              <span className="inline sm:hidden">🔄</span>
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

          <TabsContent value="ats">
            <FetchFromAtsTab setJobDescription={setJobDescription} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;
