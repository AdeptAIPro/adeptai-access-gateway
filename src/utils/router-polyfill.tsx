
import React from 'react';
import * as ReactRouterDom from 'react-router-dom';

// Re-export everything from react-router-dom
export const {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  NavLink,
  Link,
  useParams,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} = ReactRouterDom;

// Re-export everything else
export * from 'react-router-dom';
