
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
