
import { ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<any> {
  children?: ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
}
