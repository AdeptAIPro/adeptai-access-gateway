
import React from "react";
import { CircleDollarSign, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PayPerUseCard = () => {
  return (
    <Card className="border-dashed border-2 bg-background hover:border-adept/40 hover:shadow transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-adept" />
              Pay-Per-Use
            </CardTitle>
            <CardDescription className="pt-1">
              Only pay for what you use without any subscription
            </CardDescription>
          </div>
          <div className="bg-adept/10 text-adept font-bold px-4 py-1 rounded-full text-lg">
            $9
            <span className="text-xs font-normal ml-1">per use</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            {
              title: "No Commitments",
              description: "Only pay for the exact AI services you need, when you need them"
            },
            {
              title: "All Features",
              description: "Access all AdeptAI Pro features without a subscription commitment"
            },
            {
              title: "Usage-Based Billing",
              description: "Automatic billing per transaction with detailed usage reports"
            }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg">
              <h3 className="text-sm font-medium mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Perfect for occasional users or those who want to test specific features beyond the free trial limits.
        </p>
      </CardContent>
      <CardFooter>
        <Link to="/checkout?plan=pay_per_use" className="w-full">
          <Button variant="outline" className="w-full group">
            Start Pay-Per-Use
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PayPerUseCard;
