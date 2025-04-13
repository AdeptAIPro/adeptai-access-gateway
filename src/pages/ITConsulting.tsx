
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Server, Shield, Code, Network, Eye, ShieldAlert, Award, CloudCog, Newspaper, ExternalLink, Clock } from 'lucide-react';
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

            {/* Cybersecurity News Feed Section */}
            <SectionCard>
              <SectionHeader title="Latest in Cybersecurity" icon={<Newspaper className="w-6 h-6 text-adept" />} />
              <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                Stay informed about the evolving cybersecurity landscape with our curated news feed
              </p>

              <div className="space-y-6 mt-8">
                {cybersecurityNews.map((news, index) => (
                  <a 
                    key={index}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-lg border border-gray-200 hover:border-adept hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{news.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        {news.date}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{news.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">Source: {news.source}</span>
                      <div className="text-adept flex items-center">
                        <span className="text-sm mr-1">Read more</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" className="border-adept text-adept hover:bg-adept hover:text-white">
                  <a href="/resources/cybersecurity" className="flex items-center gap-2">
                    View All Cybersecurity Resources
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
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
