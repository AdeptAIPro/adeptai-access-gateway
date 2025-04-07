
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Building, 
  ChevronRight, 
  Bookmark, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { mockJobs } from "@/data/mockJobs";

const SavedJobs: React.FC = () => {
  // For demo purposes, we'll use some random jobs from the mock data
  // In a real app, this would come from user's saved jobs
  const savedJobs = mockJobs.slice(0, 3);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved Jobs</h2>
        <div className="text-sm text-gray-500">
          {savedJobs.length} jobs saved
        </div>
      </div>

      {savedJobs.length > 0 ? (
        <div className="space-y-6">
          {savedJobs.map((job) => (
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
                    Saved 2 days ago
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
                <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
                <div className="ml-auto flex gap-2">
                  <Button className="ml-auto" variant="outline">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button className="ml-2" variant="default">
                    Apply Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-100 rounded-lg">
          <Bookmark className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No saved jobs</h3>
          <p className="text-gray-500 text-center max-w-md">
            You haven't saved any jobs yet. Browse jobs and click the save button to add them here.
          </p>
          <Button className="mt-6">
            Browse Jobs
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
