
import React from "react";

const footerCategories = ["Product", "Company", "Resources", "Legal"];

const Footer = () => {
  return (
    <footer className="border-t bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg">AdeptAI</h3>
          <p className="text-muted-foreground text-sm">
            Powering intelligent automation for businesses worldwide.
          </p>
        </div>
        
        {footerCategories.map((category, i) => (
          <div key={i} className="space-y-4">
            <h3 className="font-bold text-lg">{category}</h3>
            <ul className="space-y-2">
              {[1, 2, 3, 4].map(item => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {category} Link {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AdeptAI. All rights reserved.
        </p>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
            <a 
              key={i} 
              href="#" 
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
