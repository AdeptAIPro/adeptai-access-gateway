
import React from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TalentMarketplaceHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
}

const TalentMarketplaceHero: React.FC<TalentMarketplaceHeroProps> = ({ 
  searchQuery, 
  setSearchQuery,
  location,
  setLocation
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Browse thousands of job listings or submit your resume to get discovered by top employers
        </p>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Job title, skills, or company" 
              className="bg-white text-gray-800 h-12 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="City, state, or remote" 
              className="bg-white text-gray-800 h-12 pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8">
            <Search className="mr-2 h-4 w-4" />
            Search Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TalentMarketplaceHero;
