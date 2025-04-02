
import React from "react";
import { BookOpen, Settings, Search, Info, Zap, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import StepsGuide from "./StepsGuide";
import AIModelsSection from "./AIModelsSection";
import AdvancedFeaturesSection from "./AdvancedFeaturesSection";

// Step-by-step guide data
const steps = [
  {
    icon: BookOpen,
    title: "Create Job Description",
    description: "Enter or upload your job requirements",
    points: [
      "Paste an existing job description",
      "Upload from PDF or Word document",
      "Take a photo of printed job descriptions",
      "Import directly from your ATS"
    ]
  },
  {
    icon: Settings,
    title: "Configure AI Settings",
    description: "Customize your matching preferences",
    points: [
      "Select the AI matching model",
      "Set minimum match score threshold",
      "Enable cross-source verification",
      "Choose matching algorithms and filters"
    ]
  },
  {
    icon: Search,
    title: "Review Results",
    description: "Evaluate AI-matched candidates",
    points: [
      "View ranked candidates by match percentage",
      "Compare skills and experience alignment",
      "See candidate availability and contact info",
      "Take action directly from results screen"
    ]
  }
];

// AI model data
const models = [
  {
    icon: Info,
    name: "Basic Skill Matching",
    description: "Simple keyword-based matching for skills and experience",
    accuracy: 70,
    complexity: "Basic",
    complexityColor: "bg-gray-100 text-gray-700"
  },
  {
    icon: Zap,
    name: "Advanced Semantic",
    description: "Uses NLP to understand job requirements semantically",
    accuracy: 92,
    complexity: "Advanced",
    complexityColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: Settings,
    name: "Hybrid Matching",
    description: "Combines keyword matching with semantic understanding",
    accuracy: 85,
    complexity: "Intermediate",
    complexityColor: "bg-green-100 text-green-700"
  },
  {
    icon: ArrowRight,
    name: "ML Prediction Model",
    description: "Uses machine learning to predict candidate success",
    accuracy: 95,
    complexity: "Advanced",
    complexityColor: "bg-purple-100 text-purple-700"
  }
];

const UserGuide: React.FC = () => {
  return (
    <section className="mt-6 mb-8">
      <Separator className="my-12" />
      
      <div className="max-w-7xl mx-auto">
        <StepsGuide steps={steps} />
        <AIModelsSection models={models} />
        <AdvancedFeaturesSection />
      </div>
    </section>
  );
};

export default UserGuide;
