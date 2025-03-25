
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/components/DashboardLayout';
import TalentSearchBar from '@/components/talent-search/TalentSearchBar';
import TalentSearchResults from '@/components/talent-search/TalentSearchResults';
import TalentSearchInfo from '@/components/talent-search/TalentSearchInfo';
import { TalentSearchProvider } from '@/context/TalentSearchContext';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  SlidersHorizontal, 
  Share2,
  BookmarkPlus,
  Users,
  UserPlus
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TalentSearch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return (
    <DashboardLayout title="Talent Search">
      <TalentSearchProvider>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Talent Search</h1>
              <p className="text-muted-foreground">Find the best talent for your positions with AI-powered search</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
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
              
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </div>
          </div>
          
          <TalentSearchInfo />
          <TalentSearchBar />
          <TalentSearchResults />
        </div>
      </TalentSearchProvider>
    </DashboardLayout>
  );
};

export default TalentSearch;
