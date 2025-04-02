
import React from "react";
import { Info, Zap } from "lucide-react";
import { AIModel, AIModelsSectionProps } from "./types";

const AIModelsSection: React.FC<AIModelsSectionProps> = ({ models }) => {
  return (
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
  );
};

export default AIModelsSection;
