
import React from "react";
import { Database, Upload, Calendar, Briefcase, Monitor, ClipboardCheck, UserCheck, FileBadge, Users } from "lucide-react";

export const getIconForIntegration = (name: string) => {
  const normalizedName = name.toLowerCase();
  
  // Default icon mapping based on name patterns
  if (normalizedName.includes('ats') || normalizedName.includes('tracking')) {
    return Database;
  } else if (normalizedName.includes('job') || normalizedName.includes('career')) {
    return Briefcase;
  } else if (normalizedName.includes('calendar') || normalizedName.includes('schedule')) {
    return Calendar;
  } else if (normalizedName.includes('vms') || normalizedName.includes('vendor')) {
    return Monitor;
  } else if (normalizedName.includes('compliance') || normalizedName.includes('check')) {
    return ClipboardCheck;
  } else if (normalizedName.includes('background')) {
    return UserCheck;
  } else if (normalizedName.includes('onboarding')) {
    return FileBadge;
  } else if (normalizedName.includes('crm') || normalizedName.includes('hrms')) {
    return Users;
  }
  
  // Default icon if no pattern matches
  return Upload;
};
