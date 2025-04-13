
import React from 'react';
import { SectionCard, SectionHeader } from '@/components/ui/section-card';
import { Award, ExternalLink, CloudCog, Server, Network, Shield, ShieldAlert } from 'lucide-react';

// Tech Partners data
const techPartners = [
  { 
    name: 'Microsoft Azure', 
    url: 'https://azure.microsoft.com', 
    description: 'Cloud infrastructure and platform services',
    icon: <CloudCog className="w-8 h-8 text-blue-500" /> 
  },
  { 
    name: 'Amazon Web Services', 
    url: 'https://aws.amazon.com', 
    description: 'Comprehensive cloud computing platform',
    icon: <Server className="w-8 h-8 text-orange-500" /> 
  },
  { 
    name: 'Google Cloud', 
    url: 'https://cloud.google.com',
    description: 'Suite of cloud computing services',
    icon: <CloudCog className="w-8 h-8 text-green-500" /> 
  },
  { 
    name: 'Cisco', 
    url: 'https://www.cisco.com', 
    description: 'Networking and cybersecurity solutions',
    icon: <Network className="w-8 h-8 text-blue-600" /> 
  },
  { 
    name: 'Fortinet', 
    url: 'https://www.fortinet.com', 
    description: 'Enterprise security solutions',
    icon: <Shield className="w-8 h-8 text-purple-600" /> 
  },
  { 
    name: 'Palo Alto Networks', 
    url: 'https://www.paloaltonetworks.com', 
    description: 'Advanced firewall and security solutions',
    icon: <ShieldAlert className="w-8 h-8 text-green-700" /> 
  }
];

const TechPartnersSection: React.FC = () => {
  return (
    <SectionCard>
      <SectionHeader title="Technology Partners We Work With" icon={<Award className="w-6 h-6 text-adept" />} />
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
        We leverage industry-leading technologies to deliver comprehensive IT solutions
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {techPartners.map((partner, index) => (
          <a 
            key={index} 
            href={partner.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 hover:border-adept hover:shadow-md transition-all duration-300"
            aria-label={`Learn more about our work with ${partner.name}`}
          >
            <div className="mb-4">
              {partner.icon}
            </div>
            <h3 className="text-center text-lg font-medium mb-2">{partner.name}</h3>
            <p className="text-center text-sm text-muted-foreground">{partner.description}</p>
            <div className="mt-3 text-adept flex items-center">
              <span className="text-sm mr-1">Learn more</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        ))}
      </div>
    </SectionCard>
  );
};

export default TechPartnersSection;
