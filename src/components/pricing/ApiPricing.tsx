
import React from "react";
import { Server, ArrowRight, Code } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const ApiPricing = () => {
  return (
    <Card className="border-dashed border-2 bg-background hover:border-adept/40 hover:shadow transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">
              Developer Option
            </Badge>
            <CardTitle className="text-xl flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              API Pay-As-You-Go
            </CardTitle>
            <CardDescription className="pt-1">
              Only pay for the API calls you make
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-blue-600">$0.01</span>
            <span className="text-xs font-normal ml-1 text-blue-600">per API call</span>
            <p className="text-xs text-muted-foreground">(first 1M calls)</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[
            {
              title: "Volume Discounts",
              description: "$0.008 per API call for 1M+ calls"
            },
            {
              title: "Usage-Based Billing",
              description: "No monthly subscription required"
            },
            {
              title: "Comprehensive API Documentation",
              description: "Easy integration for developers"
            },
            {
              title: "Authentication & Security",
              description: "Secure API keys and endpoints"
            }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg">
              <h3 className="text-sm font-medium mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
          <h4 className="text-sm font-medium mb-1">API Access Includes:</h4>
          <ul className="space-y-1">
            {["Talent Matching API", "Compliance Monitoring API", "Analytics API", "Payroll Processing API"].map((feature, i) => (
              <li key={i} className="text-xs flex items-center gap-1.5">
                <Server className="h-3 w-3 text-blue-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/checkout?plan=api_pay_as_you_go" className="w-full">
          <Button variant="outline" className="w-full group border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400">
            Get API Access
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ApiPricing;
