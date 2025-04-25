
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
import { SavedMatchResult } from "../types/saved-results.types";

interface SavedResultCardProps {
  result: SavedMatchResult;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const SavedResultCard: React.FC<SavedResultCardProps> = ({
  result,
  onLoad,
  onDelete,
  onExport,
  onToggleFavorite,
}) => {
  const { toast } = useToast();

  return (
    <Card className={result.favorited ? "border-primary/40 shadow-sm" : ""}>
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
  );
};
