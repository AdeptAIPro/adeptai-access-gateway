
import React from 'react';

// Re-export react-router-dom components
export { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  NavLink, 
  useNavigate, 
  useParams, 
  useLocation, 
  Navigate, 
  Outlet 
} from 'react-router-dom';

// Create polyfill implementations that will be used if react-router-dom is not available
// These are declared outside the conditional to avoid syntax errors
// These polyfill components mimic the basic functionality of react-router-dom
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

// Define polyfill components outside of conditional blocks
const PolyfillBrowserRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const PolyfillRoutes = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

const PolyfillRoute = ({ children, path, element }: RouteProps) => {
  // If element prop is provided, use it; otherwise use children
  return <div>{element || children}</div>;
};

const PolyfillLink = ({ to, children, className }: LinkProps) => {
  return <a href={to} className={className}>{children}</a>;
};

const PolyfillNavLink = ({ to, children, className, activeClassName, end }: NavLinkProps) => {
  const isActive = window.location.pathname === to || 
    (!end && window.location.pathname.startsWith(to));
  const combinedClassName = isActive && activeClassName 
    ? `${className || ''} ${activeClassName}`.trim()
    : className;
  
  return <a href={to} className={combinedClassName}>{children}</a>;
};

const PolyfillUseNavigate = () => {
  return (path: string) => {
    console.log(`Navigate to: ${path}`);
    window.location.href = path;
  };
};

const PolyfillUseParams = () => {
  return {};
};

const PolyfillUseLocation = () => {
  return { pathname: window.location.pathname, search: '', hash: '', state: null };
};

const PolyfillNavigate = ({ to }: { to: string }) => null;
const PolyfillOutlet = () => null;

// Check if the imported components are undefined and export polyfills conditionally
// This approach only uses the polyfills at runtime if needed, but avoids syntax errors
export const Router = typeof BrowserRouter !== 'undefined' ? BrowserRouter : PolyfillBrowserRouter;
export const RoutesContainer = typeof Routes !== 'undefined' ? Routes : PolyfillRoutes;
export const RouteComponent = typeof Route !== 'undefined' ? Route : PolyfillRoute;
export const LinkComponent = typeof Link !== 'undefined' ? Link : PolyfillLink;
export const NavLinkComponent = typeof NavLink !== 'undefined' ? NavLink : PolyfillNavLink;
export const NavigateFn = typeof useNavigate !== 'undefined' ? useNavigate : PolyfillUseNavigate;
export const ParamsFn = typeof useParams !== 'undefined' ? useParams : PolyfillUseParams;
export const LocationFn = typeof useLocation !== 'undefined' ? useLocation : PolyfillUseLocation;
export const NavigateComponent = typeof Navigate !== 'undefined' ? Navigate : PolyfillNavigate;
export const OutletComponent = typeof Outlet !== 'undefined' ? Outlet : PolyfillOutlet;
