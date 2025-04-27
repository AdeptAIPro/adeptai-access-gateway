
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { Eye, Mail, MapPin, Phone } from "@/utils/icon-polyfill";

interface EmployeeDetailsProps {
  employee: Employee;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => {
  const isActive = employee.status === "active";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{employee.firstName} {employee.lastName}</span>
          <span className={`px-2 py-1 text-sm rounded-full ${
            isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}>
            {employee.status}
          </span>
        </CardTitle>
        <CardDescription>Employee ID: {employee.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>
              {employee.address.street}, {employee.address.city}, {employee.address.state} {employee.address.zipCode}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{employee.employmentType}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
