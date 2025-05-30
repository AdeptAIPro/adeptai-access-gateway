
import React from 'react';
import { SectionCard, SectionHeader } from '@/components/ui/section-card';
import { Newspaper, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Cybersecurity News data
const cybersecurityNews = [
  {
    title: "New Zero-Day Vulnerability Discovered in Popular Enterprise Software",
    summary: "Security researchers have identified a critical vulnerability affecting thousands of businesses worldwide. Patches are being developed.",
    source: "Cybersecurity Today",
    url: "https://example.com/news/zero-day-vulnerability",
    date: "April 10, 2025"
  },
  {
    title: "Ransomware Attacks Increased by 150% in Q1 2025",
    summary: "New report shows alarming rise in ransomware incidents targeting healthcare and financial sectors. Learn how to protect your organization.",
    source: "Security Weekly",
    url: "https://example.com/news/ransomware-statistics-2025",
    date: "April 8, 2025"
  },
  {
    title: "NIST Releases Updated Cybersecurity Framework",
    summary: "The National Institute of Standards and Technology has published new guidelines for organizations to better protect against emerging threats.",
    source: "Government Technology",
    url: "https://example.com/news/nist-framework-update",
    date: "April 5, 2025"
  },
  {
    title: "AI-Powered Threat Detection Systems Show Promise in Early Tests",
    summary: "New artificial intelligence systems can detect and respond to network intrusions significantly faster than traditional methods.",
    source: "Tech Innovations",
    url: "https://example.com/news/ai-threat-detection",
    date: "April 3, 2025"
  }
];

const CybersecurityNewsSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <SectionCard>
      <SectionHeader title="Latest in Cybersecurity" icon={<Newspaper className="w-6 h-6 text-adept" />} />
      <p className="text-center text-lg text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4 md:px-0">
        Stay informed about the evolving cybersecurity landscape with our curated news feed
      </p>

      <div className="space-y-4 md:space-y-6 mt-6 md:mt-8 px-2 md:px-0">
        {cybersecurityNews.map((news, index) => (
          <a 
            key={index}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 md:p-6 rounded-lg border border-gray-200 hover:border-adept hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 md:mb-0">{news.title}</h3>
              <div className="flex items-center text-gray-500 text-xs md:text-sm whitespace-nowrap">
                <Clock className="w-3 h-3 mr-1" />
                {news.date}
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-3">{news.summary}</p>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-0">Source: {news.source}</span>
              <div className="text-adept flex items-center">
                <span className="text-xs md:text-sm mr-1">Read more</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="text-center mt-6 md:mt-8">
        <Button variant="outline" className="border-adept text-adept hover:bg-adept hover:text-white">
          <a href="/resources/cybersecurity" className="flex items-center gap-2">
            View All Cybersecurity Resources
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </SectionCard>
  );
};

export default CybersecurityNewsSection;
