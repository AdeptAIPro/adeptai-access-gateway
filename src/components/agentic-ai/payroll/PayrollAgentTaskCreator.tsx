import React, { useState } from 'react';
import { useAgenticAI } from '@/hooks/use-agentic';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { usePayrollEmployees } from '@/hooks/use-payroll';
import { Loader2, Bot } from 'lucide-react';

// Define payroll frequencies for the dropdown
const payrollFrequencies = [
  { value: "Weekly", label: "Weekly" },
  { value: "Bi-Weekly", label: "Bi-Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Semi-Monthly", label: "Semi-Monthly" }
];

// Define employee types for the dropdown
const employeeTypes = [
  { value: "All", label: "All Employees" },
  { value: "W-2", label: "W-2 Employees" },
  { value: "1099", label: "1099 Contractors" }
];

// Define countries for the dropdown
const countries = [
  { value: "USA", label: "United States" },
  { value: "India", label: "India" },
  { value: "All", label: "All Countries" }
];

const PayrollAgentTaskCreator = () => {
  const { agents, createTask, isLoading } = useAgenticAI();
  const { employees } = usePayrollEmployees();
  
  // State variables for the form
  const [payPeriod, setPayPeriod] = useState('');
  const [payDate, setPayDate] = useState('');
  const [payFrequency, setPayFrequency] = useState<"Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly">("Bi-Weekly");
  const [employeeType, setEmployeeType] = useState<"W-2" | "1099" | "All">("All");
  const [country, setCountry] = useState<string>("All");
  const [runType, setRunType] = useState<"All" | "Individual">("All");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [optimizeTaxes, setOptimizeTaxes] = useState(false);
  const [verifyCompliance, setVerifyCompliance] = useState(false);
  const [useDynamicTaxRates, setUseDynamicTaxRates] = useState(false);
  
  // Get payroll-capable agents
  const payrollAgents = agents.filter(agent => 
    agent.capabilities.includes('payroll-processing')
  );
  
  // Default to the first payroll agent if available
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    payrollAgents.length > 0 ? payrollAgents[0].id : ''
  );
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!payPeriod || !payDate || !selectedAgentId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const task = await createTask(
        'payroll-processing',
        `Process ${runType === 'Individual' ? 'individual' : employeeType} payroll for ${payPeriod}`,
        selectedAgentId,
        {
          payrollType: 'regular',
          payPeriod,
          payDate,
          payFrequency,
          employeeType: runType === 'All' ? employeeType : undefined,
          country: country !== 'All' ? country : undefined,
          individualEmployeeId: runType === 'Individual' ? selectedEmployee : undefined,
          useDynamicTaxRates,
          optimizeForTaxes: optimizeTaxes,
          verifyCompliance
        },
        'high'
      );
      
      if (task) {
        toast({
          title: "Payroll Task Created",
          description: "Your AI agent will process the payroll task.",
        });
        
        // Reset the form
        setPayPeriod('');
        setPayDate('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the payroll task. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Payroll Processing
        </CardTitle>
        <CardDescription>
          Let an AI agent handle your payroll processing with advanced optimizations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="agent">Select AI Agent</Label>
            <Select 
              value={selectedAgentId} 
              onValueChange={setSelectedAgentId}
              disabled={payrollAgents.length === 0}
            >
              <SelectTrigger id="agent">
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {payrollAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
                {payrollAgents.length === 0 && (
                  <SelectItem value="none" disabled>
                    No payroll agents available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payPeriod">Pay Period</Label>
              <Input 
                id="payPeriod" 
                value={payPeriod} 
                onChange={e => setPayPeriod(e.target.value)} 
                placeholder="e.g., June 1-15, 2023" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payDate">Pay Date</Label>
              <Input 
                id="payDate" 
                type="date" 
                value={payDate} 
                onChange={e => setPayDate(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payFrequency">Pay Frequency</Label>
              <Select value={payFrequency} onValueChange={(value: any) => setPayFrequency(value)}>
                <SelectTrigger id="payFrequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {payrollFrequencies.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="runType">Run Type</Label>
              <Select 
                value={runType} 
                onValueChange={(value: "All" | "Individual") => setRunType(value)}
              >
                <SelectTrigger id="runType">
                  <SelectValue placeholder="Select run type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Eligible Employees</SelectItem>
                  <SelectItem value="Individual">Individual Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {runType === 'All' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeType">Employee Type</Label>
                <Select 
                  value={employeeType} 
                  onValueChange={(value: "W-2" | "1099" | "All") => setEmployeeType(value)}
                >
                  <SelectTrigger id="employeeType">
                    <SelectValue placeholder="Select employee type" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeTypes.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {runType === 'Individual' && (
            <div className="space-y-2">
              <Label htmlFor="selectedEmployee">Select Employee</Label>
              <Select 
                value={selectedEmployee} 
                onValueChange={setSelectedEmployee}
                disabled={employees.length === 0}
              >
                <SelectTrigger id="selectedEmployee">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                  {employees.length === 0 && (
                    <SelectItem value="none" disabled>
                      No employees available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="useDynamicTaxRates" className="text-base">Use Dynamic Tax Rates</Label>
                <p className="text-sm text-muted-foreground">
                  Use real-time tax rates from tax agency APIs
                </p>
              </div>
              <Switch 
                id="useDynamicTaxRates" 
                checked={useDynamicTaxRates} 
                onCheckedChange={setUseDynamicTaxRates} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="optimizeTaxes" className="text-base">Tax Optimization</Label>
                <p className="text-sm text-muted-foreground">
                  AI will optimize for tax efficiency
                </p>
              </div>
              <Switch 
                id="optimizeTaxes" 
                checked={optimizeTaxes} 
                onCheckedChange={setOptimizeTaxes} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="verifyCompliance" className="text-base">Compliance Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Verify compliance with relevant tax regulations
                </p>
              </div>
              <Switch 
                id="verifyCompliance" 
                checked={verifyCompliance} 
                onCheckedChange={setVerifyCompliance} 
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !payPeriod || !payDate || !selectedAgentId} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Task...
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Process Payroll with AI
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PayrollAgentTaskCreator;
