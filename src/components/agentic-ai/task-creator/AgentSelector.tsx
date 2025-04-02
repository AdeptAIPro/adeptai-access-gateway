
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from '@/services/agentic-ai/types/AgenticTypes';
import { Control } from 'react-hook-form';

interface AgentSelectorProps {
  control: Control<any>;
  selectedTaskType: string;
  filteredAgents: Agent[];
}

const AgentSelector = ({ control, selectedTaskType, filteredAgents }: AgentSelectorProps) => {
  return (
    <FormField
      control={control}
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
  );
};

export default AgentSelector;
