
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/marketplace/Hero";
import CategoryTabs from "@/components/marketplace/CategoryTabs";
import PartnerCTA from "@/components/marketplace/PartnerCTA";
import { affiliateProducts, categories } from "@/data/marketplaceProducts";

const AffiliateMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Filter products based on search and category
  const filteredProducts = affiliateProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Separate featured products
  const featuredProducts = filteredProducts.filter(product => product.featured);
  const regularProducts = filteredProducts.filter(product => !product.featured);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1">
        <CategoryTabs 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          featuredProducts={featuredProducts}
          regularProducts={regularProducts}
        />
      </div>
      
      {/* Become a Partner Section */}
      <PartnerCTA />
      
      <Footer />
    </div>
  );
};

export default AffiliateMarketplace;
