
import React from "react";
import PayrollRunForm from "./PayrollRunForm";
import PayrollHistoryTable from "./PayrollHistoryTable";

const PayrollRunHistory = () => {
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
      <PayrollRunForm />
      
      <div>
        <h3 className="text-lg font-medium mb-4">Recent Payroll Runs</h3>
        <PayrollHistoryTable payrollHistory={payrollHistory} />
      </div>
    </div>
  );
};

export default PayrollRunHistory;
