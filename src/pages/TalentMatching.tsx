
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  Copy, 
  Database, 
  Briefcase, 
  User, 
  MapPin, 
  GraduationCap, 
  Star, 
  MessageSquare, 
  BookmarkPlus,
  Filter,
  Search,
  Loader2,
  ChevronDown
} from "lucide-react";

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploaded(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded`,
      });
    }
  };

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
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="paste">
                  <FileText className="mr-2 h-4 w-4" />
                  Paste Description
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </TabsTrigger>
                <TabsTrigger value="fetch">
                  <Database className="mr-2 h-4 w-4" />
                  Fetch from ATS/VMS
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="paste" className="space-y-4">
                <Textarea 
                  placeholder="Paste job description here..."
                  className="min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-10 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Upload className="h-12 w-12 text-gray-400" />
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Upload Job Description</h3>
                      <p className="text-sm text-gray-500">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-xs text-gray-400">
                        Supported formats: PDF, DOCX, TXT (Max 5MB)
                      </p>
                    </div>
                    <Input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileUpload}
                    />
                    <Button asChild>
                      <label htmlFor="file-upload">Browse Files</label>
                    </Button>
                    {fileUploaded && (
                      <div className="flex items-center p-2 bg-gray-100 rounded-md">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm">{fileUploaded.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="fetch" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select ATS/VMS System</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ceipal">Ceipal</SelectItem>
                          <SelectItem value="stafferlink">Stafferlink</SelectItem>
                          <SelectItem value="sapfieldglass">SAP Fieldglass</SelectItem>
                          <SelectItem value="beeline">Beeline</SelectItem>
                          <SelectItem value="pontoon">Pontoon</SelectItem>
                          <SelectItem value="jobdiva">JobDiva</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Job ID/Reference</label>
                      <Input placeholder="Enter job ID or reference" />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    <Database className="mr-2 h-4 w-4" />
                    Fetch Job Details
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Match From
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSourceSelect("all")}>
                  All Sources
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSourceSelect("linkedin")}>
                  LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSourceSelect("ceipal")}>
                  Ceipal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSourceSelect("jobdiva")}>
                  JobDiva
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSourceSelect("stafferlink")}>
                  Stafferlink
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={parseJobDescription} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Matching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Matching Candidates
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {isLoading && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Matching in progress...</span>
                  <span>{matchingProgress}%</span>
                </div>
                <Progress value={matchingProgress} />
              </div>
            </CardContent>
          </Card>
        )}

        {matchingCandidates.length > 0 && !isLoading && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Matching Candidates</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Showing {filteredCandidates.length} of {matchingCandidates.length} results
                </span>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-1/4 bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex flex-col items-center justify-center">
                        <Badge className="absolute top-4 right-4 bg-primary">
                          {candidate.matchScore}% Match
                        </Badge>
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-semibold text-center">{candidate.name}</h3>
                        <p className="text-sm text-center text-gray-500">{candidate.title}</p>
                        <Badge variant="outline" className="mt-2">
                          Source: {candidate.source}
                        </Badge>
                      </div>
                      
                      <div className="w-full md:w-3/4 p-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">
                                <strong>Experience:</strong> {candidate.experience} years
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">
                                <strong>Location:</strong> {candidate.location}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">
                                <strong>Education:</strong> {candidate.education}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-2 text-yellow-500" />
                              <span className="text-sm">
                                <strong>Rating:</strong> {4 + Math.random().toFixed(1)} / 5
                              </span>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {candidate.skills.map((skill: string, index: number) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => saveCandidate(candidate.id)}
                            >
                              <BookmarkPlus className="mr-2 h-4 w-4" />
                              Save
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => contactCandidate(candidate.id)}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TalentMatching;
