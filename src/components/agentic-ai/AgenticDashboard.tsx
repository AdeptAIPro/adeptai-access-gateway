import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgenticAI } from '@/hooks/use-agentic';
import { useAuth } from '@/hooks/use-auth';
import { AgentTask } from '@/services/agentic-ai/AgenticService'; 
import { Progress } from "@/components/ui/progress";
import { Bot, Clock, Check, AlertCircle, Play, Loader2 } from 'lucide-react';

const AgenticDashboard = () => {
  const { tasks, agents, isLoading, activeTask, processTask } = useAgenticAI();
  const { user } = useAuth();
  
  // Filter tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const failedTasks = tasks.filter(task => task.status === 'failed');
  
  // Group tasks by type
  const tasksByType = tasks.reduce((acc: Record<string, AgentTask[]>, task) => {
    if (!acc[task.taskType]) {
      acc[task.taskType] = [];
    }
    acc[task.taskType].push(task);
    return acc;
  }, {});
  
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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{agents.length}</div>
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
              <div className="text-2xl font-bold">{completedTasks.length}</div>
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
              <div className="text-2xl font-bold">{pendingTasks.length}</div>
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
              <div className="text-2xl font-bold">{failedTasks.length}</div>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all-tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-tasks" className="space-y-4">
          {tasks.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No AI Tasks Yet</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Your AI agents are ready to assist you. Create a new task to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onProcess={() => processTask(task.id)}
                isProcessing={activeTask?.id === task.id}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="by-category">
          {Object.entries(tasksByType).length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No AI Tasks Yet</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Your AI agents are ready to assist you. Create a new task to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(tasksByType).map(([type, tasks]) => (
                <div key={type} className="space-y-2">
                  <h3 className="text-lg font-medium capitalize">{formatTaskType(type)}</h3>
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onProcess={() => processTask(task.id)}
                        isProcessing={activeTask?.id === task.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="agents">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agents.map(agent => (
              <Card key={agent.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{agent.name}</CardTitle>
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                  </div>
                  <CardDescription>{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Capabilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.map(capability => (
                        <Badge key={capability} variant="outline">{capability}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    Active since {new Date(agent.createdAt).toLocaleDateString()}
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {agents.length === 0 && (
              <Card className="border-dashed md:col-span-2 lg:col-span-3">
                <CardContent className="flex flex-col items-center justify-center pt-6">
                  <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Agents Available</h3>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    AI agents will appear here once configured in your Supabase database.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TaskCardProps {
  task: AgentTask;
  onProcess: () => void;
  isProcessing: boolean;
}

const TaskCard = ({ task, onProcess, isProcessing }: TaskCardProps) => {
  const statusColors = {
    'pending': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'failed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  
  const priorityColors = {
    'low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'medium': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'high': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{formatTaskType(task.taskType)}</CardTitle>
            <CardDescription className="mt-1">{task.goal}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
            <Badge className={statusColors[task.status]}>{task.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {task.status === 'in-progress' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Processing</span>
              <span className="text-sm text-muted-foreground">Working...</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        )}
        
        {task.result && (
          <div className="border rounded-md p-2 bg-muted/30 text-sm">
            <div>
              <strong>Result Summary:</strong> {Object.keys(task.result).length} items processed
            </div>
          </div>
        )}
        
        {task.error && (
          <div className="border border-red-200 rounded-md p-2 bg-red-50 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900">
            <div><strong>Error:</strong> {task.error}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="text-xs text-muted-foreground">
          Created {new Date(task.createdAt).toLocaleString()}
        </div>
        
        {task.status === 'pending' && (
          <Button 
            size="sm" 
            onClick={onProcess}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Now
              </>
            )}
          </Button>
        )}
        
        {task.status === 'completed' && (
          <Button size="sm" variant="outline">View Results</Button>
        )}
        
        {task.status === 'failed' && (
          <Button size="sm" variant="outline" onClick={onProcess}>Retry</Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Helper to format task type for display
const formatTaskType = (taskType: string): string => {
  switch (taskType) {
    case 'talent-search':
      return 'Talent Search';
    case 'talent-matching':
      return 'Talent Matching';
    case 'payroll-processing':
      return 'Payroll Processing';
    case 'integration-setup':
      return 'Integration Setup';
    case 'skills-recommendation':
      return 'Skills Recommendation';
    case 'analytics-insight':
      return 'Analytics Insight';
    case 'compliance-check':
      return 'Compliance Check';
    case 'onboarding-customization':
      return 'Onboarding Customization';
    default:
      return taskType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
};

export default AgenticDashboard;
