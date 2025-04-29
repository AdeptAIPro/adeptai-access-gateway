
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
type TabsProps = React.ComponentProps<typeof OriginalTabs> & { 
  children: React.ReactNode;
  className?: string;
};

type TabsListProps = React.ComponentProps<typeof OriginalTabsList> & { 
  children: React.ReactNode;
  className?: string;
};

type TabsTriggerProps = React.ComponentProps<typeof OriginalTabsTrigger> & { 
  children: React.ReactNode;
};

type TabsContentProps = React.ComponentProps<typeof OriginalTabsContent> & { 
  children: React.ReactNode;
  className?: string;
};

type DropdownMenuTriggerProps = React.ComponentProps<typeof OriginalDropdownMenuTrigger> & { 
  children: React.ReactNode;
  asChild?: boolean;
};

type DropdownMenuContentProps = React.ComponentProps<typeof OriginalDropdownMenuContent> & { 
  children: React.ReactNode;
};

type DropdownMenuItemProps = React.ComponentProps<typeof OriginalDropdownMenuItem> & { 
  children: React.ReactNode;
  onClick?: () => void;
};

type DropdownMenuLabelProps = React.ComponentProps<typeof OriginalDropdownMenuLabel> & { 
  children: React.ReactNode;
};

type SelectTriggerProps = React.ComponentProps<typeof OriginalSelectTrigger> & { 
  children: React.ReactNode;
};

type SelectContentProps = React.ComponentProps<typeof OriginalSelectContent> & { 
  children: React.ReactNode;
};

type SelectItemProps = React.ComponentProps<typeof OriginalSelectItem> & { 
  children: React.ReactNode;
};

type SelectValueProps = React.ComponentProps<typeof OriginalSelectValue> & { 
  children?: React.ReactNode;
};

type LabelProps = React.ComponentProps<typeof OriginalLabel> & { 
  children: React.ReactNode;
};

// Export patched Tabs components
export const Tabs: React.FC<TabsProps> = ({ children, className, ...props }) => 
  <OriginalTabs className={className} {...props}>{children}</OriginalTabs>;

export const TabsList: React.FC<TabsListProps> = ({ children, className, ...props }) => 
  <OriginalTabsList className={className} {...props}>{children}</OriginalTabsList>;

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, ...props }) => 
  <OriginalTabsTrigger {...props}>{children}</OriginalTabsTrigger>;

export const TabsContent: React.FC<TabsContentProps> = ({ children, className, ...props }) => 
  <OriginalTabsContent className={className} {...props}>{children}</OriginalTabsContent>;

// Export patched DropdownMenu components
export const DropdownMenu = OriginalDropdownMenu;

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ children, asChild, ...props }) => 
  <OriginalDropdownMenuTrigger asChild={asChild} {...props}>{children}</OriginalDropdownMenuTrigger>;

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, ...props }) => 
  <OriginalDropdownMenuContent {...props}>{children}</OriginalDropdownMenuContent>;

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick, ...props }) => 
  <OriginalDropdownMenuItem onClick={onClick} {...props}>{children}</OriginalDropdownMenuItem>;

export const DropdownMenuLabel: React.FC<DropdownMenuLabelProps> = ({ children, ...props }) => 
  <OriginalDropdownMenuLabel {...props}>{children}</OriginalDropdownMenuLabel>;

export const DropdownMenuSeparator = OriginalDropdownMenuSeparator;

// Export patched Select components
export const Select = OriginalSelect; 

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children, ...props }) => 
  <OriginalSelectTrigger {...props}>{children}</OriginalSelectTrigger>;

export const SelectContent: React.FC<SelectContentProps> = ({ children, ...props }) => 
  <OriginalSelectContent {...props}>{children}</OriginalSelectContent>;

export const SelectItem: React.FC<SelectItemProps> = ({ children, ...props }) => 
  <OriginalSelectItem {...props}>{children}</OriginalSelectItem>;

export const SelectValue: React.FC<SelectValueProps> = ({ children, ...props }) => 
  <OriginalSelectValue {...props}>{children}</OriginalSelectValue>;

// Export patched Label component
export const Label: React.FC<LabelProps> = ({ children, ...props }) => 
  <OriginalLabel {...props}>{children}</OriginalLabel>;
