
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface SkillsInputProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

const SkillsInput: React.FC<SkillsInputProps> = ({ 
  skills, 
  onAddSkill, 
  onRemoveSkill 
}) => {
  const [skillsInput, setSkillsInput] = useState<string>('');
  
  const handleAddSkill = () => {
    if (skillsInput.trim() && !skills.includes(skillsInput.trim())) {
      onAddSkill(skillsInput.trim());
      setSkillsInput('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
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
                onClick={() => onRemoveSkill(skill)}
                className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;
