
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Router context
interface RouterContextType {
  pathname: string;
  navigate: (to: string) => void;
  basename?: string;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  navigate: () => {},
  basename: '',
});

// BrowserRouter component
export const BrowserRouter = ({ children, basename = '' }: { children: ReactNode, basename?: string }) => {
  const [pathname, setPathname] = useState(window.location.pathname);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPathname(to);
  };

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, navigate, basename }}>
      {children}
    </RouterContext.Provider>
  );
};

// Routes component
interface RouteProps {
  path: string;
  element: React.ReactNode;
}

export const Routes = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Route component
export const Route = ({ path, element }: RouteProps) => {
  const { pathname, basename = '' } = useContext(RouterContext);
  
  // Adjust path with basename if provided
  const fullPath = basename ? `${basename}${path}` : path;
  
  // Simple path matching (this is highly simplified)
  const isMatch = path === '*' || pathname === fullPath || 
    (path.includes('*') && pathname.startsWith(fullPath.replace('*', '')));
  
  return isMatch ? <>{element}</> : null;
};

// Link component
export const Link = ({ 
  to, 
  children, 
  className = '',
  ...rest
}: { 
  to: string; 
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const { navigate, basename = '' } = useContext(RouterContext);
  
  // Adjust "to" with basename if provided
  const fullPath = basename ? `${basename}${to}` : to;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(fullPath);
  };
  
  return (
    <a href={fullPath} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};

// NavLink component (simplified)
export const NavLink = ({ 
  to, 
  children,
  className = '',
  ...rest
}: { 
  to: string; 
  children: ReactNode | ((props: { isActive: boolean }) => ReactNode);
  className?: string;
  [key: string]: any;
}) => {
  const { pathname, navigate, basename = '' } = useContext(RouterContext);
  
  // Adjust "to" with basename if provided
  const fullPath = basename ? `${basename}${to}` : to;
  
  const isActive = pathname === fullPath;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(fullPath);
  };
  
  return (
    <a 
      href={fullPath} 
      onClick={handleClick} 
      className={className}
      {...rest}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
};

// useNavigate hook
export const useNavigate = () => {
  const { navigate, basename = '' } = useContext(RouterContext);
  
  return (to: string, options?: { replace?: boolean }) => {
    // Adjust "to" with basename if provided
    const fullPath = basename ? `${basename}${to}` : to;
    return navigate(fullPath);
  };
};

// useLocation hook
export const useLocation = () => {
  const { pathname } = useContext(RouterContext);
  return { pathname, search: '', hash: '' };
};

// Navigate component
export const Navigate = ({ to, replace = false }: { to: string; replace?: boolean }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate(to);
  }, [to, navigate]);
  
  return null;
};

// useParams hook (simplified)
export const useParams = <T extends Record<string, string>>(): T => {
  return {} as T;
};
