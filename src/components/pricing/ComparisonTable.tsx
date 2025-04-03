
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
          name: "Agentic AI Workflows",
          free: "Limited",
          pro: "50/month",
          business: "Unlimited",
          enterprise: "Unlimited",
          api: "Per call"
        },
        {
          name: "Talent Matching AI",
          free: "Limited",
          pro: "50/month",
          business: "Unlimited",
          enterprise: "Unlimited",
          api: "Per call"
        },
        {
          name: "Payroll Processing AI",
          free: "Limited",
          pro: "50/month",
          business: "Unlimited",
          enterprise: "Unlimited",
          api: "Per call"
        },
        {
          name: "Compliance Monitoring AI",
          free: "Limited",
          pro: "50/month",
          business: "Unlimited",
          enterprise: "Unlimited",
          api: "Per call"
        },
        {
          name: "Analytics AI",
          free: "Basic",
          pro: "Standard",
          business: "Advanced", 
          enterprise: "Custom",
          api: "Per call"
        }
      ]
    },
    {
      category: "API Access",
      items: [
        {
          name: "API Calls",
          free: "100/month",
          pro: "5,000/month",
          business: "50,000/month",
          enterprise: "Unlimited",
          api: "Pay-as-you-go"
        },
        {
          name: "Rate Limits",
          free: "10 calls/min",
          pro: "60 calls/min",
          business: "300 calls/min",
          enterprise: "Custom",
          api: "100 calls/min"
        },
        {
          name: "Custom Endpoints",
          free: false,
          pro: false,
          business: true,
          enterprise: true,
          api: "Limited"
        }
      ]
    },
    {
      category: "Support",
      items: [
        {
          name: "Support Type",
          free: "Community",
          pro: "Email",
          business: "Priority",
          enterprise: "Dedicated",
          api: "Email"
        },
        {
          name: "Response Time",
          free: "Best effort",
          pro: "48 hours",
          business: "24 hours",
          enterprise: "4 hours SLA",
          api: "48 hours"
        },
        {
          name: "Dedicated Account Manager",
          free: false,
          pro: false,
          business: false,
          enterprise: true,
          api: false
        }
      ]
    },
    {
      category: "Integrations",
      items: [
        {
          name: "Standard Integrations",
          free: "Limited",
          pro: true,
          business: true,
          enterprise: true,
          api: "N/A"
        },
        {
          name: "Custom Integrations",
          free: false,
          pro: false,
          business: true,
          enterprise: true,
          api: "N/A"
        },
        {
          name: "On-premise Deployment",
          free: false,
          pro: false,
          business: false,
          enterprise: true,
          api: false
        }
      ]
    },
    {
      category: "Team & Collaboration",
      items: [
        {
          name: "Team Members",
          free: "1 user",
          pro: "5 users",
          business: "20 users",
          enterprise: "Unlimited",
          api: "Developers only"
        },
        {
          name: "Role-based Access",
          free: false,
          pro: "Basic",
          business: "Advanced",
          enterprise: "Custom",
          api: false
        },
        {
          name: "Audit Logs",
          free: false,
          pro: "7 days",
          business: "30 days",
          enterprise: "1 year+",
          api: "30 days"
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
            <TableHead className="w-1/6 py-4 px-6 text-left font-bold">Feature</TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center">
              Free Tier
              <span className="block text-xs font-normal mt-1 text-muted-foreground">$0</span>
            </TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center">
              Pro Plan
              <span className="block text-xs font-normal mt-1 text-muted-foreground">$49/mo</span>
            </TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center bg-adept/5">
              <span className="text-adept">Business</span>
              <span className="block text-xs font-normal mt-1 text-muted-foreground">$199/mo</span>
            </TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center">
              Enterprise
              <span className="block text-xs font-normal mt-1 text-muted-foreground">Custom</span>
            </TableHead>
            <TableHead className="w-1/6 py-4 px-2 text-center bg-blue-50/50 dark:bg-blue-900/10">
              <span className="text-blue-600 dark:text-blue-400">API</span>
              <span className="block text-xs font-normal mt-1 text-muted-foreground">Pay-as-you-go</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <TableRow className="bg-muted/30">
                <TableCell 
                  colSpan={6} 
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
                    {renderCellContent(feature.pro)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center border-b border-gray-200 dark:border-gray-700 bg-adept/5">
                    {renderCellContent(feature.business)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center border-b border-gray-200 dark:border-gray-700">
                    {renderCellContent(feature.enterprise)}
                  </TableCell>
                  <TableCell className="py-3 px-2 text-center border-b border-gray-200 dark:border-gray-700 bg-blue-50/50 dark:bg-blue-900/10">
                    {renderCellContent(feature.api)}
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
