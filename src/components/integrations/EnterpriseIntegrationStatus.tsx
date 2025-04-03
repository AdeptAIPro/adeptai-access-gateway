
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpDown,
  BarChart3,
  RefreshCw,
  History,
  Clock
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IntegrationCategory } from "@/types/integration";
import { toast } from "sonner";

interface IntegrationStatus {
  category: IntegrationCategory;
  name: string;
  status: "healthy" | "degraded" | "down";
  lastSync: string;
  responseTime: number;
  uptime: number;
  authenticated: boolean;
}

// Mock data for enterprise integration status
const mockIntegrationStatuses: IntegrationStatus[] = [
  {
    category: "ATS",
    name: "Workday",
    status: "healthy",
    lastSync: "2 minutes ago",
    responseTime: 124,
    uptime: 99.9,
    authenticated: true
  },
  {
    category: "CRM & HRMS",
    name: "Salesforce (CRM)",
    status: "degraded",
    lastSync: "15 minutes ago",
    responseTime: 967,
    uptime: 97.3,
    authenticated: true
  },
  {
    category: "VMS Systems",
    name: "SAP Field glass",
    status: "down",
    lastSync: "3 hours ago",
    responseTime: 0,
    uptime: 92.1,
    authenticated: false
  },
  {
    category: "Onboarding Boards",
    name: "BambooHR Onboarding",
    status: "healthy",
    lastSync: "7 minutes ago",
    responseTime: 235,
    uptime: 99.7,
    authenticated: true
  }
];

interface EnterpriseIntegrationStatusProps {
  onRefresh?: () => void;
}

const EnterpriseIntegrationStatus: React.FC<EnterpriseIntegrationStatusProps> = ({
  onRefresh
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statuses, setStatuses] = useState<IntegrationStatus[]>(mockIntegrationStatuses);
  
  const getStatusColor = (status: IntegrationStatus["status"]) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-700 border-green-200";
      case "degraded": return "bg-amber-100 text-amber-700 border-amber-200";
      case "down": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: IntegrationStatus["status"]) => {
    switch (status) {
      case "healthy": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "degraded": return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "down": return <XCircle className="h-4 w-4 text-rose-600" />;
      default: return null;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // In a real app, this would fetch actual integration statuses from your backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Simulate updated data
      const updatedStatuses = [...statuses];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      if (updatedStatuses[randomIndex].status === "degraded") {
        updatedStatuses[randomIndex].status = "healthy";
        updatedStatuses[randomIndex].responseTime = 254;
      }
      
      setStatuses(updatedStatuses);
      toast.success("Integration statuses refreshed");
    } catch (error) {
      toast.error("Failed to refresh integration statuses");
    } finally {
      setIsRefreshing(false);
    }
  };

  const totalHealthy = statuses.filter(s => s.status === "healthy").length;
  const totalDegraded = statuses.filter(s => s.status === "degraded").length;
  const totalDown = statuses.filter(s => s.status === "down").length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Enterprise Integration Health</CardTitle>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => {
              handleRefresh();
              onRefresh?.();
            }}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Status
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-2xl font-bold text-green-700">{totalHealthy}</div>
            <div className="text-xs text-green-600">Healthy</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="text-2xl font-bold text-amber-700">{totalDegraded}</div>
            <div className="text-xs text-amber-600">Degraded</div>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-rose-50 rounded-lg border border-rose-100">
            <div className="text-2xl font-bold text-rose-700">{totalDown}</div>
            <div className="text-xs text-rose-600">Down</div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          {statuses.map((integration, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(integration.status)}
                <div>
                  <div className="font-medium">{integration.name}</div>
                  <div className="text-xs text-muted-foreground">{integration.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge 
                  variant="outline" 
                  className={`${getStatusColor(integration.status)}`}
                >
                  {integration.status}
                </Badge>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{integration.responseTime > 0 ? `${integration.responseTime}ms` : "Timeout"}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <History className="h-3 w-3 mr-1" />
                    <span>Last sync: {integration.lastSync}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnterpriseIntegrationStatus;
