
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Calendar, DollarSign } from "@/utils/icon-polyfill";
import { toast } from "@/utils/sonner-polyfill";
import { Label } from "@/components/ui/label";

// Define the schema for the form
const payrollTaskSchema = z.object({
  period: z.string().min(1, "Please select a payroll period"),
  goal: z.string().min(10, "Please add a description of at least 10 characters"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

type PayrollTaskFormValues = z.infer<typeof payrollTaskSchema>;

const PayrollAgentTaskCreator: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Setup the form with react-hook-form
  const form = useForm<PayrollTaskFormValues>({
    resolver: zodResolver(payrollTaskSchema),
    defaultValues: {
      period: "",
      goal: "",
      priority: "medium",
    },
  });
  
  const onSubmit = async (values: PayrollTaskFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success("Payroll processing task created", {
        description: `Task for ${values.period} created successfully.`
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast.error("Error creating task", {
        description: "There was a problem creating your payroll processing task."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle>AI Payroll Processing</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <Label className="text-base font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Select Payroll Period
                </Label>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payroll period" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="april-first-half">April 1-15, 2025</SelectItem>
                    <SelectItem value="april-second-half">April 16-30, 2025</SelectItem>
                    <SelectItem value="may-first-half">May 1-15, 2025</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the payroll period to process
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <Label className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Processing Instructions
                </Label>
                <FormControl>
                  <Textarea 
                    placeholder="E.g., Process standard payroll including overtime for marketing department..." 
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add specific instructions or requirements for this payroll run
                </FormDescription>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Label>Priority</Label>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Set the priority level for processing
                </FormDescription>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Payroll Task..." : "Create Payroll Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayrollAgentTaskCreator;
