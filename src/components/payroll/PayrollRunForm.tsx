import React from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Calendar } from "@/utils/lucide-polyfill";  // Fixed import
import { Employee } from "@/types/employee";

interface PayrollRunFormProps {
  employees: Employee[];
  onSubmit: (data: any) => Promise<void>;
}

const PayrollRunForm: React.FC<PayrollRunFormProps> = ({ employees, onSubmit }) => {
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
    await onSubmit(formData);
  };

  return (
    <Form>
      <div className="space-y-4">
        <div>
          <Form.Label>Date</Form.Label>
          <Form.Control>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </Form.Control>
        </div>

        <div>
          <Form.Label>Employee Type</Form.Label>
          <Form.Control>
            <select
              name="employeeType"
              value={formData.employeeType}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="W2">W2</option>
              <option value="contractor">Contractor</option>
              <option value="perDiem">Per Diem</option>
            </select>
          </Form.Control>
        </div>

        <div>
          <Form.Label>Pay Type</Form.Label>
          <Form.Control>
            <select
              name="payType"
              value={formData.payType}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="hourly">Hourly</option>
              <option value="salary">Salary</option>
            </select>
          </Form.Control>
        </div>

        <Button onClick={handleSubmit}>Submit Payroll Run</Button>
      </div>
    </Form>
  );
};

export default PayrollRunForm;
