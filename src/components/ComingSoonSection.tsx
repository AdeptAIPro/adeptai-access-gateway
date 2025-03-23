
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, AlertCircle } from "lucide-react";

interface ComingSoonSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({
  title,
  description,
  icon: Icon
}) => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <Card className="w-full max-w-md text-center p-6">
        <CardHeader className="pb-4">
          <div className="mx-auto bg-primary/10 rounded-full p-6 mb-4">
            <Icon className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center bg-muted p-4 rounded-lg">
            <AlertCircle className="h-5 w-5 text-muted-foreground mr-3" />
            <p className="text-sm text-muted-foreground">
              We're working hard to bring you this feature soon. Stay tuned for updates!
            </p>
          </div>
          <Button variant="outline" className="w-full">
            <ClipboardList className="mr-2 h-4 w-4" />
            Join Waitlist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoonSection;
