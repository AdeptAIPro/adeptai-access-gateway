
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter, MapPin, Briefcase, Users } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { TalentSearchParams } from '@/services/talent/TalentSearchService';
import { Slider } from '@/components/ui/slider';
import { getTalentSources } from '@/services/talent/TalentSearchService';
import { useTalentSearch } from '@/context/TalentSearchContext';

const TalentSearchBar: React.FC = () => {
  const { handleSearch, isLoading } = useTalentSearch();
  
  const [skillsInput, setSkillsInput] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState<string>('');
  const [experience, setExperience] = useState<number>(0);
  const [source, setSource] = useState<string>('');
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchSources = async () => {
      const sources = await getTalentSources();
      setAvailableSources(sources);
    };
    
    fetchSources();
  }, []);
  
  const handleAddSkill = () => {
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      setSkills([...skills, skillsInput.trim()]);
      setSkillsInput('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  const handleSearchSubmit = () => {
    handleSearch({
      skills: skills.length > 0 ? skills : undefined,
      location: location || undefined,
      experience: experience > 0 ? experience : undefined,
      source: source || undefined,
    });
  };
  
  const handleClearAll = () => {
    setSkills([]);
    setLocation('');
    setExperience(0);
    setSource('');
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Search className="mr-2 h-5 w-5" />
          Talent Search
        </CardTitle>
        <CardDescription>
          Search for talent with specific skills, location, and experience level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Skills Section */}
          <div className="space-y-2 col-span-1 md:col-span-3">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex">
              <Input
                id="skills"
                placeholder="Add skills (e.g., JavaScript, React, Python)"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 mr-2"
              />
              <Button type="button" onClick={handleAddSkill} variant="secondary">
                Add
              </Button>
            </div>
            
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" /> Location
            </Label>
            <Input
              id="location"
              placeholder="City, State, or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="experience" className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" /> Minimum Experience (years)
            </Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider
                  id="experience"
                  min={0}
                  max={15}
                  step={1}
                  value={[experience]}
                  onValueChange={(value) => setExperience(value[0])}
                />
              </div>
              <span className="text-sm font-medium min-w-[40px] text-center">
                {experience} {experience === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>
          
          {/* Source */}
          <div className="space-y-2">
            <Label htmlFor="source" className="flex items-center">
              <Users className="mr-1 h-4 w-4" /> Source
            </Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger id="source">
                <SelectValue placeholder="All sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All sources</SelectItem>
                {availableSources.map((src) => (
                  <SelectItem key={src} value={src.toLowerCase()}>
                    {src}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Search and Clear Buttons */}
          <div className="col-span-1 md:col-span-3 flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleClearAll} disabled={isLoading}>
              Clear All
            </Button>
            <Button onClick={handleSearchSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Talent
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentSearchBar;
