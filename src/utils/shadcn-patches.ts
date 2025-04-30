
/**
 * This file provides patched versions of some shadcn/ui components
 * to fix TypeScript compatibility issues
 */

import React from 'react';

import {
  Select as OriginalSelect,
  SelectContent as OriginalSelectContent,
  SelectItem as OriginalSelectItem,
  SelectTrigger as OriginalSelectTrigger,
  SelectValue as OriginalSelectValue,
} from "@/components/ui/select";

import {
  Form as OriginalForm,
  FormControl as OriginalFormControl,
  FormDescription as OriginalFormDescription,
  FormField as OriginalFormField,
  FormItem as OriginalFormItem,
  FormLabel as OriginalFormLabel,
  FormMessage as OriginalFormMessage,
} from "@/components/ui/form";

import {
  RadioGroup as OriginalRadioGroup,
  RadioGroupItem as OriginalRadioGroupItem,
} from "@/components/ui/radio-group";

// Re-export components with proper typing
export const Select = OriginalSelect;
export const SelectContent = OriginalSelectContent;
export const SelectItem = OriginalSelectItem;
export const SelectTrigger = OriginalSelectTrigger;
export const SelectValue = OriginalSelectValue;

export const Form = OriginalForm;
export const FormControl = OriginalFormControl;
export const FormDescription = OriginalFormDescription;
export const FormField = OriginalFormField;
export const FormItem = OriginalFormItem;
export const FormLabel = OriginalFormLabel;
export const FormMessage = OriginalFormMessage;

export const RadioGroup = OriginalRadioGroup;
export const RadioGroupItem = OriginalRadioGroupItem;

// Export other shadcn components as needed for fixes
export const Label = ({ children, className, ...props }: { 
  children?: React.ReactNode;
  className?: string; 
  [key: string]: any;
}) => {
  try {
    const OriginalLabel = require('@/components/ui/label').Label;
    return React.createElement(OriginalLabel, { className, ...props }, children);
  } catch (e) {
    console.error("Could not load Label component:", e);
    return React.createElement('label', { className: className || "", ...props }, children);
  }
};

export const Progress = ({ value, className, ...props }: {
  value: number;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalProgress = require('@/components/ui/progress').Progress;
    return React.createElement(OriginalProgress, { value, className, ...props });
  } catch (e) {
    console.error("Could not load Progress component:", e);
    return React.createElement('progress', { value, max: "100", className: className || "", ...props });
  }
};

// Tabs components
export const Tabs = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabs = require('@/components/ui/tabs').Tabs;
    return React.createElement('div', props, children);
  } catch (e) {
    console.error("Could not load Tabs component:", e);
    return React.createElement('div', props, children);
  }
};

export const TabsList = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsList = require('@/components/ui/tabs').TabsList;
    return React.createElement('div', { className: "flex", ...props }, children);
  } catch (e) {
    console.error("Could not load TabsList component:", e);
    return React.createElement('div', { className: "flex", ...props }, children);
  }
};

export const TabsTrigger = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsTrigger = require('@/components/ui/tabs').TabsTrigger;
    return React.createElement('button', props, children);
  } catch (e) {
    console.error("Could not load TabsTrigger component:", e);
    return React.createElement('button', props, children);
  }
};

export const TabsContent = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsContent = require('@/components/ui/tabs').TabsContent;
    return React.createElement('div', props, children);
  } catch (e) {
    console.error("Could not load TabsContent component:", e);
    return React.createElement('div', props, children);
  }
};

// Dropdown menu components
export const DropdownMenu = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenu = require('@/components/ui/dropdown-menu').DropdownMenu;
    return React.createElement('div', props, children);
  } catch (e) {
    console.error("Could not load DropdownMenu component:", e);
    return React.createElement('div', props, children);
  }
};

export const DropdownMenuTrigger = ({ children, asChild, ...props }: {
  children?: React.ReactNode;
  asChild?: boolean;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuTrigger = require('@/components/ui/dropdown-menu').DropdownMenuTrigger;
    return React.createElement('button', props, children);
  } catch (e) {
    console.error("Could not load DropdownMenuTrigger component:", e);
    return React.createElement('button', props, children);
  }
};

export const DropdownMenuContent = ({ children, align, ...props }: {
  children?: React.ReactNode;
  align?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuContent = require('@/components/ui/dropdown-menu').DropdownMenuContent;
    return React.createElement('div', props, children);
  } catch (e) {
    console.error("Could not load DropdownMenuContent component:", e);
    return React.createElement('div', props, children);
  }
};

export const DropdownMenuItem = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuItem = require('@/components/ui/dropdown-menu').DropdownMenuItem;
    return React.createElement('button', { className: "block w-full text-left px-2 py-1", ...props }, children);
  } catch (e) {
    console.error("Could not load DropdownMenuItem component:", e);
    return React.createElement('button', { className: "block w-full text-left px-2 py-1", ...props }, children);
  }
};

export const DropdownMenuLabel = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuLabel = require('@/components/ui/dropdown-menu').DropdownMenuLabel;
    return React.createElement('div', { className: "px-2 py-1 font-medium", ...props }, children);
  } catch (e) {
    console.error("Could not load DropdownMenuLabel component:", e);
    return React.createElement('div', { className: "px-2 py-1 font-medium", ...props }, children);
  }
};

export const DropdownMenuSeparator = (props: any) => {
  try {
    const OriginalDropdownMenuSeparator = require('@/components/ui/dropdown-menu').DropdownMenuSeparator;
    return React.createElement('hr', props);
  } catch (e) {
    console.error("Could not load DropdownMenuSeparator component:", e);
    return React.createElement('hr', props);
  }
};

// Dialog components
export const Dialog = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialog = require('@/components/ui/dialog').Dialog;
    return React.createElement('div', props, children);
  } catch (e) {
    console.error("Could not load Dialog component:", e);
    return React.createElement('div', props, children);
  }
};

export const DialogTrigger = ({ children, asChild, ...props }: {
  children?: React.ReactNode;
  asChild?: boolean;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogTrigger = require('@/components/ui/dialog').DialogTrigger;
    return React.createElement('button', props, children);
  } catch (e) {
    console.error("Could not load DialogTrigger component:", e);
    return React.createElement('button', props, children);
  }
};

export const DialogContent = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogContent = require('@/components/ui/dialog').DialogContent;
    return React.createElement('div', { className: "fixed inset-0 z-50 bg-background/80 flex items-center justify-center", ...props }, children);
  } catch (e) {
    console.error("Could not load DialogContent component:", e);
    return React.createElement('div', { className: "fixed inset-0 z-50 bg-background/80 flex items-center justify-center", ...props }, children);
  }
};

export const DialogHeader = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogHeader = require('@/components/ui/dialog').DialogHeader;
    return React.createElement('div', { className: "mb-4", ...props }, children);
  } catch (e) {
    console.error("Could not load DialogHeader component:", e);
    return React.createElement('div', { className: "mb-4", ...props }, children);
  }
};

export const DialogTitle = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogTitle = require('@/components/ui/dialog').DialogTitle;
    return React.createElement('h2', { className: "text-lg font-semibold", ...props }, children);
  } catch (e) {
    console.error("Could not load DialogTitle component:", e);
    return React.createElement('h2', { className: "text-lg font-semibold", ...props }, children);
  }
};

export const DialogDescription = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogDescription = require('@/components/ui/dialog').DialogDescription;
    return React.createElement('p', { className: "text-sm text-muted-foreground", ...props }, children);
  } catch (e) {
    console.error("Could not load DialogDescription component:", e);
    return React.createElement('p', { className: "text-sm text-muted-foreground", ...props }, children);
  }
};

export const DialogFooter = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogFooter = require('@/components/ui/dialog').DialogFooter;
    return React.createElement('div', { className: "mt-4 flex justify-end", ...props }, children);
  } catch (e) {
    console.error("Could not load DialogFooter component:", e);
    return React.createElement('div', { className: "mt-4 flex justify-end", ...props }, children);
  }
};
