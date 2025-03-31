
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LeadCaptureForm from "./LeadCaptureForm";

const LeadCaptureWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const toggleWidget = () => setIsOpen(!isOpen);
  
  const handleSuccess = () => {
    setHasSubmitted(true);
    // Close the widget after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      // Reset submitted state after widget closes
      setTimeout(() => setHasSubmitted(false), 500);
    }, 3000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-lg animate-in slide-in-from-right-5">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">
                {hasSubmitted ? "Thanks!" : "Get in Touch"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleWidget}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {hasSubmitted ? (
              <p className="text-sm text-center">
                We'll be in touch with you shortly!
              </p>
            ) : (
              <LeadCaptureForm 
                source="widget" 
                onSuccess={handleSuccess}
                compact={true}
              />
            )}
          </CardContent>
        </Card>
      ) : (
        <Button 
          onClick={toggleWidget} 
          className="shadow-lg animate-bounce"
        >
          Let's Talk
        </Button>
      )}
    </div>
  );
};

export default LeadCaptureWidget;
