
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

export const Select = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalSelect = require('@/components/ui/select').Select;
  return <OriginalSelect {...props}>{children}</OriginalSelect>;
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

export const SelectValue = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalSelectValue = require('@/components/ui/select').SelectValue;
  return <OriginalSelectValue {...props}>{children}</OriginalSelectValue>;
};

export const Progress = ({ value, className, ...props }: {
  value: number;
  className?: string;
  [key: string]: any;
}) => {
  const OriginalProgress = require('@/components/ui/progress').Progress;
  return <OriginalProgress value={value} className={className} {...props} />;
};

export const DropdownMenu = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalDropdownMenu = require('@/components/ui/dropdown-menu').DropdownMenu;
  return <OriginalDropdownMenu {...props}>{children}</OriginalDropdownMenu>;
};

export const DropdownMenuTrigger = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalDropdownMenuTrigger = require('@/components/ui/dropdown-menu').DropdownMenuTrigger;
  return <OriginalDropdownMenuTrigger {...props}>{children}</OriginalDropdownMenuTrigger>;
};

export const DropdownMenuContent = ({ children, align, ...props }: {
  children?: React.ReactNode;
  align?: string;
  [key: string]: any;
}) => {
  const OriginalDropdownMenuContent = require('@/components/ui/dropdown-menu').DropdownMenuContent;
  return <OriginalDropdownMenuContent {...props}>{children}</OriginalDropdownMenuContent>;
};

export const DropdownMenuItem = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalDropdownMenuItem = require('@/components/ui/dropdown-menu').DropdownMenuItem;
  return <OriginalDropdownMenuItem {...props}>{children}</OriginalDropdownMenuItem>;
};

export const DropdownMenuLabel = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalDropdownMenuLabel = require('@/components/ui/dropdown-menu').DropdownMenuLabel;
  return <OriginalDropdownMenuLabel {...props}>{children}</OriginalDropdownMenuLabel>;
};

export const DropdownMenuSeparator = (props: any) => {
  const OriginalDropdownMenuSeparator = require('@/components/ui/dropdown-menu').DropdownMenuSeparator;
  return <OriginalDropdownMenuSeparator {...props} />;
};

// Add Tabs components
export const Tabs = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalTabs = require('@/components/ui/tabs').Tabs;
  return <OriginalTabs {...props}>{children}</OriginalTabs>;
};

export const TabsList = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalTabsList = require('@/components/ui/tabs').TabsList;
  return <OriginalTabsList {...props}>{children}</OriginalTabsList>;
};

export const TabsTrigger = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalTabsTrigger = require('@/components/ui/tabs').TabsTrigger;
  return <OriginalTabsTrigger {...props}>{children}</OriginalTabsTrigger>;
};

export const TabsContent = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const OriginalTabsContent = require('@/components/ui/tabs').TabsContent;
  return <OriginalTabsContent {...props}>{children}</OriginalTabsContent>;
};
