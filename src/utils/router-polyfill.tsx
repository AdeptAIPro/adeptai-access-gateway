
import React from 'react';

// These would normally be imported from react-router-dom
interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

interface NavLinkProps extends LinkProps {
  activeClassName?: string;
  end?: boolean;
}

interface RouteProps {
  children?: React.ReactNode;
  path: string;
  element?: React.ReactNode;
}

// Export polyfill versions of react-router-dom components and hooks
export const BrowserRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Routes = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const Route = ({ children, path, element }: RouteProps) => {
  // If element prop is provided, use it; otherwise use children
  return <div>{element || children}</div>;
};

export const Link = ({ to, children, className }: LinkProps) => {
  return <a href={to} className={className}>{children}</a>;
};

export const NavLink = ({ to, children, className, activeClassName, end }: NavLinkProps) => {
  const isActive = window.location.pathname === to || 
    (!end && window.location.pathname.startsWith(to));
  const combinedClassName = isActive && activeClassName 
    ? `${className || ''} ${activeClassName}`.trim()
    : className;
  
  return <a href={to} className={combinedClassName}>{children}</a>;
};

export const useNavigate = () => {
  return (path: string) => {
    console.log(`Navigate to: ${path}`);
    window.location.href = path;
  };
};

export const useParams = () => {
  return {};
};

export const useLocation = () => {
  return { pathname: window.location.pathname, search: '', hash: '', state: null };
};

export const Navigate = ({ to }: { to: string }) => null;
export const Outlet = () => null;
