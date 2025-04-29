
import React from 'react';
import { BrowserRouter, Routes, Route } from '@/utils/router-polyfill';
import TalentMatching from '@/pages/TalentMatching';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TalentMatching />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
