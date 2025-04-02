
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from '@/services/agentic-ai/types/AgenticTypes';
import { Control } from 'react-hook-form';
import { Bot } from 'lucide-react';

interface AgentSelectorProps {
  control: Control<any>;
  selectedTaskType: string;
  agents: Agent[];
}

const AgentSelector = ({ control, selectedTaskType, agents }: AgentSelectorProps) => {
  const filteredAgents = selectedTaskType
    ? agents.filter(agent => agent.capabilities.includes(selectedTaskType))
    : agents;

  return (
    <FormField
      control={control}
      name="agentId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium flex items-center gap-2">
            <Bot className="h-4 w-4 text-adept" />
            Select Agent
          </FormLabel>
          <div className="space-y-2">
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={!selectedTaskType || filteredAgents.length === 0}
            >
              <FormControl>
                <SelectTrigger className="h-10">
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
              <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
                No agents found with capability: {selectedTaskType}. 
                Try seeding the database from the main page.
              </p>
            )}
          </div>
          <FormDescription className="text-xs">
            Choose an AI agent capable of performing this task
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AgentSelector;
