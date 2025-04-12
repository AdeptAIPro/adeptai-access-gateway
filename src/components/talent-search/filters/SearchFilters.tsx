
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Briefcase, Users } from 'lucide-react';

interface SearchFiltersProps {
  location: string;
  experience: number;
  source: string;
  availableSources: string[];
  onLocationChange: (location: string) => void;
  onExperienceChange: (experience: number) => void;
  onSourceChange: (source: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  location,
  experience,
  source,
  availableSources,
  onLocationChange,
  onExperienceChange,
  onSourceChange
}) => {
  return (
    <>
      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center">
          <MapPin className="mr-1 h-4 w-4" /> Location
        </Label>
        <Input
          id="location"
          placeholder="City, State, or Remote"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
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
              onValueChange={(value) => onExperienceChange(value[0])}
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
        <Select value={source} onValueChange={onSourceChange}>
          <SelectTrigger id="source">
            <SelectValue placeholder="All sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {availableSources.map((src) => (
              <SelectItem key={src} value={src.toLowerCase()}>
                {src}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SearchFilters;
