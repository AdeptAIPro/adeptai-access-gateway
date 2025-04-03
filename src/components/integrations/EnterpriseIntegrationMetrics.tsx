
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  BarChart2,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// In a real application, this would use a charting library like Recharts
// For this example, we'll create a simple chart representation with divs
const SimpleBarChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  
  return (
    <div className="flex items-end h-32 gap-2">
      {data.map((value, index) => (
        <div 
          key={index}
          className="bg-blue-500 rounded-t w-full"
          style={{ 
            height: `${(value / max) * 100}%`,
            opacity: 0.6 + (0.4 * (index / data.length))
          }}
        />
      ))}
    </div>
  );
};

const EnterpriseIntegrationMetrics = () => {
  // Mock data for charts
  const dailyApiUsage = [245, 312, 287, 345, 410, 387, 430];
  const weeklyApiUsage = [1678, 1845, 2030, 2156, 2245];
  const monthlyApiUsage = [6532, 7845, 8432, 9120, 10532, 11245];
  
  const errorRates = [1.2, 2.1, 0.8, 1.5, 0.9, 0.7, 0.5];
  const responseTimeTrend = [320, 310, 290, 305, 287, 273, 265];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart2 className="h-5 w-5 mr-2" />
          Integration Performance Metrics
        </CardTitle>
        <CardDescription>
          Monitor integration performance, usage trends, and system health
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="usage">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="usage">API Usage</TabsTrigger>
            <TabsTrigger value="errors">Error Rates</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    Today's Usage
                    <span className="ml-auto text-green-600 text-xs flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +12.4%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,416</div>
                  <div className="text-xs text-muted-foreground">API requests</div>
                  <SimpleBarChart data={dailyApiUsage} />
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Last 7 hours
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    Weekly Usage
                    <span className="ml-auto text-green-600 text-xs flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +8.7%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">9,954</div>
                  <div className="text-xs text-muted-foreground">API requests</div>
                  <SimpleBarChart data={weeklyApiUsage} />
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Last 5 days
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    Monthly Usage
                    <span className="ml-auto text-green-600 text-xs flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +15.2%
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">43,724</div>
                  <div className="text-xs text-muted-foreground">API requests</div>
                  <SimpleBarChart data={monthlyApiUsage} />
                  <div className="text-xs text-muted-foreground mt-2 text-center">
                    Last 6 months
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Top Integration Usage</h4>
              <div className="space-y-3">
                {[
                  { name: "Workday", percentage: 32, requests: 14023 },
                  { name: "Salesforce (CRM)", percentage: 28, requests: 12247 },
                  { name: "LinkedIn", percentage: 18, requests: 7870 },
                  { name: "BambooHR", percentage: 12, requests: 5247 },
                  { name: "SAP SuccessFactors", percentage: 10, requests: 4337 }
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center">
                    <div className="w-32 font-medium text-sm">{integration.name}</div>
                    <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${integration.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right">
                      <div>{integration.requests.toLocaleString()}</div>
                      <div className="text-muted-foreground">{integration.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="errors" className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-md mb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Average Error Rate</h4>
                <div className="text-green-600 text-xs flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -0.7%
                </div>
              </div>
              <div className="text-3xl font-bold mt-2">1.1%</div>
              <SimpleBarChart data={errorRates} />
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Last 7 days
              </div>
            </div>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Error Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: "Authentication Errors", count: 23, percentage: 42 },
                    { type: "Rate Limits", count: 17, percentage: 31 },
                    { type: "Timeout Errors", count: 9, percentage: 16 },
                    { type: "Malformed Requests", count: 6, percentage: 11 }
                  ].map((error) => (
                    <div key={error.type} className="flex items-center">
                      <div className="flex-1 font-medium text-sm">{error.type}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-rose-500 rounded-full" 
                            style={{ width: `${error.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground">{error.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Recent Error Events</CardTitle>
              </CardHeader>
              <CardContent className="max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {[
                    { 
                      integration: "Salesforce CRM", 
                      error: "Authentication token expired",
                      time: "15 minutes ago",
                      status: "resolved" 
                    },
                    { 
                      integration: "Workday", 
                      error: "API rate limit exceeded",
                      time: "2 hours ago",
                      status: "resolved" 
                    },
                    { 
                      integration: "SAP Field glass", 
                      error: "Connection timeout",
                      time: "3 hours ago",
                      status: "investigating" 
                    },
                    { 
                      integration: "LinkedIn Jobs", 
                      error: "Malformed request payload",
                      time: "6 hours ago",
                      status: "resolved" 
                    },
                    { 
                      integration: "BambooHR", 
                      error: "Rate limit exceeded",
                      time: "Yesterday",
                      status: "resolved"
                    }
                  ].map((event, i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                        event.status === "investigating" ? "text-amber-500" : "text-gray-400"
                      }`} />
                      <div>
                        <div className="font-medium text-sm">{event.integration}</div>
                        <div className="text-sm text-muted-foreground">{event.error}</div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                          <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                            event.status === "investigating" 
                              ? "bg-amber-100 text-amber-800" 
                              : "bg-green-100 text-green-800"
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-md mb-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Average Response Time</h4>
                <div className="text-green-600 text-xs flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -17.2%
                </div>
              </div>
              <div className="text-3xl font-bold mt-2">265ms</div>
              <SimpleBarChart data={responseTimeTrend} />
              <div className="text-xs text-muted-foreground mt-2 text-center">
                Last 7 days
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Integration Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Workday", responseTime: 312, status: "healthy" },
                      { name: "Salesforce (CRM)", responseTime: 245, status: "healthy" },
                      { name: "LinkedIn", responseTime: 198, status: "healthy" },
                      { name: "SAP SuccessFactors", responseTime: 487, status: "degraded" },
                      { name: "BambooHR", responseTime: 276, status: "healthy" }
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center">
                        <div className="flex-1 font-medium text-sm">{integration.name}</div>
                        <div className="text-sm tabular-nums">
                          {integration.responseTime}ms
                          <span className={`ml-2 inline-block w-2 h-2 rounded-full ${
                            integration.status === "healthy" ? "bg-green-500" : "bg-amber-500"
                          }`}></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">System Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "CPU Usage", value: "32%", maxValue: "100%" },
                      { name: "Memory Usage", value: "4.2GB", maxValue: "16GB" },
                      { name: "API Rate Limit", value: "35/sec", maxValue: "100/sec" },
                      { name: "Storage", value: "1.7TB", maxValue: "5TB" }
                    ].map((resource) => (
                      <div key={resource.name} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{resource.name}</span>
                          <span className="font-medium">{resource.value} / {resource.maxValue}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              resource.name.includes("CPU") || resource.name.includes("Memory")
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`} 
                            style={{ 
                              width: resource.name.includes("CPU") ? "32%" 
                                : resource.name.includes("Memory") ? "26%" 
                                : resource.name.includes("API") ? "35%" 
                                : "34%" 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Data Throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { 
                      label: "Inbound Traffic", 
                      value: "2.3 GB", 
                      change: "+8.5%",
                      trend: "up" 
                    },
                    { 
                      label: "Outbound Traffic", 
                      value: "1.8 GB", 
                      change: "+12.3%",
                      trend: "up" 
                    },
                    { 
                      label: "Avg. Latency", 
                      value: "217ms", 
                      change: "-4.7%",
                      trend: "down" 
                    },
                    { 
                      label: "Queue Depth", 
                      value: "12", 
                      change: "+2",
                      trend: "up" 
                    }
                  ].map((metric) => (
                    <div key={metric.label} className="bg-muted/30 p-3 rounded-md">
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      <div className="text-xl font-bold mt-1">{metric.value}</div>
                      <div className={`text-xs flex items-center mt-1 ${
                        metric.trend === "up" 
                          ? metric.label.includes("Latency") || metric.label.includes("Queue")
                            ? "text-red-600"
                            : "text-green-600" 
                          : metric.label.includes("Latency") || metric.label.includes("Queue")
                            ? "text-green-600"
                            : "text-red-600"
                      }`}>
                        {metric.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnterpriseIntegrationMetrics;
