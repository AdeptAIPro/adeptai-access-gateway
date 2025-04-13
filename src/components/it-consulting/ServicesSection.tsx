
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Server, Shield, Code, Network, Eye, ShieldAlert } from 'lucide-react';
import { SectionCard, SectionHeader } from '@/components/ui/section-card';

const services = [
  {
    title: 'AI Talent Matchmaking & Workforce Solutions',
    description: `Transform hiring with next-gen AI and agentic automation tailored for Healthcare, IT, and Non-IT industries. Whether you're an HR team, staffing agency, or a job seeker, our intelligent engine matches the right talent with the right role—faster and smarter.`,
    features: [
      'Smart Candidate Matching',
      'Job Seeker Tools',
      'Staffing Automation',
      'HR Dashboard'
    ],
    icon: <CheckCircle className="w-6 h-6 text-adept" />
  },
  {
    title: 'Global Load Testing (Maelstrom)',
    description: `Test your infrastructure with billions of simulated users to identify stress points and optimize system resilience before real-world failures.`,
    features: [
      'DDoS attack simulations',
      'Real user traffic emulation',
      'AI-driven port vulnerability scans',
      'Real-time performance reporting'
    ],
    icon: <Server className="w-6 h-6 text-adept" />
  },
  {
    title: 'Automated Penetration Testing (Vortex)',
    description: `Proactively identify and fix vulnerabilities across your entire digital surface with point-and-click simplicity.`,
    features: [
      'Unlimited vulnerability scanning',
      'OWASP risk mitigation',
      'Compliance readiness (GDPR, HIPAA, SOC 2, etc.)',
      'Automated remediation suggestions'
    ],
    icon: <Code className="w-6 h-6 text-adept" />
  },
  {
    title: 'Network Threat Monitoring & Honeypot (Echo)',
    description: `Gain full visibility into malicious activity with non-invasive monitoring and actionable threat intelligence.`,
    features: [
      'Live attack mapping',
      'Attacker profiling and CVE exploit tracking',
      'Zero disruption to operations',
      'Detailed reporting with remediation guidance'
    ],
    icon: <Network className="w-6 h-6 text-adept" />
  },
  {
    title: 'Virtual AI CISO for Strategic Cybersecurity',
    description: `Get an intelligent, always-on Chief Information Security Officer to guide your compliance and threat mitigation strategy.`,
    features: [
      'Situational awareness of evolving risks',
      'Continuous security assessments',
      'Actionable threat intelligence',
      'Tailored reports and alerts for decision-makers'
    ],
    icon: <ShieldAlert className="w-6 h-6 text-adept" />
  },
  {
    title: 'Security Compliance Services',
    description: `Expert support to help you navigate and certify across multiple frameworks.`,
    features: [
      'SOC 2, ISO 27001, PCI DSS',
      'HIPAA, GDPR, CMMC, FedRAMP'
    ],
    icon: <Shield className="w-6 h-6 text-adept" />
  }
];

const ServicesSection: React.FC = () => {
  return (
    <SectionCard>
      <SectionHeader title="Our IT Consulting Services" icon={<Eye className="w-6 h-6 text-adept" />} />
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
        Empowering Your Business with Advanced Technology Solutions and Enterprise-Grade Security
      </p>

      <div className="grid gap-8 md:grid-cols-2 mt-8">
        {services.map((service, index) => (
          <Card key={index} className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {service.icon}
                <h2 className="text-xl font-semibold">{service.title}</h2>
              </div>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-adept" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionCard>
  );
};

export default ServicesSection;
