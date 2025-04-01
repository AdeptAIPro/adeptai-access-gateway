
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createOnboardingWorkflow } from "@/services/onboarding/OnboardingService";
import { useToast } from "@/components/ui/use-toast";

interface OnboardingWorkflowCreatorProps {
  clientId: string;
  onWorkflowCreated: () => void;
}

const OnboardingWorkflowCreator: React.FC<OnboardingWorkflowCreatorProps> = ({
  clientId,
  onWorkflowCreated
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sector: "",
    assignee: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.sector) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createOnboardingWorkflow(clientId, {
        title: formData.title,
        description: formData.description,
        sector: formData.sector as any,
        assignee: formData.assignee || undefined,
        progress: 0,
        steps: [
          {
            id: 'step-1',
            title: 'Initial Paperwork',
            description: 'Complete initial onboarding documentation',
            completed: false
          },
          {
            id: 'step-2', 
            title: 'System Access',
            description: 'Set up required system access and permissions',
            completed: false
          }
        ]
      });
      
      setFormData({
        title: "",
        description: "",
        sector: "",
        assignee: ""
      });
      
      setOpen(false);
      onWorkflowCreated();
      
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast({
        title: "Error",
        description: "Failed to create onboarding workflow",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Onboarding Workflow
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Onboarding Workflow</DialogTitle>
          <DialogDescription>
            Create a new onboarding workflow for your client. You'll be able to add steps after creation.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Workflow Title*
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Nurse Onboarding"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description*
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this onboarding workflow"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="sector" className="text-sm font-medium">
                Workforce Sector*
              </label>
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData({ ...formData, sector: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="it">IT / Technology</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="assignee" className="text-sm font-medium">
                Assignee (optional)
              </label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="e.g., HR Manager"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Workflow'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWorkflowCreator;
