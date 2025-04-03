
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Key,
  RefreshCw,
  Copy,
  EyeOff,
  Eye,
  AlertTriangle,
  ShieldAlert,
  Clock
} from "lucide-react";
import TaskErrorDisplay from "@/components/agentic-ai/dashboard/TaskErrorDisplay";

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  expiresAt: string | null;
  lastUsed: string | null;
  scopes: string[];
  environment: "production" | "development" | "staging";
}

// Mock data for enterprise API keys
const mockApiKeys: ApiKey[] = [
  {
    id: "key_prod_1",
    name: "Production API Key",
    prefix: "adpt_prod_",
    createdAt: "2023-11-15T10:30:00Z",
    expiresAt: "2024-11-15T10:30:00Z",
    lastUsed: "2023-04-03T08:15:00Z",
    scopes: ["read:integrations", "write:integrations", "read:candidates"],
    environment: "production"
  },
  {
    id: "key_dev_1",
    name: "Development Key",
    prefix: "adpt_dev_",
    createdAt: "2023-12-10T14:45:00Z",
    expiresAt: null,
    lastUsed: "2023-04-02T19:22:00Z",
    scopes: ["read:integrations", "write:integrations", "read:candidates", "write:candidates"],
    environment: "development"
  },
  {
    id: "key_stg_1",
    name: "Staging API Key",
    prefix: "adpt_stg_",
    createdAt: "2024-01-20T09:15:00Z",
    expiresAt: "2024-07-20T09:15:00Z",
    lastUsed: null,
    scopes: ["read:integrations", "write:integrations"],
    environment: "staging"
  }
];

const EnterpriseApiAuthManager = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [environment, setEnvironment] = useState<ApiKey["environment"]>("development");
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const availableScopes = [
    "read:integrations", 
    "write:integrations", 
    "read:candidates", 
    "write:candidates",
    "read:jobs",
    "write:jobs",
    "admin:all"
  ];

  const handleToggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      setSelectedScopes(selectedScopes.filter(s => s !== scope));
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName) {
      setError("API key name is required");
      return;
    }

    if (selectedScopes.length === 0) {
      setError("Please select at least one scope");
      return;
    }

    setIsCreatingKey(true);
    setError(null);
    
    try {
      // In a real app, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock API key
      const keyPrefix = `adpt_${environment.substring(0, 4)}_`;
      const randomKey = Array.from({ length: 24 }, () => 
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
          Math.floor(Math.random() * 62)
        ]
      ).join("");
      
      const fullKey = `${keyPrefix}${randomKey}`;
      setNewKeyValue(fullKey);
      
      // Create new API key object
      const newKey: ApiKey = {
        id: `key_${environment}_${Date.now()}`,
        name: newKeyName,
        prefix: keyPrefix,
        createdAt: new Date().toISOString(),
        expiresAt: environment === "production" ? 
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null,
        lastUsed: null,
        scopes: [...selectedScopes],
        environment
      };
      
      setApiKeys([newKey, ...apiKeys]);
      setNewKeyName("");
      setSelectedScopes([]);
      
      toast.success("API key created successfully", {
        description: "Make sure to copy your API key now. You won't be able to see it again."
      });
    } catch (error) {
      console.error("Error creating API key:", error);
      setError("Failed to create API key. Please try again.");
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleCopyKey = () => {
    if (newKeyValue) {
      navigator.clipboard.writeText(newKeyValue);
      toast.success("API key copied to clipboard");
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    try {
      // In a real app, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      toast.success("API key revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke API key");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="h-5 w-5 mr-2" />
          API Authentication Manager
        </CardTitle>
        <CardDescription>
          Manage API keys used for integrating with enterprise systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <TaskErrorDisplay error={error} variant="compact" title="API Key Error" />
        )}
        
        {newKeyValue && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                <h4 className="font-medium text-amber-800">Save Your New API Key</h4>
              </div>
              <Button size="sm" variant="outline" onClick={handleCopyKey}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-xs text-amber-700 mb-2">
              This is the only time your full API key will be shown. Please copy it now.
            </p>
            <div className="flex items-center">
              <Input 
                value={showNewKey ? newKeyValue : "•".repeat(newKeyValue.length)}
                readOnly
                className="font-mono text-sm bg-amber-100 border-amber-300"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowNewKey(!showNewKey)}
                className="ml-2"
              >
                {showNewKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium">Create New API Key</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="keyName" className="text-sm font-medium">
                Key Name
              </label>
              <Input
                id="keyName"
                placeholder="e.g., Workday Integration Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Environment</label>
              <div className="flex gap-2 mt-1">
                {(["development", "staging", "production"] as const).map((env) => (
                  <Button
                    key={env}
                    type="button"
                    variant={environment === env ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEnvironment(env)}
                    className="capitalize"
                  >
                    {env}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Scopes</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {availableScopes.map((scope) => (
                  <Badge
                    key={scope}
                    variant={selectedScopes.includes(scope) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleToggleScope(scope)}
                  >
                    {scope}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button
              onClick={handleCreateKey}
              disabled={isCreatingKey || !newKeyName || selectedScopes.length === 0}
            >
              {isCreatingKey && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              Generate API Key
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Your API Keys</h3>
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md"
              >
                <div>
                  <div className="flex items-center">
                    <div className="font-medium">{key.name}</div>
                    <Badge 
                      variant="outline" 
                      className={`ml-2 capitalize ${
                        key.environment === "production" 
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : key.environment === "staging"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }`}
                    >
                      {key.environment}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div className="flex items-center">
                      <span className="font-mono">{key.prefix}••••••••••••••</span>
                      {key.expiresAt && (
                        <span className="ml-3 flex items-center text-amber-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Expires: {new Date(key.expiresAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {key.scopes.map((scope) => (
                      <Badge key={scope} variant="secondary" className="text-xs">
                        {scope}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3 sm:mt-0 whitespace-nowrap"
                  onClick={() => handleRevokeKey(key.id)}
                >
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Revoke
                </Button>
              </div>
            ))}

            {apiKeys.length === 0 && (
              <div className="text-center p-6 text-muted-foreground">
                No API keys found. Create one to start integrating.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnterpriseApiAuthManager;
