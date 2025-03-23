
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import ComingSoonSection from "@/components/ComingSoonSection";
import { GraduationCap } from "lucide-react";

const Skills = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout title="Professional Skill Enhancement">
      <ComingSoonSection 
        title="Professional Skills Platform" 
        description="Empower your team with personalized learning paths and professional development opportunities."
        icon={GraduationCap}
      />
    </DashboardLayout>
  );
};

export default Skills;
