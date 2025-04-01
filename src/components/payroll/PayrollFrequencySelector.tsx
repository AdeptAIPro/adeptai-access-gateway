
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const frequencies = [
  { id: "weekly", name: "Weekly" },
  { id: "biweekly", name: "Bi-Weekly" },
  { id: "semimonthly", name: "Semi-Monthly" },
  { id: "monthly", name: "Monthly" },
];

const PayrollFrequencySelector = () => {
  const [selectedFrequency, setSelectedFrequency] = useState("biweekly");

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Payroll Frequency</h3>
          <RadioGroup 
            value={selectedFrequency} 
            onValueChange={setSelectedFrequency}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {frequencies.map(frequency => (
              <div key={frequency.id} className="flex items-center space-x-2">
                <RadioGroupItem value={frequency.id} id={`frequency-${frequency.id}`} />
                <Label htmlFor={`frequency-${frequency.id}`} className="cursor-pointer">{frequency.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollFrequencySelector;
