
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardCard {
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
  color: string;
  stats: string;
}

interface DashboardFeatureCardsProps {
  dashboardCards: DashboardCard[];
}

const DashboardFeatureCards: React.FC<DashboardFeatureCardsProps> = ({ dashboardCards }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-2">
      {dashboardCards.map((card, index) => (
        <Card 
          key={index} 
          className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md group hover:-translate-y-1"
        >
          <CardHeader className={`bg-gradient-to-r ${card.color} text-white py-4 px-4 md:p-6`}>
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-2 md:p-3 rounded-lg">
                <card.icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full">
                <span className="text-xs font-medium">{card.stats}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardTitle className="text-lg md:text-xl mb-1 md:mb-2">{card.title}</CardTitle>
            <CardDescription className="mb-4 md:mb-6 text-xs md:text-sm line-clamp-2">{card.description}</CardDescription>
            <Button 
              variant="outline" 
              className="w-full justify-between group-hover:border-adept group-hover:text-adept transition-colors text-sm"
              onClick={() => navigate(card.route)}
            >
              <span>View Details</span>
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardFeatureCards;
