
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/DashboardLayout';
import TalentSearchBar from '@/components/talent-search/TalentSearchBar';
import TalentSearchResults from '@/components/talent-search/TalentSearchResults';
import TalentSearchInfo from '@/components/talent-search/TalentSearchInfo';
import TalentSearchGuide from '@/components/talent-search/TalentSearchGuide';
import { TalentSearchProvider } from '@/context/TalentSearchContext';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  SlidersHorizontal, 
  Share2,
  BookmarkPlus,
  Users,
  UserPlus,
  Sparkles
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const TalentSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [useAgenticIntelligence, setUseAgenticIntelligence] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const handleToggleAgenticIntelligence = () => {
    const newValue = !useAgenticIntelligence;
    setUseAgenticIntelligence(newValue);
    
    toast({
      title: newValue ? "AI Intelligence Activated" : "Standard Search Mode",
      description: newValue 
        ? "Using advanced cross-source talent intelligence to find the best matches" 
        : "Using standard talent search functionality",
    });
  };
  
  return (
    <DashboardLayout title="Talent Search">
      <TalentSearchProvider>
        <div className="space-y-6">
          {showGuide && (
            <div className="relative">
              <TalentSearchGuide 
                onClose={() => setShowGuide(false)}
                useAgenticIntelligence={useAgenticIntelligence}
              />
            </div>
          )}
          
          {!showGuide && (
            <div className="flex justify-end mb-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowGuide(true)}
              >
                Show Guide
              </Button>
            </div>
          )}
          
          <div className="p-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  {useAgenticIntelligence && <Sparkles className="mr-2 h-5 w-5 text-amber-500" />}
                  Talent Search
                </h1>
                <p className="text-muted-foreground">
                  {useAgenticIntelligence 
                    ? "Find the best talent with AI-powered cross-source intelligence" 
                    : "Find the best talent for your positions with advanced search"
                  }
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px] bg-background">
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Candidate source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="ceipal">Ceipal</SelectItem>
                    <SelectItem value="jobdiva">JobDiva</SelectItem>
                    <SelectItem value="internal">Internal DB</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                
                <Button variant="default" className={useAgenticIntelligence ? "bg-amber-600 hover:bg-amber-700" : ""}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Candidate
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-4 bg-muted/40 rounded-lg border mb-4">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">Cross-Source Talent Intelligence</h3>
              <div className="ml-auto flex items-center space-x-2">
                <Label htmlFor="agentic-mode">
                  {useAgenticIntelligence ? "Enabled" : "Disabled"}
                </Label>
                <Switch
                  id="agentic-mode"
                  checked={useAgenticIntelligence}
                  onCheckedChange={handleToggleAgenticIntelligence}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </div>
            
            <TalentSearchInfo useAgenticIntelligence={useAgenticIntelligence} />
            <TalentSearchBar useAgenticIntelligence={useAgenticIntelligence} />
            <TalentSearchResults useAgenticIntelligence={useAgenticIntelligence} />
          </div>
        </div>
      </TalentSearchProvider>
    </DashboardLayout>
  );
};

export default TalentSearch;
