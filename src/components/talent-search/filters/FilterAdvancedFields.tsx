
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TalentFilter } from '../TalentSearchFilters';

interface FilterAdvancedFieldsProps {
  currentFilter: TalentFilter;
  setCurrentFilter: React.Dispatch<React.SetStateAction<TalentFilter>>;
}

const FilterAdvancedFields: React.FC<FilterAdvancedFieldsProps> = ({
  currentFilter,
  setCurrentFilter
}) => {
  return (
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
  );
};

export default FilterAdvancedFields;
