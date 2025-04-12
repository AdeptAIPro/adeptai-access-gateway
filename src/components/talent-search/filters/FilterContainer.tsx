
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, X, Save, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { TalentFilter } from '../TalentSearchFilters';
import FilterBasicFields from './FilterBasicFields';
import FilterAdvancedFields from './FilterAdvancedFields';
import SavedFiltersHistory from './SavedFiltersHistory';
import usePersistedState from '@/hooks/use-persisted-state';

interface FilterContainerProps {
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

const FilterContainer: React.FC<FilterContainerProps> = ({ onApplyFilters }) => {
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
      <FilterBasicFields 
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        skillInput={skillInput}
        setSkillInput={setSkillInput}
        addSkill={addSkill}
        removeSkill={removeSkill}
      />

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
        <FilterAdvancedFields 
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
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
              <SavedFiltersHistory 
                savedFilters={savedFilters}
                searchHistory={searchHistory}
                loadFilter={loadFilter}
                deleteFilter={deleteFilter}
                clearHistory={clearHistory}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default FilterContainer;
