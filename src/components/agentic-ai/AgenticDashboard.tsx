
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAgenticAI } from '@/hooks/use-agentic';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import MetricsCards from './dashboard/MetricsCards';
import TaskList from './dashboard/TaskList';
import AgentsList from './dashboard/AgentsList';
import TasksByCategory from './dashboard/TasksByCategory';
import { filterTasksByStatus, groupTasksByType } from './dashboard/utils/agenticUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { AgentTask } from '@/services/agentic-ai';

const AgenticDashboard = () => {
  const { tasks, agents, isLoading, activeTask, processTask } = useAgenticAI();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  // Type assertion for tasks to ensure compatibility with utility functions
  const typedTasks = tasks as AgentTask[];
  
  // Filter tasks by status
  const pendingTasks = filterTasksByStatus(typedTasks, 'pending');
  const completedTasks = filterTasksByStatus(typedTasks, 'completed');
  const failedTasks = filterTasksByStatus(typedTasks, 'failed');
  
  // Group tasks by type
  const tasksByType = groupTasksByType(typedTasks);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-adept">Tasks Overview</h2>
          <p className="text-muted-foreground">
            Your AI agents are working on {tasks.length} tasks ({completedTasks.length} completed)
          </p>
        </div>
        {isLoading && (
          <div className="flex items-center bg-adept/10 px-3 py-1 rounded-full">
            <Loader2 className="h-4 w-4 animate-spin mr-2 text-adept" />
            <span className="text-adept font-medium">Processing...</span>
          </div>
        )}
      </div>
      
      <MetricsCards 
        agents={agents.length} 
        pendingTasksCount={pendingTasks.length}
        completedTasksCount={completedTasks.length}
        failedTasksCount={failedTasks.length}
      />
      
      <Tabs defaultValue="all-tasks" className="w-full">
        <TabsList className="w-full md:w-auto mb-4 bg-card shadow-sm border border-border p-1 rounded-lg overflow-x-auto flex md:inline-flex">
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-tasks" className="space-y-4 p-1">
          <TaskList 
            tasks={typedTasks} 
            activeTaskId={activeTask?.id || null} 
            processTask={processTask} 
          />
        </TabsContent>
        
        <TabsContent value="by-category" className="p-1">
          <TasksByCategory 
            tasksByType={tasksByType} 
            activeTaskId={activeTask?.id || null}
            processTask={processTask}
          />
        </TabsContent>
        
        <TabsContent value="agents" className="p-1">
          <AgentsList agents={agents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgenticDashboard;
