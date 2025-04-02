
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import TalentMatchingContainer from "@/components/talent-matching/TalentMatchingContainer";
import AnalyticsTabContent from "@/components/talent-matching/analytics/AnalyticsTabContent";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Sparkles, CheckCircle2, BookOpen, ArrowRight, Zap, Settings, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TalentMatching: React.FC = () => {
  return (
    <DashboardLayout title="AI Talent Matchmaking">
      <TalentMatchingHero />
      
      <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 shadow-sm">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
          <AlertDescription className="text-amber-800 font-medium">
            New! Cross-Source Talent Intelligence is now available. Enable it in the matching panel to leverage AI-powered candidate analysis across multiple talent sources.
          </AlertDescription>
        </div>
      </Alert>
      
      <Tabs defaultValue="matching" className="w-full">
        <TabsList className="w-full max-w-3xl mx-auto mb-6 bg-background border border-border p-1 rounded-lg overflow-x-auto flex md:inline-flex shadow-sm">
          <TabsTrigger value="matching" className="flex-1 py-3 data-[state=active]:bg-adept data-[state=active]:text-white">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Job Matching
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 py-3 data-[state=active]:bg-adept data-[state=active]:text-white">
            Performance Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="matching">
          <TalentMatchingContainer />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTabContent />
        </TabsContent>
      </Tabs>
      
      {/* User Guide Section */}
      <section className="mt-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">How to Use AI Talent Matchmaking</h2>
            <p className="text-gray-600 mt-2">Follow these simple steps to find your perfect candidates</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="border-adept/20 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <div className="bg-adept/10 p-2 rounded-full mr-3">
                      <step.icon className="h-5 w-5 text-adept" />
                    </div>
                    <span className="bg-adept/10 text-adept text-xs font-medium px-2 py-1 rounded-full">Step {index + 1}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Available AI Matching Models</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {models.map((model, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100 hover:border-indigo-300 transition-all">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <model.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h4 className="font-medium text-indigo-900">{model.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{model.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Zap className="h-3 w-3 mr-1" />
                      Accuracy: {model.accuracy}%
                    </span>
                    <span className={`px-2 py-1 rounded-full ${model.complexityColor}`}>
                      {model.complexity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center text-sm font-medium text-indigo-600">
                <Info className="h-4 w-4 mr-1" />
                <span>Select matching models in the Advanced Options panel when starting a new match</span>
              </div>
            </div>
          </div>
          
          <div className="mt-10 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Advanced Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex">
                <div className="bg-amber-100 p-3 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                  <Settings className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Cross-Source Intelligence</h4>
                  <p className="text-sm text-gray-600 mt-1">Compare candidate data across multiple sources for comprehensive insights and verification.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Semantic Matching</h4>
                  <p className="text-sm text-gray-600 mt-1">Use NLP technology to understand the meaning behind job requirements and candidate skills.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-purple-100 p-3 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Document Analysis</h4>
                  <p className="text-sm text-gray-600 mt-1">Upload or paste job descriptions directly from any source - our AI will extract key requirements.</p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                  <ArrowRight className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">One-Click Actions</h4>
                  <p className="text-sm text-gray-600 mt-1">Directly save candidates to your pipeline or initiate contact from the results screen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

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

export default TalentMatching;
