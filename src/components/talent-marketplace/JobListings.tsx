
import React, { useState, useMemo, useCallback } from "react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { mockJobs } from "@/data/mockJobs";
import JobHeader from "./JobHeader";
import JobFilter from "./JobFilter";
import JobList from "./JobList";
import JobMarketInsights from "./JobMarketInsights";

interface JobListingsProps {
  searchQuery: string;
  location: string;
}

const JobListings: React.FC<JobListingsProps> = ({ searchQuery, location }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [jobType, setJobType] = useState<string>("all");
  const [experience, setExperience] = useState<[number, number]>([0, 10]);
  const [salary, setSalary] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>("relevance");
  
  // Memoize filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = 
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = 
        !location || 
        job.location.toLowerCase().includes(location.toLowerCase());
      
      const matchesJobType = 
        jobType === "all" || 
        job.jobType.toLowerCase() === jobType.toLowerCase();
      
      // Handle both number and string experience values, or undefined
      let matchesExperience = true;
      if (job.experience !== undefined) {
        const jobExp = typeof job.experience === 'number' ? job.experience : 0;
        matchesExperience = jobExp >= experience[0] && jobExp <= experience[1];
      }
      
      let matchesSalary = true;
      if (job.salaryRange) {
        const salaryText = job.salaryRange.replace(/[^0-9-]/g, '');
        const [minSal, maxSal] = salaryText.split('-').map(s => parseInt(s, 10));
        if (!isNaN(minSal) && !isNaN(maxSal)) {
          matchesSalary = (minSal >= salary[0] * 1000) && (maxSal <= salary[1] * 1000);
        }
      }
      
      return matchesSearch && matchesLocation && matchesJobType && matchesExperience && matchesSalary;
    });
  }, [searchQuery, location, jobType, experience, salary]);
  
  // Memoize sorted jobs to prevent unnecessary recalculations
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      } else if (sortBy === "salary-high") {
        return (b.salaryRange?.length || 0) - (a.salaryRange?.length || 0);
      } else if (sortBy === "salary-low") {
        return (a.salaryRange?.length || 0) - (b.salaryRange?.length || 0);
      }
      return 0;
    });
  }, [filteredJobs, sortBy]);

  // Memoize job statistics
  const jobStats = useMemo(() => {
    return {
      total: filteredJobs.length,
      byJobType: {
        fullTime: filteredJobs.filter(job => job.jobType === "Full-time").length,
        partTime: filteredJobs.filter(job => job.jobType === "Part-time").length,
        contract: filteredJobs.filter(job => job.jobType === "Contract").length,
        remote: filteredJobs.filter(job => job.location.toLowerCase().includes("remote")).length,
      }
    };
  }, [filteredJobs]);

  const toggleFilters = useCallback(() => setShowFilters(!showFilters), [showFilters]);
  
  const resetFilters = useCallback(() => {
    setJobType("all");
    setExperience([0, 10]);
    setSalary([0, 200]);
  }, []);
  
  const applyFilters = useCallback(() => {
    // This function is left empty as the filtering is reactive
    // Could be used for analytics tracking or other side effects
  }, []);

  return (
    <div>
      <JobHeader 
        totalJobs={filteredJobs.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        toggleFilters={toggleFilters}
      />

      <JobMarketInsights 
        total={jobStats.total}
        byJobType={jobStats.byJobType}
      />

      <Collapsible open={showFilters} onOpenChange={setShowFilters} className="mb-6">
        <CollapsibleContent>
          <JobFilter
            jobType={jobType}
            setJobType={setJobType}
            experience={experience}
            setExperience={setExperience}
            salary={salary}
            setSalary={setSalary}
            resetFilters={resetFilters}
            applyFilters={applyFilters}
          />
        </CollapsibleContent>
      </Collapsible>

      <JobList jobs={sortedJobs} />
    </div>
  );
};

export default JobListings;
