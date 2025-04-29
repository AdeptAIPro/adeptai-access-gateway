
import React from 'react';

// This file contains wrapper components for shadcn/ui components
// to fix issues with TypeScript props like missing children support

export const Label = ({ children, className, ...props }: { 
  children?: React.ReactNode;
  className?: string; 
  [key: string]: any;
}) => {
  try {
    const OriginalLabel = require('@/components/ui/label').Label;
    return <OriginalLabel className={className} {...props}>{children}</OriginalLabel>;
  } catch (e) {
    console.error("Could not load Label component:", e);
    return <label className={className} {...props}>{children}</label>;
  }
};

export const RadioGroup = ({ children, className, onValueChange, defaultValue, ...props }: {
  children?: React.ReactNode;
  className?: string;
  onValueChange?: (...args: any[]) => void;
  defaultValue?: any;
  [key: string]: any;
}) => {
  try {
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
  } catch (e) {
    console.error("Could not load RadioGroup component:", e);
    return <div className={className} {...props}>{children}</div>;
  }
};

export const RadioGroupItem = ({ value, className, ...props }: {
  value: string;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalRadioGroupItem = require('@/components/ui/radio-group').RadioGroupItem;
    return <OriginalRadioGroupItem value={value} className={className} {...props} />;
  } catch (e) {
    console.error("Could not load RadioGroupItem component:", e);
    return <input type="radio" value={value} className={className} {...props} />;
  }
};

export const Select = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalSelect = require('@/components/ui/select').Select;
    return <OriginalSelect {...props}>{children}</OriginalSelect>;
  } catch (e) {
    console.error("Could not load Select component:", e);
    return <div {...props}>{children}</div>;
  }
};

export const SelectTrigger = ({ children, className, ...props }: {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalSelectTrigger = require('@/components/ui/select').SelectTrigger;
    return <OriginalSelectTrigger className={className} {...props}>{children}</OriginalSelectTrigger>;
  } catch (e) {
    console.error("Could not load SelectTrigger component:", e);
    return <button className={className} {...props}>{children}</button>;
  }
};

export const SelectContent = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalSelectContent = require('@/components/ui/select').SelectContent;
    return <OriginalSelectContent {...props}>{children}</OriginalSelectContent>;
  } catch (e) {
    console.error("Could not load SelectContent component:", e);
    return <div {...props}>{children}</div>;
  }
};

export const SelectItem = ({ children, value, ...props }: {
  children?: React.ReactNode;
  value: string;
  [key: string]: any;
}) => {
  try {
    const OriginalSelectItem = require('@/components/ui/select').SelectItem;
    return <OriginalSelectItem value={value} {...props}>{children}</OriginalSelectItem>;
  } catch (e) {
    console.error("Could not load SelectItem component:", e);
    return <option value={value} {...props}>{children}</option>;
  }
};

export const SelectValue = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalSelectValue = require('@/components/ui/select').SelectValue;
    return <OriginalSelectValue {...props}>{children}</OriginalSelectValue>;
  } catch (e) {
    console.error("Could not load SelectValue component:", e);
    return <span {...props}>{children}</span>;
  }
};

export const Progress = ({ value, className, ...props }: {
  value: number;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalProgress = require('@/components/ui/progress').Progress;
    return <OriginalProgress value={value} className={className} {...props} />;
  } catch (e) {
    console.error("Could not load Progress component:", e);
    return <progress value={value} max="100" className={className} {...props} />;
  }
};

export const DropdownMenu = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenu = require('@/components/ui/dropdown-menu').DropdownMenu;
    return <OriginalDropdownMenu {...props}>{children}</OriginalDropdownMenu>;
  } catch (e) {
    console.error("Could not load DropdownMenu component:", e);
    return <div {...props}>{children}</div>;
  }
};

export const DropdownMenuTrigger = ({ children, asChild, ...props }: {
  children?: React.ReactNode;
  asChild?: boolean;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuTrigger = require('@/components/ui/dropdown-menu').DropdownMenuTrigger;
    return <OriginalDropdownMenuTrigger asChild={asChild} {...props}>{children}</OriginalDropdownMenuTrigger>;
  } catch (e) {
    console.error("Could not load DropdownMenuTrigger component:", e);
    return <button {...props}>{children}</button>;
  }
};

export const DropdownMenuContent = ({ children, align, ...props }: {
  children?: React.ReactNode;
  align?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuContent = require('@/components/ui/dropdown-menu').DropdownMenuContent;
    return <OriginalDropdownMenuContent align={align} {...props}>{children}</OriginalDropdownMenuContent>;
  } catch (e) {
    console.error("Could not load DropdownMenuContent component:", e);
    return <div {...props}>{children}</div>;
  }
};

export const DropdownMenuItem = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuItem = require('@/components/ui/dropdown-menu').DropdownMenuItem;
    return <OriginalDropdownMenuItem {...props}>{children}</OriginalDropdownMenuItem>;
  } catch (e) {
    console.error("Could not load DropdownMenuItem component:", e);
    return <button className="block w-full text-left px-2 py-1" {...props}>{children}</button>;
  }
};

export const DropdownMenuLabel = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDropdownMenuLabel = require('@/components/ui/dropdown-menu').DropdownMenuLabel;
    return <OriginalDropdownMenuLabel {...props}>{children}</OriginalDropdownMenuLabel>;
  } catch (e) {
    console.error("Could not load DropdownMenuLabel component:", e);
    return <div className="px-2 py-1 font-medium" {...props}>{children}</div>;
  }
};

export const DropdownMenuSeparator = (props: any) => {
  try {
    const OriginalDropdownMenuSeparator = require('@/components/ui/dropdown-menu').DropdownMenuSeparator;
    return <OriginalDropdownMenuSeparator {...props} />;
  } catch (e) {
    console.error("Could not load DropdownMenuSeparator component:", e);
    return <hr {...props} />;
  }
};

// Add Tabs components
export const Tabs = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabs = require('@/components/ui/tabs').Tabs;
    return <OriginalTabs {...props}>{children}</OriginalTabs>;
  } catch (e) {
    console.error("Could not load Tabs component:", e);
    return <div {...props}>{children}</div>;
  }
};

export const TabsList = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsList = require('@/components/ui/tabs').TabsList;
    return <OriginalTabsList {...props}>{children}</OriginalTabsList>;
  } catch (e) {
    console.error("Could not load TabsList component:", e);
    return <div className="flex" {...props}>{children}</div>;
  }
};

export const TabsTrigger = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsTrigger = require('@/components/ui/tabs').TabsTrigger;
    return <OriginalTabsTrigger {...props}>{children}</OriginalTabsTrigger>;
  } catch (e) {
    console.error("Could not load TabsTrigger component:", e);
    return <button {...props}>{children}</button>;
  }
};

export const TabsContent = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsContent = require('@/components/ui/tabs').TabsContent;
    return <OriginalTabsContent {...props}>{children}</OriginalTabsContent>;
  } catch (e) {
    console.error("Could not load TabsContent component:", e);
    return <div {...props}>{children}</div>;
  }
};

// Add dialog components
export const Dialog = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialog = require('@/components/ui/dialog').Dialog;
    return <OriginalDialog {...props}>{children}</OriginalDialog>;
  } catch (e) {
    console.error("Could not load Dialog component:", e);
    return <div {...props}>{children}</div>;
  }
};

export const DialogTrigger = ({ children, asChild, ...props }: {
  children?: React.ReactNode;
  asChild?: boolean;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogTrigger = require('@/components/ui/dialog').DialogTrigger;
    return <OriginalDialogTrigger asChild={asChild} {...props}>{children}</OriginalDialogTrigger>;
  } catch (e) {
    console.error("Could not load DialogTrigger component:", e);
    return <button {...props}>{children}</button>;
  }
};

export const DialogContent = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogContent = require('@/components/ui/dialog').DialogContent;
    return <OriginalDialogContent {...props}>{children}</OriginalDialogContent>;
  } catch (e) {
    console.error("Could not load DialogContent component:", e);
    return <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center" {...props}>{children}</div>;
  }
};

export const DialogHeader = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogHeader = require('@/components/ui/dialog').DialogHeader;
    return <OriginalDialogHeader {...props}>{children}</OriginalDialogHeader>;
  } catch (e) {
    console.error("Could not load DialogHeader component:", e);
    return <div className="mb-4" {...props}>{children}</div>;
  }
};

export const DialogTitle = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogTitle = require('@/components/ui/dialog').DialogTitle;
    return <OriginalDialogTitle {...props}>{children}</OriginalDialogTitle>;
  } catch (e) {
    console.error("Could not load DialogTitle component:", e);
    return <h2 className="text-lg font-semibold" {...props}>{children}</h2>;
  }
};

export const DialogDescription = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogDescription = require('@/components/ui/dialog').DialogDescription;
    return <OriginalDialogDescription {...props}>{children}</OriginalDialogDescription>;
  } catch (e) {
    console.error("Could not load DialogDescription component:", e);
    return <p className="text-sm text-muted-foreground" {...props}>{children}</p>;
  }
};

export const DialogFooter = ({ children, ...props }: {
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  try {
    const OriginalDialogFooter = require('@/components/ui/dialog').DialogFooter;
    return <OriginalDialogFooter {...props}>{children}</OriginalDialogFooter>;
  } catch (e) {
    console.error("Could not load DialogFooter component:", e);
    return <div className="mt-4 flex justify-end" {...props}>{children}</div>;
  }
};
