
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, DollarSign, Play, Download, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const PayrollRunHistory = () => {
  const { toast } = useToast();
  const [payPeriod, setPayPeriod] = useState<string>("current");
  const [employeeType, setEmployeeType] = useState<string>("all");
  
  const payrollHistory = [
    { 
      id: "pr-001", 
      date: "2025-03-15", 
      type: "Bi-Weekly", 
      employeeType: "W-2", 
      status: "Completed", 
      amount: "$45,295.00",
      employeeCount: 24
    },
    { 
      id: "pr-002", 
      date: "2025-03-01", 
      type: "Bi-Weekly", 
      employeeType: "W-2", 
      status: "Completed", 
      amount: "$44,582.75",
      employeeCount: 24
    },
    { 
      id: "pr-003", 
      date: "2025-02-28", 
      type: "Monthly", 
      employeeType: "1099", 
      status: "Completed", 
      amount: "$23,450.00",
      employeeCount: 5
    },
  ];

  const handleRunPayroll = () => {
    toast({
      title: "Payroll Process Started",
      description: "Your payroll process has been initiated. You will receive updates on its progress.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Run New Payroll</CardTitle>
          <CardDescription>
            Process payroll for your employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Pay Period</label>
              <Select value={payPeriod} onValueChange={setPayPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Mar 1 - Mar 15, 2025</SelectItem>
                  <SelectItem value="previous">Feb 16 - Feb 28, 2025</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Employee Type</label>
              <Select value={employeeType} onValueChange={setEmployeeType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="w2">W-2 Employees</SelectItem>
                  <SelectItem value="1099">1099 Contractors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleRunPayroll} className="flex items-center gap-1 w-full">
                <Play size={16} />
                Run Payroll
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 py-2 mt-4">
            <div className="border rounded-md p-3 text-center bg-blue-50">
              <div className="text-sm font-medium text-muted-foreground">Estimated Total</div>
              <div className="text-2xl font-bold mt-1">$43,950.00</div>
            </div>
            <div className="border rounded-md p-3 text-center bg-green-50">
              <div className="text-sm font-medium text-muted-foreground">Employees</div>
              <div className="text-2xl font-bold mt-1">29</div>
            </div>
            <div className="border rounded-md p-3 text-center bg-orange-50">
              <div className="text-sm font-medium text-muted-foreground">Pay Date</div>
              <div className="text-2xl font-bold mt-1">Mar 20, 2025</div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText size={16} />
            <span>All employees will receive their payslips by email</span>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Recent Payroll Runs</h3>
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
      </div>
    </div>
  );
};

export default PayrollRunHistory;
