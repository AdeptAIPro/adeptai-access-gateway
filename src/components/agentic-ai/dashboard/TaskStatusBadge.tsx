
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface TaskStatusBadgeProps {
  status: string;
}

export const formatTaskType = (type: string): string => {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'destructive';
      case 'processing':
        return 'default';
      case 'pending': // Updated from 'queued' to 'pending'
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'processing':
        return <span className="animate-spin mr-1">◌</span>;
      case 'pending': // Updated from 'queued' to 'pending'
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge variant={getStatusColor()} className="flex items-center">
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default TaskStatusBadge;
