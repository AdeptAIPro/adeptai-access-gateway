
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Download, Users } from "lucide-react";

interface PayrollHistoryItem {
  id: string;
  date: string;
  type: string;
  employeeType: string;
  status: string;
  amount: string;
  employeeCount: number;
}

interface PayrollHistoryTableProps {
  payrollHistory: PayrollHistoryItem[];
}

const PayrollHistoryTable = ({ payrollHistory }: PayrollHistoryTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollHistory.map((payroll) => (
            <TableRow key={payroll.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  {new Date(payroll.date).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>{payroll.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-muted-foreground" />
                  <span>{payroll.employeeCount}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {payroll.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <DollarSign size={16} className="text-muted-foreground" />
                  {payroll.amount}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Download size={14} />
                    Export
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayrollHistoryTable;
