
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Plus, Settings, Shield, Clock, Users } from "lucide-react";
import { toast } from "sonner";

interface Policy {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  scope: "organization" | "department" | "role";
  enforced: boolean;
}

const initialPolicies: Policy[] = [
  {
    id: "pol-1",
    name: "Expense Approval Thresholds",
    description: "Defines approval requirements based on expense amounts",
    status: "active",
    scope: "organization",
    enforced: true
  },
  {
    id: "pol-2",
    name: "Leave Request Policies",
    description: "Rules for requesting and approving time off",
    status: "active",
    scope: "department",
    enforced: true
  },
  {
    id: "pol-3",
    name: "Vendor Approval Requirements",
    description: "Required approvals for new vendor onboarding",
    status: "inactive",
    scope: "department",
    enforced: false
  },
  {
    id: "pol-4",
    name: "Document Classification Protocol",
    description: "Rules for classifying and handling documents",
    status: "active",
    scope: "role",
    enforced: true
  }
];

const WorkflowPolicies = () => {
  const [activeTab, setActiveTab] = useState("all-policies");
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [editMode, setEditMode] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const handleToggleStatus = (policyId: string) => {
    setPolicies(policies.map(policy => {
      if (policy.id === policyId) {
        const newStatus = policy.status === "active" ? "inactive" : "active";
        return { ...policy, status: newStatus };
      }
      return policy;
    }));
    
    toast.success("Policy status updated");
  };

  const handleToggleEnforced = (policyId: string) => {
    setPolicies(policies.map(policy => {
      if (policy.id === policyId) {
        return { ...policy, enforced: !policy.enforced };
      }
      return policy;
    }));
    
    toast.success("Policy enforcement updated");
  };

  const handleSelectPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setEditMode(true);
    setActiveTab("edit-policy");
  };

  const handleCreateNew = () => {
    setSelectedPolicy({
      id: `pol-${policies.length + 1}`,
      name: "",
      description: "",
      status: "inactive",
      scope: "organization",
      enforced: false
    });
    setEditMode(true);
    setActiveTab("edit-policy");
  };
  
  const handleSavePolicy = () => {
    if (!selectedPolicy) return;
    
    if (!selectedPolicy.name) {
      toast.error("Please provide a policy name");
      return;
    }
    
    if (editMode && selectedPolicy.id) {
      // Update existing policy
      setPolicies(policies.map(p => p.id === selectedPolicy.id ? selectedPolicy : p));
    } else {
      // Add new policy
      setPolicies([...policies, selectedPolicy]);
    }
    
    toast.success("Policy saved successfully");
    setActiveTab("all-policies");
    setEditMode(false);
    setSelectedPolicy(null);
  };

  const getScopeLabel = (scope: string) => {
    switch(scope) {
      case "organization": return "Organization-wide";
      case "department": return "Department-specific";
      case "role": return "Role-based";
      default: return scope;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="all-policies">All Policies</TabsTrigger>
        <TabsTrigger value="edit-policy" disabled={!editMode}>
          {selectedPolicy?.id ? "Edit Policy" : "New Policy"}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all-policies">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">Organization Policies</h2>
              <p className="text-gray-500">Define and manage organizational workflow policies</p>
            </div>
            <Button onClick={handleCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              New Policy
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Policy</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enforced</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">
                        <div>
                          {policy.name}
                          <p className="text-gray-500 text-sm truncate max-w-md">{policy.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getScopeLabel(policy.scope)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${policy.status === "active" ? "bg-green-500" : "bg-gray-300"}`} />
                          {policy.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={policy.enforced} 
                          onCheckedChange={() => handleToggleEnforced(policy.id)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleToggleStatus(policy.id)}
                          >
                            {policy.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSelectPolicy(policy)}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {policies.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No policies found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="edit-policy">
        {selectedPolicy && (
          <Card>
            <CardHeader>
              <CardTitle>
                {editMode && selectedPolicy.id ? "Edit Policy" : "Create New Policy"}
              </CardTitle>
              <CardDescription>
                Define the rules and constraints for workflow execution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="policy-name">Policy Name</Label>
                    <Input 
                      id="policy-name" 
                      value={selectedPolicy.name}
                      onChange={(e) => setSelectedPolicy({...selectedPolicy, name: e.target.value})}
                      placeholder="e.g., Expense Approval Policy"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="policy-description">Description</Label>
                    <Input 
                      id="policy-description" 
                      value={selectedPolicy.description}
                      onChange={(e) => setSelectedPolicy({...selectedPolicy, description: e.target.value})}
                      placeholder="Describe this policy's purpose"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="policy-scope">Policy Scope</Label>
                    <Select 
                      value={selectedPolicy.scope}
                      onValueChange={(value: "organization" | "department" | "role") => 
                        setSelectedPolicy({...selectedPolicy, scope: value})
                      }
                    >
                      <SelectTrigger id="policy-scope">
                        <SelectValue placeholder="Select policy scope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organization">Organization-wide</SelectItem>
                        <SelectItem value="department">Department-specific</SelectItem>
                        <SelectItem value="role">Role-based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <Label>Policy Settings</Label>
                    </div>
                    
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Activation Status</p>
                          <p className="text-sm text-gray-500">
                            Is this policy active in the system?
                          </p>
                        </div>
                        <Switch 
                          checked={selectedPolicy.status === "active"} 
                          onCheckedChange={(checked) => 
                            setSelectedPolicy({...selectedPolicy, status: checked ? "active" : "inactive"})
                          }
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enforce Policy</p>
                          <p className="text-sm text-gray-500">
                            Strictly enforce this policy across the organization
                          </p>
                        </div>
                        <Switch 
                          checked={selectedPolicy.enforced} 
                          onCheckedChange={(checked) => 
                            setSelectedPolicy({...selectedPolicy, enforced: checked})
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <CardTitle className="text-sm">Timeframe Controls</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm pt-0">
                    <p className="text-gray-500 mb-4">Set time constraints for policy application</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-3 w-3 mr-2" />
                      Configure Timeframes
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <CardTitle className="text-sm">Role Assignments</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm pt-0">
                    <p className="text-gray-500 mb-4">Define which roles are affected by this policy</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-3 w-3 mr-2" />
                      Configure Roles
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <CardTitle className="text-sm">Approval Requirements</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm pt-0">
                    <p className="text-gray-500 mb-4">Set approval and authorization levels</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-3 w-3 mr-2" />
                      Configure Requirements
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => {
                  setEditMode(false);
                  setActiveTab("all-policies");
                }}>
                  Cancel
                </Button>
                <Button onClick={handleSavePolicy}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default WorkflowPolicies;
