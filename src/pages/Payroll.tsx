
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PayrollRunForm from '@/components/payroll/PayrollRunForm';
import PayrollHistoryTable from '@/components/payroll/PayrollHistoryTable';
import EmployeeList from '@/components/payroll/EmployeeList';
import EmployeeDetails from '@/components/payroll/EmployeeDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { usePayrollEmployeesSupabase } from '@/hooks/use-payroll-supabase';
import { Button } from '@/components/ui/button';
import { FileText, Download, FileCheck } from 'lucide-react';
import W2GenerationService from '@/services/payroll/compliance/W2GenerationService';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('run');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const { toast } = useToast();
  const { employees, isLoading } = usePayrollEmployeesSupabase();

  const selectedEmployee = selectedEmployeeId 
    ? employees.find(emp => emp.id === selectedEmployeeId) 
    : null;

  const handlePayrollRun = () => {
    toast({
      title: "Payroll Completed",
      description: "Your payroll has been processed successfully."
    });
    setActiveTab('history');
  };
  
  const handleGenerateW2s = async () => {
    setGenerating(true);
    toast({
      title: "W-2 Generation Started",
      description: "Generating W-2 forms for all employees. This may take a few minutes."
    });
    
    try {
      // Simulate generation for all employees
      const currentYear = new Date().getFullYear() - 1; // Previous tax year
      
      // Mock year data for demo purposes
      const yearData = {
        year: currentYear,
        wages: 75000,
        federalWithholding: 9500,
        socialSecurityWages: 75000,
        socialSecurityWithholding: 4650,
        medicareWages: 75000,
        medicareWithholding: 1087.50,
        stateWages: 75000,
        stateWithholding: 3000
      };
      
      // Mock employer data
      const employerData = {
        name: "Sample Company, Inc.",
        ein: "12-3456789",
        address: {
          street: "123 Business St",
          city: "Austin",
          state: "TX",
          zip: "78701"
        }
      };
      
      // Process each employee (for demo purposes, just the first one if selected)
      if (selectedEmployeeId && selectedEmployee) {
        await W2GenerationService.generateW2(selectedEmployee, yearData, employerData);
        
        toast({
          title: "W-2 Generated",
          description: `W-2 form for ${selectedEmployee.firstName} ${selectedEmployee.lastName} has been generated successfully.`,
          variant: "default",
        });
      } else {
        // Generate for all employees
        let successCount = 0;
        let failCount = 0;
        
        for (const employee of employees) {
          try {
            const result = await W2GenerationService.generateW2(employee, yearData, employerData);
            if (result.success) {
              successCount++;
            } else {
              failCount++;
            }
          } catch (error) {
            console.error(`Error generating W-2 for ${employee.firstName} ${employee.lastName}:`, error);
            failCount++;
          }
          
          // Add small delay between processing to avoid UI freezing
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        toast({
          title: "W-2 Generation Complete",
          description: `Successfully generated ${successCount} W-2 forms. ${failCount > 0 ? `Failed to generate ${failCount} forms.` : ''}`,
          variant: failCount > 0 ? "default" : "default",
        });
      }
    } catch (error) {
      console.error("Error generating W-2 forms:", error);
      toast({
        title: "W-2 Generation Failed",
        description: "There was an error generating W-2 forms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };
  
  const handleGenerateComplianceReport = async (reportType: string) => {
    setGenerating(true);
    
    toast({
      title: `Generating ${reportType.toUpperCase()} Report`,
      description: "Please wait while we prepare your compliance report."
    });
    
    try {
      // Mock employer data
      const employerData = {
        name: "Sample Company, Inc.",
        ein: "12-3456789",
        address: {
          street: "123 Business St",
          city: "Austin",
          state: "TX",
          zip: "78701"
        }
      };
      
      // Generate the report
      const result = await W2GenerationService.generateComplianceReport(
        employees,
        {
          year: new Date().getFullYear() - 1, // Previous tax year
          quarter: 4, // Q4
          reportType: reportType as any,
          format: 'pdf'
        },
        employerData
      );
      
      if (result.success) {
        toast({
          title: "Report Generated Successfully",
          description: `Your ${reportType.toUpperCase()} report is ready for download.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Report Generation Failed",
          description: result.error || "Failed to generate the report. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error generating ${reportType} report:`, error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the compliance report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout title="Payroll Management">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full md:w-3/4 mb-4">
          <TabsTrigger value="run">Run Payroll</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="run" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <PayrollRunForm onPayrollRun={handlePayrollRun} />
          </div>
        </TabsContent>
        
        <TabsContent value="employees" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <EmployeeList 
                onSelectEmployee={setSelectedEmployeeId}
                selectedEmployee={selectedEmployeeId}
              />
            </div>
            <div className="md:col-span-2">
              {selectedEmployee ? (
                <EmployeeDetails employee={selectedEmployee} />
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg p-8 text-center">
                  <div>
                    <h3 className="text-lg font-medium mb-2">No Employee Selected</h3>
                    <p className="text-muted-foreground">Select an employee from the list to view their details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <PayrollHistoryTable />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Payroll Reports</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Employee Earnings Report</p>
                    <p className="text-sm text-muted-foreground">Summary of all employee earnings for the period</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download size={16} /> Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tax Withholdings Report</p>
                    <p className="text-sm text-muted-foreground">Summary of all tax withholdings</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download size={16} /> Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Deductions Report</p>
                    <p className="text-sm text-muted-foreground">Summary of all employee deductions</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download size={16} /> Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Department Cost Report</p>
                    <p className="text-sm text-muted-foreground">Payroll costs by department</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download size={16} /> Download
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Employee Reports</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Employee Directory</p>
                    <p className="text-sm text-muted-foreground">Complete employee information</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download size={16} /> Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Hours & Attendance</p>
                    <p className="text-sm text-muted-foreground">Hours worked and attendance records</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download size={16} /> Download
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Benefits Enrollment</p>
                    <p className="text-sm text-muted-foreground">Employee benefits summary</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download size={16} /> Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-4">Tax Forms</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">W-2 Forms</p>
                    <p className="text-sm text-muted-foreground">Annual Wage and Tax Statement for employees</p>
                  </div>
                  <Button 
                    onClick={handleGenerateW2s} 
                    disabled={generating} 
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    {generating ? "Generating..." : "Generate W-2s"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">1099-NEC Forms</p>
                    <p className="text-sm text-muted-foreground">For independent contractors</p>
                  </div>
                  <Button 
                    onClick={() => handleGenerateComplianceReport('1099')}
                    disabled={generating} 
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    Generate 1099s
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">ACA Forms (1095-C)</p>
                    <p className="text-sm text-muted-foreground">Health insurance reporting</p>
                  </div>
                  <Button 
                    onClick={() => handleGenerateComplianceReport('aca_1095c')}
                    disabled={generating}
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    Generate Forms
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-medium mb-4">Government Filings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Form 941</p>
                    <p className="text-sm text-muted-foreground">Quarterly Federal Tax Return</p>
                  </div>
                  <Button 
                    onClick={() => handleGenerateComplianceReport('941')}
                    disabled={generating}
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    <FileCheck size={16} /> Prepare Filing
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Form 940</p>
                    <p className="text-sm text-muted-foreground">Annual Federal Unemployment Tax Return</p>
                  </div>
                  <Button 
                    onClick={() => handleGenerateComplianceReport('940')}
                    disabled={generating}
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    <FileCheck size={16} /> Prepare Filing
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">State Tax Filings</p>
                    <p className="text-sm text-muted-foreground">State withholding and unemployment</p>
                  </div>
                  <Button 
                    onClick={() => handleGenerateComplianceReport('state_withholding')}
                    disabled={generating}
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    <FileCheck size={16} /> Prepare Filing
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Hire Reporting</p>
                    <p className="text-sm text-muted-foreground">Required state reporting for new employees</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-1">
                    <FileText size={16} /> Generate Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Payroll;
