
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Grid, 
  Layers, 
  Activity, 
  KeyRound, 
  BarChart2,
  Sparkles,
  GanttChart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const IntegrationsNavigation: React.FC = () => {
  const isActive = (path: string) => {
    return window.location.pathname.includes(path);
  };

  return (
    <div className="space-y-1 mb-6">
      <NavLink to="/dashboard/integrations">
        {({ isActive: active }) => (
          <Button
            variant={active ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Grid className="mr-2 h-4 w-4" />
            Integrations Marketplace
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/dashboard/integrations/enterprise">
        {({ isActive: active }) => (
          <Button
            variant={active ? "default" : "ghost"}
            className="w-full justify-between"
          >
            <div className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              Enterprise Integration Hub
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              Enterprise
            </Badge>
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/dashboard/integrations/api-management">
        {({ isActive: active }) => (
          <Button
            variant={active ? "default" : "ghost"}
            className="w-full justify-start pl-8"
          >
            <KeyRound className="mr-2 h-4 w-4" />
            API Management
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/dashboard/integrations/status">
        {({ isActive: active }) => (
          <Button
            variant={active ? "default" : "ghost"}
            className="w-full justify-start pl-8"
          >
            <Activity className="mr-2 h-4 w-4" />
            Status Dashboard
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/dashboard/integrations/metrics">
        {({ isActive: active }) => (
          <Button
            variant={active ? "default" : "ghost"}
            className="w-full justify-start pl-8"
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            Performance Metrics
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/dashboard/integrations/workflows">
        {({ isActive: active }) => (
          <Button
            variant={active ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Layers className="mr-2 h-4 w-4" />
            Integration Workflows
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/dashboard/integrations/compliance">
        {({ isActive: active }) => (
          <Button
            variant={active ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <GanttChart className="mr-2 h-4 w-4" />
            Compliance & Auditing
          </Button>
        )}
      </NavLink>
    </div>
  );
};

export default IntegrationsNavigation;
