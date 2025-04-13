
import React from 'react';
import { SectionCard, SectionHeader } from '@/components/ui/section-card';
import { FileText, ExternalLink, Building, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  return (
    <SectionCard>
      <SectionHeader title="Case Studies" icon={<Award className="w-6 h-6 text-adept" />} />
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
        Real-world examples of how our IT consulting solutions have transformed businesses
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {caseStudies.map((study, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-adept to-adept-dark p-4">
              <h3 className="text-xl font-semibold text-white">{study.title}</h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-3 text-sm text-gray-500">
                <Building className="w-4 h-4 mr-2" />
                <span className="mr-4">{study.client}</span>
                <Calendar className="w-4 h-4 mr-2" />
                <span>{study.date}</span>
              </div>
              
              <p className="mb-4 text-muted-foreground">{study.description}</p>
              
              <h4 className="font-medium text-gray-900 mb-2">Key Outcomes:</h4>
              <ul className="space-y-1 mb-4">
                {study.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-adept mr-2">•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-3 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {study.industry}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10">
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
