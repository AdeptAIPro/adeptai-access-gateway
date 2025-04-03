
import React from "react";
import { Check, Download, Trash2, Clock, Star, StarOff } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export interface SavedMatchResult {
  id: string;
  jobTitle: string;
  timestamp: string;
  candidateCount: number;
  matchScore: number;
  favorited: boolean;
  exported?: boolean;
}

interface MatchingSavedResultsProps {
  savedResults: SavedMatchResult[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const MatchingSavedResults: React.FC<MatchingSavedResultsProps> = ({
  savedResults,
  onLoad,
  onDelete,
  onExport,
  onToggleFavorite,
}) => {
  const { toast } = useToast();
  
  if (!savedResults || savedResults.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
          <div className="rounded-full bg-muted p-3 mb-3">
            <Star className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No Saved Matches</h3>
          <p className="text-sm text-center text-muted-foreground">
            Your saved matching results will appear here for easy access.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Saved Matching Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {savedResults.map((result) => (
          <Card key={result.id} className={result.favorited ? "border-primary/40 shadow-sm" : ""}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base truncate pr-6">{result.jobTitle}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onLoad(result.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Load Results
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onExport(result.id)}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Results
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleFavorite(result.id)}>
                      {result.favorited ? (
                        <>
                          <StarOff className="mr-2 h-4 w-4" />
                          Remove from Favorites
                        </>
                      ) : (
                        <>
                          <Star className="mr-2 h-4 w-4" />
                          Add to Favorites
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => {
                        onDelete(result.id);
                        toast({
                          title: "Result deleted",
                          description: "The matching result has been deleted"
                        });
                      }}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 inline mr-1" />
                  {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
                </span>
                <Badge variant={result.matchScore >= 80 ? "default" : "secondary"}>
                  {result.matchScore}% Match
                </Badge>
              </div>
              <p className="text-sm">
                {result.candidateCount} candidate{result.candidateCount !== 1 ? 's' : ''} found
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex justify-between items-center w-full">
                <Button variant="outline" size="sm" onClick={() => onLoad(result.id)}>
                  View Results
                </Button>
                {result.favorited && (
                  <Star className="h-4 w-4 text-amber-500 ml-2" fill="currentColor" />
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchingSavedResults;
