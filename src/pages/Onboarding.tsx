
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import ComingSoonSection from "@/components/ComingSoonSection";
import { UserPlus } from "lucide-react";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout title="Onboarding">
      <ComingSoonSection 
        title="Employee Onboarding" 
        description="Streamline your onboarding process and provide a great experience for new hires."
        icon={UserPlus}
      />
    </DashboardLayout>
  );
};

export default Onboarding;
