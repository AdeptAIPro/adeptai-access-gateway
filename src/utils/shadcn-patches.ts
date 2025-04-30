
/**
 * This file provides patched versions of some shadcn/ui components
 * to fix TypeScript compatibility issues
 */

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

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from './shadcn-tabs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './shadcn-dropdown';

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

// Re-export tabs components
export { Tabs, TabsContent, TabsList, TabsTrigger };

// Re-export dropdown menu components
export { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
};

// Export other shadcn components as needed for fixes
export const Label = ({ children, className, ...props }: { 
  children?: React.ReactNode;
  className?: string; 
  [key: string]: any;
}) => {
  try {
    const OriginalLabel = require('@/components/ui/label').Label;
    return <label className={className} {...props}>{children}</label>;
  } catch (e) {
    console.error("Could not load Label component:", e);
    return <label className={className} {...props}>{children}</label>;
  }
};

export const Progress = ({ value, className, ...props }: {
  value: number;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalProgress = require('@/components/ui/progress').Progress;
    return <progress value={value} max="100" className={className} {...props} />;
  } catch (e) {
    console.error("Could not load Progress component:", e);
    return <progress value={value} max="100" className={className} {...props} />;
  }
};
