
import React from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ComparisonTable = () => {
  const features = [
    {
      category: "AI Features",
      items: [
        {
          name: "Talent Matching AI",
          free: "1/day",
          basic: "50/month",
          pro: "Unlimited",
          payPerUse: "Per use"
        },
        {
          name: "Payroll Processing AI",
          free: "1/day",
          basic: "50/month",
          pro: "Unlimited",
          payPerUse: "Per use"
        },
        {
          name: "Compliance Monitoring AI",
          free: "1/day",
          basic: "50/month",
          pro: "Unlimited",
          payPerUse: "Per use"
        },
        {
          name: "Analytics Insights AI",
          free: "1/day",
          basic: "50/month",
          pro: "Unlimited",
          payPerUse: "Per use"
        },
        {
          name: "Onboarding Assistant AI",
          free: "1/day",
          basic: "50/month", 
          pro: "Unlimited",
          payPerUse: "Per use"
        }
      ]
    },
    {
      category: "Support",
      items: [
        {
          name: "Email Support",
          free: true,
          basic: true,
          pro: true,
          payPerUse: true
        },
        {
          name: "Chat Support",
          free: false,
          basic: true,
          pro: true,
          payPerUse: false
        },
        {
          name: "Phone Support",
          free: false,
          basic: false,
          pro: true,
          payPerUse: false
        },
        {
          name: "Dedicated Account Manager",
          free: false,
          basic: false,
          pro: true,
          payPerUse: false
        }
      ]
    },
    {
      category: "Team Collaboration",
      items: [
        {
          name: "Multiple Users",
          free: false,
          basic: "Up to 5",
          pro: "Unlimited",
          payPerUse: false
        },
        {
          name: "Team Permissions",
          free: false,
          basic: "Basic",
          pro: "Advanced",
          payPerUse: false
        },
        {
          name: "Collaborative Workspace",
          free: false,
          basic: true,
          pro: true,
          payPerUse: false
        }
      ]
    },
    {
      category: "Integrations",
      items: [
        {
          name: "API Access",
          free: "Limited",
          basic: "Standard",
          pro: "Advanced",
          payPerUse: "Standard"
        },
        {
          name: "Webhooks",
          free: false,
          basic: true,
          pro: true,
          payPerUse: false
        },
        {
          name: "Custom Integrations",
          free: false,
          basic: false,
          pro: true,
          payPerUse: false
        }
      ]
    }
  ];

  const renderCellContent = (value: any) => {
    if (typeof value === "boolean") {
      return value ? 
        <CheckIcon className="h-5 w-5 text-green-600 mx-auto" /> : 
        <XIcon className="h-5 w-5 text-gray-300 mx-auto" />;
    }
    return <span className="text-center block">{value}</span>;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full rounded-lg overflow-hidden">
        <TableHeader className="bg-muted/70">
          <TableRow>
            <TableHead className="w-1/4 py-4 px-6 text-left font-bold">Feature</TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center">
              Free Trial
            </TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center">
              Basic
              <span className="block text-xs font-normal mt-1 text-muted-foreground">$299/mo</span>
            </TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center bg-adept/5">
              <span className="text-adept">Professional</span>
              <span className="block text-xs font-normal mt-1 text-muted-foreground">$999/mo</span>
            </TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center">
              Pay-Per-Use
              <span className="block text-xs font-normal mt-1 text-muted-foreground">$9/use</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <TableRow className="bg-muted/30">
                <TableCell 
                  colSpan={5} 
                  className="py-2 px-6 font-medium"
                >
                  {category.category}
                </TableCell>
              </TableRow>
              {category.items.map((feature, featureIndex) => (
                <TableRow key={`${categoryIndex}-${featureIndex}`} 
                  className={featureIndex % 2 === 0 ? "bg-white dark:bg-gray-800/50" : "bg-gray-50 dark:bg-gray-800/30"}
                >
                  <TableCell className="py-3 px-6 border-b border-gray-200 dark:border-gray-700">
                    {feature.name}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center border-b border-gray-200 dark:border-gray-700">
                    {renderCellContent(feature.free)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center border-b border-gray-200 dark:border-gray-700">
                    {renderCellContent(feature.basic)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center border-b border-gray-200 dark:border-gray-700 bg-adept/5">
                    {renderCellContent(feature.pro)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center border-b border-gray-200 dark:border-gray-700">
                    {renderCellContent(feature.payPerUse)}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;
