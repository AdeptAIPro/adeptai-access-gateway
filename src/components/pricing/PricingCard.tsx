
import React from "react";
import { CheckIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  cta: string;
  planId: string;
  popular?: boolean;
  usageLimit: string;
  billingPeriod: "monthly" | "yearly";
  savings?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  highlight = false,
  cta,
  planId,
  popular = false,
  usageLimit,
  billingPeriod,
  savings
}) => {
  return (
    <Card className={`w-full h-full transition-all duration-300 ${
      highlight 
        ? "border-adept shadow-lg shadow-adept/10 scale-[1.02] relative z-10" 
        : "hover:border-adept/30 shadow hover:shadow-md"
    }`}>
      <CardHeader className="space-y-1 pb-2">
        {popular && (
          <Badge className="w-fit mb-2 bg-adept hover:bg-adept-dark text-white">
            Most Popular
          </Badge>
        )}
        <CardTitle className="text-xl">{name}</CardTitle>
        <div>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{price}</span>
            {price !== "$0" && (
              <span className="text-muted-foreground ml-1.5 text-sm">
                /{billingPeriod === "monthly" ? "mo" : "yr"}
              </span>
            )}
          </div>
          {savings && (
            <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
              Save ${savings}/year
            </p>
          )}
        </div>
        <CardDescription className="pt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="bg-muted/50 p-3 rounded-lg text-center">
          <span className="text-sm font-medium">
            Usage Limit: <span className="text-adept">{usageLimit}</span>
          </span>
        </div>
        <ul className="space-y-2 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckIcon className={`h-4 w-4 flex-shrink-0 ${
                feature.included ? "text-adept" : "text-muted-foreground/40"
              }`} />
              <span className={!feature.included ? "text-muted-foreground/70" : ""}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Link to={planId === "free_trial" ? "/signup" : `/checkout?plan=${planId}&billing=${billingPeriod}`} className="w-full">
          <Button 
            className={`w-full ${
              highlight 
                ? "bg-adept hover:bg-adept-dark text-white" 
                : planId === "free_trial" 
                  ? "bg-white border-2 border-adept text-adept hover:bg-adept/5"
                  : "bg-primary/90 hover:bg-primary"
            }`}
            variant={planId === "free_trial" ? "outline" : "default"}
          >
            {cta}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
