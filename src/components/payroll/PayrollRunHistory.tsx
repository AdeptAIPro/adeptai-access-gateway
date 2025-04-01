
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, DollarSign, Play, Download, FileText, Users, Loader2, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { runPayroll } from "@/services/payroll/PayrollProcessor";
import { PayrollRunOptions } from "@/services/payroll/types/PayrollTypes";  // Updated import path
import { format } from "date-fns";
import { fetchEmployees } from "@/services/payroll/EmployeeService";
import { Employee } from "@/types/employee";

const PayrollRunHistory = () => {
  const { toast } = useToast();
  const [payPeriod, setPayPeriod] = useState<string>("current");
  const [employeeType, setEmployeeType] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [runType, setRunType] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  
  // Formatted dates for current pay period
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const midMonth = new Date(today.getFullYear(), today.getMonth(), 15);
  
  let currentPeriodStart, currentPeriodEnd, payDate;
  
  if (today.getDate() <= 15) {
    // First half of month
    currentPeriodStart = format(firstDayOfMonth, "MMM d, yyyy");
    currentPeriodEnd = format(midMonth, "MMM d, yyyy");
    payDate = format(new Date(today.getFullYear(), today.getMonth(), 20), "MMM d, yyyy");
  } else {
    // Second half of month
    currentPeriodStart = format(new Date(today.getFullYear(), today.getMonth(), 16), "MMM d, yyyy");
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    currentPeriodEnd = format(lastDay, "MMM d, yyyy");
    payDate = format(new Date(today.getFullYear(), today.getMonth() + 1, 5), "MMM d, yyyy");
  }
  
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

  useEffect(() => {
    // Load employees when in individual mode
    if (runType === "individual") {
      loadEmployees();
    }
  }, [runType, selectedCountry, employeeType]);

  const loadEmployees = async () => {
    try {
      setIsLoadingEmployees(true);
      const loadedEmployees = await fetchEmployees();
      
      // Filter employees by country if needed
      let filteredEmployees = loadedEmployees;
      
      if (selectedCountry) {
        filteredEmployees = loadedEmployees.filter(emp => {
          const address = emp.address || "";
          if (selectedCountry === "USA") {
            return !address.includes("India");
          } else if (selectedCountry === "India") {
            return address.includes("India");
          }
          return true;
        });
      }

      // Further filter by employee type if needed
      if (employeeType !== "all") {
        const typeMapping = {
          "w2": "W-2",
          "1099": "1099"
        };
        filteredEmployees = filteredEmployees.filter(
          emp => emp.type === typeMapping[employeeType as keyof typeof typeMapping]
        );
      }
      
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error("Error loading employees:", error);
      toast({
        title: "Error",
        description: "Failed to load employee list",
        variant: "destructive",
      });
    } finally {
      setIsLoadingEmployees(false);
    }
  };

  const handleRunPayroll = async () => {
    setIsProcessing(true);
    toast({
      title: "Payroll Process Started",
      description: `Your payroll process has been initiated for ${runType === "individual" ? "the selected employee" : "all eligible employees"}.`,
    });
    
    try {
      // Configure payroll options
      const options: PayrollRunOptions = {
        payPeriod: `${currentPeriodStart} - ${currentPeriodEnd}`,
        payDate: format(new Date(payDate), "yyyy-MM-dd"),
        payFrequency: "Bi-Weekly",
        employeeType: employeeType === "w2" ? "W-2" : 
                     employeeType === "1099" ? "1099" :
                     "All",
        country: selectedCountry,
        companyInfo: {
          name: "Sample Company, Inc.",
          address: "123 Business St, City, State 12345",
          ein: "12-3456789"
        },
        individualEmployeeId: runType === "individual" ? selectedEmployee : undefined
      };
      
      // Run payroll processing
      const result = await runPayroll(options);
      
      if (result.status === "Completed") {
        toast({
          title: "Payroll Completed Successfully",
          description: `Processed ${result.processedEmployees} employees with total net pay of ${result.totalNetPay.toFixed(2)}`,
        });
      } else if (result.status === "Partial") {
        toast({
          title: "Payroll Partially Completed",
          description: `${result.successfulPayments} successful payments, ${result.failedPayments} failed payments.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Payroll Processing Failed",
          description: "There was an error processing payroll. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error running payroll:", error);
      toast({
        title: "Error",
        description: "Failed to run payroll. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Run New Payroll</CardTitle>
          <CardDescription>
            Process payroll for your employees with automatic tax deductions
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
                  <SelectItem value="current">{currentPeriodStart} - {currentPeriodEnd}</SelectItem>
                  <SelectItem value="previous">Previous Pay Period</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      <span>USA</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="India">
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      <span>India</span>
                    </div>
                  </SelectItem>
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
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Run Type</label>
              <Select value={runType} onValueChange={setRunType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select run type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Eligible Employees</SelectItem>
                  <SelectItem value="individual">Individual Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {runType === "individual" && (
              <div>
                <label className="text-sm font-medium mb-1 block">Select Employee</label>
                <Select 
                  value={selectedEmployee || ""} 
                  onValueChange={setSelectedEmployee}
                  disabled={isLoadingEmployees || employees.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoadingEmployees ? "Loading employees..." : employees.length === 0 ? "No employees found" : "Select employee"} />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map(employee => (
                      <SelectItem key={employee.id} value={employee.id}>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>{employee.name} ({employee.employeeId})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 py-2 mt-4">
            <div className="border rounded-md p-3 text-center bg-blue-50">
              <div className="text-sm font-medium text-muted-foreground">Estimated Total</div>
              <div className="text-2xl font-bold mt-1">$43,950.00</div>
            </div>
            <div className="border rounded-md p-3 text-center bg-green-50">
              <div className="text-sm font-medium text-muted-foreground">Employees</div>
              <div className="text-2xl font-bold mt-1">
                {runType === "individual" ? "1" : "29"}
              </div>
            </div>
            <div className="border rounded-md p-3 text-center bg-orange-50">
              <div className="text-sm font-medium text-muted-foreground">Pay Date</div>
              <div className="text-2xl font-bold mt-1">{payDate}</div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText size={16} />
                <span>All employees will receive their payslips by email</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Calendar size={16} />
                <span>Automatic tax deductions will be applied based on employee location</span>
              </div>
            </div>
            
            <Button 
              onClick={handleRunPayroll} 
              className="flex items-center gap-1" 
              disabled={isProcessing || (runType === "individual" && !selectedEmployee)}
            >
              {isProcessing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Play size={16} />
              )}
              {isProcessing ? "Processing..." : "Run Payroll"}
            </Button>
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
