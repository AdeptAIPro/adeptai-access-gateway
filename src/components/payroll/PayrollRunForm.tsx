
import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

interface PayrollRunFormProps {
  employees?: any[];
  onSubmit?: (data: any) => Promise<void>;
  onPayrollRun?: () => void;
}

const PayrollRunForm = React.memo(({ employees = [], onSubmit, onPayrollRun }: PayrollRunFormProps) => {
  const [formData, setFormData] = React.useState({
    date: new Date().toISOString().split('T')[0],
    employeeType: 'W2',
    payType: 'hourly',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit(formData);
    }
    if (onPayrollRun) {
      onPayrollRun();
    }
  };

  // Memoize form sections to prevent unnecessary re-renders
  const dateSection = useMemo(() => (
    <FormItem>
      <FormLabel>Date</FormLabel>
      <FormControl>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </FormControl>
    </FormItem>
  ), [formData.date]);

  const employeeTypeSection = useMemo(() => (
    <FormItem>
      <FormLabel>Employee Type</FormLabel>
      <FormControl>
        <select
          name="employeeType"
          value={formData.employeeType}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="W2">W2</option>
          <option value="contractor">Contractor</option>
          <option value="perDiem">Per Diem</option>
        </select>
      </FormControl>
    </FormItem>
  ), [formData.employeeType]);

  const payTypeSection = useMemo(() => (
    <FormItem>
      <FormLabel>Pay Type</FormLabel>
      <FormControl>
        <select
          name="payType"
          value={formData.payType}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="hourly">Hourly</option>
          <option value="salary">Salary</option>
        </select>
      </FormControl>
    </FormItem>
  ), [formData.payType]);

  return (
    <div className="space-y-4">
      {dateSection}
      {employeeTypeSection}
      {payTypeSection}
      <Button onClick={handleSubmit}>Submit Payroll Run</Button>
    </div>
  );
});

PayrollRunForm.displayName = 'PayrollRunForm';

export default PayrollRunForm;
