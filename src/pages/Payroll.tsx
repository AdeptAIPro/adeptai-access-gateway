
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PayrollRunForm from '@/components/payroll/PayrollRunForm';
import PayrollHistoryTable from '@/components/payroll/PayrollHistoryTable';
import EmployeeList from '@/components/payroll/EmployeeList';
import EmployeeDetails from '@/components/payroll/EmployeeDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { usePayrollEmployeesSupabase } from '@/hooks/use-payroll-supabase';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('run');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
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

  return (
    <DashboardLayout title="Payroll Management">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full md:w-1/2 mb-4">
          <TabsTrigger value="run">Run Payroll</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
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
          <div className="p-8 border rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">Payroll Reports</h3>
            <p className="text-muted-foreground">Payroll reporting features coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Payroll;
