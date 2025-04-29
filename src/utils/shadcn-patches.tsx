
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

// Define types for our patched components
interface TabsProps extends React.ComponentProps<typeof OriginalTabs> { 
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

interface TabsListProps extends React.ComponentProps<typeof OriginalTabsList> { 
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps extends React.ComponentProps<typeof OriginalTabsTrigger> { 
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface TabsContentProps extends React.ComponentProps<typeof OriginalTabsContent> { 
  children: React.ReactNode;
  className?: string;
  value: string;
}

interface DropdownMenuTriggerProps extends React.ComponentProps<typeof OriginalDropdownMenuTrigger> { 
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuContentProps extends React.ComponentProps<typeof OriginalDropdownMenuContent> { 
  children: React.ReactNode;
  className?: string;
}

interface DropdownMenuItemProps extends React.ComponentProps<typeof OriginalDropdownMenuItem> { 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DropdownMenuLabelProps extends React.ComponentProps<typeof OriginalDropdownMenuLabel> { 
  children: React.ReactNode;
}

interface SelectTriggerProps extends React.ComponentProps<typeof OriginalSelectTrigger> { 
  children: React.ReactNode;
  className?: string;
}

interface SelectContentProps extends React.ComponentProps<typeof OriginalSelectContent> { 
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps extends React.ComponentProps<typeof OriginalSelectItem> { 
  children: React.ReactNode;
  value: string;
}

interface SelectValueProps extends React.ComponentProps<typeof OriginalSelectValue> { 
  children?: React.ReactNode;
}

interface LabelProps extends React.ComponentProps<typeof OriginalLabel> { 
  children: React.ReactNode;
  className?: string;
}

// Export patched Tabs components
export const Tabs: React.FC<TabsProps> = ({ children, className, defaultValue, ...props }) => 
  <OriginalTabs className={className} defaultValue={defaultValue} {...props}>{children}</OriginalTabs>;

export const TabsList: React.FC<TabsListProps> = ({ children, className, ...props }) => 
  <OriginalTabsList className={className} {...props}>{children}</OriginalTabsList>;

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, value, className, ...props }) => 
  <OriginalTabsTrigger value={value} className={className} {...props}>{children}</OriginalTabsTrigger>;

export const TabsContent: React.FC<TabsContentProps> = ({ children, className, value, ...props }) => 
  <OriginalTabsContent value={value} className={className} {...props}>{children}</OriginalTabsContent>;

// Export patched DropdownMenu components
export const DropdownMenu = OriginalDropdownMenu;

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, asChild, ...props }) => 
  <OriginalDropdownMenuTrigger asChild={asChild} {...props}>{children}</OriginalDropdownMenuTrigger>;

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, className, ...props }) => 
  <OriginalDropdownMenuContent className={className} {...props}>{children}</OriginalDropdownMenuContent>;

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick, className, ...props }) => 
  <OriginalDropdownMenuItem onClick={onClick} className={className} {...props}>{children}</OriginalDropdownMenuItem>;

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ children, ...props }) => 
  <OriginalDropdownMenuLabel {...props}>{children}</OriginalDropdownMenuLabel>;

export const DropdownMenuSeparator = OriginalDropdownMenuSeparator;

// Export patched Select components
export const Select = OriginalSelect; 

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, className, ...props }) => 
  <OriginalSelectTrigger className={className} {...props}>{children}</OriginalSelectTrigger>;

export const SelectContent: React.FC<SelectContentProps> = ({ children, className, ...props }) => 
  <OriginalSelectContent className={className} {...props}>{children}</OriginalSelectContent>;

export const SelectItem: React.FC<SelectItemProps> = ({ children, value, ...props }) => 
  <OriginalSelectItem value={value} {...props}>{children}</OriginalSelectItem>;

export const SelectValue: React.FC<SelectValueProps> = ({ children, ...props }) => 
  <OriginalSelectValue {...props}>{children}</OriginalSelectValue>;

// Export patched Label component
export const Label: React.FC<LabelProps> = ({ children, className, ...props }) => 
  <OriginalLabel className={className} {...props}>{children}</OriginalLabel>;
