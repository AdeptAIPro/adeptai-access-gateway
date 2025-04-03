
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface TaskGoalPreviewProps {
  goal: string;
}

const TaskGoalPreview: React.FC<TaskGoalPreviewProps> = ({ goal }) => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div>
      <div className="text-sm text-muted-foreground font-medium">Goal</div>
      <p className={`text-sm ${!showFull && "line-clamp-2"}`}>
        {goal}
      </p>
      {goal && goal.length > 100 && (
        <Button 
          variant="link" 
          size="sm" 
          onClick={() => setShowFull(!showFull)}
          className="p-0 h-auto text-xs"
        >
          {showFull ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
};

export default TaskGoalPreview;
