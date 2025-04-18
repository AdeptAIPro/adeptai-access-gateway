
import React, { useState, Suspense, lazy } from 'react';
import { useTalentMatching } from '@/hooks/use-talent-matching';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Search, BarChart2, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Lazy loaded components
const TalentMatchingHero = lazy(() => import('@/components/talent-matching/TalentMatchingHero'));
const TalentMatchingContainer = lazy(() => import('@/components/talent-matching/TalentMatchingContainer'));
const MatchingWorkflow = lazy(() => import('@/components/talent-matching/MatchingWorkflow'));
const ResultsSection = lazy(() => import('@/components/talent-matching/ResultsSection'));
const TalentDataDashboard = lazy(() => import('@/components/talent-matching/data-acquisition/TalentDataDashboard'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

const TalentMatching = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('matching');
  const talentMatching = useTalentMatching();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <TalentMatchingHero />
      </Suspense>

      <div className="container mx-auto px-4 py-8 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto bg-card border shadow-sm mb-6">
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>AI Matching</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matching" className="p-0">
            <Suspense fallback={<LoadingFallback />}>
              <TalentMatchingContainer>
                {!talentMatching.showResults ? (
                  <Suspense fallback={<LoadingFallback />}>
                    <MatchingWorkflow 
                      isProcessing={talentMatching.isLoading}
                      progress={talentMatching.matchingProgress}
                      showAdvancedOptions={talentMatching.showAdvancedOptions}
                      setShowAdvancedOptions={talentMatching.setShowAdvancedOptions}
                      isReadyToStart={talentMatching.isReadyToStart}
                      handleStartMatching={talentMatching.handleStartMatching}
                    />
                  </Suspense>
                ) : (
                  <Suspense fallback={<LoadingFallback />}>
                    <ResultsSection 
                      matchResult={talentMatching.matchResult}
                      handleStartNewMatch={talentMatching.handleStartNewMatch}
                      saveCandidate={talentMatching.saveCandidate}
                      contactCandidate={talentMatching.contactCandidate}
                    />
                  </Suspense>
                )}
              </TalentMatchingContainer>
            </Suspense>
          </TabsContent>

          <TabsContent value="analytics" className="p-0">
            <Card className="bg-white p-8 rounded-lg border shadow-sm">
              <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium">Talent Pool Analytics</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Analytics for your internal talent pool will be available here. This includes candidate source metrics, talent gap analysis, and market insights.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default TalentMatching;
