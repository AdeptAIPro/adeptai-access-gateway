
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingFaq = () => {
  const faqs = [
    {
      question: "How do the usage limits work?",
      answer: "Each AI feature in our system counts as one use. For the Free Trial plan, you can use each feature once per day. For the Basic plan, you get 50 uses per feature per month. The Professional plan offers unlimited usage of all features. For Pay-Per-Use, you'll be charged $9 for each individual use of any feature."
    },
    {
      question: "Do unused transactions roll over to the next month?",
      answer: "No, unused transactions do not roll over to the next month. Your usage count resets at the beginning of each billing cycle for subscription plans."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or switch between subscription plans and pay-per-use at any time. When upgrading, the change is immediate. When downgrading, the new plan will take effect at the start of your next billing cycle."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 30-day money-back guarantee for subscription plans. Pay-per-use transactions cannot be refunded once processed as they represent services already delivered."
    },
    {
      question: "Do you offer discounts for non-profits or educational institutions?",
      answer: "Yes, we offer special pricing for qualified non-profit organizations, educational institutions, and startups. Please contact our sales team to learn more about our discount programs."
    },
    {
      question: "How secure is my data with AdeptAI Pro?",
      answer: "We take data security very seriously. All your data is encrypted both in transit and at rest. We comply with industry standards for data protection and privacy regulations. For more details, please review our security documentation."
    }
  ];

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4 animate-fade-in-up">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and pricing
          </p>
        </div>
        
        <div className="bg-background rounded-xl p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center pt-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-lg font-medium mb-4">Still have questions?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:support@adeptaipro.com">
              <Button variant="outline" className="hover-lift">
                Contact Support
              </Button>
            </a>
            <a href="/docs/pricing" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="hover-lift">
                Read Documentation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFaq;
