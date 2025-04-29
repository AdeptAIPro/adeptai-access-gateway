
import React from 'react';

// Re-export everything from react-router-dom
export * from 'react-router-dom';

// Create a simple Link component that uses anchor tags as fallback
interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, className, children }) => {
  try {
    const RouterLink = require('react-router-dom').Link;
    return <RouterLink to={to} className={className}>{children}</RouterLink>;
  } catch (e) {
    return <a href={to} className={className}>{children}</a>;
  }
};

// Create a simple useNavigate hook that uses window.location as fallback
export const useNavigate = () => {
  try {
    return require('react-router-dom').useNavigate();
  } catch (e) {
    return (path: string) => {
      window.location.href = path;
    };
  }
};
