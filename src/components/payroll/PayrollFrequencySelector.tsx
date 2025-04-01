
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const frequencies = [
  { id: "weekly", name: "Weekly" },
  { id: "biweekly", name: "Bi-Weekly" },
  { id: "semimonthly", name: "Semi-Monthly" },
  { id: "monthly", name: "Monthly" },
];

const payPeriods = [
  { id: "sunday-saturday", name: "Sunday - Saturday" },
  { id: "monday-sunday", name: "Monday - Sunday" },
  { id: "custom", name: "Custom Period" },
];

const PayrollFrequencySelector = () => {
  const [selectedFrequency, setSelectedFrequency] = useState("biweekly");
  const [selectedPayPeriod, setSelectedPayPeriod] = useState("sunday-saturday");
  const [overtimeThreshold, setOvertimeThreshold] = useState("40");
  
  const form = useForm({
    defaultValues: {
      holidayRate: "2.0",
      weekendRate: "1.5",
      oncallRate: "1.25"
    }
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
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
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Pay Period</h3>
            <Select value={selectedPayPeriod} onValueChange={setSelectedPayPeriod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select pay period" />
              </SelectTrigger>
              <SelectContent>
                {payPeriods.map(period => (
                  <SelectItem key={period.id} value={period.id}>
                    {period.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Form {...form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="overtime-threshold">Overtime Threshold (hours)</Label>
                <Input
                  id="overtime-threshold"
                  type="number"
                  value={overtimeThreshold}
                  onChange={(e) => setOvertimeThreshold(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <FormField
                control={form.control}
                name="holidayRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Holiday Pay Rate (multiplier)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weekendRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weekend Differential (multiplier)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="oncallRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>On-Call Pay Rate (multiplier)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollFrequencySelector;
