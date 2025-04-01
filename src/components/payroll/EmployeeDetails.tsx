
import React, { useState } from "react";
import { usePayrollEmployeeSupabase } from "@/hooks/use-payroll-supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Mail, Phone, Edit, User, BanknoteIcon, Building } from "lucide-react";

interface EmployeeDetailsProps {
  employeeId: string | null;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employeeId }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const { employee, isLoading, updateEmployee } = usePayrollEmployeeSupabase(employeeId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!employeeId || !employee) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <User className="h-12 w-12 text-muted-foreground/60 mb-3" />
        <h3 className="text-lg font-medium">No Employee Selected</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Select an employee from the list to view their details
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Employee Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{employee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <Badge variant={employee.status === "Active" ? "success" : "default"}>
                {employee.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{employee.title}</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>
      
      <Separator />
      
      {/* Employee Details Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="tax">Tax Forms</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{employee.phone}</span>
            </div>
          </div>
          
          <Card className="p-4">
            <h4 className="font-medium mb-2">Personal Information</h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div>Date of Birth:</div>
              <div>{employee.dateOfBirth}</div>
              <div>Address:</div>
              <div>{employee.address}</div>
              <div>SSN:</div>
              <div>XXX-XX-{employee.ssn.substring(7)}</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-2">Emergency Contact</h4>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div>Name:</div>
              <div>{employee.emergencyContact?.name || "Not provided"}</div>
              <div>Phone:</div>
              <div>{employee.emergencyContact?.phone || "Not provided"}</div>
              <div>Relationship:</div>
              <div>{employee.emergencyContact?.relationship || "Not provided"}</div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="banking" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Direct Deposit Information
              </h4>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div>Bank Name:</div>
              <div>{employee.bankInfo?.bankName || "Not provided"}</div>
              <div>Account Type:</div>
              <div>{employee.bankInfo?.accountType || "Not provided"}</div>
              <div>Routing Number:</div>
              <div>{employee.bankInfo?.routingNumber ? "XXXX" + employee.bankInfo.routingNumber.substring(4) : "Not provided"}</div>
              <div>Account Number:</div>
              <div>{employee.bankInfo?.accountNumber ? "XXXX" + employee.bankInfo.accountNumber.substring(4) : "Not provided"}</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Distribution
              </h4>
              <Button variant="outline" size="sm">Add Account</Button>
            </div>
            {employee.paymentDistribution && employee.paymentDistribution.length > 0 ? (
              <div className="space-y-4">
                {employee.paymentDistribution.map((dist, index) => (
                  <div key={index} className="flex items-center justify-between border rounded p-3">
                    <div>
                      <div className="font-medium">{dist.bankName}</div>
                      <div className="text-xs text-muted-foreground">Account ending in {dist.accountNumber.substring(dist.accountNumber.length - 4)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{dist.percentage}%</div>
                      <div className="text-xs text-muted-foreground">{dist.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground text-center p-4">
                No payment distribution set up
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium mb-4">Tax Documents</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <div className="font-medium">W-4 Form</div>
                  <div className="text-xs text-muted-foreground">Updated: {employee.taxForms?.w4?.lastUpdated || "Not submitted"}</div>
                </div>
                <Button variant="outline" size="sm">
                  {employee.taxForms?.w4?.submitted ? "View" : "Complete"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <div className="font-medium">I-9 Form</div>
                  <div className="text-xs text-muted-foreground">Updated: {employee.taxForms?.i9?.lastUpdated || "Not submitted"}</div>
                </div>
                <Button variant="outline" size="sm">
                  {employee.taxForms?.i9?.submitted ? "View" : "Complete"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <div className="font-medium">W-2 Form (2023)</div>
                  <div className="text-xs text-muted-foreground">Available for download</div>
                </div>
                <Button variant="outline" size="sm" disabled={!employee.taxForms?.w2?.available}>
                  Download
                </Button>
              </div>
              
              {employee.type === "1099" && (
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <div className="font-medium">1099 Form (2023)</div>
                    <div className="text-xs text-muted-foreground">Available for download</div>
                  </div>
                  <Button variant="outline" size="sm" disabled={!employee.taxForms?.form1099?.available}>
                    Download
                  </Button>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-4">
            <h4 className="font-medium mb-4">Tax Withholdings</h4>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>Federal Filing Status:</div>
              <div>{employee.taxWithholdings?.federalFilingStatus || "Not set"}</div>
              <div>Federal Allowances:</div>
              <div>{employee.taxWithholdings?.federalAllowances || "0"}</div>
              <div>State:</div>
              <div>{employee.taxWithholdings?.state || "Not set"}</div>
              <div>State Filing Status:</div>
              <div>{employee.taxWithholdings?.stateFilingStatus || "Not set"}</div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="payroll" className="space-y-4">
          <Card className="p-4">
            <h4 className="font-medium mb-4">Payroll Information</h4>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>Employee Type:</div>
              <div>
                <Badge variant="outline">{employee.type}</Badge>
              </div>
              <div>Pay Rate:</div>
              <div>${employee.payRate}/hour</div>
              <div>Pay Schedule:</div>
              <div>{employee.paySchedule}</div>
              <div>Start Date:</div>
              <div>{employee.startDate}</div>
              <div>Department:</div>
              <div>{employee.department}</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Recent Payslips</h4>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            {employee.recentPayslips && employee.recentPayslips.length > 0 ? (
              <div className="space-y-2">
                {employee.recentPayslips.map((payslip, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <div className="font-medium">{payslip.payPeriod}</div>
                      <div className="text-xs text-muted-foreground">Paid on {payslip.payDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${payslip.netPay}</div>
                      <Button variant="ghost" size="sm" className="h-7">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground text-center p-4">
                No recent payslips
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDetails;
