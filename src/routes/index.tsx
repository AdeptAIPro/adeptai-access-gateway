
import React from 'react';
import { Route, Routes } from '@/utils/router-polyfill';
import CRM from '@/pages/CRM';
import Payroll from '@/pages/Payroll';
import AgenticAI from '@/pages/AgenticAI';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CRM />} />
      <Route path="/crm" element={<CRM />} />
      <Route path="/payroll" element={<Payroll />} />
      <Route path="/agentic-ai" element={<AgenticAI />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}
