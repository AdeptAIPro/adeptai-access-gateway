
import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskActionsMenuProps {
  status: string;
  onRetry?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
}

const TaskActionsMenu: React.FC<TaskActionsMenuProps> = ({
  status,
  onRetry,
  onSave,
  onDelete
}) => {
  const handleRetry = () => {
    if (onRetry) {
      toast.info("Retrying task", {
        description: "The task is being reprocessed"
      });
      onRetry();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {status === 'failed' && onRetry && (
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
            <AlertCircle className="mr-2 h-4 w-4 text-destructive" />
            Delete Task
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskActionsMenu;
