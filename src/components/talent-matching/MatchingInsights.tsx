
import React from "react";
import { MatchingResult } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  FileSearch,
  Building,
  ListTodo,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MatchingInsightsProps {
  matchResult: MatchingResult;
}

const MatchingInsights: React.FC<MatchingInsightsProps> = ({ matchResult }) => {
  const crossSourceData = matchResult.crossSourceValidation;
  
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Cross-Source validation insights */}
      {crossSourceData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <FileSearch className="h-5 w-5 mr-2 text-blue-500" />
              Cross-Source Validation
            </CardTitle>
            <CardDescription>
              Candidate verification across {crossSourceData.sourcesSearched.length} sources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Sources searched:</span>
              <span className="font-medium">{crossSourceData.sourcesSearched.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Candidates found:</span>
              <span className="font-medium">{crossSourceData.candidatesFound}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Verified candidates:</span>
              <span className="font-medium">{crossSourceData.verifiedCandidates}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Verification rate:</span>
              <Badge variant={crossSourceData.verificationRate > 50 ? "success" : "secondary"}>
                {Math.round(crossSourceData.verificationRate)}%
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Average cross-source score:</span>
              <Badge variant="outline">
                {crossSourceData.averageCrossSourceScore.toFixed(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Talent Pool Quality */}
      {matchResult.insights && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <BarChart className="h-5 w-5 mr-2 text-green-500" /> 
              Talent Pool Quality
            </CardTitle>
            <CardDescription>
              Overall assessment of available talent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge 
              variant={
                matchResult.insights.talentPoolQuality === "Excellent" ? "success" :
                matchResult.insights.talentPoolQuality === "Good" ? "default" : 
                "secondary"
              }
              className="mb-2"
            >
              {matchResult.insights.talentPoolQuality}
            </Badge>
            
            <p className="text-sm text-muted-foreground">
              Based on match quality and candidate availability for this position.
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Competitive Positioning */}
      {matchResult.insights?.competitivePositioning && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Building className="h-5 w-5 mr-2 text-purple-500" />
              Market Competitiveness
            </CardTitle>
            <CardDescription>
              Position in the current talent market
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Talent availability:</span>
              <Badge variant={
                matchResult.insights.competitivePositioning.talentAvailability === "High" ? "success" : 
                matchResult.insights.competitivePositioning.talentAvailability === "Medium" ? "default" : 
                "destructive"
              }>
                {matchResult.insights.competitivePositioning.talentAvailability}
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm">Competition level:</span>
              <Badge variant={
                matchResult.insights.competitivePositioning.competitiveness === "Low" ? "success" : 
                matchResult.insights.competitivePositioning.competitiveness === "Medium" ? "default" : 
                "destructive"
              }>
                {matchResult.insights.competitivePositioning.competitiveness}
              </Badge>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm">Salary range:</span>
              <span className="font-medium">
                ${matchResult.insights.competitivePositioning.salaryRange.min.toLocaleString()} - 
                ${matchResult.insights.competitivePositioning.salaryRange.max.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm">Median salary:</span>
              <span className="font-medium">
                ${matchResult.insights.competitivePositioning.salaryRange.median.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm">Avg. time to hire:</span>
              <span className="font-medium">
                {matchResult.insights.competitivePositioning.timeToHire}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Recommended Sourcing Strategy */}
      {matchResult.insights?.recommendedSourcingStrategy && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <ListTodo className="h-5 w-5 mr-2 text-amber-500" />
              Sourcing Strategy
            </CardTitle>
            <CardDescription>
              Recommendations for talent acquisition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-1">Most effective sources:</h4>
              <div className="flex flex-wrap gap-1">
                {matchResult.insights.recommendedSourcingStrategy.mostEffectiveSources.map((source, i) => (
                  <Badge key={i} variant="outline">{source}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Suggested outreach order:</h4>
              <ol className="list-decimal list-inside text-sm">
                {matchResult.insights.recommendedSourcingStrategy.suggestedOutreachOrder.map((source, i) => (
                  <li key={i}>{source}</li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Untapped sources:</h4>
              <div className="flex flex-wrap gap-1">
                {matchResult.insights.recommendedSourcingStrategy.untappedSources.map((source, i) => (
                  <Badge key={i} variant="secondary">{source}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Empty state if no insights */}
      {!matchResult.insights && !crossSourceData && (
        <Card className="col-span-2">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No insights available</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Enable advanced matching options or cross-source intelligence to get deeper insights
              into your talent matching results.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MatchingInsights;
