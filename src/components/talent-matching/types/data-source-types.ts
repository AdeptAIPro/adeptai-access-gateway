
export interface DataSource {
  id: string;
  name: string;
  type: string;
  url?: string;
  candidatesCount: number;
  lastUpdated: string;
  lastScraped?: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  icon?: React.ElementType;
  description?: string;
}

export interface ImportStats {
  totalProcessed: number;
  successfulImports: number;
  failedImports: number;
  duplicatesFound: number;
  enrichmentPerformed: number;
  startTime: string;
  endTime: string;
  sources: string[];
}

export interface ImportFormValues {
  sourceType: string;
  sourceName: string;
  resumeText?: string;
  fileUpload?: any;
  sourceUrl?: string;
}
