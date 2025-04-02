
import React, { useState } from "react";
import { MatchingResult } from "./types";
import CandidateResults from "./CandidateResults";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Briefcase, Trophy, CheckCircle, Users, History } from "lucide-react";
import MatchingInsights from "./MatchingInsights";

export interface ResultsSectionProps {
  matchResult: MatchingResult;
  onStartNewMatch: () => void;
  saveCandidate?: (id: string) => void;
  contactCandidate?: (id: string) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  matchResult,
  onStartNewMatch,
  saveCandidate,
  contactCandidate
}) => {
  const [activeTab, setActiveTab] = useState("candidates");

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="outline" size="sm" onClick={onStartNewMatch}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              New Match
            </Button>
            <Badge variant="outline" className="ml-2">
              {matchResult.candidates.length} candidates matched
            </Badge>
            {matchResult.matchTime && (
              <Badge variant="outline">
                <History className="mr-1 h-3 w-3" /> {matchResult.matchTime.toFixed(1)}s
              </Badge>
            )}
          </div>
          <h2 className="text-xl font-bold">{matchResult.jobTitle}</h2>
          <div className="flex flex-wrap gap-1 mt-2">
            {matchResult.extractedSkills && matchResult.extractedSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="mr-1 mb-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="candidates">
            <Users className="mr-1 h-4 w-4" />
            Matched Candidates
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Trophy className="mr-1 h-4 w-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="job-details">
            <Briefcase className="mr-1 h-4 w-4" />
            Job Details
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="candidates">
          <CandidateResults 
            candidates={matchResult.candidates} 
            saveCandidate={saveCandidate}
            contactCandidate={contactCandidate}
          />
        </TabsContent>
        
        <TabsContent value="insights">
          <MatchingInsights matchResult={matchResult} />
        </TabsContent>
        
        <TabsContent value="job-details">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Job Description Analysis</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  <FileText className="inline mr-1 h-4 w-4" />
                  Key Responsibilities
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {matchResult.keyResponsibilities?.map((responsibility, index) => (
                    <li key={index} className="text-sm">{responsibility}</li>
                  )) || <li className="text-sm text-muted-foreground">No key responsibilities extracted</li>}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  <CheckCircle className="inline mr-1 h-4 w-4" />
                  Experience Level
                </h4>
                <p className="text-sm">
                  {matchResult.suggestedExperience} years of recommended experience
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">
                  <Briefcase className="inline mr-1 h-4 w-4" />
                  Job Title Suggestion
                </h4>
                <p className="text-sm">{matchResult.jobTitle}</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsSection;
