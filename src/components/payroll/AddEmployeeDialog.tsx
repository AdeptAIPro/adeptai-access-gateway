
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "@/utils/lucide-polyfill";
import { Employee } from "@/types/employee";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

interface AddEmployeeDialogProps {
  onEmployeeAdded: (employee: Employee) => void;
}

const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({ onEmployeeAdded }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
    employmentType: "full-time",
    payrollType: "W2",
    status: "active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.position.trim() !== "" &&
      formData.department.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newEmployee: Employee = {
        id: uuidv4(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        position: formData.position,
        department: formData.department,
        employmentType: formData.employmentType as 'full-time' | 'part-time' | 'contract' | 'per-diem',
        payrollType: formData.payrollType as 'W2' | '1099',
        status: formData.status as 'active' | 'inactive' | 'pending',
        startDate: new Date().toISOString().split('T')[0]
      };
      
      onEmployeeAdded(newEmployee);
      toast({
        title: "Employee Added",
        description: `${newEmployee.firstName} ${newEmployee.lastName} has been added successfully.`
      });
      
      // Reset form and close dialog
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        position: "",
        department: "",
        employmentType: "full-time",
        payrollType: "W2",
        status: "active"
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: "An error occurred while adding the employee. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">First Name*</label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">Last Name*</label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email*</label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="position" className="text-sm font-medium">Position*</label>
            <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="department" className="text-sm font-medium">Department*</label>
            <Input id="department" name="department" value={formData.department} onChange={handleChange} required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="employmentType" className="text-sm font-medium">Employment Type</label>
              <Select value={formData.employmentType} onValueChange={(value) => handleSelectChange("employmentType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="per-diem">Per Diem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="payrollType" className="text-sm font-medium">Payroll Type</label>
              <Select value={formData.payrollType} onValueChange={(value) => handleSelectChange("payrollType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="W2">W2</SelectItem>
                  <SelectItem value="1099">1099</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={!isFormValid()}>
              Add Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
