
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, Store } from "lucide-react";

const Marketplace: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AdeptAI Marketplace
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Find top talent or discover premium software solutions to transform your business
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Talent Marketplace Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Briefcase className="h-24 w-24 text-white" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">Talent Marketplace</h2>
                <p className="text-gray-600 mb-4">
                  Find top talent or post your job openings. Connect with skilled professionals and build your dream team.
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/marketplace/talent")}
                >
                  Browse Talent Marketplace
                </Button>
              </div>
            </div>
            
            {/* Software Marketplace Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Store className="h-24 w-24 text-white" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">Software Marketplace</h2>
                <p className="text-gray-600 mb-4">
                  Discover premium AI and SaaS tools that boost your productivity and transform your workflow.
                </p>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => navigate("/marketplace/software")}
                >
                  Browse Software Marketplace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
