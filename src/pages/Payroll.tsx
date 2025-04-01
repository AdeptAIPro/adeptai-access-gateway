
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PayrollTypeSelector from "@/components/payroll/PayrollTypeSelector";
import PayrollFrequencySelector from "@/components/payroll/PayrollFrequencySelector";
import PayrollIntegrations from "@/components/payroll/PayrollIntegrations";
import PayrollRunHistory from "@/components/payroll/PayrollRunHistory";
import EmployeeList from "@/components/payroll/EmployeeList";
import EmployeeDetails from "@/components/payroll/EmployeeDetails";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, RefreshCw } from "lucide-react";
import { seedEmployeeData } from "@/services/payroll/db/DatabaseSeeder";
import { ensurePayrollTables } from "@/services/payroll";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Payroll = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);
  
  useEffect(() => {
    const checkTables = async () => {
      const tablesExist = await ensurePayrollTables();
      setNeedsSetup(!tablesExist);
    };
    
    checkTables();
  }, []);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSeedData = async () => {
    setIsSeeding(true);
    await seedEmployeeData();
    setIsSeeding(false);
    // Reload the page to refresh data
    window.location.reload();
  };

  return (
    <DashboardLayout title="Payroll Management">
      <div className="space-y-6">
        {needsSetup && (
          <Alert variant="warning" className="mb-4 bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Database Setup Required</AlertTitle>
            <AlertDescription>
              Your Supabase database needs to be configured with the appropriate tables for payroll management.
              Please create an "employees" table with the necessary columns.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Payroll Management</h2>
          <Button 
            onClick={handleSeedData} 
            disabled={isSeeding}
            variant="outline"
            className="gap-2"
          >
            {isSeeding ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            {isSeeding ? "Adding Sample Data..." : "Seed Database"}
          </Button>
        </div>
        
        <Tabs defaultValue="employees" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="setup">Payroll Setup</TabsTrigger>
            <TabsTrigger value="run">Run Payroll</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="employees">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Employee List</CardTitle>
                  <CardDescription>
                    Manage employees for payroll processing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmployeeList onSelectEmployee={setSelectedEmployee} selectedEmployee={selectedEmployee} />
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Employee Details</CardTitle>
                  <CardDescription>
                    View and manage employee information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmployeeDetails employeeId={selectedEmployee} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="setup" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Type</CardTitle>
                  <CardDescription>
                    Select payroll type and additional pay options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PayrollTypeSelector />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Frequency</CardTitle>
                  <CardDescription>
                    Set up payroll schedule and frequency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PayrollFrequencySelector />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="run">
            <Card>
              <CardHeader>
                <CardTitle>Process Payroll</CardTitle>
                <CardDescription>
                  Review and process current payroll cycle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PayrollRunHistory />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Integrations</CardTitle>
                <CardDescription>
                  Connect with external payroll systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PayrollIntegrations />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
