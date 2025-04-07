
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, Building, ChevronRight } from "lucide-react";
import { mockJobs } from "@/data/mockJobs";

interface JobListingsProps {
  searchQuery: string;
  location: string;
}

const JobListings: React.FC<JobListingsProps> = ({ searchQuery, location }) => {
  // Filter jobs based on search query and location
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = 
      !location || 
      job.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Jobs</h2>
        <div className="text-sm text-gray-500">
          {filteredJobs.length} jobs found
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
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
                      <Briefcase className="h-4 w-4 mr-1" />
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
                <Button className="ml-2" variant="default">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-100 rounded-lg">
          <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
          <p className="text-gray-500 text-center max-w-md">
            We couldn't find any jobs matching your search criteria. Try adjusting your search terms or location.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobListings;
