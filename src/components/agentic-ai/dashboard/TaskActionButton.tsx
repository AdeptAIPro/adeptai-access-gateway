
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCcw, CheckCircle, PlayCircle } from 'lucide-react';

interface TaskActionButtonProps {
  status: string;
  isProcessing: boolean;
  onAction: () => void;
}

const TaskActionButton: React.FC<TaskActionButtonProps> = ({ 
  status, 
  isProcessing, 
  onAction 
}) => {
  if (status === 'failed') {
    return (
      <Button 
        variant="outline" 
        className="w-full border-destructive/30 text-destructive hover:bg-destructive/10" 
        onClick={onAction}
      >
        <RefreshCcw className="mr-2 h-4 w-4" />
        Retry Task
      </Button>
    );
  }
  
  if (status === 'completed') {
    return (
      <Button variant="outline" className="w-full" onClick={onAction}>
        <CheckCircle className="mr-2 h-4 w-4" />
        View Results
      </Button>
    );
  }
  
  return (
    <Button 
      onClick={onAction} 
      className="w-full"
      disabled={isProcessing}
    >
      {isProcessing ? (
        <><span className="animate-spin mr-2">◌</span> Processing</>
      ) : (
        <><PlayCircle className="mr-2 h-4 w-4" /> Process Task</>
      )}
    </Button>
  );
};

export default TaskActionButton;
