
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Linkedin, FileCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface VerificationResult {
  name: string;
  profileId: string;
  certifications: string[];
  skills: string[];
  isVerified: boolean;
  source: string;
  lastVerified: string;
  details?: string;
}

const ITVerificationTab: React.FC = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const [certificationType, setCertificationType] = useState("any");
  const [includeSkills, setIncludeSkills] = useState(true);
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock certification data - in a real app, this would come from a database or API
  const certifications = [
    { id: "aws-sa", name: "AWS Solutions Architect" },
    { id: "aws-dev", name: "AWS Developer Associate" },
    { id: "azure-admin", name: "Microsoft Azure Administrator" },
    { id: "azure-dev", name: "Microsoft Azure Developer" },
    { id: "gcp-engineer", name: "Google Cloud Professional Engineer" },
    { id: "cissp", name: "CISSP (Certified Information Systems Security Professional)" },
    { id: "ceh", name: "CEH (Certified Ethical Hacker)" },
    { id: "comptia-sec", name: "CompTIA Security+" },
    { id: "comptia-net", name: "CompTIA Network+" },
    { id: "pmp", name: "PMP (Project Management Professional)" },
    { id: "scrum-master", name: "Certified Scrum Master" },
    { id: "itil", name: "ITIL Foundation" }
  ];

  const verifyProfile = async () => {
    if (!profileUrl) {
      toast({
        title: "Validation Error",
        description: "Please enter a LinkedIn profile URL",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Here you would typically make an API call to verify the profile
      // For demo purposes, we'll simulate an API call with a timeout
      
      setTimeout(() => {
        // Mock result - in a real app, this would come from an API
        const mockResult: VerificationResult = {
          name: "John Doe",
          profileId: "john-doe-12345",
          certifications: ["AWS Solutions Architect", "Azure Administrator"],
          skills: ["React", "TypeScript", "Cloud Architecture", "DevOps", "Docker", "Kubernetes"],
          isVerified: true,
          source: "LinkedIn",
          lastVerified: new Date().toISOString(),
          details: "Profile credentials verified through LinkedIn"
        };

        setResults([mockResult]);
        
        toast({
          title: "Verification Complete",
          description: "Profile has been verified successfully"
        });
      }, 1500);
    } catch (error) {
      console.error("Error verifying profile:", error);
      toast({
        title: "Error",
        description: "Failed to verify profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>IT Workforce Certification Verification</CardTitle>
          <CardDescription>
            Verify IT professional certifications through LinkedIn and other trusted sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">LinkedIn Profile URL</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="https://linkedin.com/in/username" 
                    className="pl-10"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Certification Type</label>
                <Select value={certificationType} onValueChange={setCertificationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select certification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Certification</SelectItem>
                    {certifications.map(cert => (
                      <SelectItem key={cert.id} value={cert.id}>{cert.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-skills" 
                checked={includeSkills} 
                onCheckedChange={(checked) => setIncludeSkills(checked as boolean)}
              />
              <Label htmlFor="include-skills">Include skills verification</Label>
            </div>
            
            <Button 
              onClick={verifyProfile}
              disabled={isLoading}
              className="mt-2"
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Verify IT Credentials
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Third-Party Certification Verification</CardTitle>
          <CardDescription>
            Verify IT certifications directly with certification authorities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Certificate ID/Number</label>
                <Input placeholder="Enter certificate ID" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Certification Authority</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select authority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">Amazon Web Services</SelectItem>
                    <SelectItem value="azure">Microsoft Azure</SelectItem>
                    <SelectItem value="google">Google Cloud</SelectItem>
                    <SelectItem value="comptia">CompTIA</SelectItem>
                    <SelectItem value="cisco">Cisco</SelectItem>
                    <SelectItem value="oracle">Oracle</SelectItem>
                    <SelectItem value="isc2">ISC²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Verify with Authority
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Upcoming Verification Features</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-2">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">GitHub Verification</h4>
                <p className="text-sm text-muted-foreground">Verify tech skills and contributions through GitHub profiles</p>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-2">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Technical Assessments</h4>
                <p className="text-sm text-muted-foreground">Integrate with assessment platforms to verify practical skills</p>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-2">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium">Background Checks</h4>
                <p className="text-sm text-muted-foreground">Comprehensive employment and education verification</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Results</CardTitle>
            <CardDescription>
              Results of your verification request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {result.isVerified ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{result.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {result.source} · Verified {new Date(result.lastVerified).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={result.isVerified ? "outline" : "secondary"} className={
                      result.isVerified ? "bg-green-50 text-green-700 border-green-200" : ""
                    }>
                      {result.isVerified ? "Verified" : "Pending Verification"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium mb-1">Certifications</h5>
                      <div className="flex flex-wrap gap-2">
                        {result.certifications.map((cert, i) => (
                          <Badge key={i} variant="secondary">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    {includeSkills && (
                      <div>
                        <h5 className="text-sm font-medium mb-1">Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {result.skills.map((skill, i) => (
                            <Badge key={i} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {result.details && (
                      <div>
                        <h5 className="text-sm font-medium mb-1">Additional Details</h5>
                        <p className="text-sm text-muted-foreground">{result.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setResults([])}>
              Clear Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ITVerificationTab;
