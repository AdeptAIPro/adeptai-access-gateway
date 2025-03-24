
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Star, 
  MessageSquare, 
  BookmarkPlus,
  Zap,
  Award,
  CheckCircle,
  Brain,
  BadgeCheck
} from "lucide-react";
import { Candidate } from "./types";

interface CandidateCardProps {
  candidate: Candidate;
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
  showEnrichedData?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  saveCandidate,
  contactCandidate,
  showEnrichedData = true,
}) => {
  return (
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
            
            {showEnrichedData && candidate.complianceVerified && (
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-600 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" /> Compliance Verified
              </Badge>
            )}
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
              
              {showEnrichedData && candidate.certifications && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-1 text-blue-500" /> 
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.certifications.map((cert: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        <BadgeCheck className="h-3 w-3 mr-1" /> {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {showEnrichedData && candidate.implicitCompetencies && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Brain className="h-4 w-4 mr-1 text-purple-500" /> 
                    AI-Detected Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.implicitCompetencies.map((comp: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {showEnrichedData && candidate.culturalFitScore !== undefined && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Zap className="h-4 w-4 mr-1 text-amber-500" /> 
                      Cultural Fit Score
                    </span>
                    <span>{candidate.culturalFitScore}%</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress 
                          value={candidate.culturalFitScore} 
                          className="h-2"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Based on team dynamics and company values</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              
              {showEnrichedData && candidate.historicalSuccessRate !== undefined && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-green-500" /> 
                      Historical Success Rate
                    </span>
                    <span>{(candidate.historicalSuccessRate * 100).toFixed(0)}%</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Progress 
                          value={candidate.historicalSuccessRate * 100} 
                          className="h-2"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Based on similar candidate placements</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
              
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
  );
};

export default CandidateCard;
