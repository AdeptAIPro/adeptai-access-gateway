
import React from 'react';

// This file contains wrapper components for shadcn/ui components
// to fix issues with TypeScript props like missing children support

export const Label = ({ children, className, ...props }: { 
  children?: React.ReactNode;
  className?: string; 
  [key: string]: any;
}) => {
  const OriginalLabel = require('@/components/ui/label').Label;
  return <OriginalLabel className={className} {...props}>{children}</OriginalLabel>;
};

export const RadioGroup = ({ children, className, onValueChange, defaultValue, ...props }: {
  children?: React.ReactNode;
  className?: string;
  onValueChange?: (...args: any[]) => void;
  defaultValue?: any;
  [key: string]: any;
}) => {
  const OriginalRadioGroup = require('@/components/ui/radio-group').RadioGroup;
  return (
    <OriginalRadioGroup 
      className={className} 
      onValueChange={onValueChange} 
      defaultValue={defaultValue}
      {...props}
    >
      {children}
    </OriginalRadioGroup>
  );
};

export const RadioGroupItem = ({ value, className, ...props }: {
  value: string;
  className?: string;
  [key: string]: any;
}) => {
  const OriginalRadioGroupItem = require('@/components/ui/radio-group').RadioGroupItem;
  return <OriginalRadioGroupItem value={value} className={className} {...props} />;
};

export const SelectTrigger = ({ children, className, ...props }: {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const OriginalSelectTrigger = require('@/components/ui/select').SelectTrigger;
  return <OriginalSelectTrigger className={className} {...props}>{children}</OriginalSelectTrigger>;
};

export const SelectContent = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalSelectContent = require('@/components/ui/select').SelectContent;
  return <OriginalSelectContent {...props}>{children}</OriginalSelectContent>;
};

export const SelectItem = ({ children, value, ...props }: {
  children?: React.ReactNode;
  value: string;
  [key: string]: any;
}) => {
  const OriginalSelectItem = require('@/components/ui/select').SelectItem;
  return <OriginalSelectItem value={value} {...props}>{children}</OriginalSelectItem>;
};

export const Progress = ({ value, className, ...props }: {
  value: number;
  className?: string;
  [key: string]: any;
}) => {
  const OriginalProgress = require('@/components/ui/progress').Progress;
  return <OriginalProgress value={value} className={className} {...props} />;
};

export const DropdownMenuContent = ({ children, align, ...props }: {
  children?: React.ReactNode;
  align?: string;
  [key: string]: any;
}) => {
  const OriginalDropdownMenuContent = require('@/components/ui/dropdown-menu').DropdownMenuContent;
  return <OriginalDropdownMenuContent {...props}>{children}</OriginalDropdownMenuContent>;
};
