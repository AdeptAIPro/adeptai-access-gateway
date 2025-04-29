
import React from 'react';
import { BrowserRouter, Routes, Route } from '@/utils/router-polyfill';
import TalentMatching from '@/pages/TalentMatching';
import { Suspense, lazy } from 'react';
import { protectedRoutes } from './routes/protected-routes';
import { PageLoader } from './routes/page-loader';

// Use non-lazy loaded component for the root route to avoid initial loading issues
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TalentMatching />} />
        {protectedRoutes}
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
