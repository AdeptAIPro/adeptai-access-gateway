
import React from 'react';
import FilterContainer from './filters/FilterContainer';

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

const TalentSearchFilters: React.FC<TalentSearchFiltersProps> = ({ onApplyFilters }) => {
  return <FilterContainer onApplyFilters={onApplyFilters} />;
};

export default TalentSearchFilters;
