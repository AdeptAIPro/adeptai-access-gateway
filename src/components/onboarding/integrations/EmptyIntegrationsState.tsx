
import React from "react";
import { Puzzle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyIntegrationsStateProps {
  onConnect: () => void;
}

const EmptyIntegrationsState: React.FC<EmptyIntegrationsStateProps> = ({ onConnect }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-8 border rounded-lg border-dashed">
      <Puzzle className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No tools connected</h3>
      <p className="text-muted-foreground text-center mb-4">
        Connect your existing onboarding tools to streamline your workflow
      </p>
      <Button onClick={onConnect}>
        <Plus className="h-4 w-4 mr-2" />
        Connect Tool
      </Button>
    </div>
  );
};

export default EmptyIntegrationsState;
