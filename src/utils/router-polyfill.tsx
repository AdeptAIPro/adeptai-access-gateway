import React from 'react';
import { 
  BrowserRouter as OriginalBrowserRouter,
  Routes as OriginalRoutes,
  Route as OriginalRoute,
  Link as OriginalLink,
  useNavigate as originalUseNavigate,
  useParams as originalUseParams,
  useLocation as originalUseLocation,
  Navigate as OriginalNavigate,
  Outlet as OriginalOutlet
} from 'react-router-dom';

// Re-export everything from react-router-dom
export * from 'react-router-dom';

// Explicitly re-export BrowserRouter
export const BrowserRouter = ({ children, basename = '' }: { children: React.ReactNode; basename?: string }) => {
  try {
    return <OriginalBrowserRouter basename={basename}>{children}</OriginalBrowserRouter>;
  } catch (e) {
    console.error("Error using BrowserRouter, using fallback", e);
    return <div>{children}</div>;
  }
};

export const Routes = OriginalRoutes;
export const Route = OriginalRoute;
export const Navigate = OriginalNavigate;
export const Outlet = OriginalOutlet;

// Create a simple Link component that uses anchor tags as fallback
interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, className, children }) => {
  try {
    return <OriginalLink to={to} className={className}>{children}</OriginalLink>;
  } catch (e) {
    return <a href={to} className={className}>{children}</a>;
  }
};

// Create a simple useNavigate hook that uses window.location as fallback
export const useNavigate = () => {
  try {
    return originalUseNavigate();
  } catch (e) {
    return (path: string) => {
      window.location.href = path;
    };
  }
};

export const useParams = originalUseParams;
export const useLocation = originalUseLocation;
