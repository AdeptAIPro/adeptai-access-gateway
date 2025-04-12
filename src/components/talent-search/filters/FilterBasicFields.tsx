
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TalentFilter } from '../TalentSearchFilters';

interface FilterBasicFieldsProps {
  currentFilter: TalentFilter;
  setCurrentFilter: React.Dispatch<React.SetStateAction<TalentFilter>>;
  skillInput: string;
  setSkillInput: React.Dispatch<React.SetStateAction<string>>;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

const FilterBasicFields: React.FC<FilterBasicFieldsProps> = ({
  currentFilter,
  setCurrentFilter,
  skillInput,
  setSkillInput,
  addSkill,
  removeSkill
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-start">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="location" className="text-xs font-medium mb-1.5 block">Location</Label>
        <Input 
          id="location" 
          placeholder="Enter location..." 
          value={currentFilter.location || ''}
          onChange={(e) => setCurrentFilter({...currentFilter, location: e.target.value})}
        />
      </div>
      
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="skills" className="text-xs font-medium mb-1.5 block">Skills</Label>
        <div className="flex gap-2">
          <Input 
            id="skills" 
            placeholder="Add skills..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button type="button" size="sm" onClick={addSkill}>Add</Button>
        </div>
        {currentFilter.skills && currentFilter.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {currentFilter.skills.map(skill => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeSkill(skill)} 
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBasicFields;
