
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Search, FileCheck } from "lucide-react";
import NursysVerificationTab from "@/components/compliance/NursysVerificationTab";
import ITVerificationTab from "@/components/compliance/ITVerificationTab";

const Compliance = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("healthcare");
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout title="Compliance">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Compliance Verification</h2>
            <p className="text-muted-foreground">
              Verify credentials and compliance status for different workforce sectors
            </p>
          </div>
        </div>

        <Tabs defaultValue="healthcare" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
            <TabsTrigger value="it">IT Workforce</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="healthcare" className="space-y-4">
            <NursysVerificationTab />
          </TabsContent>

          <TabsContent value="it" className="space-y-4">
            <ITVerificationTab />
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Workforce Verification</CardTitle>
                <CardDescription>
                  Verify general workforce compliance requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Verification Type</label>
                      <Select defaultValue="background">
                        <SelectTrigger>
                          <SelectValue placeholder="Select verification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="background">Background Check</SelectItem>
                          <SelectItem value="drug-test">Drug Test</SelectItem>
                          <SelectItem value="reference">Reference Check</SelectItem>
                          <SelectItem value="education">Education Verification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Candidate ID/Email</label>
                      <Input placeholder="Enter candidate ID or email" />
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    <Search className="mr-2 h-4 w-4" />
                    Verify Candidate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
