
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
      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="#4285F4"
        />
      </svg>
    </div>
  );
};

// For LinkedIn
export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          fill="#0077B5"
        />
      </svg>
    </div>
  );
};

// For Facebook
export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          fill="#1877F2"
        />
      </svg>
    </div>
  );
};

// For Slack
export const SlackIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-6.313A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521v-6.312A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
          fill="#E01E5A"
        />
      </svg>
    </div>
  );
};

// For SAP
export const SAPIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.13 11.511v-3.82h3.813v3.82zm0 3.813v3.814h3.813v-3.814zm-3.814-3.813V7.69H16.13v3.82zm0 3.813v3.814H16.13v-3.814zm0 0H8.503v3.814h3.813zm0-3.813H8.503V7.69h3.813zm-3.813 0H4.69v3.813h3.813zm0 3.813H4.69v3.814h3.813zm-3.813 0H.877v3.814H4.69zm0-3.813H.877V7.69H4.69zm0-3.813H.877V3.878H4.69zm3.813 0H4.69V3.878h3.813zm3.813 0H8.503V3.878H16.13zm0 0v-3.82h3.813v3.82zm3.813-3.82h3.813v3.82h-3.813zm0 3.82h3.813v3.82h-3.813z"
          fill="#0077B5"
        />
      </svg>
    </div>
  );
};

// For Workday
export const WorkdayIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm0 1.875c5.578 0 10.125 4.547 10.125 10.125S17.578 22.125 12 22.125 1.875 17.578 1.875 12 6.422 1.875 12 1.875zM7.5 7.5v3.75h1.875v1.875c0 1.875 1.5 3.375 3.375 3.375s3.375-1.5 3.375-3.375V9.375h-1.875v3.75c0 .824-.676 1.5-1.5 1.5s-1.5-.676-1.5-1.5V9.375H9.375V7.5H7.5z"
          fill="#FF6D70"
        />
      </svg>
    </div>
  );
};

// Generic company logo using first letter
export const CompanyLogo: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const firstLetter = name.charAt(0).toUpperCase();
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-yellow-100 text-yellow-600",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
    "bg-indigo-100 text-indigo-600",
    "bg-red-100 text-red-600",
    "bg-orange-100 text-orange-600",
    "bg-teal-100 text-teal-600",
    "bg-cyan-100 text-cyan-600"
  ];
  
  // Use a deterministic color based on the name
  const colorIndex = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const colorClass = colors[colorIndex];
  
  return (
    <div className={`flex items-center justify-center rounded-md ${colorClass} font-bold ${className}`}>
      {firstLetter}
    </div>
  );
};
