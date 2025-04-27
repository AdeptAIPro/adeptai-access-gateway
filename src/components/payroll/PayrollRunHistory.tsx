import React from 'react';
import { format } from '@/utils/date-polyfill';
import { Eye } from '@/utils/lucide-polyfill';
import { Button } from "@/components/ui/button";
import { PayrollRun } from '@/services/payroll/types/PayrollTypes';
import PayrollRunForm from './PayrollRunForm';
import { mockEmployees } from '@/data/mockEmployees';

interface PayrollRunHistoryProps {
  history?: PayrollRun[];
  onViewDetails?: (run: PayrollRun) => void;
}

const PayrollRunHistory: React.FC<PayrollRunHistoryProps> = ({
  history = [],
  onViewDetails
}) => {
  const [showNewRun, setShowNewRun] = React.useState(false);

  const handleSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    setShowNewRun(false);
  };

  if (showNewRun) {
    return (
      <PayrollRunForm 
        employees={mockEmployees} 
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Payroll Run History</h2>
        <Button onClick={() => setShowNewRun(true)}>Create New Run</Button>
      </div>
      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
              {history.map((run) => (
                <tr key={run.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(run.date), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {run.employeeCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${run.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(run)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4">No payroll runs in history.</div>
      )}
    </div>
  );
};

export default PayrollRunHistory;
