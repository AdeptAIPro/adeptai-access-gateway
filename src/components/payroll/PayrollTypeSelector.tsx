
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const payrollTypes = [
  { id: "w2", name: "W-2 Employees" },
  { id: "1099", name: "1099 Contractors" },
  { id: "ic", name: "Independent Contractors" },
  { id: "perdiem", name: "Per Diem" },
];

const additionalOptions = [
  { id: "overtime", name: "Include Overtime Pay" },
  { id: "holiday", name: "Include Holiday Pay" },
  { id: "weekend", name: "Include Weekend Differentials" },
  { id: "oncall", name: "Include On-Call Pay" },
];

const PayrollTypeSelector = () => {
  const [selectedType, setSelectedType] = useState("w2");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["overtime", "holiday"]);

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(current => 
      current.includes(optionId) 
        ? current.filter(id => id !== optionId)
        : [...current, optionId]
    );
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
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
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Additional Options</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {additionalOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={option.id} 
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer">{option.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollTypeSelector;
