
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TaskList from "@/components/agentic-ai/dashboard/TaskList";
import EnhancedTaskResultDisplay from "@/components/agentic-ai/task-result/EnhancedTaskResultDisplay";
import AgenticErrorHandler from "@/components/agentic-ai/AgenticErrorHandler";
import usePersistedState from "@/hooks/use-persisted-state";
import { toast } from "sonner";
import { AgentTask } from "@/services/agentic-ai/AgenticService";

interface AgenticProcessFlowProps {
  tasks: AgentTask[];
  onDeleteTask?: (taskId: string) => void;
  onRetryTask?: (taskId: string) => void;
  onSaveResult?: (taskId: string) => void;
  onExportResult?: (taskId: string) => void;
}

const AgenticProcessFlow: React.FC<AgenticProcessFlowProps> = ({
  tasks,
  onDeleteTask,
  onRetryTask,
  onSaveResult,
  onExportResult
}) => {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedTasks, setSavedTasks] = usePersistedState<string[]>("saved-agentic-tasks", []);
  
  // Get current active task
  const activeTask = activeTaskId ? tasks.find(t => t.id === activeTaskId) : null;
  
  // Process a task
  const processTask = async (taskId: string) => {
    setActiveTaskId(taskId);
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      setError("Task not found");
      return;
    }
    
    try {
      if (task.status === 'pending') { // Changed from 'queued' to 'pending' to match the AgentTask type
        setIsProcessing(true);
        // In a real implementation, you would call an API to process the task
        // For demo purposes, we're simulating processing with a timeout
        
        // This is just a placeholder for the actual task processing logic
        // which would typically be handled by your backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsProcessing(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while processing the task");
      setIsProcessing(false);
    }
  };
  
  // Retry a task
  const handleRetryTask = async (taskId: string) => {
    if (onRetryTask) {
      try {
        setIsProcessing(true);
        await onRetryTask(taskId);
        toast.success("Task restarted successfully");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to restart task");
        toast.error("Failed to restart task");
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  // Save a task result
  const handleSaveTask = (taskId: string) => {
    if (!savedTasks.includes(taskId)) {
      setSavedTasks([...savedTasks, taskId]);
    }
    
    if (onSaveResult) {
      onSaveResult(taskId);
    }
  };
  
  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    if (onDeleteTask) {
      onDeleteTask(taskId);
      
      // If this was the active task, clear it
      if (activeTaskId === taskId) {
        setActiveTaskId(null);
      }
      
      // Remove from saved tasks if present
      if (savedTasks.includes(taskId)) {
        setSavedTasks(savedTasks.filter(id => id !== taskId));
      }
      
      toast.success("Task deleted successfully");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task List Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">AI Tasks</h3>
        
        {error && (
          <div className="mb-4">
            <AgenticErrorHandler 
              error={error} 
              onRetry={() => setError(null)} 
            />
          </div>
        )}
        
        <TaskList 
          tasks={tasks} 
          activeTaskId={activeTaskId}
          processTask={processTask}
          emptyMessage="No AI Tasks Created Yet"
        />
      </div>
      
      {/* Results Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Task Results</h3>
        
        {activeTask ? (
          <EnhancedTaskResultDisplay 
            task={activeTask} 
            isLoading={isProcessing}
            onRetry={() => handleRetryTask(activeTask.id)}
            onSave={() => handleSaveTask(activeTask.id)}
            onExport={() => onExportResult && onExportResult(activeTask.id)}
          />
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground mb-2">Select a task to view results</p>
              <p className="text-sm text-muted-foreground">
                No task selected. Click on a task from the list to view its results.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AgenticProcessFlow;
