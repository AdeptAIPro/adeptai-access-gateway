
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-4 px-6 text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} AdeptAI Pro. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
