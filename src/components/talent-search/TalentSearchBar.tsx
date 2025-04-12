
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TalentSearchParams } from '@/services/talent/TalentSearchService';
import { getTalentSources } from '@/services/talent/TalentSourcesService';
import { useTalentSearch } from '@/context/TalentSearchContext';

// Import the new components
import SkillsInput from './skills/SkillsInput';
import SearchFilters from './filters/SearchFilters';
import SearchActions from './actions/SearchActions';
import SearchHeader from './header/SearchHeader';

interface TalentSearchBarProps {
  useAgenticIntelligence?: boolean;
}

const TalentSearchBar: React.FC<TalentSearchBarProps> = ({ useAgenticIntelligence = false }) => {
  const { handleSearch, isLoading } = useTalentSearch();
  
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [experience, setExperience] = useState<number>(0);
  const [source, setSource] = useState<string>('all');
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const sources = await getTalentSources();
        setAvailableSources(sources);
      } catch (error) {
        console.error('Error fetching talent sources:', error);
        setAvailableSources([]);
      }
    };
    
    fetchSources();
  }, []);
  
  const handleAddSkill = (skill: string) => {
    setSkills([...skills, skill]);
  };
  
  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };
  
  const handleSearchSubmit = () => {
    handleSearch({
      skills: skills.length > 0 ? skills : undefined,
      location: location || undefined,
      experience: experience > 0 ? experience : undefined,
      source: source === 'all' ? undefined : source,
    });
  };
  
  const handleClearAll = () => {
    setSkills([]);
    setLocation('');
    setExperience(0);
    setSource('all');
  };
  
  return (
    <Card className="mb-6">
      <SearchHeader useAgenticIntelligence={useAgenticIntelligence} />
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Skills Section */}
          <SkillsInput 
            skills={skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
          
          {/* Filters Section */}
          <SearchFilters 
            location={location}
            experience={experience}
            source={source}
            availableSources={availableSources}
            onLocationChange={setLocation}
            onExperienceChange={setExperience}
            onSourceChange={setSource}
          />
          
          {/* Actions Section */}
          <SearchActions 
            onSearch={handleSearchSubmit}
            onClear={handleClearAll}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentSearchBar;
