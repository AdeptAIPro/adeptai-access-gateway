
import React from "react";
import { ArrowRight, BookOpen, Search, Settings } from "lucide-react";

const AdvancedFeaturesSection: React.FC = () => {
  return (
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
  );
};

export default AdvancedFeaturesSection;
