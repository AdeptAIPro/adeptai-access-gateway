
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <DashboardLayout title={title}>
      <div className="space-y-8">
        {children}
      </div>
    </DashboardLayout>
  );
};

export default PageContainer;
