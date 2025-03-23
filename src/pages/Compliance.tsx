
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import ComingSoonSection from "@/components/ComingSoonSection";
import { ShieldCheck } from "lucide-react";

const Compliance = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <DashboardLayout title="Compliance">
      <ComingSoonSection 
        title="Compliance Management" 
        description="Stay compliant with regulations and manage compliance requirements effectively."
        icon={ShieldCheck}
      />
    </DashboardLayout>
  );
};

export default Compliance;
