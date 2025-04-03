
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';

interface TaskErrorDisplayProps {
  error: string;
}

const TaskErrorDisplay: React.FC<TaskErrorDisplayProps> = ({ error }) => {
  const [showError, setShowError] = useState(false);

  return (
    <div className="mt-2">
      <div className="text-sm text-destructive font-medium flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        Error
      </div>
      {showError ? (
        <div className="text-sm text-destructive/80 bg-destructive/5 p-2 rounded border border-destructive/20 mt-1">
          {error}
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
  );
};

export default TaskErrorDisplay;
