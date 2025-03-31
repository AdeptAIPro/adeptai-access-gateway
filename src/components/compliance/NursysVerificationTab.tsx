
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface LicenseResult {
  licenseNumber: string;
  state: string;
  valid: boolean;
  status?: string;
  expirationDate?: string;
  message?: string;
  error?: string;
}

const STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
];

const NursysVerificationTab: React.FC = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [state, setState] = useState<string>("");
  const [bulkLicenses, setBulkLicenses] = useState("");
  const [verificationResults, setVerificationResults] = useState<LicenseResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSingleVerification = async () => {
    if (!licenseNumber || !state) {
      toast({
        title: "Validation Error",
        description: "Please enter license number and select state",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/v1/nursys/license/${licenseNumber}?state=${state}`);
      const data = await response.json();

      if (response.ok) {
        setVerificationResults([{
          licenseNumber,
          state,
          valid: data.status === "ACTIVE",
          status: data.status,
          expirationDate: data.expirationDate,
          message: data.status === "ACTIVE" 
            ? "License is valid and active" 
            : "License is not active"
        }]);
        
        toast({
          title: "Verification Complete",
          description: "License information has been retrieved successfully."
        });
      } else {
        toast({
          title: "Verification Failed",
          description: data.message || "Could not verify license information",
          variant: "destructive"
        });

        setVerificationResults([{
          licenseNumber,
          state,
          valid: false,
          error: data.message || "Verification failed"
        }]);
      }
    } catch (error) {
      console.error("Error verifying license:", error);
      toast({
        title: "Error",
        description: "Failed to connect to verification service",
        variant: "destructive"
      });
      
      setVerificationResults([{
        licenseNumber,
        state,
        valid: false,
        error: "Connection error"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkVerification = async () => {
    if (!bulkLicenses.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter license information for bulk verification",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Parse the bulk license input
      // Format expected: LicenseNumber,State (one per line)
      const licenseRequests = bulkLicenses
        .split('\n')
        .map(line => {
          const [licenseNumber, state] = line.split(',');
          return { 
            license_number: licenseNumber?.trim(), 
            state: state?.trim() 
          };
        })
        .filter(item => item.license_number && item.state);

      if (licenseRequests.length === 0) {
        toast({
          title: "Validation Error",
          description: "Invalid format. Please use 'LicenseNumber,State' format, one entry per line.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/v1/nursys/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(licenseRequests)
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationResults(data.results.map((result: any) => ({
          licenseNumber: result.license_number,
          state: result.state,
          valid: result.valid,
          status: result.status,
          expirationDate: result.expiration_date,
          message: result.message,
          error: result.error
        })));
        
        toast({
          title: "Bulk Verification Complete",
          description: `Verified ${data.results.length} licenses`
        });
      } else {
        toast({
          title: "Verification Failed",
          description: data.message || "Could not complete bulk verification",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error in bulk verification:", error);
      toast({
        title: "Error",
        description: "Failed to connect to verification service",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Single License Verification</CardTitle>
          <CardDescription>
            Verify a single healthcare professional license through Nursys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">License Number</label>
              <Input 
                placeholder="Enter license number" 
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">State</label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full" 
                onClick={handleSingleVerification}
                disabled={isLoading}
              >
                <Search className="mr-2 h-4 w-4" />
                Verify License
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bulk License Verification</CardTitle>
          <CardDescription>
            Verify multiple healthcare professional licenses at once
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                License Information (Format: LicenseNumber,State - one per line)
              </label>
              <Textarea 
                placeholder="RN123456,NY&#10;LPN789012,CA&#10;RN456789,TX" 
                rows={5}
                value={bulkLicenses}
                onChange={(e) => setBulkLicenses(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full md:w-auto" 
                onClick={handleBulkVerification}
                disabled={isLoading}
              >
                <FileText className="mr-2 h-4 w-4" />
                Verify Multiple Licenses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {verificationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Results</CardTitle>
            <CardDescription>
              Results of your license verification requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>License Number</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiration Date</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.licenseNumber}</TableCell>
                      <TableCell>{result.state}</TableCell>
                      <TableCell>
                        {result.status || (result.error ? "Error" : "Unknown")}
                      </TableCell>
                      <TableCell>
                        {result.expirationDate || "N/A"}
                      </TableCell>
                      <TableCell>
                        {result.valid ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Valid
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            Invalid
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {result.error || result.message || "No additional information"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setVerificationResults([])}>
              Clear Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default NursysVerificationTab;
