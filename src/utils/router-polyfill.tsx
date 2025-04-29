
import React from 'react';

// These would normally be imported from react-router-dom
interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

// Export polyfill versions of react-router-dom components and hooks
export const BrowserRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Routes = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Route = ({ children, path }: { children: React.ReactNode; path: string }) => <div>{children}</div>;

export const Link = ({ to, children, className }: LinkProps) => {
  return <a href={to} className={className}>{children}</a>;
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
