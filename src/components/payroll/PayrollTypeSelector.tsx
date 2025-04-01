
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const payrollTypes = [
  { id: "w2", name: "W-2 Employees" },
  { id: "1099", name: "1099 Contractors" },
  { id: "ic", name: "Independent Contractors" },
  { id: "perdiem", name: "Per Diem" },
];

const PayrollTypeSelector = () => {
  const [selectedType, setSelectedType] = useState("w2");

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Payroll Type</h3>
          <RadioGroup 
            value={selectedType} 
            onValueChange={setSelectedType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {payrollTypes.map(type => (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={`type-${type.id}`} />
                <Label htmlFor={`type-${type.id}`} className="cursor-pointer">{type.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollTypeSelector;
