
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Eye, Download } from 'lucide-react';

interface PayrollHistoryTableProps {
  payrollHistory?: {
    id: string;
    date: string;
    status: string;
    employeeCount: number;
    totalAmount: number;
  }[];
}

const PayrollHistoryTable: React.FC<PayrollHistoryTableProps> = ({ 
  payrollHistory = [] // Default to empty array if not provided
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollHistory.length > 0 ? (
            payrollHistory.map((run) => (
              <TableRow key={run.id}>
                <TableCell className="font-medium">
                  {format(new Date(run.date), 'PP')}
                </TableCell>
                <TableCell>{run.employeeCount}</TableCell>
                <TableCell>${run.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      run.status === 'completed' ? 'success' : 
                      run.status === 'in-progress' ? 'warning' : 
                      'secondary'
                    }
                  >
                    {run.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="mr-2">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" /> Report
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No payroll runs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayrollHistoryTable;
