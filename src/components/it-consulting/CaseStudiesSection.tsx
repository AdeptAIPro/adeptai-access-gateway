
import React from 'react';
import { SectionCard, SectionHeader } from '@/components/ui/section-card';
import { FileText, ExternalLink, Building, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Case Studies data
const caseStudies = [
  {
    title: "Cloud Migration for Healthcare Provider",
    client: "Regional Medical Center",
    description: "Migrated critical patient systems to a secure cloud infrastructure, improving uptime from 96% to 99.99% while ensuring HIPAA compliance and reducing operational costs by 28%.",
    outcomes: [
      "99.99% uptime for critical systems",
      "28% reduction in IT operational costs",
      "Enhanced disaster recovery capabilities"
    ],
    date: "January 2025",
    industry: "Healthcare"
  },
  {
    title: "Cybersecurity Overhaul for Financial Institution",
    client: "Midwest Credit Union",
    description: "Implemented comprehensive security measures to protect sensitive financial data and customer information. Established robust monitoring systems and incident response protocols.",
    outcomes: [
      "Zero security breaches since implementation",
      "Achieved PCI DSS compliance",
      "Reduced threat detection time from hours to minutes"
    ],
    date: "November 2024",
    industry: "Financial Services"
  },
  {
    title: "IT Infrastructure Modernization",
    client: "Global Manufacturing Corp",
    description: "Redesigned and modernized legacy IT infrastructure to support rapid business growth and enable digital transformation initiatives across 12 international locations.",
    outcomes: [
      "Reduced system latency by 65%",
      "Seamless integration with IoT manufacturing systems",
      "Enabled real-time data analytics capabilities"
    ],
    date: "March 2024",
    industry: "Manufacturing"
  }
];

const CaseStudiesSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <SectionCard>
      <SectionHeader title="Case Studies" icon={<Award className="w-6 h-6 text-adept" />} />
      <p className="text-center text-lg text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4 md:px-0">
        Real-world examples of how our IT consulting solutions have transformed businesses
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 md:mt-8 px-2 md:px-0">
        {caseStudies.map((study, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-adept to-adept-dark p-3 md:p-4">
              <h3 className="text-base md:text-xl font-semibold text-white">{study.title}</h3>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="flex flex-wrap items-center mb-3 text-xs md:text-sm text-gray-500">
                <div className="flex items-center mr-3 md:mr-4 mb-1 md:mb-0">
                  <Building className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span>{study.client}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  <span>{study.date}</span>
                </div>
              </div>
              
              <p className="mb-3 md:mb-4 text-muted-foreground text-sm md:text-base">{study.description}</p>
              
              <h4 className="font-medium text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Key Outcomes:</h4>
              <ul className="space-y-1 mb-3 md:mb-4 text-sm md:text-base">
                {study.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-adept mr-2">•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-2 md:pt-3 border-t border-gray-100">
                <span className="inline-block px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm">
                  {study.industry}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8 md:mt-10">
        <Button variant="outline" className="border-adept text-adept hover:bg-adept hover:text-white">
          <a href="/case-studies" className="flex items-center gap-2">
            View All Case Studies
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </SectionCard>
  );
};

export default CaseStudiesSection;
