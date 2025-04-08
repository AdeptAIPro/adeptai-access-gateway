
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, BookText } from "lucide-react";
import { Link } from "react-router-dom";

// Content categories with their respective icons and articles
const contentCategories = [
  {
    title: "Career Advice",
    description: "Expert guidance to help you advance your career",
    icon: <BookOpen className="h-8 w-8 text-purple-500" />,
    articles: [
      { title: "How to Create a Standout Resume in 2025", slug: "standout-resume-2025" },
      { title: "10 Interview Tips from Hiring Managers", slug: "interview-tips-hiring-managers" },
      { title: "The Art of Salary Negotiation", slug: "salary-negotiation" },
    ],
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Industry Insights",
    description: "Salary trends and market analysis for informed decisions",
    icon: <FileText className="h-8 w-8 text-blue-500" />,
    articles: [
      { title: "2025 Tech Salary Guide: What You Should Earn", slug: "tech-salary-guide-2025" },
      { title: "Emerging Job Markets: Where the Growth Is", slug: "emerging-job-markets" },
      { title: "Remote Work Trends: The New Normal", slug: "remote-work-trends" },
    ],
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "AI in Recruitment",
    description: "How AI is transforming the hiring process",
    icon: <BookText className="h-8 w-8 text-green-500" />,
    articles: [
      { title: "How AI Is Changing the Recruitment Landscape", slug: "ai-changing-recruitment" },
      { title: "Addressing Bias in AI-Powered Hiring", slug: "addressing-bias-ai-hiring" },
      { title: "The Future of AI in Talent Assessment", slug: "future-ai-talent-assessment" },
    ],
    color: "from-green-500 to-green-700",
  },
];

const ContentMarketing: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Resources to Power Your Career</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access expert insights, industry trends, and educational content to help you make informed career decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contentCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-md h-full">
              <CardHeader className={`bg-gradient-to-r ${category.color} text-white p-6`}>
                <div className="flex items-center mb-4">
                  {category.icon}
                </div>
                <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
                <CardDescription className="text-white opacity-90">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link 
                        to={`/resources/${category.title.toLowerCase().replace(/\s+/g, '-')}/${article.slug}`}
                        className="text-gray-800 hover:text-blue-600 font-medium flex items-start"
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-2"></span>
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t p-6 bg-gray-50">
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/resources/${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    View All {category.title} Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-adept hover:bg-adept-dark">
            <Link to="/resources">Browse All Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentMarketing;
