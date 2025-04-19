
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertCircle, XCircle } from "lucide-react";

type StatusType = 'active' | 'inactive' | 'pending' | 'error';

interface DataSourceStatusBadgeProps {
  status: StatusType;
}

const DataSourceStatusBadge: React.FC<DataSourceStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="success" className="font-normal">
          <Check className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="font-normal text-yellow-600 border-yellow-200 bg-yellow-50">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="outline" className="font-normal">
          <XCircle className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      );
    case "error":
      return (
        <Badge variant="destructive" className="font-normal">
          <AlertCircle className="h-3 w-3 mr-1" />
          Error
        </Badge>
      );
  }
};

export default DataSourceStatusBadge;
