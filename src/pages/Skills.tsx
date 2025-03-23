
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import ComingSoonSection from "@/components/ComingSoonSection";
import { Button } from "@/components/ui/button";
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
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          Looking for educational courses and professional development options?
        </p>
        <Link to="/professional-development">
          <Button variant="adept">
            <GraduationCap className="mr-2 h-4 w-4" />
            Explore Educational Courses
          </Button>
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default Skills;
