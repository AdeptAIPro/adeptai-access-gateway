
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employee } from "@/types/employee";
import { CalendarIcon, ChevronDown, ChevronUp, Filter, Search } from "@/utils/lucide-polyfill";
import { format } from "@/utils/date-polyfill";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PayrollRunFormProps {
  employees: Employee[];
  onSubmit: (data: any) => void;
}

const PayrollRunForm: React.FC<PayrollRunFormProps> = ({ employees, onSubmit }) => {
  const [payPeriod, setPayPeriod] = useState("biweekly");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Helper functions
  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };
  
  const toggleEmployeeSelection = (employeeId: string) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };
  
  // Filter employees based on search term and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = employeeTypeFilter.length === 0 || 
                        employeeTypeFilter.includes(employee.employeeType);
    
    return matchesSearch && matchesType;
  });

  // Calculate total payroll amount
  const calculateTotalPayroll = () => {
    return selectedEmployees.reduce((total, empId) => {
      const employee = employees.find(emp => emp.id === empId);
      if (employee) {
        // Simple calculation for demo purposes
        return total + employee.payRate * (employee.payType === "hourly" ? 80 : 1);
      }
      return total;
    }, 0).toFixed(2);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payrollData = {
      payPeriod,
      employeeIds: selectedEmployees,
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      totalAmount: calculateTotalPayroll()
    };
    
    onSubmit(payrollData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pay Period Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={payPeriod} onValueChange={setPayPeriod} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="biweekly" id="biweekly" />
                <Label htmlFor="biweekly">Bi-weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Select Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex items-center justify-center"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
              </div>
              
              {showFilters && (
                <div className="p-4 border rounded-md space-y-3">
                  <h4 className="font-medium">Employee Type</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-w2" 
                        checked={employeeTypeFilter.includes("W2")} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEmployeeTypeFilter([...employeeTypeFilter, "W2"]);
                          } else {
                            setEmployeeTypeFilter(employeeTypeFilter.filter(t => t !== "W2"));
                          }
                        }}
                      />
                      <label htmlFor="filter-w2">W2 Employees</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-contractor" 
                        checked={employeeTypeFilter.includes("contractor")} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEmployeeTypeFilter([...employeeTypeFilter, "contractor"]);
                          } else {
                            setEmployeeTypeFilter(employeeTypeFilter.filter(t => t !== "contractor"));
                          }
                        }}
                      />
                      <label htmlFor="filter-contractor">Contractors</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="filter-perdiem" 
                        checked={employeeTypeFilter.includes("perDiem")} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEmployeeTypeFilter([...employeeTypeFilter, "perDiem"]);
                          } else {
                            setEmployeeTypeFilter(employeeTypeFilter.filter(t => t !== "perDiem"));
                          }
                        }}
                      />
                      <label htmlFor="filter-perdiem">Per Diem</label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border rounded-md">
                <div className="p-3 border-b bg-muted/50 flex items-center">
                  <Checkbox 
                    id="select-all" 
                    checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="select-all" className="ml-2 flex-grow font-medium">Select All</label>
                  <span className="text-sm text-muted-foreground">
                    {selectedEmployees.length} of {filteredEmployees.length} selected
                  </span>
                </div>
                
                <div className="divide-y max-h-80 overflow-auto">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map(employee => (
                      <div key={employee.id} className="flex items-center p-3">
                        <Checkbox 
                          id={`employee-${employee.id}`} 
                          checked={selectedEmployees.includes(employee.id)}
                          onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                        />
                        <div className="ml-2">
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.employeeType} · {employee.payType === "hourly" ? `$${employee.payRate}/hr` : `$${employee.payRate}/yr`}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No employees match your search or filters
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Review & Submit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Total Employees</span>
                <span>{selectedEmployees.length}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Pay Period</span>
                <span className="capitalize">{payPeriod}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Total Amount</span>
                <span className="text-lg font-bold">${calculateTotalPayroll()}</span>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={selectedEmployees.length === 0}
              >
                {selectedEmployees.length === 0 ? "Select Employees to Continue" : "Run Payroll"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default PayrollRunForm;
