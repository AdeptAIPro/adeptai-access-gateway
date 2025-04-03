
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ArrowDown, ArrowLeft, CheckCircle, CirclePlus, Save, Trash2, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface WorkflowBuilderProps {
  isCreating: boolean;
  onSave: () => void;
  onCancel: () => void;
}

// Mock workflow step data
interface WorkflowStep {
  id: string;
  type: string;
  name: string;
  description?: string;
  assignee?: string;
  approvers?: string[];
  requiresDocuments?: boolean;
  duration?: number;
  notifications?: boolean;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ isCreating, onSave, onCancel }) => {
  const [workflowName, setWorkflowName] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [workflowType, setWorkflowType] = useState("approval");
  const [activeTab, setActiveTab] = useState("design");
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: "step-1",
      type: "approval",
      name: "Manager Approval",
      description: "Requires manager approval before proceeding",
      assignee: "manager",
      notifications: true,
    },
    {
      id: "step-2",
      type: "task",
      name: "Document Submission",
      description: "Upload required documents",
      requiresDocuments: true,
    }
  ]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${workflowSteps.length + 1}`,
      type: "task",
      name: `New Step ${workflowSteps.length + 1}`,
    };
    
    setWorkflowSteps([...workflowSteps, newStep]);
  };

  const handleDeleteStep = (stepId: string) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setWorkflowSteps((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateStepField = (stepId: string, field: string, value: any) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const handleSave = () => {
    if (!workflowName) {
      alert("Please provide a workflow name");
      return;
    }
    
    onSave();
  };

  const SortableStep = ({ step }: { step: WorkflowStep }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: step.id,
    });
    
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    
    return (
      <Card 
        ref={setNodeRef} 
        style={style} 
        className="mb-4 border border-gray-200"
      >
        <CardHeader className="py-3 px-4 bg-gray-50 cursor-move" {...attributes} {...listeners}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              {step.type === "approval" ? "Approval Step" : "Task Step"}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDeleteStep(step.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${step.id}-name`}>Step Name</Label>
              <Input 
                id={`${step.id}-name`} 
                value={step.name} 
                onChange={(e) => updateStepField(step.id, "name", e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`${step.id}-type`}>Step Type</Label>
              <Select 
                value={step.type} 
                onValueChange={(value) => updateStepField(step.id, "type", value)}
              >
                <SelectTrigger id={`${step.id}-type`}>
                  <SelectValue placeholder="Select step type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="condition">Condition/Decision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor={`${step.id}-description`}>Description</Label>
              <Textarea 
                id={`${step.id}-description`} 
                value={step.description || ""} 
                onChange={(e) => updateStepField(step.id, "description", e.target.value)}
              />
            </div>
            
            {step.type === "approval" && (
              <div>
                <Label htmlFor={`${step.id}-assignee`}>Approver Role</Label>
                <Select 
                  value={step.assignee} 
                  onValueChange={(value) => updateStepField(step.id, "assignee", value)}
                >
                  <SelectTrigger id={`${step.id}-assignee`}>
                    <SelectValue placeholder="Select approver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Direct Manager</SelectItem>
                    <SelectItem value="department_head">Department Head</SelectItem>
                    <SelectItem value="hr">HR Representative</SelectItem>
                    <SelectItem value="finance">Finance Team</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Switch 
                id={`${step.id}-notifications`} 
                checked={step.notifications || false}
                onCheckedChange={(checked) => updateStepField(step.id, "notifications", checked)}
              />
              <Label htmlFor={`${step.id}-notifications`}>
                Send notifications for this step
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input 
                id="workflow-name" 
                placeholder="e.g., Employee Onboarding Process" 
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="workflow-description">Description</Label>
              <Textarea 
                id="workflow-description" 
                placeholder="Describe the purpose of this workflow"
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="workflow-type">Workflow Type</Label>
              <Select value={workflowType} onValueChange={setWorkflowType}>
                <SelectTrigger id="workflow-type">
                  <SelectValue placeholder="Select workflow type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approval">Approval Workflow</SelectItem>
                  <SelectItem value="process">Business Process</SelectItem>
                  <SelectItem value="notification">Notification Workflow</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="design">Design Workflow</TabsTrigger>
          <TabsTrigger value="settings">Workflow Settings</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="design">
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Workflow Steps</h3>
              <Button onClick={handleAddStep} variant="outline" className="flex items-center gap-2">
                <CirclePlus className="h-4 w-4" />
                Add Step
              </Button>
            </div>
            
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={workflowSteps.map(step => step.id)}
                strategy={verticalListSortingStrategy}
              >
                {workflowSteps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <SortableStep step={step} />
                    {index < workflowSteps.length - 1 && (
                      <div className="flex justify-center my-2">
                        <ArrowDown className="h-5 w-5 text-gray-400" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </SortableContext>
            </DndContext>
            
            {workflowSteps.length === 0 && (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-gray-500 mb-4">No steps added yet</p>
                <Button onClick={handleAddStep} variant="outline">Add First Step</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="auto-assignment">Automatic Assignment</Label>
                  <Switch id="auto-assignment" />
                </div>
                <p className="text-sm text-gray-500">
                  Automatically assign workflow tasks to users based on their roles
                </p>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="due-dates">Enforce Due Dates</Label>
                  <Switch id="due-dates" />
                </div>
                <p className="text-sm text-gray-500">
                  Set and enforce due dates for workflow steps
                </p>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="timeout-handling">Timeout Handling</Label>
                  <Select defaultValue="remind">
                    <SelectTrigger id="timeout-handling" className="w-[180px]">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remind">Send Reminders</SelectItem>
                      <SelectItem value="escalate">Auto-Escalate</SelectItem>
                      <SelectItem value="bypass">Auto-Bypass</SelectItem>
                      <SelectItem value="cancel">Cancel Workflow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-500">
                  What should happen when a step isn't completed on time
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium">Who can access this workflow?</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="role-all" className="rounded border-gray-300" />
                  <label htmlFor="role-all">All Employees</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="role-managers" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="role-managers">Managers</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="role-hr" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="role-hr">HR Department</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="role-finance" className="rounded border-gray-300" />
                  <label htmlFor="role-finance">Finance Department</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="role-admins" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="role-admins">Administrators</label>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Workflow Administration</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Select who can edit and manage this workflow
                </p>
                
                <Select defaultValue="creator">
                  <SelectTrigger id="admin-permissions" className="w-full">
                    <SelectValue placeholder="Select who can administer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creator">Creator Only</SelectItem>
                    <SelectItem value="managers">All Managers</SelectItem>
                    <SelectItem value="hr">HR Department</SelectItem>
                    <SelectItem value="admins">System Administrators</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <div className="space-x-2">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSave} className="space-x-2">
            <Save className="h-4 w-4" />
            <span>Save & Activate</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
