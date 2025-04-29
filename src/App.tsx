
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from '@/utils/router-polyfill';
import TalentMatching from '@/pages/TalentMatching';
import { protectedRoutes } from './routes/protected-routes';
import { AuthProvider } from './hooks/use-auth';
import { AppProvider } from './providers/AppProvider';

// Use non-lazy loaded component for the root route to avoid initial loading issues
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TalentMatching />} />
          {protectedRoutes}
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
