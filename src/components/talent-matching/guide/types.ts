
import { LucideIcon } from "lucide-react";

/**
 * Interface for a step in the talent matching guide
 */
export interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  points: string[];
}

/**
 * Props for the Steps Guide component
 */
export interface StepsGuideProps {
  steps: Step[];
}

/**
 * Interface for an AI model in the talent matching guide
 */
export interface AIModel {
  icon: React.ElementType;
  name: string;
  description: string;
  accuracy: number;
  complexity: string;
  complexityColor: string;
}

/**
 * Props for the AI Models Section component
 */
export interface AIModelsSectionProps {
  models: AIModel[];
}

/**
 * Props for the User Guide component
 */
export interface UserGuideProps {
  steps?: Step[];
  models?: AIModel[];
}
