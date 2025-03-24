
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Star, 
  MessageSquare, 
  BookmarkPlus 
} from "lucide-react";

interface Skill {
  name: string;
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  education: string;
  experience: number;
  skills: string[];
  matchScore: number;
  source: string;
  avatar: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  saveCandidate,
  contactCandidate,
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
  );
};

export default CandidateCard;
