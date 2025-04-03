
import React, { useState } from 'react';
import { AgentTask } from '@/services/agentic-ai/AgenticService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, RefreshCcw, AlertCircle, CheckCircle, Clock, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: AgentTask;
  onProcess: () => void;
  isProcessing: boolean;
  onRetry?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onProcess, 
  isProcessing,
  onRetry,
  onDelete,
  onSave
}) => {
  const [showFullGoal, setShowFullGoal] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const handleRetry = () => {
    if (onRetry) {
      toast.info("Retrying task", {
        description: "The task is being reprocessed"
      });
      onRetry();
    } else {
      onProcess();
    }
  };
  
  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'destructive';
      case 'processing':
        return 'default';
      case 'queued':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'processing':
        return <span className="animate-spin mr-1">◌</span>;
      case 'queued':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className={`
      border
      ${task.status === 'failed' ? 'border-destructive/40 bg-destructive/5' : ''}
      ${isProcessing ? 'shadow-md border-primary/30' : ''}
      transition-all hover:shadow-sm
    `}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{task.title || "AI Task"}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {task.status === 'failed' && onRetry && (
                <DropdownMenuItem onClick={handleRetry}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Retry Task
                </DropdownMenuItem>
              )}
              {onSave && (
                <DropdownMenuItem onClick={onSave}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Save Results
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem onClick={onDelete}>
                  <AlertCircle className="mr-2 h-4 w-4" className="text-destructive" />
                  Delete Task
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
          <div className="flex items-center">
            <Badge variant={getStatusColor()} className="mr-2 flex items-center">
              {getStatusIcon()}
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
            {task.agent && (
              <span className="text-xs">Agent: {task.agent}</span>
            )}
          </div>
          {task.createdAt && (
            <span className="text-xs">
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 pt-0">
        <div className="space-y-2">
          <div>
            <div className="text-sm text-muted-foreground font-medium">Goal</div>
            <p className={`text-sm ${!showFullGoal && "line-clamp-2"}`}>
              {task.goal}
            </p>
            {task.goal && task.goal.length > 100 && (
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setShowFullGoal(!showFullGoal)}
                className="p-0 h-auto text-xs"
              >
                {showFullGoal ? "Show less" : "Show more"}
              </Button>
            )}
          </div>
          
          {task.error && (
            <div className="mt-2">
              <div className="text-sm text-destructive font-medium flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Error
              </div>
              {showError ? (
                <div className="text-sm text-destructive/80 bg-destructive/5 p-2 rounded border border-destructive/20 mt-1">
                  {task.error}
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => setShowError(false)} 
                    className="p-0 h-auto text-xs block mt-1"
                  >
                    Hide error details
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setShowError(true)} 
                  className="p-0 h-auto text-xs text-destructive"
                >
                  Show error details
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        {task.status === 'failed' ? (
          <Button 
            variant="outline" 
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10" 
            onClick={handleRetry}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry Task
          </Button>
        ) : task.status === 'completed' ? (
          <Button variant="outline" className="w-full" onClick={onProcess}>
            <CheckCircle className="mr-2 h-4 w-4" />
            View Results
          </Button>
        ) : (
          <Button 
            onClick={onProcess} 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <><span className="animate-spin mr-2">◌</span> Processing</>
            ) : (
              <><PlayCircle className="mr-2 h-4 w-4" /> Process Task</>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
