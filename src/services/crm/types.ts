
export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  source: string;
  score?: number;
  status?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface LeadFilter {
  search?: string;
  status?: string;
  source?: string;
  scoreMin?: number;
  scoreMax?: number;
  dateFrom?: string;
  dateTo?: string;
  minScore?: number; // Add this to fix the type error
}
