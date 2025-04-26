
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Router context
interface RouterContextType {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  navigate: () => {}
});

// BrowserRouter component
export const BrowserRouter = ({ children }: { children: ReactNode }) => {
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
    <RouterContext.Provider value={{ pathname, navigate }}>
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
  const { pathname } = useContext(RouterContext);
  
  // Simple path matching (this is highly simplified)
  const isMatch = path === '*' || pathname === path || 
    (path.includes('*') && pathname.startsWith(path.replace('*', '')));
  
  return isMatch ? <>{element}</> : null;
};

// Link component
export const Link = ({ 
  to, 
  children, 
  className = ''
}: { 
  to: string; 
  children: ReactNode;
  className?: string; 
}) => {
  const { navigate } = useContext(RouterContext);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// NavLink component (simplified)
export const NavLink = ({ 
  to, 
  children,
  className = '',
}: { 
  to: string; 
  children: ReactNode | ((props: { isActive: boolean }) => ReactNode);
  className?: string;
}) => {
  const { pathname, navigate } = useContext(RouterContext);
  const isActive = pathname === to;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <a 
      href={to} 
      onClick={handleClick} 
      className={className}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
};

// useNavigate hook
export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
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
  }, [to]);
  
  return null;
};

// useParams hook (simplified)
export const useParams = <T extends Record<string, string>>(): T => {
  return {} as T;
};
