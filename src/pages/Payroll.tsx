
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PayrollTypeSelector from "@/components/payroll/PayrollTypeSelector";
import PayrollFrequencySelector from "@/components/payroll/PayrollFrequencySelector";
import PayrollIntegrations from "@/components/payroll/PayrollIntegrations";
import PayrollRunHistory from "@/components/payroll/PayrollRunHistory";

const Payroll = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout title="Payroll Management">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Dashboard</CardTitle>
              <CardDescription>
                Manage your payroll operations for all employee types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="setup" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="setup">Payroll Setup</TabsTrigger>
                  <TabsTrigger value="run">Run Payroll</TabsTrigger>
                </TabsList>
                <TabsContent value="setup" className="space-y-4">
                  <PayrollTypeSelector />
                  <PayrollFrequencySelector />
                </TabsContent>
                <TabsContent value="run">
                  <PayrollRunHistory />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect with your existing payroll systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayrollIntegrations />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Payroll;
