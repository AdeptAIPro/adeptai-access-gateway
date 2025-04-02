
import React from "react";
import StepsGuide from "./StepsGuide";
import AIModelsSection from "./AIModelsSection";
import { BookOpen, Settings, Search, CheckCircle2 } from "lucide-react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Step, AIModel, UserGuideProps } from "./types";

const UserGuide: React.FC<UserGuideProps> = () => {
  const steps: Step[] = [
    {
      icon: BookOpen,
      title: "Prepare Job Description",
      description: "Provide a detailed job description",
      points: [
        "Paste your job description directly",
        "Upload from a document file",
        "Import from your ATS",
        "Include key responsibilities and requirements"
      ]
    },
    {
      icon: Settings,
      title: "Configure Matching Options",
      description: "Customize how candidates are matched",
      points: [
        "Select AI matching models",
        "Set minimum match score threshold",
        "Enable cross-source intelligence",
        "Turn on compliance verification"
      ]
    },
    {
      icon: Search,
      title: "Review Results & Take Action",
      description: "Analyze and act on match results",
      points: [
        "View ranked candidates by match score",
        "Examine skill-by-skill breakdown",
        "Save candidates to your shortlist",
        "Initiate contact with top matches"
      ]
    }
  ];

  const models: AIModel[] = [
    {
      icon: Search,
      name: "Basic Matcher",
      description: "Standard keyword and experience matching",
      accuracy: 85,
      complexity: "Low",
      complexityColor: "bg-green-100 text-green-800"
    },
    {
      icon: Settings,
      name: "Semantic Analysis",
      description: "Contextual understanding of skills and experience",
      accuracy: 92,
      complexity: "Medium",
      complexityColor: "bg-blue-100 text-blue-800"
    },
    {
      icon: CheckCircle2,
      name: "Neural Matcher",
      description: "Deep learning model for nuanced job fit analysis",
      accuracy: 96,
      complexity: "High",
      complexityColor: "bg-purple-100 text-purple-800"
    },
    {
      icon: BookOpen,
      name: "RAG-Enhanced",
      description: "Retrieval augmented generation for context-aware matching",
      accuracy: 98,
      complexity: "Advanced",
      complexityColor: "bg-indigo-100 text-indigo-800"
    }
  ];

  return (
    <SectionCard>
      <SectionHeader 
        title="Talent Matching Guide" 
        icon={<BookOpen className="h-5 w-5 text-adept" />} 
      />

      <Accordion type="single" collapsible defaultValue="steps" className="w-full">
        <AccordionItem value="steps">
          <AccordionTrigger className="text-lg font-semibold">How to Use</AccordionTrigger>
          <AccordionContent>
            <StepsGuide steps={steps} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="models">
          <AccordionTrigger className="text-lg font-semibold">Available AI Models</AccordionTrigger>
          <AccordionContent>
            <AIModelsSection models={models} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SectionCard>
  );
};

export default UserGuide;
