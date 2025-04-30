
import React from 'react';

export const Tabs = ({ children, value, onValueChange, className, ...props }: {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalTabs = require('@/components/ui/tabs').Tabs;
    return <OriginalTabs value={value} onValueChange={onValueChange} className={className} {...props}>{children}</OriginalTabs>;
  } catch (e) {
    console.error("Could not load Tabs component:", e);
    return <div className={className} {...props}>{children}</div>;
  }
};

export const TabsList = ({ children, className, ...props }: {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsList = require('@/components/ui/tabs').TabsList;
    return <OriginalTabsList className={className} {...props}>{children}</OriginalTabsList>;
  } catch (e) {
    console.error("Could not load TabsList component:", e);
    return <div className={`flex ${className}`} {...props}>{children}</div>;
  }
};

export const TabsTrigger = ({ children, value, className, ...props }: {
  children?: React.ReactNode;
  value: string;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsTrigger = require('@/components/ui/tabs').TabsTrigger;
    return <OriginalTabsTrigger value={value} className={className} {...props}>{children}</OriginalTabsTrigger>;
  } catch (e) {
    console.error("Could not load TabsTrigger component:", e);
    return <button className={className} {...props}>{children}</button>;
  }
};

export const TabsContent = ({ children, value, className, ...props }: {
  children?: React.ReactNode;
  value: string;
  className?: string;
  [key: string]: any;
}) => {
  try {
    const OriginalTabsContent = require('@/components/ui/tabs').TabsContent;
    return <OriginalTabsContent value={value} className={className} {...props}>{children}</OriginalTabsContent>;
  } catch (e) {
    console.error("Could not load TabsContent component:", e);
    return <div className={className} {...props}>{children}</div>;
  }
};
