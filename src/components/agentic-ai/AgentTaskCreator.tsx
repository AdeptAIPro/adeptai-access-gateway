
import React, { useState, useEffect } from 'react';
import { useAgenticAI } from '@/hooks/use-agentic';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AgentTaskType } from '@/services/agentic-ai/types/AgenticTypes';
import { Bot, Loader2, RefreshCw } from 'lucide-react';

// Create a schema for task creation
const taskSchema = z.object({
  taskType: z.string({ required_error: "Please select a task type" }),
  agentId: z.string({ required_error: "Please select an agent" }),
  goal: z.string().min(5, { message: "Goal must be at least 5 characters" }).max(200),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  params: z.record(z.any()).optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const AgentTaskCreator = () => {
  const { agents, createTask, isLoading, refreshAgents } = useAgenticAI();
  const [selectedTaskType, setSelectedTaskType] = useState<AgentTaskType | ''>('');
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [isRefreshingAgents, setIsRefreshingAgents] = useState(false);
  
  // Initialize form
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskType: "",
      agentId: "",
      goal: "",
      priority: "medium",
      params: {},
    },
  });
  
  // Update filtered agents whenever task type or agents list changes
  useEffect(() => {
    if (selectedTaskType) {
      const filtered = agents.filter(agent => 
        agent.capabilities && agent.capabilities.includes(selectedTaskType)
      );
      
      console.log(`Filtering agents for task type "${selectedTaskType}":`, filtered);
      
      if (filtered.length === 0) {
        console.warn(`No agents found with capability: ${selectedTaskType}`);
      }
      
      setFilteredAgents(filtered);
    } else {
      setFilteredAgents(agents);
    }
  }, [selectedTaskType, agents]);
  
  const onSubmit = async (values: TaskFormValues) => {
    try {
      const task = await createTask(
        values.taskType as AgentTaskType,
        values.goal,
        values.agentId,
        values.params || {},
        values.priority as "low" | "medium" | "high"
      );
      
      if (task) {
        form.reset();
        toast({
          title: "Task Created",
          description: "Your AI agent will begin working on your task.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTaskTypeChange = (value: string) => {
    console.log(`Task type changed to: ${value}`);
    setSelectedTaskType(value as AgentTaskType);
    form.setValue("taskType", value);
    form.setValue("agentId", ""); // Reset agent selection when task type changes
  };
  
  const handleRefreshAgents = async () => {
    setIsRefreshingAgents(true);
    await refreshAgents();
    setIsRefreshingAgents(false);
    toast({
      title: "Agents Refreshed",
      description: "Agent list has been updated.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Create New AI Task
        </CardTitle>
        <CardDescription>
          Select an agent type and define your task goal
        </CardDescription>
        <Button 
          variant="outline" 
          size="sm"
          className="absolute right-4 top-4"
          onClick={handleRefreshAgents}
          disabled={isRefreshingAgents}
        >
          {isRefreshingAgents ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="taskType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Type</FormLabel>
                  <Select 
                    onValueChange={(value) => handleTaskTypeChange(value)} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="talent-search">Talent Search</SelectItem>
                      <SelectItem value="talent-matching">Talent Matching</SelectItem>
                      <SelectItem value="cross-source-talent-intelligence">Cross-Source Talent Intelligence</SelectItem>
                      <SelectItem value="payroll-processing">Payroll Processing</SelectItem>
                      <SelectItem value="skills-recommendation">Skills Recommendation</SelectItem>
                      <SelectItem value="analytics-insight">Analytics Insight</SelectItem>
                      <SelectItem value="compliance-check">Compliance Check</SelectItem>
                      <SelectItem value="onboarding-customization">Onboarding Customization</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of task you want the AI agent to perform
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Agent</FormLabel>
                  <div className="space-y-2">
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!selectedTaskType || filteredAgents.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            !selectedTaskType 
                              ? "Select a task type first" 
                              : filteredAgents.length === 0 
                                ? "No agents available for this task" 
                                : "Select an agent"
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredAgents.map(agent => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedTaskType && filteredAgents.length === 0 && (
                      <p className="text-sm text-amber-600">
                        No agents found with capability: {selectedTaskType}. 
                        Try seeding the database from the main page.
                      </p>
                    )}
                  </div>
                  <FormDescription>
                    Choose an AI agent capable of performing this task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Goal</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what you want the AI to do..." 
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Clearly describe the goal of this task (max 200 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set the priority level for this task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Task...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Create Task
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AgentTaskCreator;
