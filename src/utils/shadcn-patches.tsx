
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

// Create fixed versions of components that have issues
export const FixedLabel = (props: React.ComponentProps<typeof Label>) => {
  return <Label {...props} />;
};

export const FixedSelectTrigger = (props: React.ComponentProps<typeof SelectTrigger>) => {
  return <SelectTrigger {...props} />;
};

export const FixedSelectContent = (props: React.ComponentProps<typeof SelectContent>) => {
  return <SelectContent {...props} />;
};

export const FixedSelectItem = (props: React.ComponentProps<typeof SelectItem>) => {
  return <SelectItem {...props} />;
};

export const FixedTabsTrigger = (props: React.ComponentProps<typeof TabsTrigger>) => {
  return <TabsTrigger {...props} />;
};

export const FixedDropdownMenuTrigger = (props: React.ComponentProps<typeof DropdownMenuTrigger>) => {
  return <DropdownMenuTrigger {...props} />;
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
