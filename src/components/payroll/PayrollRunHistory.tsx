
import React, { useState } from "react";
import PayrollRunForm from "./PayrollRunForm";
import PayrollHistoryTable from "./PayrollHistoryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayrollAgentTaskCreator from "../agentic-ai/payroll/PayrollAgentTaskCreator";

const PayrollRunHistory = () => {
  const [activeTab, setActiveTab] = useState<string>("manual");
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

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="manual">Manual Processing</TabsTrigger>
          <TabsTrigger value="ai">AI Processing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <PayrollRunForm />
        </TabsContent>
        
        <TabsContent value="ai">
          <PayrollAgentTaskCreator />
        </TabsContent>
      </Tabs>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Recent Payroll Runs</h3>
        <PayrollHistoryTable payrollHistory={payrollHistory} />
      </div>
    </div>
  );
};

export default PayrollRunHistory;
