
import React from "react";

interface PlansSavingsBadgeProps {
  savings?: number;
}

const PlansSavingsBadge: React.FC<PlansSavingsBadgeProps> = ({ savings }) => {
  if (!savings) return null;
  
  return (
    <span className="ml-2 text-xs bg-adept py-0.5 px-1.5 rounded-full text-white">
      Save ${savings}/year
    </span>
  );
};

export default PlansSavingsBadge;
