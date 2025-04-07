
import React from "react";
import JobCard from "./JobCard";
import { Briefcase } from "lucide-react";
import { Job } from "@/data/mockJobs";

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-gray-100 rounded-lg">
        <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
        <p className="text-gray-500 text-center max-w-md">
          We couldn't find any jobs matching your search criteria. Try adjusting your search terms or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
