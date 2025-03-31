
import { toast } from "@/components/ui/use-toast";

export interface LicenseVerificationRequest {
  licenseNumber: string;
  state: string;
}

export interface LicenseVerificationResult {
  licenseNumber: string;
  state: string;
  valid: boolean;
  status?: string;
  expirationDate?: string;
  message?: string;
  error?: string;
}

export interface CertificationVerificationRequest {
  profileUrl: string;
  certificationType?: string;
  includeSkills?: boolean;
}

export interface CertificationVerificationResult {
  name: string;
  profileId: string;
  certifications: string[];
  skills: string[];
  isVerified: boolean;
  source: string;
  lastVerified: string;
  details?: string;
}

// Service to handle Nursys license verification
export const verifyNurseLicense = async (request: LicenseVerificationRequest): Promise<LicenseVerificationResult> => {
  try {
    const response = await fetch(`/api/v1/nursys/license/${request.licenseNumber}?state=${request.state}`);
    const data = await response.json();

    if (response.ok) {
      return {
        licenseNumber: request.licenseNumber,
        state: request.state,
        valid: data.status === "ACTIVE",
        status: data.status,
        expirationDate: data.expirationDate,
        message: data.status === "ACTIVE" 
          ? "License is valid and active" 
          : "License is not active"
      };
    } else {
      return {
        licenseNumber: request.licenseNumber,
        state: request.state,
        valid: false,
        error: data.message || "Verification failed"
      };
    }
  } catch (error) {
    console.error("Error verifying nurse license:", error);
    return {
      licenseNumber: request.licenseNumber,
      state: request.state,
      valid: false,
      error: "Connection error"
    };
  }
};

// Service to handle bulk license verification
export const verifyNurseLicensesBulk = async (requests: LicenseVerificationRequest[]): Promise<LicenseVerificationResult[]> => {
  try {
    // Transform to the format expected by the API
    const licenseRequests = requests.map(req => ({
      license_number: req.licenseNumber,
      state: req.state
    }));

    const response = await fetch('/api/v1/nursys/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(licenseRequests)
    });

    const data = await response.json();

    if (response.ok) {
      // Transform back to our app's format
      return data.results.map((result: any) => ({
        licenseNumber: result.license_number,
        state: result.state,
        valid: result.valid,
        status: result.status,
        expirationDate: result.expiration_date,
        message: result.message,
        error: result.error
      }));
    } else {
      toast({
        title: "Verification Failed",
        description: data.message || "Could not complete bulk verification",
        variant: "destructive"
      });
      return [];
    }
  } catch (error) {
    console.error("Error in bulk verification:", error);
    toast({
      title: "Error",
      description: "Failed to connect to verification service",
      variant: "destructive"
    });
    return [];
  }
};

// Service to handle IT certification verification through LinkedIn
export const verifyITCertifications = async (request: CertificationVerificationRequest): Promise<CertificationVerificationResult | null> => {
  try {
    // This would be a real API call in a production environment
    // For now we'll simulate a response
    
    // Mock data - in production, this would come from an API
    const mockResult: CertificationVerificationResult = {
      name: "John Doe",
      profileId: "john-doe-12345",
      certifications: ["AWS Solutions Architect", "Azure Administrator"],
      skills: ["React", "TypeScript", "Cloud Architecture", "DevOps", "Docker", "Kubernetes"],
      isVerified: true,
      source: "LinkedIn",
      lastVerified: new Date().toISOString(),
      details: "Profile credentials verified through LinkedIn"
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return mockResult;
  } catch (error) {
    console.error("Error verifying IT certifications:", error);
    toast({
      title: "Error",
      description: "Failed to verify IT certifications",
      variant: "destructive"
    });
    return null;
  }
};
