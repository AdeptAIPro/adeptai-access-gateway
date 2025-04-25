
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info, FileText } from "lucide-react";

interface PasteJobDescriptionProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
}

const PasteJobDescription: React.FC<PasteJobDescriptionProps> = ({
  jobDescription,
  setJobDescription,
}) => {
  const handleSampleDescription = () => {
    const sampleJobDescription = `Senior Software Engineer - AI Applications

We are seeking an experienced Senior Software Engineer to join our AI Applications team. The ideal candidate will have a strong background in building scalable web applications and experience with machine learning frameworks.

Requirements:
- 5+ years of experience in software development
- Strong proficiency in JavaScript/TypeScript and React
- Experience with Node.js and backend API development
- Knowledge of machine learning concepts and frameworks like TensorFlow or PyTorch
- Experience with cloud platforms (AWS, Azure, or GCP)
- Excellent communication and collaboration skills

Responsibilities:
- Design and implement AI-powered features for our platform
- Collaborate with data scientists to integrate machine learning models
- Build scalable and maintainable front-end and back-end systems
- Contribute to architecture decisions and technical planning
- Mentor junior team members and review code

Benefits:
- Competitive salary and equity package
- Flexible remote work policy
- Healthcare and retirement benefits
- Professional development budget`;

    setJobDescription(sampleJobDescription);
  };

  return (
    <Card className="p-6 border-slate-200">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Job Description</h3>
            <p className="text-sm text-muted-foreground">Paste your job posting to find matching candidates</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSampleDescription}
            className="text-xs"
          >
            <FileText className="mr-2 h-4 w-4" /> 
            Use Sample
          </Button>
        </div>
        
        <Textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[300px] resize-none font-mono text-sm"
        />
        
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md border border-blue-100">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Tips for better matching:</p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>Include detailed technical requirements and skills</li>
                <li>Specify years of experience required</li>
                <li>Add information about the role's responsibilities</li>
                <li>Minimum 50 characters needed for AI matching</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PasteJobDescription;
