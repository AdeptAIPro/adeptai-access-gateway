
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface JobFilterProps {
  jobType: string;
  setJobType: (value: string) => void;
  experience: [number, number];
  setExperience: (value: [number, number]) => void;
  salary: [number, number];
  setSalary: (value: [number, number]) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const JobFilter: React.FC<JobFilterProps> = ({
  jobType,
  setJobType,
  experience,
  setExperience,
  salary,
  setSalary,
  resetFilters,
  applyFilters
}) => {
  return (
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
        <Button variant="outline" size="sm" className="mr-2" onClick={resetFilters}>
          Reset Filters
        </Button>
        <Button size="sm" onClick={applyFilters}>
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobFilter;
