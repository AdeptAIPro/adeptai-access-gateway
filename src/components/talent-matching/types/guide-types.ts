
import { LucideIcon } from "lucide-react";

export interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  points: string[];
}

export interface StepsGuideProps {
  steps: Step[];
}

export interface AIModel {
  icon: React.ElementType;
  name: string;
  description: string;
  accuracy: number;
  complexity: string;
  complexityColor: string;
}

export interface AIModelsSectionProps {
  models: AIModel[];
}

export interface UserGuideProps {
  steps?: Step[];
  models?: AIModel[];
}
