
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
  commission?: string;
}

const AffiliateMarketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  
  // Marketplace products data with commission information
  const affiliateProducts: AffiliateProduct[] = [
    // PRODUCTIVITY CATEGORY
    {
      id: "p1",
      name: "AI Assistant Pro",
      description: "Boost your productivity with this AI-powered assistant that automates repetitive tasks.",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["AI", "Automation", "Assistant"],
      affiliateUrl: "#",
      discount: "15% OFF",
      featured: true,
      commission: "30%"
    },
    {
      id: "p2",
      name: "TaskMaster",
      description: "The ultimate task management tool for teams and individuals.",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Task Management", "Teams", "Planning"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "p3",
      name: "FocusFlow",
      description: "Boost productivity with science-backed focus sessions and break timers.",
      imageUrl: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Focus", "Time Management"],
      affiliateUrl: "#",
      commission: "20%"
    },
    {
      id: "p4",
      name: "NoteTaker Pro",
      description: "Smart note-taking app with AI categorization and search.",
      imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Notes", "Organization"],
      affiliateUrl: "#",
      discount: "10% OFF",
      commission: "30%"
    },
    {
      id: "p5",
      name: "WorkspaceOne",
      description: "All-in-one workspace combining docs, tasks, and communication.",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Workspace", "Collaboration"],
      affiliateUrl: "#",
      featured: true,
      commission: "25%"
    },
    {
      id: "p6",
      name: "MindMapMaster",
      description: "Create visual mind maps to organize your ideas and projects.",
      imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Mind Maps", "Visualization"],
      affiliateUrl: "#",
      commission: "20%"
    },
    {
      id: "p7",
      name: "AutoScheduler",
      description: "AI-powered scheduling that automatically optimizes your calendar.",
      imageUrl: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Calendar", "AI", "Scheduling"],
      affiliateUrl: "#",
      commission: "30%"
    },
    {
      id: "p8",
      name: "EmailMaster",
      description: "Manage your inbox like a pro with smart filtering and automation.",
      imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Email", "Automation"],
      affiliateUrl: "#",
      discount: "20% OFF",
      commission: "25%"
    },
    {
      id: "p9",
      name: "TeamSync",
      description: "Keep your team in sync with this comprehensive collaboration tool.",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Teams", "Collaboration"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "p10",
      name: "VoiceTranscriber",
      description: "Convert voice to text with high accuracy for meetings and interviews.",
      imageUrl: "https://images.unsplash.com/photo-1590935217281-8f102120d683?auto=format&fit=crop&w=300&q=80",
      category: "productivity",
      tags: ["Transcription", "Voice"],
      affiliateUrl: "#",
      commission: "20%"
    },
    
    // ANALYTICS CATEGORY
    {
      id: "a1",
      name: "DataMind Analytics",
      description: "Enterprise-grade analytics platform powered by AI for data-driven decisions.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Analytics", "Business Intelligence", "Data"],
      affiliateUrl: "#",
      featured: true,
      commission: "30%"
    },
    {
      id: "a2",
      name: "InsightDash",
      description: "Beautiful, customizable dashboards for all your business metrics.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Dashboards", "Visualization"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "a3",
      name: "MetricFlow",
      description: "Real-time metrics and analytics for data-driven companies.",
      imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Real-time", "Metrics"],
      affiliateUrl: "#",
      discount: "10% OFF",
      commission: "25%"
    },
    {
      id: "a4",
      name: "PredictiveAI",
      description: "Forecast business trends with machine learning algorithms.",
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["AI", "Forecasting", "ML"],
      affiliateUrl: "#",
      featured: true,
      commission: "35%"
    },
    {
      id: "a5",
      name: "WebAnalytics Pro",
      description: "Advanced web analytics solution with visitor insights and conversion tracking.",
      imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Web Analytics", "Conversion"],
      affiliateUrl: "#",
      commission: "30%"
    },
    {
      id: "a6",
      name: "DataFlow ETL",
      description: "Powerful ETL tool for seamless data integration and management.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["ETL", "Data Integration"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "a7",
      name: "AnalyticsBox",
      description: "All-in-one analytics solution for startups and small businesses.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Small Business", "All-in-One"],
      affiliateUrl: "#",
      discount: "15% OFF",
      commission: "25%"
    },
    {
      id: "a8",
      name: "ReportMaster",
      description: "Create stunning reports from your data with minimal effort.",
      imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Reports", "Visualization"],
      affiliateUrl: "#",
      commission: "20%"
    },
    {
      id: "a9",
      name: "DataSegment",
      description: "Customer segmentation and cohort analysis made simple.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Segmentation", "Cohort Analysis"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "a10",
      name: "MetricLens",
      description: "Zoom into your key business metrics with powerful filtering capabilities.",
      imageUrl: "https://images.unsplash.com/photo-1587019158091-1a103c5dd52c?auto=format&fit=crop&w=300&q=80",
      category: "analytics",
      tags: ["Metrics", "Filtering"],
      affiliateUrl: "#",
      commission: "20%"
    },
    
    // STORAGE CATEGORY
    {
      id: "s1",
      name: "CloudStore Pro",
      description: "Secure cloud storage solution with AI-powered organization and search.",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Cloud", "Storage", "Security"],
      affiliateUrl: "#",
      featured: true,
      commission: "25%"
    },
    {
      id: "s2",
      name: "SecureVault",
      description: "Military-grade encrypted storage for your most sensitive files.",
      imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Security", "Encryption"],
      affiliateUrl: "#",
      discount: "10% OFF",
      commission: "30%"
    },
    {
      id: "s3",
      name: "MediaCloud",
      description: "Cloud storage optimized for media files with built-in playback.",
      imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Media", "Cloud"],
      affiliateUrl: "#",
      commission: "20%"
    },
    {
      id: "s4",
      name: "BackupMaster",
      description: "Automated backup solution for individuals and businesses.",
      imageUrl: "https://images.unsplash.com/photo-1558042315-c5307c0c91f8?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Backup", "Automation"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "s5",
      name: "FileSync Pro",
      description: "Keep your files in sync across all your devices effortlessly.",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Sync", "Cross-platform"],
      affiliateUrl: "#",
      featured: true,
      commission: "30%"
    },
    {
      id: "s6",
      name: "DocuStore",
      description: "Document management system with automatic OCR and search.",
      imageUrl: "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Documents", "OCR"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "s7",
      name: "BigDataStorage",
      description: "Scalable storage solution designed for big data applications.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Big Data", "Scalable"],
      affiliateUrl: "#",
      discount: "15% OFF",
      commission: "35%"
    },
    {
      id: "s8",
      name: "PhotoArchive",
      description: "Specialized cloud storage for photographers with RAW support.",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Photos", "Photography"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "s9",
      name: "BusinessVault",
      description: "Enterprise storage solution with advanced user management.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Enterprise", "Business"],
      affiliateUrl: "#",
      commission: "30%"
    },
    {
      id: "s10",
      name: "CloudBackup 365",
      description: "Continuous backup for Microsoft 365 and Google Workspace.",
      imageUrl: "https://images.unsplash.com/photo-1551135049-8a33b5883817?auto=format&fit=crop&w=300&q=80",
      category: "storage",
      tags: ["Microsoft 365", "Google Workspace", "Backup"],
      affiliateUrl: "#",
      commission: "25%"
    },
    
    // DEVELOPMENT CATEGORY
    {
      id: "d1",
      name: "CodeGenius",
      description: "AI code assistant that helps developers write better code faster.",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Development", "Coding", "AI"],
      affiliateUrl: "#",
      featured: true,
      commission: "30%"
    },
    {
      id: "d2",
      name: "DevOpsFlow",
      description: "Streamline your CI/CD pipeline with this all-in-one DevOps solution.",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["DevOps", "CI/CD"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "d3",
      name: "FrontEndWizard",
      description: "The ultimate toolkit for modern frontend development.",
      imageUrl: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Frontend", "Web Development"],
      affiliateUrl: "#",
      discount: "20% OFF",
      commission: "25%"
    },
    {
      id: "d4",
      name: "APIForge",
      description: "Create and manage APIs with minimal code and maximum flexibility.",
      imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["API", "Backend"],
      affiliateUrl: "#",
      featured: true,
      commission: "35%"
    },
    {
      id: "d5",
      name: "TestingPro",
      description: "Comprehensive testing solution for web and mobile applications.",
      imageUrl: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Testing", "QA"],
      affiliateUrl: "#",
      commission: "20%"
    },
    {
      id: "d6",
      name: "GitManager",
      description: "Advanced Git management tool for teams and organizations.",
      imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Git", "Version Control"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "d7",
      name: "CodeReview AI",
      description: "AI-powered code review tool that catches bugs before they reach production.",
      imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Code Review", "AI"],
      affiliateUrl: "#",
      discount: "15% OFF",
      commission: "30%"
    },
    {
      id: "d8",
      name: "DatabaseManager",
      description: "Visual database management tool supporting multiple database types.",
      imageUrl: "https://images.unsplash.com/photo-1456428746267-a1756408f782?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Database", "Management"],
      affiliateUrl: "#",
      commission: "25%"
    },
    {
      id: "d9",
      name: "ServerlessBuilder",
      description: "Build and deploy serverless applications with ease.",
      imageUrl: "https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Serverless", "Cloud"],
      affiliateUrl: "#",
      commission: "30%"
    },
    {
      id: "d10",
      name: "MobileDevKit",
      description: "Complete toolkit for cross-platform mobile app development.",
      imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=300&q=80",
      category: "development",
      tags: ["Mobile", "Cross-platform"],
      affiliateUrl: "#",
      commission: "25%"
    },
    
    // MARKETING CATEGORY
    {
      id: "m1",
      name: "MarketAI Suite",
      description: "Complete marketing automation platform with AI-driven insights and optimization.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Marketing", "Automation", "Analytics"],
      affiliateUrl: "#",
      featured: true,
      discount: "10% OFF",
      commission: "40%"
    },
    {
      id: "m2",
      name: "EmailCampaigner",
      description: "Create, send, and analyze email campaigns with powerful automation.",
      imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Email", "Campaigns"],
      affiliateUrl: "#",
      commission: "35%"
    },
    {
      id: "m3",
      name: "SocialMediaMaster",
      description: "Schedule, publish, and analyze content across all social platforms.",
      imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Social Media", "Publishing"],
      affiliateUrl: "#",
      discount: "20% OFF",
      commission: "30%"
    },
    {
      id: "m4",
      name: "SEOBooster",
      description: "Comprehensive SEO toolkit with keyword research and rank tracking.",
      imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["SEO", "Rankings"],
      affiliateUrl: "#",
      featured: true,
      commission: "35%"
    },
    {
      id: "m5",
      name: "AdOptimizer",
      description: "AI-powered advertising optimization for Google, Facebook, and more.",
      imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Advertising", "AI"],
      affiliateUrl: "#",
      commission: "40%"
    },
    {
      id: "m6",
      name: "ContentPlanner",
      description: "Plan, create, and optimize content with AI-powered suggestions.",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Content", "Planning"],
      affiliateUrl: "#",
      discount: "15% OFF",
      commission: "30%"
    },
    {
      id: "m7",
      name: "LeadGenPro",
      description: "Generate and nurture leads through personalized marketing sequences.",
      imageUrl: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Lead Generation", "Nurturing"],
      affiliateUrl: "#",
      commission: "35%"
    },
    {
      id: "m8",
      name: "AnalyticsInsight",
      description: "Marketing analytics platform with conversion attribution.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Analytics", "Attribution"],
      affiliateUrl: "#",
      commission: "30%"
    },
    {
      id: "m9",
      name: "LandingPageBuilder",
      description: "Create high-converting landing pages without coding.",
      imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Landing Pages", "Conversion"],
      affiliateUrl: "#",
      featured: true,
      commission: "35%"
    },
    {
      id: "m10",
      name: "CustomerJourneyMap",
      description: "Map and optimize your customer's journey through your marketing funnel.",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=300&q=80",
      category: "marketing",
      tags: ["Customer Journey", "Funnel"],
      affiliateUrl: "#",
      commission: "30%"
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
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-green-600 font-semibold">{product.commission} Commission</span>
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
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-green-600 font-semibold text-sm">{product.commission} Commission</span>
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
