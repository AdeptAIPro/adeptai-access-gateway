
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const EnterpriseSection: React.FC = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-8 md:p-12 rounded-2xl shadow-sm animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Need a custom enterprise solution?</h2>
            <p className="text-muted-foreground">
              Our enterprise plan offers tailored AI solutions, dedicated support, and advanced features to meet your specific requirements.
            </p>
            <ul className="space-y-2 pt-2">
              {[
                "Custom model training",
                "On-premise deployment options",
                "Dedicated account manager",
                "Service-level agreement (SLA)",
                "Custom security requirements"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-indigo-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Link to="/contact">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 h-auto text-lg">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
