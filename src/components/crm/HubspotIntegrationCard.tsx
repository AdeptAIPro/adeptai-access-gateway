
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface HubspotIntegrationCardProps {
  hubspotStatus: {
    connected: boolean;
    email: string;
  };
  handleConnectHubSpot: () => Promise<void>;
}

const HubspotIntegrationCard: React.FC<HubspotIntegrationCardProps> = ({
  hubspotStatus,
  handleConnectHubSpot,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>HubSpot Integration</CardTitle>
        <CardDescription>Connect with HubSpot CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your AdeptAI lead database with HubSpot CRM to automatically sync contacts, deals and communications.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-red-100 rounded-full p-2">
              <svg className="w-6 h-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FF7A59" d="M512 236.2c0-6.8-.2-13.5-.8-20.2-6-69.5-42.2-128.7-94.3-166C325.9-13 148 8.8 56.7 127.3c-8.5 11-16 22.7-22.3 35-27.5 53.7-25.5 119.5 5.9 171 4.2 7 9 13.5 14 19.8 30 37.5 72.5 60.3 118.2 64.7 26.8 2.5 53.8-1 78.5-10.7 52.7-20.5 97.2-59.2 132.5-104.3 12.5-15.8 24-32.5 35.2-49.3 3-4.5 3.5-8.5 1.5-13.2-2-4.7-6-7.3-11.2-7.5-7.5-.3-15-.2-22.5-.2h-309c-11.2 0-15.3 4.8-12 15.5 1.8 6 7.8 10.2 14 10.2h251.5c6.8 0 13.7.2 20.5-.2 5-.3 7.2 1.3 5 7.2-2.5 6.5-5.3 12.7-8.5 18.8-17 33.8-40.7 62.2-71 84.2-50 36.3-122.8 39.7-176.5 8-51.5-30.5-80.5-88.8-72.8-147.8C25.5 68 94.7 10.8 166 3.2c80.3-8.5 154.8 39.5 181.8 116.8 3 8.7 7.5 10 15.5 6 6.8-3.5 13.5-7.3 20.2-11.2 4.8-2.8 7-6.8 5.2-12-1.7-5.2-3.8-10.3-6-15.3-34.5-73.2-98-112.8-177-114.3-86.3-1.7-157.8 43.2-188.5 124.8-31.7 84.7-.2 180.3 74.5 232 50.3 34.7 106.8 42.8 166 25.5 66.5-19.5 113.8-65.5 144.5-127.2 21.7-43.8 33.7-89.8 33.7-139.2l.2-.3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">HubSpot CRM</span>
              <span className="text-xs text-muted-foreground">
                Account: {hubspotStatus.email}
              </span>
            </div>
          </div>
          <Button 
            className="py-2 px-4"
            onClick={handleConnectHubSpot}
            variant={hubspotStatus.connected ? "outline" : "default"}
          >
            {hubspotStatus.connected ? "Connected ✓" : "Connect"}
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="text-xs text-muted-foreground space-y-2">
          <p>
            HubSpot offers a free CRM with robust features including contact management, deal tracking, and email marketing tools.
          </p>
          {hubspotStatus.connected ? (
            <p className="text-green-600">
              Your HubSpot integration is active. All leads will automatically sync to your HubSpot account.
            </p>
          ) : (
            <p>
              <span className="font-medium">Setup Instructions:</span> Create a HubSpot account with {hubspotStatus.email}, 
              get your API key from HubSpot dashboard (Settings &gt; Integrations &gt; API Keys), 
              and set it as an environment variable.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HubspotIntegrationCard;
