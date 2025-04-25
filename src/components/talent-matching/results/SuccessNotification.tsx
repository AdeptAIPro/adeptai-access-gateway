
import React from "react";
import EnhancedNotification from "@/components/shared/EnhancedNotification";

interface SuccessNotificationProps {
  candidatesCount: number;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ candidatesCount }) => {
  return (
    <EnhancedNotification
      variant="success"
      title="AI Matching Complete"
      description={`Found ${candidatesCount} matching candidates based on your job description.`}
      actionLabel="View Results"
      autoDismiss={true}
      onDismiss={() => {}}
    />
  );
};

export default SuccessNotification;
