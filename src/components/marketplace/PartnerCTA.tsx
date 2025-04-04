
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PartnerCTA: React.FC = () => {
  return (
    <div className="bg-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to List Your Product Here?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          If you have a SaaS or AI product that would be valuable to our audience, get in touch to discuss partnership opportunities.
        </p>
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
          <Link to="/contact" className="flex items-center">
            Contact Us About Partnerships
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PartnerCTA;
