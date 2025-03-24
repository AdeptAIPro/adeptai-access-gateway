
import React from "react";

const featuresList = [
  {
    title: "Smart Automation",
    description: "Automate repetitive tasks with AI-powered workflows that learn and adapt to your needs."
  },
  {
    title: "Intelligent Analysis",
    description: "Extract valuable insights from your data with advanced analytics and visualization tools."
  },
  {
    title: "Seamless Integration",
    description: "Connect with your existing tools and platforms for a unified workflow experience."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful features for every need</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines advanced AI capabilities with user-friendly interfaces to deliver exceptional results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuresList.map((feature, i) => (
            <div 
              key={i} 
              className="p-6 rounded-lg bg-white border hover:border-adept transition-all duration-300 animate-fade-in-up hover-lift"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-md bg-adept/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-full bg-adept/30" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
