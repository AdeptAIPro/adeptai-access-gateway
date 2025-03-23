
import React from "react";
import { Check, File, Search, Globe } from "lucide-react";

export const FileCheck: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <File className="w-full h-full" />
      <Check className="absolute bottom-0 right-0 w-1/2 h-1/2 text-green-500" />
    </div>
  );
};

// Add GoogleIcon as a custom icon since it's not available in lucide-react
export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <Globe className="w-full h-full" />
      {/* Using Globe as a placeholder for Google icon */}
    </div>
  );
};
