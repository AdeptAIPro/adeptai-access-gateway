
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AdeptAI Marketplace
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Discover premium AI and SaaS tools that boost your productivity and transform your workflow.
        </p>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <Input 
            placeholder="Search for AI tools, productivity apps, and more..." 
            className="bg-white text-gray-800 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 h-12">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
