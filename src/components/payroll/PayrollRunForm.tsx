
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Play, FileText, Users, Loader2, Globe, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { fetchEmployees } from "@/services/payroll/EmployeeService";
import { Employee } from "@/types/employee";
import { runPayroll } from "@/services/payroll/PayrollProcessor";
import { PayrollRunOptions } from "@/services/payroll/types/PayrollTypes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BankValidationService from "@/services/payroll/payment/BankValidationService";

interface PayrollRunFormProps {
  onPayrollRun?: () => void;
}

const PayrollRunForm = ({ onPayrollRun }: PayrollRunFormProps) => {
  const { toast } = useToast();
  const [payPeriod, setPayPeriod] = useState<string>("current");
  const [employeeType, setEmployeeType] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("USA");
  const [runType, setRunType] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [useDynamicTaxRates, setUseDynamicTaxRates] = useState<boolean>(true);
  const [verifyBankAccounts, setVerifyBankAccounts] = useState<boolean>(true);
  const [optimizeForTaxes, setOptimizeForTaxes] = useState<boolean>(false);
  const [verifyCompliance, setVerifyCompliance] = useState<boolean>(true);
  const [validationResults, setValidationResults] = useState<{
    employees: boolean;
    bank: boolean;
    compliance: boolean;
  }>({ employees: true, bank: true, compliance: true });
  
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
            // Check if address is a string before using includes
            return typeof address === "string" ? !address.includes("India") : true;
          } else if (selectedCountry === "India") {
            // Check if address is a string before using includes
            return typeof address === "string" ? address.includes("India") : false;
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

  const validateBeforeRun = async () => {
    const validation = { employees: true, bank: true, compliance: true };
    
    if (runType === "individual" && !selectedEmployee) {
      validation.employees = false;
      toast({
        title: "Employee Selection Required",
        description: "Please select an employee before running payroll",
        variant: "destructive",
      });
    }
    
    if (verifyBankAccounts) {
      try {
        let employeesToValidate = employees;
        
        if (runType === "individual" && selectedEmployee) {
          employeesToValidate = employees.filter(emp => emp.id === selectedEmployee);
        } else if (runType === "all") {
          // If not loaded yet, load all employees for validation
          if (employees.length === 0) {
            employeesToValidate = await fetchEmployees();
            
            // Apply filters
            if (employeeType !== "all") {
              const typeMapping = {
                "w2": "W-2",
                "1099": "1099"
              };
              employeesToValidate = employeesToValidate.filter(
                emp => emp.type === typeMapping[employeeType as keyof typeof typeMapping]
              );
            }
          }
        }
        
        for (const employee of employeesToValidate) {
          const bankValid = await BankValidationService.validateEmployeeBankInfo(employee);
          if (!bankValid) {
            validation.bank = false;
            break;
          }
        }
      } catch (error) {
        console.error("Error validating bank accounts:", error);
        validation.bank = false;
      }
    }

    // More validation checks for compliance could go here
    
    setValidationResults(validation);
    return validation.employees && validation.bank && validation.compliance;
  };

  const handleRunPayroll = async () => {
    // Validate before running payroll
    const isValid = await validateBeforeRun();
    if (!isValid) {
      return;
    }
    
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
        individualEmployeeId: runType === "individual" ? selectedEmployee : undefined,
        useDynamicTaxRates,
        companyInfo: {
          name: "Sample Company, Inc.",
          address: "123 Business St, City, State 12345",
          ein: "12-3456789"
        },
        optimizeForTaxes,
        verifyCompliance
      };
      
      // Run payroll processing
      const result = await runPayroll(options);
      
      if (result.status === "Completed") {
        toast({
          title: "Payroll Completed Successfully",
          description: `Processed ${result.processedEmployees} employees with total net pay of $${result.totalNetPay.toFixed(2)}`,
          variant: "default",
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
      
      if (onPayrollRun) {
        onPayrollRun();
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
    <Card>
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
                        <span>{employee.firstName} {employee.lastName} ({employee.id})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!validationResults.employees && (
                <p className="text-destructive text-xs mt-1">
                  <AlertCircle className="h-3 w-3 inline mr-1" />
                  Please select an employee
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="dynamic-tax-rates" 
              checked={useDynamicTaxRates} 
              onCheckedChange={setUseDynamicTaxRates}
            />
            <Label htmlFor="dynamic-tax-rates" className="text-sm">Use dynamic tax rates API</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="verify-bank-accounts" 
              checked={verifyBankAccounts} 
              onCheckedChange={setVerifyBankAccounts}
            />
            <Label htmlFor="verify-bank-accounts" className="text-sm">Verify bank accounts</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="tax-optimization" 
              checked={optimizeForTaxes} 
              onCheckedChange={setOptimizeForTaxes}
            />
            <Label htmlFor="tax-optimization" className="text-sm">Optimize for taxes</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="verify-compliance" 
              checked={verifyCompliance} 
              onCheckedChange={setVerifyCompliance}
            />
            <Label htmlFor="verify-compliance" className="text-sm">Verify regulatory compliance</Label>
          </div>
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
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className={useDynamicTaxRates ? "text-green-600" : "text-muted-foreground"} />
            <span className={useDynamicTaxRates ? "text-green-600" : "text-muted-foreground"}>
              {useDynamicTaxRates ? "Using real-time tax rates from official tax agencies" : "Using static tax rates (enable dynamic rates for accuracy)"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className={verifyBankAccounts ? "text-green-600" : "text-muted-foreground"} />
            <span className={verifyBankAccounts ? "text-green-600" : "text-muted-foreground"}>
              {verifyBankAccounts ? "Bank account validation enabled for direct deposit" : "Bank account validation disabled (recommended for live payrolls)"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={16} className={verifyCompliance ? "text-green-600" : "text-muted-foreground"} />
            <span className={verifyCompliance ? "text-green-600" : "text-muted-foreground"}>
              {verifyCompliance ? "Compliance verification enabled for regulatory requirements" : "Compliance verification disabled (recommended for regulatory compliance)"}
            </span>
          </div>
        </div>
        
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
  );
};

export default PayrollRunForm;
