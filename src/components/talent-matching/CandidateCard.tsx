
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Phone, Star, Check, ShieldCheck } from "lucide-react";
import { Candidate } from "./types";

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
  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Avatar and basic info */}
          <div className="flex flex-row md:flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
            </Avatar>
            <div className="md:text-center">
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    candidate.matchScore > 85
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : candidate.matchScore > 70
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }
                >
                  {candidate.matchScore}% Match
                </Badge>
                {candidate.crossSourceVerified && (
                  <Badge variant="outline" className="border-green-500 text-green-600 flex gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Source: {candidate.source}
                {candidate.crossSourceOccurrences && candidate.crossSourceOccurrences > 1 && (
                  <span className="ml-1 text-xs">
                    (Found in {candidate.crossSourceOccurrences} sources)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Candidate details */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{candidate.name}</h3>
            <p className="text-muted-foreground">{candidate.title}</p>
            
            <div className="mt-2 space-y-2">
              <div>
                <span className="text-sm font-medium">Location:</span>{" "}
                <span className="text-sm">{candidate.location}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Experience:</span>{" "}
                <span className="text-sm">
                  {typeof candidate.experience === 'number' 
                    ? `${candidate.experience} years` 
                    : candidate.experience || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">Education:</span>{" "}
                <span className="text-sm">{candidate.education || 'Not specified'}</span>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-sm font-medium">Skills:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Cross-source information if available */}
            {candidate.crossSourceSources && candidate.crossSourceSources.length > 1 && (
              <div className="mt-3">
                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Verified across: {candidate.crossSourceSources.join(', ')}
                </span>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => saveCandidate(candidate.id)}
                variant="outline"
                className="flex-1"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button
                size="sm"
                onClick={() => contactCandidate(candidate.id)}
                className="flex-1"
              >
                <Phone className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
