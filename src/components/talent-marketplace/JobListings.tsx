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
  Filter, 
  ChevronsUpDown,
  DollarSign,
  Users
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { mockJobs } from "@/data/mockJobs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

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
  
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = 
      !location || 
      job.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesJobType = 
      jobType === "all" || 
      job.jobType.toLowerCase() === jobType.toLowerCase();
    
    const jobExp = typeof job.experience === 'number' ? job.experience : 0;
    const matchesExperience = 
      jobExp >= experience[0] && jobExp <= experience[1];
    
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
  
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    } else if (sortBy === "salary-high") {
      return (b.salaryRange?.length || 0) - (a.salaryRange?.length || 0);
    } else if (sortBy === "salary-low") {
      return (a.salaryRange?.length || 0) - (b.salaryRange?.length || 0);
    }
    return 0;
  });

  const jobStats = {
    total: filteredJobs.length,
    byJobType: {
      fullTime: filteredJobs.filter(job => job.jobType === "Full-time").length,
      partTime: filteredJobs.filter(job => job.jobType === "Part-time").length,
      contract: filteredJobs.filter(job => job.jobType === "Contract").length,
      remote: filteredJobs.filter(job => job.location.toLowerCase().includes("remote")).length,
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Available Jobs</h2>
          <div className="text-sm text-gray-500 mt-1">
            {filteredJobs.length} jobs found
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Select defaultValue={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort by: Relevance</SelectItem>
              <SelectItem value="newest">Sort by: Newest</SelectItem>
              <SelectItem value="salary-high">Sort by: Salary (High to Low)</SelectItem>
              <SelectItem value="salary-low">Sort by: Salary (Low to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Job Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Full-time Jobs</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{jobStats.byJobType.fullTime}</span>
                <Progress value={(jobStats.byJobType.fullTime / jobStats.total) * 100} className="h-2" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Part-time Jobs</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{jobStats.byJobType.partTime}</span>
                <Progress value={(jobStats.byJobType.partTime / jobStats.total) * 100} className="h-2" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Contract Jobs</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{jobStats.byJobType.contract}</span>
                <Progress value={(jobStats.byJobType.contract / jobStats.total) * 100} className="h-2" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Remote Jobs</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{jobStats.byJobType.remote}</span>
                <Progress value={(jobStats.byJobType.remote / jobStats.total) * 100} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Collapsible open={showFilters} onOpenChange={setShowFilters} className="mb-6">
        <CollapsibleContent>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select defaultValue={jobType} onValueChange={setJobType}>
                    <SelectTrigger id="job-type" className="mt-2">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Experience Required (years)</Label>
                  <div className="mt-6">
                    <Slider 
                      defaultValue={experience} 
                      min={0} 
                      max={10} 
                      step={1} 
                      onValueChange={(value) => setExperience([value[0], value[1]])} 
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>{experience[0]} years</span>
                      <span>{experience[1]} years</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Salary Range ($K)</Label>
                  <div className="mt-6">
                    <Slider 
                      defaultValue={salary} 
                      min={0} 
                      max={200} 
                      step={5} 
                      onValueChange={(value) => setSalary([value[0], value[1]])} 
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>${salary[0]}K</span>
                      <span>${salary[1]}K</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button variant="outline" size="sm" className="mr-2">
                Reset Filters
              </Button>
              <Button size="sm">
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {sortedJobs.length > 0 ? (
        <div className="space-y-6">
          {sortedJobs.map((job) => (
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
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salaryRange}
                    </div>
                  )}
                  {job.experience && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {typeof job.experience === 'number' ? `${job.experience}+ years exp` : job.experience}
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
            We couldn't find any jobs matching your search criteria. Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobListings;
