
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, DollarSign, Play } from "lucide-react";

const PayrollRunHistory = () => {
  const { toast } = useToast();
  
  const payrollHistory = [
    { 
      id: "pr-001", 
      date: "2025-03-15", 
      type: "Bi-Weekly", 
      employeeType: "W-2", 
      status: "Completed", 
      amount: "$45,295.00" 
    },
    { 
      id: "pr-002", 
      date: "2025-03-01", 
      type: "Bi-Weekly", 
      employeeType: "W-2", 
      status: "Completed", 
      amount: "$44,582.75" 
    },
    { 
      id: "pr-003", 
      date: "2025-02-28", 
      type: "Monthly", 
      employeeType: "1099", 
      status: "Completed", 
      amount: "$23,450.00" 
    },
  ];

  const handleRunPayroll = () => {
    toast({
      title: "Payroll Process Started",
      description: "Your payroll process has been initiated. You will receive updates on its progress.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Recent Payroll Runs</h3>
        </div>
        <Button onClick={handleRunPayroll} className="flex items-center gap-1">
          <Play size={16} />
          Run Payroll
        </Button>
      </div>
      
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
                <TableCell>{payroll.employeeType}</TableCell>
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
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PayrollRunHistory;
