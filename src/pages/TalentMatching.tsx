
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import JobDescriptionInput from "@/components/talent-matching/JobDescriptionInput";
import MatchingControls from "@/components/talent-matching/MatchingControls";
import MatchingProgress from "@/components/talent-matching/MatchingProgress";
import CandidateResults from "@/components/talent-matching/CandidateResults";

const TalentMatching = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState("paste");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState("all");
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [matchingCandidates, setMatchingCandidates] = useState<any[]>([]);
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  const parseJobDescription = async () => {
    if ((!jobDescription && tab === "paste") || (!fileUploaded && tab === "upload")) {
      toast({
        title: "No Job Description",
        description: tab === "paste" ? "Please enter a job description" : "Please upload a job description file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMatchingProgress(0);
    
    // Simulate the matching process
    const interval = setInterval(() => {
      setMatchingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Mock API call to match candidates - in a real implementation, this would:
      // 1. Call your backend API (Java/Python) with the job description
      // 2. The API would then call ATS/VMS systems through the existing integrations
      // 3. Return matching candidates
      
      // For demo purposes, we'll simulate a response after 3 seconds
      setTimeout(() => {
        clearInterval(interval);
        setMatchingProgress(100);
        
        // Mock response data
        const mockCandidates = [
          {
            id: "1",
            name: "Emily Johnson",
            title: "Senior Software Engineer",
            location: "San Francisco, CA",
            education: "Stanford University",
            experience: 8,
            skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
            matchScore: 92,
            source: "LinkedIn",
            avatar: "https://github.com/shadcn.png"
          },
          {
            id: "2",
            name: "Michael Chen",
            title: "Full Stack Developer",
            location: "New York, NY",
            education: "MIT",
            experience: 6,
            skills: ["TypeScript", "React", "MongoDB", "Express", "Docker"],
            matchScore: 87,
            source: "Ceipal",
            avatar: "https://github.com/shadcn.png"
          },
          {
            id: "3",
            name: "Sarah Williams",
            title: "Frontend Developer",
            location: "Austin, TX",
            education: "UT Austin",
            experience: 5,
            skills: ["JavaScript", "React", "CSS", "HTML", "Redux"],
            matchScore: 85,
            source: "JobDiva",
            avatar: "https://github.com/shadcn.png"
          },
          {
            id: "4",
            name: "James Garcia",
            title: "Backend Engineer",
            location: "Seattle, WA",
            education: "University of Washington",
            experience: 7,
            skills: ["Java", "Spring Boot", "Python", "PostgreSQL", "Kafka"],
            matchScore: 82,
            source: "LinkedIn",
            avatar: "https://github.com/shadcn.png"
          },
          {
            id: "5",
            name: "Olivia Martinez",
            title: "DevOps Engineer",
            location: "Chicago, IL",
            education: "University of Illinois",
            experience: 6,
            skills: ["Kubernetes", "Docker", "Terraform", "AWS", "Jenkins"],
            matchScore: 78,
            source: "Stafferlink",
            avatar: "https://github.com/shadcn.png"
          }
        ];
        
        setMatchingCandidates(mockCandidates);
        setIsLoading(false);
        
        toast({
          title: "Matching Complete",
          description: `Found ${mockCandidates.length} matching candidates`,
        });
      }, 3000);
    } catch (error) {
      clearInterval(interval);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to match candidates",
        variant: "destructive",
      });
    }
  };

  const saveCandidate = (id: string) => {
    toast({
      title: "Candidate Saved",
      description: "Candidate has been saved to your favorites",
    });
  };

  const contactCandidate = (id: string) => {
    toast({
      title: "Contact Request Sent",
      description: "We've sent a connection request to the candidate",
    });
  };

  const filteredCandidates = selectedSource === "all" 
    ? matchingCandidates 
    : matchingCandidates.filter(candidate => candidate.source.toLowerCase() === selectedSource.toLowerCase());

  return (
    <DashboardLayout title="Talent Matching">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description Matching</CardTitle>
            <CardDescription>
              Upload, paste, or fetch a job description to find matching candidates from your integrated sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobDescriptionInput 
              tab={tab}
              setTab={setTab}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
            />
          </CardContent>
          <CardFooter>
            <MatchingControls 
              handleSourceSelect={handleSourceSelect}
              parseJobDescription={parseJobDescription}
              isLoading={isLoading}
            />
          </CardFooter>
        </Card>

        {isLoading && (
          <MatchingProgress progress={matchingProgress} />
        )}

        {matchingCandidates.length > 0 && !isLoading && (
          <CandidateResults 
            filteredCandidates={filteredCandidates}
            matchingCandidates={matchingCandidates}
            saveCandidate={saveCandidate}
            contactCandidate={contactCandidate}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default TalentMatching;
