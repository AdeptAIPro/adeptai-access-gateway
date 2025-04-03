
import React, { useState, useEffect } from "react";
import PageContainer from "@/components/talent-matching/layout/PageContainer";
import TalentMatchingHero from "@/components/talent-matching/TalentMatchingHero";
import AlertNotification from "@/components/talent-matching/AlertNotification";
import MatchingToolSection from "@/components/talent-matching/MatchingToolSection";
import UserGuide from "@/components/talent-matching/guide/UserGuide";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const TalentMatching: React.FC = () => {
  const { toast } = useToast();
  const [featureStatus, setFeatureStatus] = useState<'active' | 'limited' | 'disabled'>('active');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  
  // Mock checking feature access
  useEffect(() => {
    // In a real app, this would check user subscription/permissions
    // For demo purposes, we're just using active status
    setFeatureStatus('active');
    
    // Example status message - normally this would be set based on actual status
    if (featureStatus === 'limited') {
      setStatusMessage("You're using the basic version of AI Talent Matching. Upgrade for advanced features.");
    }
  }, [featureStatus]);

  return (
    <PageContainer title="AI Talent Matchmaking">
      <TalentMatchingHero />
      
      {featureStatus === 'limited' && statusMessage && (
        <Alert variant="warning" className="mt-4 mb-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Limited Access</AlertTitle>
          <AlertDescription>{statusMessage}</AlertDescription>
        </Alert>
      )}
      
      {featureStatus === 'disabled' && (
        <Alert variant="destructive" className="mt-4 mb-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Feature Unavailable</AlertTitle>
          <AlertDescription>
            AI Talent Matching is not available on your current plan.
            Please upgrade to access this feature.
          </AlertDescription>
        </Alert>
      )}
      
      <AlertNotification />
      <MatchingToolSection />
      <Separator className="my-12" />
      <UserGuide />
    </PageContainer>
  );
};

export default TalentMatching;
