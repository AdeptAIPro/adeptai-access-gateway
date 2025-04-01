
import { ComponentType } from "react";

export interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  category: string;
  connected: boolean;
}

export type IntegrationCategory = 
  | "All"
  | "VMS Systems"
  | "ATS" 
  | "Paid Job Boards"
  | "Free Job Posting"
  | "Social"
  | "Productivity"
  | "Compliance Boards"
  | "Background Boards"
  | "Onboarding Boards"
  | "CRM & HRMS";
