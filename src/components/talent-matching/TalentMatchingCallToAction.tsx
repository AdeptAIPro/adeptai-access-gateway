
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TalentMatchingCTAProps {
  onDismiss?: () => void;
}

const TalentMatchingCallToAction: React.FC<TalentMatchingCTAProps> = ({ onDismiss }) => {
  const { toast } = useToast();
  
  const handleTryFree = () => {
    toast({
      title: "Free Trial Activated",
      description: "You now have access to premium features for the next 7 days.",
    });
    if (onDismiss) onDismiss();
  };
  
  return (
    <Card className="border-indigo-200 shadow-lg overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-8">
        <div className="absolute inset-0 bg-indigo-600 rounded-full opacity-10"></div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Premium Feature
          </Badge>
        </div>
        <CardTitle className="text-2xl mt-2">
          Unlock AI-Powered Talent Matching
        </CardTitle>
        <CardDescription>
          Find the perfect candidates 10x faster with our advanced AI matching technology
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Premium Benefits:</h4>
            <ul className="space-y-2">
              {[
                "AI-powered cross-source intelligence",
                "100+ sources of qualified candidates",
                "Advanced semantic matching algorithms",
                "Compliance verification & background checks",
                "Culture fit analysis & ranking"
              ].map((benefit, i) => (
                <li key={i} className="flex text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <h4 className="font-medium mb-2">Why users love AdeptAI Pro:</h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-sm">Sarah T.</span>
                  <span className="text-xs text-gray-500 ml-2">HR Director</span>
                </div>
                <p className="text-sm text-gray-700">
                  "We reduced our time-to-hire by 72% using AdeptAI Pro's matching technology."
                </p>
              </div>
              <div className="bg-white p-3 rounded shadow-sm">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-sm">Michael R.</span>
                  <span className="text-xs text-gray-500 ml-2">Tech Recruiter</span>
                </div>
                <p className="text-sm text-gray-700">
                  "The quality of candidates is consistently higher than what we find elsewhere."
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-3 bg-gradient-to-r from-indigo-50 to-blue-50 py-4">
        <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700" onClick={handleTryFree}>
          Try Free for 7 Days
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.location.href = '/pricing'}>
          See Pricing Plans <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TalentMatchingCallToAction;
