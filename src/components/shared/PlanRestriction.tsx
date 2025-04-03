
import React from "react";
import { Lock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { PlanType } from "@/services/integrations/IntegrationValidationService";

export interface PlanRequirement {
  planName: string;
  planLevel: number;
  isIncluded: boolean;
}

interface PlanRestrictionProps {
  feature: string;
  description: string;
  requiredPlan: PlanRequirement;
  showCard?: boolean;
  children?: React.ReactNode;
}

// Plan level mapping for comparison operations
const planLevelMap: Record<string, number> = {
  "free_trial": 1,
  "pro": 2,
  "business": 3,
  "enterprise": 4,
  "null": 0
};

export const PlanRestriction: React.FC<PlanRestrictionProps> = ({
  feature,
  description,
  requiredPlan,
  showCard = true,
  children
}) => {
  const { user } = useAuth();
  const userPlan = user?.plan as PlanType;
  const userPlanLevel = userPlan ? planLevelMap[userPlan] : planLevelMap["null"];
  const hasAccess = userPlanLevel >= requiredPlan.planLevel;

  if (hasAccess) {
    return <>{children}</>;
  }

  if (!showCard) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center mb-2">
          <Lock className="h-4 w-4 text-muted-foreground mr-2" />
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            {requiredPlan.planName}+ Feature
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3 text-center">{description}</p>
        <Link to="/pricing">
          <Button size="sm" variant="default">
            Upgrade Plan
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className="border-amber-200 bg-amber-50/20 dark:bg-amber-900/10">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <Lock className="h-10 w-10 text-amber-600 dark:text-amber-500 mb-4" />
        <h3 className="text-lg font-medium mb-1">{feature}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <Badge variant="outline" className="mb-4 bg-amber-50 text-amber-700 border-amber-200">
          Available on {requiredPlan.planName}+ Plans
        </Badge>
        <Link to="/pricing">
          <Button>
            Upgrade to {requiredPlan.planName}
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PlanRestriction;
