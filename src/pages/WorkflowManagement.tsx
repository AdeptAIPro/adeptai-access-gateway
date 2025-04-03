
import React from "react";
import { useNavigate, Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import Workflows from "@/pages/Workflows";

const WorkflowManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route index element={<Workflows />} />
      {/* Add more workflow related routes here if needed */}
    </Routes>
  );
};

export default WorkflowManagement;
