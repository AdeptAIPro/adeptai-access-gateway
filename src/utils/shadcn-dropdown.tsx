
import React from 'react';

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
