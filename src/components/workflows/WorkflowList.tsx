
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Clock, 
  Edit, 
  Info, 
  MoreHorizontal, 
  PlayCircle, 
  Trash2, 
  Users 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface WorkflowListProps {
  onCreateNew: () => void;
}

// Mock workflow data
const mockWorkflows = [
  {
    id: "wf-001",
    name: "Employee Onboarding",
    description: "New employee onboarding workflow with manager approvals",
    status: "active",
    type: "approval",
    lastUpdated: "2023-09-12T14:30:00",
    steps: 6,
    participants: 4
  },
  {
    id: "wf-002",
    name: "Expense Approval",
    description: "Expense report submission and approval process",
    status: "active",
    type: "approval",
    lastUpdated: "2023-10-05T11:15:00",
    steps: 4,
    participants: 3
  },
  {
    id: "wf-003",
    name: "Content Publication",
    description: "Content review and publication workflow",
    status: "draft",
    type: "process",
    lastUpdated: "2023-10-15T09:20:00",
    steps: 5,
    participants: 2
  },
  {
    id: "wf-004",
    name: "Vendor Onboarding",
    description: "Process for adding new vendors to the system",
    status: "inactive",
    type: "process",
    lastUpdated: "2023-08-22T16:45:00",
    steps: 8,
    participants: 5
  }
];

const WorkflowList: React.FC<WorkflowListProps> = ({ onCreateNew }) => {
  const [workflows, setWorkflows] = useState(mockWorkflows);
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch(status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "draft": return "bg-amber-100 text-amber-800 border-amber-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const filteredWorkflows = filter === "all" ? workflows : workflows.filter(wf => wf.status === filter);

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(wf => wf.id !== id));
    toast.success("Workflow deleted successfully!");
  };

  const handleActivateWorkflow = (id: string) => {
    setWorkflows(workflows.map(wf => wf.id === id ? {...wf, status: "active"} : wf));
    toast.success("Workflow activated!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          onClick={() => setFilter("all")}
          size="sm"
        >
          All Workflows
        </Button>
        <Button 
          variant={filter === "active" ? "default" : "outline"} 
          onClick={() => setFilter("active")}
          size="sm"
        >
          Active
        </Button>
        <Button 
          variant={filter === "draft" ? "default" : "outline"} 
          onClick={() => setFilter("draft")}
          size="sm"
        >
          Drafts
        </Button>
        <Button 
          variant={filter === "inactive" ? "default" : "outline"} 
          onClick={() => setFilter("inactive")}
          size="sm"
        >
          Inactive
        </Button>
      </div>

      {filteredWorkflows.length === 0 ? (
        <Card className="border border-dashed p-8">
          <CardContent className="flex flex-col items-center justify-center text-center pt-6">
            <Info className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium mb-2">No workflows found</h3>
            <p className="text-gray-500 mb-4">
              {filter === "all" 
                ? "You haven't created any workflows yet." 
                : `You don't have any ${filter} workflows.`}
            </p>
            <Button onClick={onCreateNew}>Create New Workflow</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium mr-3">{workflow.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(workflow.status)}
                        >
                          {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-500">{workflow.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      {workflow.status !== "active" ? (
                        <Button 
                          size="sm"
                          onClick={() => handleActivateWorkflow(workflow.id)}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Activate
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <ArrowRight className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Export</DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteWorkflow(workflow.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="p-4 bg-gray-50 dark:bg-gray-800 text-sm flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Last updated {formatDate(workflow.lastUpdated)}</span>
                  </div>
                  <div className="flex items-center">
                    <PlayCircle className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{workflow.steps} steps</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{workflow.participants} participants</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkflowList;
