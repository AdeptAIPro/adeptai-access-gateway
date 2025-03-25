
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const TalentSearchInfo: React.FC = () => {
  return (
    <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Connect your job boards</AlertTitle>
      <AlertDescription>
        To search across multiple talent sources, connect your job boards in the Integrations section.
      </AlertDescription>
    </Alert>
  );
};

export default TalentSearchInfo;
