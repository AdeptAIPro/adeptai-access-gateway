
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/components/DashboardLayout';
import TalentSearchBar from '@/components/talent-search/TalentSearchBar';
import TalentSearchResults from '@/components/talent-search/TalentSearchResults';
import TalentSearchInfo from '@/components/talent-search/TalentSearchInfo';
import { TalentSearchProvider } from '@/context/TalentSearchContext';

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
          <TalentSearchInfo />
          <TalentSearchBar />
          <TalentSearchResults />
        </div>
      </TalentSearchProvider>
    </DashboardLayout>
  );
};

export default TalentSearch;
