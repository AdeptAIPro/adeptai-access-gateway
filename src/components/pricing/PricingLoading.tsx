
import React from "react";

const PricingLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default PricingLoading;
