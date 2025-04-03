
import React from "react";
import { Loader2 } from "lucide-react";

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-adept" />
        <p>Loading checkout...</p>
      </div>
    </div>
  );
};

export default LoadingState;
