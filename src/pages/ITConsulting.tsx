
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Server, Shield, Code, Network, Eye, ShieldAlert, Award, CloudCog } from 'lucide-react';
import { SectionCard, SectionHeader } from '@/components/ui/section-card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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

const techPartners = [
  { name: 'Microsoft Azure', url: 'https://azure.microsoft.com', icon: <CloudCog className="w-8 h-8 text-blue-500" /> },
  { name: 'Amazon Web Services', url: 'https://aws.amazon.com', icon: <Server className="w-8 h-8 text-orange-500" /> },
  { name: 'Google Cloud', url: 'https://cloud.google.com', icon: <CloudCog className="w-8 h-8 text-green-500" /> },
  { name: 'IBM Cloud', url: 'https://www.ibm.com/cloud', icon: <Server className="w-8 h-8 text-blue-700" /> },
  { name: 'Oracle Cloud', url: 'https://www.oracle.com/cloud', icon: <CloudCog className="w-8 h-8 text-red-600" /> },
  { name: 'Cisco', url: 'https://www.cisco.com', icon: <Network className="w-8 h-8 text-blue-600" /> },
  { name: 'Fortinet', url: 'https://www.fortinet.com', icon: <Shield className="w-8 h-8 text-purple-600" /> },
  { name: 'Palo Alto Networks', url: 'https://www.paloaltonetworks.com', icon: <ShieldAlert className="w-8 h-8 text-green-700" /> },
  { name: 'CrowdStrike', url: 'https://www.crowdstrike.com', icon: <Shield className="w-8 h-8 text-red-500" /> },
  { name: 'VMware', url: 'https://www.vmware.com', icon: <Server className="w-8 h-8 text-blue-400" /> },
  { name: 'Salesforce', url: 'https://www.salesforce.com', icon: <CloudCog className="w-8 h-8 text-blue-500" /> },
  { name: 'ServiceNow', url: 'https://www.servicenow.com', icon: <Code className="w-8 h-8 text-green-500" /> }
];

const certifications = [
  'ISO 27001 Certified',
  'SOC 2 Type II Compliant',
  'HIPAA Compliant',
  'PCI DSS Certified',
  'GDPR Compliant',
  'CMMC Level 3 Ready',
  'FedRAMP Authorized'
];

export default function ITConsulting() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-adept to-adept-dark text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">IT Consulting & Cybersecurity Solutions</h1>
              <p className="text-xl mb-8">Transforming businesses with cutting-edge technology and unparalleled security expertise</p>
              <Button size="lg" variant="outline" className="bg-white text-adept hover:bg-white/90">
                <a href="/contact">Get a Free Consultation</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
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

            {/* Technology Partners Section */}
            <SectionCard>
              <SectionHeader title="Our Technology Partners" icon={<Award className="w-6 h-6 text-adept" />} />
              <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                We collaborate with industry-leading technology providers to deliver best-in-class solutions
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
                {techPartners.map((partner, index) => (
                  <a 
                    key={index} 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-adept hover:shadow-md transition-all duration-300"
                    aria-label={`Visit ${partner.name} website`}
                  >
                    <div className="mb-3">
                      {partner.icon}
                    </div>
                    <span className="text-center text-sm font-medium">{partner.name}</span>
                  </a>
                ))}
              </div>
            </SectionCard>

            {/* Certifications Section */}
            <SectionCard>
              <SectionHeader title="Industry Certifications" icon={<Award className="w-6 h-6 text-adept" />} />
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Call to Action */}
            <div className="text-center mt-12 bg-adept-light p-10 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Ready to secure your digital future?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Our team of experts is ready to help you navigate the complex world of cybersecurity and IT infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-adept hover:bg-adept-dark">
                  <a href="/contact">Contact Our Team</a>
                </Button>
                <Button size="lg" variant="outline">
                  <a href="/pricing">View Pricing Options</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
