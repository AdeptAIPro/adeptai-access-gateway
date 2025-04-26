import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AgentTask } from "@/services/agentic-ai/types/AgenticTypes";
import { CheckCircle, AlertCircle, BarChart2 } from "@/utils/icon-polyfill";
import { FileCheck, UserCheck } from "lucide-react";

export interface TaskResultDisplayProps {
  task: AgentTask;
}

const TaskResultDisplay: React.FC<TaskResultDisplayProps> = ({ task }) => {
  // Default empty state for result
  const result = task.result || {
    summary: "No summary available",
    findings: [],
    recommendations: []
  };
  
  // Get the appropriate icon based on task type
  const getTaskIcon = () => {
    switch (task.taskType) {
      case "cv-analysis":
        return <FileCheck className="h-5 w-5 text-blue-500" />;
      case "market-analysis":
        return <BarChart2 className="h-5 w-5 text-green-500" />;
      case "job-match":
        return <UserCheck className="h-5 w-5 text-purple-500" />;
      case "talent-matching":
        return <UserCheck className="h-5 w-5 text-purple-500" />;
      case "cross-source-talent-intelligence":
        return <BarChart2 className="h-5 w-5 text-green-500" />;
      case "payroll-processing":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-2 rounded-full">
          {getTaskIcon()}
        </div>
        <div>
          <h3 className="font-medium text-lg">{result.summary}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Task completed {task.completedAt ? new Date(task.completedAt).toLocaleString() : "recently"}
          </p>
        </div>
      </div>
      
      <Separator />
      
      {result.findings && result.findings.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Key Findings</CardTitle>
            <CardDescription>Important insights discovered during analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.findings.map((finding: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {result.recommendations && result.recommendations.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recommendations</CardTitle>
            <CardDescription>Suggested actions based on analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500 shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* Show context data if available */}
      {result.context && Object.keys(result.context).length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Additional Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(result.context).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">{key}</p>
                  <p className="text-sm">{String(value)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskResultDisplay;
