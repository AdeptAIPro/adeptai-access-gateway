
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgenticAI } from '@/hooks/use-agentic';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import MetricsCards from './dashboard/MetricsCards';
import TaskList from './dashboard/TaskList';
import AgentsList from './dashboard/AgentsList';
import TasksByCategory from './dashboard/TasksByCategory';
import { filterTasksByStatus, groupTasksByType } from './dashboard/utils/agenticUtils';

const AgenticDashboard = () => {
  const { tasks, agents, isLoading, activeTask, processTask } = useAgenticAI();
  const { user } = useAuth();
  
  // Filter tasks by status
  const pendingTasks = filterTasksByStatus(tasks, 'pending');
  const completedTasks = filterTasksByStatus(tasks, 'completed');
  const failedTasks = filterTasksByStatus(tasks, 'failed');
  
  // Group tasks by type
  const tasksByType = groupTasksByType(tasks);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Agents Dashboard</h2>
          <p className="text-muted-foreground">
            Your AI agents are working on {tasks.length} tasks ({completedTasks.length} completed)
          </p>
        </div>
        {isLoading && (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span>Processing...</span>
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
        <TabsList>
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-tasks" className="space-y-4">
          <TaskList 
            tasks={tasks} 
            activeTaskId={activeTask?.id || null} 
            processTask={processTask} 
          />
        </TabsContent>
        
        <TabsContent value="by-category">
          <TasksByCategory 
            tasksByType={tasksByType} 
            activeTaskId={activeTask?.id || null}
            processTask={processTask}
          />
        </TabsContent>
        
        <TabsContent value="agents">
          <AgentsList agents={agents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgenticDashboard;
