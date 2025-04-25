
import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const NoResults: React.FC = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <Star className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">No Saved Matches</h3>
        <p className="text-sm text-center text-muted-foreground">
          Your saved matching results will appear here for easy access.
        </p>
      </CardContent>
    </Card>
  );
};
