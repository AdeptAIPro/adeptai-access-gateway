
import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const PricingFaq = () => {
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const faqItems = [
    {
      question: "How does the Free Trial work?",
      answer: "The Free Trial gives you access to all features with a daily usage limit. You can try all of our AI features once per day without any payment information required. This is perfect for exploring the platform's capabilities before committing to a paid plan."
    },
    {
      question: "Can I switch plans at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, the changes will take effect at the start of your next billing cycle."
    },
    {
      question: "What happens when I reach my usage limit?",
      answer: "When you reach your usage limit, you'll be notified and given options to either upgrade to a higher tier plan or purchase additional pay-per-use credits to continue using the features."
    },
    {
      question: "How does Pay-Per-Use billing work?",
      answer: "Pay-Per-Use allows you to purchase credits that can be used for any AI feature within the platform. Each usage costs $9, and you only pay for what you use. Credits never expire, providing flexibility for occasional users."
    },
    {
      question: "Do you offer customized enterprise solutions?",
      answer: "Yes, we offer customized enterprise solutions with dedicated account management, custom integrations, and tailored AI solutions for your specific business needs. Please contact our sales team for more information."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 14-day money-back guarantee on all paid subscriptions. If you're not satisfied with our service, you can request a refund within 14 days of your initial purchase. Pay-per-use credits are non-refundable once purchased."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise customers. All payments are securely processed through Stripe."
    },
    {
      question: "Can I use the API in my custom applications?",
      answer: "Yes, API access is available on the Business, Enterprise, and Pay-As-You-Go plans. You'll receive API keys and documentation to integrate our AI capabilities into your own applications."
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our pricing and features
          </p>
        </div>
        
        <div className="bg-background rounded-xl shadow-sm border animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Accordion type="single" collapsible value={isOpen ?? undefined} onValueChange={setIsOpen as any}>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-left font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-10 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="mb-4 text-muted-foreground">
            Still have questions about which plan is right for you?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              View Documentation
            </Button>
            <Button variant="adept" className="flex items-center gap-2">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFaq;
