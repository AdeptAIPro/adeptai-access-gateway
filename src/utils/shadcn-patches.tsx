
import React from 'react';

// Import original components with proper type definitions
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Label,
} from "@/components/ui/label";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

// Create properly typed wrapper components
export const FixedLabel = ({ children, className, ...props }: React.HTMLProps<HTMLLabelElement>) => {
  return <Label className={className} {...props}>{children}</Label>;
};

export const FixedSelectTrigger = ({ children, className, ...props }: React.HTMLProps<HTMLButtonElement> & { children?: React.ReactNode }) => {
  return <SelectTrigger className={className} {...props}>{children}</SelectTrigger>;
};

export const FixedSelectContent = ({ children, ...props }: React.HTMLProps<HTMLDivElement> & { children?: React.ReactNode }) => {
  return <SelectContent {...props}>{children}</SelectContent>;
};

export const FixedSelectItem = ({ children, value, ...props }: React.HTMLProps<HTMLDivElement> & { value: string, children?: React.ReactNode }) => {
  return <SelectItem value={value} {...props}>{children}</SelectItem>;
};

export const FixedRadioGroup = ({ children, onValueChange, defaultValue, className, ...props }: React.HTMLProps<HTMLDivElement> & { 
  onValueChange?: (value: string) => void, 
  defaultValue?: string,
  children?: React.ReactNode 
}) => {
  return <RadioGroup onValueChange={onValueChange} defaultValue={defaultValue} className={className} {...props}>{children}</RadioGroup>;
};

// Re-export all the components
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  RadioGroup,
  RadioGroupItem,
};
