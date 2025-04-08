
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Gift,
  Calendar,
  CreditCard,
  Settings,
  LineChart,
  Network,
  HeartHandshake,
  BrainCircuit,
  GraduationCap,
  Layers,
  FileCheck,
  Store,
  Search
} from "lucide-react";

const SidebarItems = () => {
  return (
    <div className="space-y-1">
      <NavLink to="/dashboard">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/talent">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Users className="mr-2 h-4 w-4" />
            Talent
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/talent-search">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Search className="mr-2 h-4 w-4" />
            Talent Search
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/talent-matching">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Layers className="mr-2 h-4 w-4" />
            Talent Matchmaking-AI
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/payroll">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Payroll
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/onboarding">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Onboarding
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/crm">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <HeartHandshake className="mr-2 h-4 w-4" />
            CRM
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/agentic-ai">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <BrainCircuit className="mr-2 h-4 w-4" />
            Agentic AI
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/skills">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Gift className="mr-2 h-4 w-4" />
            Skills
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/compliance">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <FileCheck className="mr-2 h-4 w-4" />
            Compliance
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/analytics">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <LineChart className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/integrations">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Network className="mr-2 h-4 w-4" />
            Integrations
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/marketplace">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Store className="mr-2 h-4 w-4" />
            Marketplace
          </Button>
        )}
      </NavLink>
      
      <NavLink to="/settings">
        {({ isActive }) => (
          <Button
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        )}
      </NavLink>
    </div>
  );
};

export default SidebarItems;
