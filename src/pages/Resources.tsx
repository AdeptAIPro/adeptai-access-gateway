
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, BookText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const resourceCategories = [
  {
    id: "career-advice",
    title: "Career Advice",
    icon: <BookOpen className="h-5 w-5" />,
    articles: [
      {
        id: "standout-resume-2025",
        title: "How to Create a Standout Resume in 2025",
        excerpt: "Learn the latest techniques and strategies to make your resume stand out in a competitive job market.",
        date: "April 2, 2025",
        readTime: "8 min read",
        author: "Emma Rodriguez",
        category: "career-advice",
        featured: true,
      },
      {
        id: "interview-tips-hiring-managers",
        title: "10 Interview Tips from Hiring Managers",
        excerpt: "Discover what hiring managers really look for during interviews and how to prepare effectively.",
        date: "March 28, 2025",
        readTime: "6 min read",
        author: "James Wilson",
        category: "career-advice",
      },
      {
        id: "salary-negotiation",
        title: "The Art of Salary Negotiation",
        excerpt: "Master the techniques of salary negotiation to ensure you get paid what you're worth.",
        date: "March 15, 2025",
        readTime: "7 min read",
        author: "Sophia Chen",
        category: "career-advice",
      },
      {
        id: "networking-strategies",
        title: "Effective Networking Strategies for Job Seekers",
        excerpt: "Build a powerful professional network that can help advance your career goals.",
        date: "March 10, 2025",
        readTime: "5 min read",
        author: "Michael Johnson",
        category: "career-advice",
      },
      {
        id: "career-transition",
        title: "How to Successfully Navigate a Career Transition",
        excerpt: "A comprehensive guide to changing careers with minimal disruption and maximum success.",
        date: "March 5, 2025",
        readTime: "9 min read",
        author: "Rachel Kim",
        category: "career-advice",
      },
    ],
  },
  {
    id: "industry-insights",
    title: "Industry Insights",
    icon: <FileText className="h-5 w-5" />,
    articles: [
      {
        id: "tech-salary-guide-2025",
        title: "2025 Tech Salary Guide: What You Should Earn",
        excerpt: "Comprehensive analysis of tech industry salaries across different roles, regions, and experience levels.",
        date: "April 5, 2025",
        readTime: "10 min read",
        author: "David Patel",
        category: "industry-insights",
        featured: true,
      },
      {
        id: "emerging-job-markets",
        title: "Emerging Job Markets: Where the Growth Is",
        excerpt: "Explore the fastest-growing job sectors and geographical regions for career opportunities.",
        date: "March 30, 2025",
        readTime: "8 min read",
        author: "Olivia Martinez",
        category: "industry-insights",
      },
      {
        id: "remote-work-trends",
        title: "Remote Work Trends: The New Normal",
        excerpt: "How remote work continues to evolve and shape the global workforce landscape.",
        date: "March 22, 2025",
        readTime: "7 min read",
        author: "Thomas Wright",
        category: "industry-insights",
      },
      {
        id: "industry-skill-gaps",
        title: "Bridging the Skills Gap: What Employers Need Now",
        excerpt: "Analysis of the most critical skills shortages across industries and how to develop them.",
        date: "March 18, 2025",
        readTime: "6 min read",
        author: "Jennifer Lee",
        category: "industry-insights",
      },
      {
        id: "startup-hiring-trends",
        title: "Startup Hiring Trends: What's Hot in 2025",
        excerpt: "The latest hiring practices and talent strategies from innovative startups worldwide.",
        date: "March 12, 2025",
        readTime: "8 min read",
        author: "Alex Johnson",
        category: "industry-insights",
      },
    ],
  },
  {
    id: "ai-in-recruitment",
    title: "AI in Recruitment",
    icon: <BookText className="h-5 w-5" />,
    articles: [
      {
        id: "ai-changing-recruitment",
        title: "How AI Is Changing the Recruitment Landscape",
        excerpt: "Explore the transformative impact of artificial intelligence on hiring processes and outcomes.",
        date: "April 7, 2025",
        readTime: "9 min read",
        author: "Robert Zhang",
        category: "ai-in-recruitment",
        featured: true,
      },
      {
        id: "addressing-bias-ai-hiring",
        title: "Addressing Bias in AI-Powered Hiring",
        excerpt: "Strategies for ensuring AI recruitment tools promote diversity and reduce unconscious bias.",
        date: "April 1, 2025",
        readTime: "11 min read",
        author: "Samantha Jones",
        category: "ai-in-recruitment",
      },
      {
        id: "future-ai-talent-assessment",
        title: "The Future of AI in Talent Assessment",
        excerpt: "How artificial intelligence is revolutionizing the way companies evaluate candidate capabilities.",
        date: "March 25, 2025",
        readTime: "8 min read",
        author: "Daniel Kim",
        category: "ai-in-recruitment",
      },
      {
        id: "ethics-ai-recruitment",
        title: "The Ethics of AI in Modern Hiring Practices",
        excerpt: "Examining the ethical considerations and responsibilities when implementing AI hiring tools.",
        date: "March 20, 2025",
        readTime: "10 min read",
        author: "Emily Chen",
        category: "ai-in-recruitment",
      },
      {
        id: "candidate-experience-ai",
        title: "Enhancing Candidate Experience with AI Technologies",
        excerpt: "How intelligent technologies are creating more personalized, efficient application processes.",
        date: "March 15, 2025",
        readTime: "7 min read",
        author: "Nathan Singh",
        category: "ai-in-recruitment",
      },
    ],
  },
];

const ResourcesPage = () => {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(category || "all");

  // Filter articles based on search query
  const filterArticles = (articles: any[]) => {
    if (!searchQuery) return articles;
    return articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get all articles across categories
  const allArticles = resourceCategories.flatMap(category => category.articles);
  
  // Get featured articles
  const featuredArticles = allArticles.filter(article => article.featured);

  // Determine which articles to display based on active tab
  const getDisplayArticles = () => {
    if (activeTab === "all") return filterArticles(allArticles);
    const categoryArticles = resourceCategories.find(cat => cat.id === activeTab)?.articles || [];
    return filterArticles(categoryArticles);
  };

  const displayArticles = getDisplayArticles();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Career Resources & Insights</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Expert advice, industry analysis, and educational content to advance your career
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for articles, topics, or keywords..."
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 border-0 shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="all" className="text-sm md:text-base">All Resources</TabsTrigger>
            {resourceCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-sm md:text-base">
                <span className="hidden md:flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.title}</span>
                </span>
                <span className="md:hidden">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-8">
            {activeTab === "all" && !searchQuery && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {featuredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden shadow-md">
                      <CardHeader className="p-0">
                        <div className="h-48 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </div>
                        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                        <CardDescription className="mb-4">{article.excerpt}</CardDescription>
                        <div className="text-sm font-medium">By {article.author}</div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button variant="link" className="p-0 h-auto">Read Article →</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : activeTab === "all" 
                    ? "All Articles" 
                    : `${resourceCategories.find(cat => cat.id === activeTab)?.title} Articles`}
              </h2>
              
              {displayArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No articles found matching your search.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {displayArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 bg-gradient-to-r from-gray-200 to-gray-300 h-48 md:h-auto"></div>
                        <div className="md:w-3/4 p-6">
                          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
                            <span>{article.date}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readTime}</span>
                            <span className="mx-2">•</span>
                            <span className="capitalize">{article.category.replace(/-/g, ' ')}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                          <p className="text-gray-600 mb-4">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">By {article.author}</div>
                            <Button variant="link" className="p-0 h-auto">Read Article →</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      <Footer />
    </div>
  );
};

export default ResourcesPage;
