
import React, { useState } from 'react';
import { 
  Filter, Save, Clock, Trash2, ChevronDown, ChevronUp, Check, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import usePersistedState from '@/hooks/use-persisted-state';
import { toast } from 'sonner';

export interface TalentFilter {
  id: string;
  name: string;
  location?: string;
  skills?: string[];
  experience?: [number, number];
  availability?: string;
  employmentType?: string;
  salaryRange?: [number, number];
}

interface TalentSearchFiltersProps {
  onApplyFilters: (filters: TalentFilter) => void;
}

const DEFAULT_FILTER: TalentFilter = {
  id: 'default',
  name: 'Default Filter',
  location: '',
  skills: [],
  experience: [0, 10],
  availability: 'any',
  employmentType: 'any',
  salaryRange: [0, 200000],
};

const TalentSearchFilters: React.FC<TalentSearchFiltersProps> = ({ onApplyFilters }) => {
  const [currentFilter, setCurrentFilter] = useState<TalentFilter>({...DEFAULT_FILTER});
  const [savedFilters, setSavedFilters] = usePersistedState<TalentFilter[]>('talent-search-filters', []);
  const [searchHistory, setSearchHistory] = usePersistedState<TalentFilter[]>('talent-search-history', []);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  // Add skill to the filter
  const addSkill = () => {
    if (!skillInput.trim()) return;
    
    if (!currentFilter.skills?.includes(skillInput)) {
      const updatedSkills = [...(currentFilter.skills || []), skillInput.trim()];
      setCurrentFilter({...currentFilter, skills: updatedSkills});
      setSkillInput('');
    }
  };

  // Remove skill from the filter
  const removeSkill = (skill: string) => {
    if (currentFilter.skills) {
      setCurrentFilter({
        ...currentFilter, 
        skills: currentFilter.skills.filter(s => s !== skill)
      });
    }
  };

  // Save current filter
  const saveFilter = () => {
    if (!currentFilter.name.trim()) {
      toast.error("Please give your filter a name before saving");
      return;
    }
    
    // Create new filter with unique ID
    const filterToSave = {
      ...currentFilter,
      id: `filter_${Date.now()}`
    };
    
    setSavedFilters([...savedFilters, filterToSave]);
    toast.success("Filter saved successfully");
  };

  // Load a saved filter
  const loadFilter = (filter: TalentFilter) => {
    setCurrentFilter({...filter});
    
    // Also apply it
    onApplyFilters(filter);
    
    // Add to search history
    const historyEntry = {...filter, id: `history_${Date.now()}`};
    setSearchHistory([historyEntry, ...searchHistory.slice(0, 9)]);
  };

  // Delete a saved filter
  const deleteFilter = (filterId: string) => {
    setSavedFilters(savedFilters.filter(f => f.id !== filterId));
    toast.success("Filter deleted");
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    toast.success("Search history cleared");
  };

  // Apply current filter
  const applyFilters = () => {
    onApplyFilters(currentFilter);
    
    // Add to search history
    const historyEntry = {...currentFilter, id: `history_${Date.now()}`};
    setSearchHistory([historyEntry, ...searchHistory.slice(0, 9)]);
  };

  // Reset to default filters
  const resetFilters = () => {
    setCurrentFilter({...DEFAULT_FILTER});
    setShowAdvancedFilters(false);
  };

  return (
    <div className="space-y-4 bg-card p-4 border rounded-lg">
      {/* Basic filters row */}
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

      {/* Advanced filters toggle */}
      <div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center text-xs"
        >
          {showAdvancedFilters ? <ChevronUp className="h-3.5 w-3.5 mr-1" /> : <ChevronDown className="h-3.5 w-3.5 mr-1" />}
          {showAdvancedFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
        </Button>
      </div>

      {/* Advanced filters section */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
          <div>
            <Label className="text-xs font-medium mb-3 block">Experience (years)</Label>
            <div className="px-2">
              <Slider 
                defaultValue={currentFilter.experience} 
                min={0} 
                max={20} 
                step={1}
                onValueChange={(value) => setCurrentFilter({...currentFilter, experience: [value[0], value[1]]})}
              />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{currentFilter.experience?.[0] || 0} years</span>
                <span>{currentFilter.experience?.[1] || 10}+ years</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium mb-1.5 block">Availability</Label>
            <Select 
              value={currentFilter.availability || 'any'}
              onValueChange={(value) => setCurrentFilter({...currentFilter, availability: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Availability</SelectLabel>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="two_weeks">Two Weeks Notice</SelectItem>
                  <SelectItem value="month">One Month</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-medium mb-1.5 block">Employment Type</Label>
            <Select 
              value={currentFilter.employmentType || 'any'}
              onValueChange={(value) => setCurrentFilter({...currentFilter, employmentType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Employment Type</SelectLabel>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="full_time">Full-Time</SelectItem>
                  <SelectItem value="part_time">Part-Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-medium mb-3 block">Salary Range ($)</Label>
            <div className="px-2">
              <Slider 
                defaultValue={currentFilter.salaryRange} 
                min={0} 
                max={300000} 
                step={5000}
                onValueChange={(value) => setCurrentFilter({...currentFilter, salaryRange: [value[0], value[1]]})}
              />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>${currentFilter.salaryRange?.[0]?.toLocaleString() || 0}</span>
                <span>${currentFilter.salaryRange?.[1]?.toLocaleString() || '200,000'}+</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter actions */}
      <div className="flex flex-wrap justify-between pt-4 border-t gap-2">
        <div className="flex gap-2">
          <Button onClick={applyFilters} size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Apply Filters
          </Button>
          
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-1" />
                Save Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-3">
                <h4 className="font-medium">Save Current Filter</h4>
                <div>
                  <Label htmlFor="filter-name">Filter Name</Label>
                  <Input 
                    id="filter-name" 
                    value={currentFilter.name}
                    onChange={(e) => setCurrentFilter({...currentFilter, name: e.target.value})}
                    placeholder="Enter filter name..."
                  />
                </div>
                <div className="flex justify-end">
                  <Button size="sm" onClick={saveFilter}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-1" />
                History
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="saved-filters">
                  <AccordionTrigger>Saved Filters</AccordionTrigger>
                  <AccordionContent>
                    {savedFilters.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No saved filters yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {savedFilters.map((filter) => (
                          <div key={filter.id} className="flex justify-between items-center">
                            <Button 
                              variant="ghost" 
                              className="text-left h-auto py-1 justify-start"
                              onClick={() => loadFilter(filter)}
                            >
                              {filter.name}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteFilter(filter.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="search-history">
                  <AccordionTrigger>Search History</AccordionTrigger>
                  <AccordionContent>
                    {searchHistory.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No search history yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {searchHistory.map((filter) => (
                          <div key={filter.id} className="flex justify-between items-center">
                            <Button 
                              variant="ghost" 
                              className="text-left h-auto py-1 justify-start text-sm"
                              onClick={() => loadFilter(filter)}
                            >
                              <div className="truncate max-w-[180px]">
                                <span className="font-medium">{filter.skills?.join(', ') || 'All Skills'}</span>
                                {filter.location && <span className="text-xs text-muted-foreground ml-1">({filter.location})</span>}
                              </div>
                            </Button>
                          </div>
                        ))}
                        <Button 
                          variant="ghost"
                          size="sm" 
                          onClick={clearHistory} 
                          className="text-destructive text-xs w-full justify-start mt-2"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Clear History
                        </Button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default TalentSearchFilters;
