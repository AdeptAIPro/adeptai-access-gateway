
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from 'lucide-react';
import TaskCreationForm from './task-creator/TaskCreationForm';
import HowItWorksCard from './task-creator/HowItWorksCard';

const AgentTaskCreator = () => {
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
      </CardHeader>
      <CardContent>
        <TaskCreationForm />
      </CardContent>
    </Card>
  );
};

export default AgentTaskCreator;
