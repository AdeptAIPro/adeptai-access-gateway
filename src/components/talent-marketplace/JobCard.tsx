
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Building, 
  ChevronRight, 
  DollarSign,
  Users
} from "lucide-react";
import { Job } from "@/data/mockJobs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import JobApplicationForm from "./JobApplicationForm";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleApplyNow = () => {
    setShowApplicationForm(true);
  };

  const handleCloseDialog = () => {
    setShowApplicationForm(false);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
            <Badge variant={job.jobType === "Full-time" ? "default" : "outline"}>
              {job.jobType}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="flex flex-wrap gap-4 mb-4 text-gray-500 text-sm">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Posted {job.postedDate}
            </div>
            {job.salaryRange && (
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {job.salaryRange}
              </div>
            )}
          </div>
          <p className="text-gray-600 line-clamp-2">{job.description}</p>
          
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {job.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button className="ml-auto" variant="outline">
            View Details <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button className="ml-2" variant="default" onClick={handleApplyNow}>
            Apply Now
          </Button>
        </CardFooter>
      </Card>

      {/* Job Application Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <JobApplicationForm job={job} onSubmit={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;
