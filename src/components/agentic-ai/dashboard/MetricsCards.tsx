
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Clock, Check, AlertCircle } from 'lucide-react';
import { AgentTask } from '@/services/agentic-ai/AgenticService';

interface MetricsCardsProps {
  agents: number;
  pendingTasksCount: number;
  completedTasksCount: number;
  failedTasksCount: number;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ 
  agents, 
  pendingTasksCount, 
  completedTasksCount, 
  failedTasksCount 
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{agents}</div>
            <Bot className="h-5 w-5 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{completedTasksCount}</div>
            <Check className="h-5 w-5 text-green-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{pendingTasksCount}</div>
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Failed Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{failedTasksCount}</div>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
