
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const EnrichmentComplianceNote: React.FC = () => {
  return (
    <Alert className="mt-4 bg-amber-50 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">Compliance Note</AlertTitle>
      <AlertDescription className="text-amber-700">
        Ensure all data collection complies with privacy regulations like GDPR and CCPA. 
        These tools should be used ethically and in accordance with their terms of service.
      </AlertDescription>
    </Alert>
  );
};

export default EnrichmentComplianceNote;
