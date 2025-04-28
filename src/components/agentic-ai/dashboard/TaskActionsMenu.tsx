
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AgentTask } from '@/services/agentic-ai';

// Import icons from the icon-polyfill
import { 
  MoreVertical,
  Copy, 
  Trash, 
  Share 
} from 'lucide-react';

interface TaskActionsMenuProps {
  task: AgentTask;
}

const TaskActionsMenu: React.FC<TaskActionsMenuProps> = ({ task }) => {
  const handleCopyId = () => {
    navigator.clipboard.writeText(task.id);
    // Could add toast notification here
  };
  
  const handleShare = () => {
    // Share functionality
    console.log("Sharing task:", task.id);
  };
  
  const handleDelete = () => {
    // Delete functionality
    console.log("Deleting task:", task.id);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyId}>
          <Copy className="h-4 w-4 mr-2" />
          Copy ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare}>
          <Share className="h-4 w-4 mr-2" />
          Share Task
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskActionsMenu;
