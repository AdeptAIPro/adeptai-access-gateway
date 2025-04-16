
import React, { useState } from 'react';
import { useTalentMatching } from '@/hooks/use-talent-matching';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TalentMatchingHero from '@/components/talent-matching/TalentMatchingHero';
import TalentMatchingContainer from '@/components/talent-matching/TalentMatchingContainer';
import MatchingWorkflow from '@/components/talent-matching/MatchingWorkflow';
import ResultsSection from '@/components/talent-matching/ResultsSection';
import TalentDataDashboard from '@/components/talent-matching/data-acquisition/TalentDataDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  BarChart2, 
  Database,
  Users
} from 'lucide-react';

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
      <TalentMatchingHero />

      <div className="container mx-auto px-4 py-8 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full md:w-auto bg-card border shadow-sm mb-6">
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>AI Matching</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Talent Database</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matching" className="p-0">
            <TalentMatchingContainer>
              {!talentMatching.showResults ? (
                <MatchingWorkflow 
                  jobDescription={talentMatching.jobDescription}
                  setJobDescription={talentMatching.setJobDescription}
                  tab={talentMatching.tab}
                  setTab={talentMatching.setTab}
                  matchingOptions={talentMatching.matchingOptions}
                  setMatchingOptions={talentMatching.setMatchingOptions}
                  fileUploaded={talentMatching.fileUploaded}
                  setFileUploaded={talentMatching.setFileUploaded}
                  error={talentMatching.error}
                  setError={talentMatching.setError}
                  handleStartMatching={talentMatching.handleStartMatching}
                  isReadyToStart={talentMatching.isReadyToStart}
                  showAdvancedOptions={talentMatching.showAdvancedOptions}
                  setShowAdvancedOptions={talentMatching.setShowAdvancedOptions}
                  selectedTargetSources={talentMatching.selectedTargetSources}
                  setSelectedTargetSources={talentMatching.setSelectedTargetSources}
                  useCrossSourceIntelligence={talentMatching.useCrossSourceIntelligence}
                  setUseCrossSourceIntelligence={talentMatching.setUseCrossSourceIntelligence}
                  isProcessing={talentMatching.isLoading}
                  progress={talentMatching.matchingProgress}
                />
              ) : (
                <ResultsSection 
                  isLoading={talentMatching.isLoading}
                  matchingProgress={talentMatching.matchingProgress}
                  matchResult={talentMatching.matchResult}
                  handleStartNewMatch={talentMatching.handleStartNewMatch}
                  saveCandidate={talentMatching.saveCandidate}
                  contactCandidate={talentMatching.contactCandidate}
                />
              )}
            </TalentMatchingContainer>
          </TabsContent>

          <TabsContent value="database" className="p-0">
            <TalentDataDashboard />
          </TabsContent>

          <TabsContent value="analytics" className="p-0">
            <div className="bg-white p-8 rounded-lg border shadow-sm">
              <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium">Talent Pool Analytics</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Analytics for your internal talent pool will be available here. This includes candidate source metrics, talent gap analysis, and market insights.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default TalentMatching;
