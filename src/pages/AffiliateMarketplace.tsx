import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Search, Tag, ArrowRight, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types for marketplace products
interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  affiliateUrl: string;
  discount?: string;
  featured?: boolean;
}

const AffiliateMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  
  // This is sample data - you'll replace these with your actual affiliate links
  const affiliateProducts: AffiliateProduct[] = [
    {
      id: "1",
      name: "AI Assistant Pro",
      description: "Boost your productivity with this AI-powered assistant that automates repetitive tasks.",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["AI", "Automation", "Assistant"],
      affiliateUrl: "#", // Replace with actual affiliate URL
      discount: "15% OFF",
      featured: true
    },
    {
      id: "2",
      name: "DataMind Analytics",
      description: "Enterprise-grade analytics platform powered by AI for data-driven decisions.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Analytics", "Business Intelligence", "Data"],
      affiliateUrl: "#" // Replace with actual affiliate URL
    },
    {
      id: "3",
      name: "CloudStore Pro",
      description: "Secure cloud storage solution with AI-powered organization and search.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Cloud", "Storage", "Security"],
      affiliateUrl: "#" // Replace with actual affiliate URL
    },
    {
      id: "4",
      name: "CodeGenius",
      description: "AI code assistant that helps developers write better code faster.",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Development", "Coding", "AI"],
      affiliateUrl: "#", // Replace with actual affiliate URL
      featured: true
    },
    {
      id: "5",
      name: "MarketAI Suite",
      description: "Complete marketing automation platform with AI-driven insights and optimization.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Marketing", "Automation", "Analytics"],
      affiliateUrl: "#", // Replace with actual affiliate URL
      discount: "10% OFF"
    }
  ];
  
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "productivity", label: "Productivity" },
    { value: "analytics", label: "Analytics" },
    { value: "storage", label: "Storage" },
    { value: "development", label: "Development" },
    { value: "marketing", label: "Marketing" }
  ];
  
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
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex-1">
        {/* Categories Tabs */}
        <Tabs defaultValue="all" className="mb-12" onValueChange={setSelectedCategory} value={selectedCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory}>
            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <ThumbsUp className="mr-2 h-5 w-5" />
                  Featured Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all">
                      <div className="relative">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {product.discount && (
                          <Badge className="absolute top-2 right-2 bg-red-500">
                            {product.discount}
                          </Badge>
                        )}
                        <Badge className="absolute top-2 left-2 bg-purple-500">
                          Featured
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{product.name}</h3>
                        </div>
                        <p className="text-gray-500 mb-4">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-purple-50 text-purple-700">
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <a 
                          href={product.affiliateUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Get Special Deal
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Products */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}</h2>
              {regularProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {product.discount && (
                          <Badge className="absolute top-2 right-2 bg-red-500">
                            {product.discount}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold">{product.name}</h3>
                        </div>
                        <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <a 
                          href={product.affiliateUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Become a Partner Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to List Your Product Here?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            If you have a SaaS or AI product that would be valuable to our audience, get in touch to discuss partnership opportunities.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link to="/contact" className="flex items-center">
              Contact Us About Partnerships
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AffiliateMarketplace;
