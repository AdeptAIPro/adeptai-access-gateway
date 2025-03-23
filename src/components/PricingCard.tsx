
import React from "react";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  highlight = false,
  cta,
  planId
}) => {
  return (
    <Card className={`w-full h-full transition-all duration-300 animate-fade-in-up ${
      highlight ? "border-adept shadow-lg scale-[1.02]" : "hover:border-adept/50 shadow hover:shadow-md"
    }`}>
      <CardHeader className="space-y-1">
        {highlight && (
          <Badge className="w-fit mb-2 bg-adept hover:bg-adept-dark">
            Most Popular
          </Badge>
        )}
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div>
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="space-y-2 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckIcon className={`h-4 w-4 ${feature.included ? "text-adept" : "text-muted-foreground/50"}`} />
              <span className={!feature.included ? "text-muted-foreground/70" : ""}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to={`/signup?plan=${planId}`} className="w-full">
          <Button 
            className={`w-full ${
              highlight 
                ? "bg-adept hover:bg-adept-dark" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            }`}
          >
            {cta}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
