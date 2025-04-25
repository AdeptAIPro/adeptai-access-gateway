
export interface SavedMatchResult {
  id: string;
  jobTitle: string;
  timestamp: string;
  candidateCount: number;
  matchScore: number;
  favorited: boolean;
  exported?: boolean;
}

export interface MatchingSavedResultsProps {
  savedResults: SavedMatchResult[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}
