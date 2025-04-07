
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TalentMarketplaceHero from "@/components/talent-marketplace/TalentMarketplaceHero";
import JobListings from "@/components/talent-marketplace/JobListings";
import ResumeUpload from "@/components/talent-marketplace/ResumeUpload";
import TalentMarketplaceTabs from "@/components/talent-marketplace/TalentMarketplaceTabs";

const TalentMarketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"jobs" | "upload">("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <TalentMarketplaceHero 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        location={location}
        setLocation={setLocation}
      />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1">
        <TalentMarketplaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "jobs" ? (
          <JobListings searchQuery={searchQuery} location={location} />
        ) : (
          <ResumeUpload />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default TalentMarketplace;
