
// Create this file with PayrollRun type
export interface PayrollRun {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  amount: number;
  employeeCount: number;
  type: string;
  createdBy: string;
  notes?: string;
}
