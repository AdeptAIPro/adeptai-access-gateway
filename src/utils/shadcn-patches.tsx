
import React from 'react';
import {
  Tabs as OriginalTabs,
  TabsList as OriginalTabsList,
  TabsTrigger as OriginalTabsTrigger,
  TabsContent as OriginalTabsContent,
} from "@/components/ui/tabs";

import {
  DropdownMenu as OriginalDropdownMenu,
  DropdownMenuTrigger as OriginalDropdownMenuTrigger,
  DropdownMenuContent as OriginalDropdownMenuContent,
  DropdownMenuItem as OriginalDropdownMenuItem,
  DropdownMenuLabel as OriginalDropdownMenuLabel,
  DropdownMenuSeparator as OriginalDropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Select as OriginalSelect,
  SelectTrigger as OriginalSelectTrigger,
  SelectContent as OriginalSelectContent,
  SelectItem as OriginalSelectItem,
  SelectValue as OriginalSelectValue,
} from "@/components/ui/select";

import {
  Label as OriginalLabel,
} from "@/components/ui/label";

// Export patched Tabs components
export const Tabs = ({ children, ...props }: React.ComponentProps<typeof OriginalTabs> & { children: React.ReactNode }) => 
  <OriginalTabs {...props}>{children}</OriginalTabs>;

export const TabsList = ({ children, ...props }: React.ComponentProps<typeof OriginalTabsList> & { children: React.ReactNode }) => 
  <OriginalTabsList {...props}>{children}</OriginalTabsList>;

export const TabsTrigger = ({ children, ...props }: React.ComponentProps<typeof OriginalTabsTrigger> & { children: React.ReactNode }) => 
  <OriginalTabsTrigger {...props}>{children}</OriginalTabsTrigger>;

export const TabsContent = ({ children, ...props }: React.ComponentProps<typeof OriginalTabsContent> & { children: React.ReactNode }) => 
  <OriginalTabsContent {...props}>{children}</OriginalTabsContent>;

// Export patched DropdownMenu components
export const DropdownMenu = OriginalDropdownMenu;

export const DropdownMenuTrigger = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuTrigger> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuTrigger {...props}>{children}</OriginalDropdownMenuTrigger>;

export const DropdownMenuContent = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuContent> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuContent {...props}>{children}</OriginalDropdownMenuContent>;

export const DropdownMenuItem = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuItem> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuItem {...props}>{children}</OriginalDropdownMenuItem>;

export const DropdownMenuLabel = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuLabel> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuLabel {...props}>{children}</OriginalDropdownMenuLabel>;

export const DropdownMenuSeparator = OriginalDropdownMenuSeparator;

// Export patched Select components
export const Select = OriginalSelect; 

export const SelectTrigger = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectTrigger> & { children: React.ReactNode }) => 
  <OriginalSelectTrigger {...props}>{children}</OriginalSelectTrigger>;

export const SelectContent = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectContent> & { children: React.ReactNode }) => 
  <OriginalSelectContent {...props}>{children}</OriginalSelectContent>;

export const SelectItem = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectItem> & { children: React.ReactNode }) => 
  <OriginalSelectItem {...props}>{children}</OriginalSelectItem>;

export const SelectValue = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectValue> & { children: React.ReactNode }) => 
  <OriginalSelectValue {...props}>{children}</OriginalSelectValue>;

// Export patched Label component
export const Label = ({ children, ...props }: React.ComponentProps<typeof OriginalLabel> & { children: React.ReactNode }) => 
  <OriginalLabel {...props}>{children}</OriginalLabel>;
