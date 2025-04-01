
import React from 'react';
import { Agent } from '@/services/agentic-ai/AgenticService';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot } from 'lucide-react';

interface AgentsListProps {
  agents: Agent[];
}

const AgentsList: React.FC<AgentsListProps> = ({ agents }) => {
  if (agents.length === 0) {
    return (
      <Card className="border-dashed md:col-span-2 lg:col-span-3">
        <CardContent className="flex flex-col items-center justify-center pt-6">
          <Bot className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No Agents Available</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            AI agents will appear here once configured in your Supabase database.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {agents.map(agent => (
        <Card key={agent.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{agent.name}</CardTitle>
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
            </div>
            <CardDescription>{agent.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map(capability => (
                  <Badge key={capability} variant="outline">{capability}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Active since {new Date(agent.createdAt).toLocaleDateString()}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AgentsList;
