
import React from 'react';
import { BrowserRouter, Routes, Route } from '@/utils/router-polyfill';
import TalentMatching from '@/pages/TalentMatching';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <TalentMatching />
        </Route>
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
