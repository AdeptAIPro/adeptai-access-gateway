
import React from 'react';

// Define proper interfaces for all components that include children props
interface TabsProps { 
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface TabsListProps { 
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps { 
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface TabsContentProps { 
  children: React.ReactNode;
  className?: string;
  value: string;
}

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps { 
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuContentProps { 
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuItemProps { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DropdownMenuLabelProps { 
  children: React.ReactNode;
}

interface SelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
}

interface SelectTriggerProps { 
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface SelectContentProps { 
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps { 
  children: React.ReactNode;
  value: string;
}

interface SelectValueProps { 
  children?: React.ReactNode;
  placeholder?: string;
}

interface LabelProps { 
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

interface RadioGroupProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
}

interface RadioGroupItemProps {
  value: string;
  className?: string;
}

interface ProgressProps {
  value: number;
  className?: string;
}

// Create mock components to satisfy TypeScript since we don't have the actual shadcn UI components
export const Tabs = ({ children, ...props }: TabsProps) => <div {...props}>{children}</div>;
export const TabsList = ({ children, ...props }: TabsListProps) => <div {...props}>{children}</div>;
export const TabsTrigger = ({ children, ...props }: TabsTriggerProps) => <button {...props}>{children}</button>;
export const TabsContent = ({ children, ...props }: TabsContentProps) => <div {...props}>{children}</div>;

export const DropdownMenu = ({ children }: DropdownMenuProps) => <div>{children}</div>;
export const DropdownMenuTrigger = ({ children, ...props }: DropdownMenuTriggerProps) => <button {...props}>{children}</button>;
export const DropdownMenuContent = ({ children, ...props }: DropdownMenuContentProps) => <div {...props}>{children}</div>;
export const DropdownMenuItem = ({ children, ...props }: DropdownMenuItemProps) => <div {...props}>{children}</div>;
export const DropdownMenuLabel = ({ children, ...props }: DropdownMenuLabelProps) => <div {...props}>{children}</div>;
export const DropdownMenuSeparator = () => <hr />;

export const Select = ({ children, ...props }: SelectProps) => <div {...props}>{children}</div>;
export const SelectTrigger = ({ children, ...props }: SelectTriggerProps) => <button {...props}>{children}</button>;
export const SelectContent = ({ children, ...props }: SelectContentProps) => <div {...props}>{children}</div>;
export const SelectItem = ({ children, ...props }: SelectItemProps) => <div {...props}>{children}</div>;
export const SelectValue = ({ children, ...props }: SelectValueProps) => <span {...props}>{children}</span>;

export const Label = ({ children, ...props }: LabelProps) => <label {...props}>{children}</label>;

export const RadioGroup = ({ children, ...props }: RadioGroupProps) => <div {...props}>{children}</div>;
export const RadioGroupItem = ({ ...props }: RadioGroupItemProps) => <input type="radio" {...props} />;

export const Progress = ({ ...props }: ProgressProps) => <div {...props}></div>;
