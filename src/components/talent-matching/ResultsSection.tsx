
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Sparkles } from "lucide-react";
import MatchingProgress from "./MatchingProgress";
import CandidateResults from "./CandidateResults";
import { MatchingResult, Candidate } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultsSectionProps {
  isLoading: boolean;
  matchingProgress: number;
  matchResult: MatchingResult | null;
  matchingCandidates: Candidate[];
  filteredCandidates: Candidate[];
  saveCandidate: (id: string) => void;
  contactCandidate: (id: string) => void;
  useCrossSourceIntelligence?: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  isLoading,
  matchingProgress,
  matchResult,
  matchingCandidates,
  filteredCandidates,
  saveCandidate,
  contactCandidate,
  useCrossSourceIntelligence = false
}) => {
  if (isLoading) {
    return <MatchingProgress progress={matchingProgress} />;
  }

  if (!matchResult) {
    return null;
  }

  return (
    <>
      <Alert variant="default" className="bg-muted">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Matching Results</AlertTitle>
        <AlertDescription>
          Found {matchingCandidates.length} candidates in {matchResult.matchTime?.toFixed(1) || '0.0'} seconds 
          using {matchResult.matchingModelUsed?.split('-').join(' ') || 'AI'} model
          {useCrossSourceIntelligence && matchResult.crossSourceValidation && 
            ` with cross-source validation across ${matchResult.crossSourceValidation.sourcesSearched?.length || 0} sources`}
        </AlertDescription>
      </Alert>
      
      {useCrossSourceIntelligence && matchResult.insights && (
        <Card className="mt-4 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
              <CardTitle className="text-lg">Cross-Source Intelligence Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Talent Pool Analysis</h4>
                <p className="text-sm mb-2">Quality: <Badge variant="outline" className="ml-1">{matchResult.insights.talentPoolQuality}</Badge></p>
                <p className="text-sm mb-2">Cross-Source Verification: <Badge variant="outline" className="ml-1">
                  {matchResult.insights.crossSourceStatistics?.verifiedPercentage}% verified
                </Badge></p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Sourcing Strategy</h4>
                <p className="text-sm mb-1">Most Effective Sources:</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {matchResult.insights.recommendedSourcingStrategy?.mostEffectiveSources?.map((source, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{source}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* New section to display cross-source validation details */}
            {matchResult.crossSourceValidation && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-2">Cross-Source Validation</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Total Candidates</TableHead>
                      <TableHead>Verified Candidates</TableHead>
                      <TableHead>Verification Rate</TableHead>
                      <TableHead>Avg. Cross-Source Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{matchResult.crossSourceValidation.candidatesFound}</TableCell>
                      <TableCell>{matchResult.crossSourceValidation.verifiedCandidates}</TableCell>
                      <TableCell>
                        <Badge variant={matchResult.crossSourceValidation.verificationRate > 50 ? "success" : "outline"}>
                          {matchResult.crossSourceValidation.verificationRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>{matchResult.crossSourceValidation.averageCrossSourceScore}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-xs text-muted-foreground mt-2">
                  Sources searched: {matchResult.crossSourceValidation.sourcesSearched?.join(", ")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {matchingCandidates.length > 0 && (
        <CandidateResults 
          filteredCandidates={filteredCandidates}
          matchingCandidates={matchingCandidates}
          saveCandidate={saveCandidate}
          contactCandidate={contactCandidate}
        />
      )}
    </>
  );
};

export default ResultsSection;
