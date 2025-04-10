
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Clock, Check, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface AutomatedOnboardingCardProps {
  clientId: string;
  sector: "healthcare" | "it" | "general";
  onActivate: () => void;
  isActivated: boolean;
}

const AutomatedOnboardingCard: React.FC<AutomatedOnboardingCardProps> = ({
  clientId,
  sector,
  onActivate,
  isActivated
}) => {
  const getFeatures = () => {
    switch(sector) {
      case "healthcare":
        return [
          "Automated license verification",
          "HIPAA compliance training",
          "Clinical skills assessment",
          "Credential management",
          "Healthcare system access"
        ];
      case "it":
        return [
          "Code repository setup",
          "Tech stack onboarding",
          "System access provisioning",
          "Security training",
          "Dev environment configuration"
        ];
      default:
        return [
          "Document verification",
          "HR policy review",
          "System access setup",
          "Team introduction",
          "Check-in scheduling"
        ];
    }
  };

  const getBadgeStyle = () => {
    switch(sector) {
      case "healthcare":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "it":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-green-100 text-green-800 hover:bg-green-200";
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2 text-adept" />
              AI Automated Onboarding
            </CardTitle>
            <CardDescription>
              Zero-touch employee onboarding process
            </CardDescription>
          </div>
          <Badge className={getBadgeStyle()}>
            {sector.charAt(0).toUpperCase() + sector.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Automation level</span>
            <Progress value={isActivated ? 90 : 30} className="w-2/3" />
          </div>
          
          <ul className="space-y-2">
            {getFeatures().map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <Check className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>Saves up to 8 hours per new hire</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isActivated ? (
          <div className="w-full flex justify-between items-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Configure <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configure Automated Onboarding</DialogTitle>
                  <DialogDescription>
                    Customize your {sector} onboarding automation settings
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Automatic document verification</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Interview scheduling</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Email confirmation sequences</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Compliance verification</span>
                    <Badge>Active</Badge>
                  </div>
                </div>
                <DialogFooter>
                  <Button>Save Settings</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Button onClick={onActivate} className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            Activate Automated Onboarding
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AutomatedOnboardingCard;
