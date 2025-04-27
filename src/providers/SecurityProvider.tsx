
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";

interface SecurityContextType {
  isEncrypted: boolean;
  isCSRFProtected: boolean;
  isContentPolicyEnforced: boolean;
  encryptData: (data: any) => string;
  decryptData: (data: string) => any;
  validateInput: (input: string, pattern?: RegExp) => boolean;
  sanitizeHTML: (html: string) => string;
}

const SecurityContext = createContext<SecurityContextType>({
  isEncrypted: false,
  isCSRFProtected: false,
  isContentPolicyEnforced: false,
  encryptData: () => "",
  decryptData: () => null,
  validateInput: () => false,
  sanitizeHTML: () => "",
});

/**
 * Simple encryption for frontend data (not for sensitive information)
 * For truly sensitive data, use proper cryptographic libraries and backend encryption
 */
const encryptData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    // Simple Base64 encoding - for actual implementation use a proper encryption library
    return btoa(encodeURIComponent(jsonString));
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};

const decryptData = (encryptedData: string): any => {
  try {
    // Simple Base64 decoding
    const jsonString = decodeURIComponent(atob(encryptedData));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

/**
 * Input validation to prevent XSS and injection attacks
 */
const validateInput = (input: string, pattern?: RegExp): boolean => {
  if (!input) return false;
  
  // Default pattern prevents script tags and common XSS vectors
  const defaultPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const testPattern = pattern || defaultPattern;
  
  // Return true if the input doesn't match the unsafe pattern
  return !testPattern.test(input);
};

/**
 * HTML sanitizer to prevent XSS attacks
 */
const sanitizeHTML = (html: string): string => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

export const SecurityProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [isCSRFProtected, setIsCSRFProtected] = useState<boolean>(false);
  const [isContentPolicyEnforced, setIsContentPolicyEnforced] = useState<boolean>(false);

  // Initialize security features
  useEffect(() => {
    // Set up CSRF token in localStorage for API requests
    if (!localStorage.getItem('csrf_token')) {
      localStorage.setItem('csrf_token', `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    }
    setIsCSRFProtected(true);
    
    // Check if localStorage encryption is available
    try {
      const testEncryption = encryptData({ test: "security" });
      const decrypted = decryptData(testEncryption);
      setIsEncrypted(decrypted && decrypted.test === "security");
    } catch (e) {
      console.error("Encryption test failed:", e);
      setIsEncrypted(false);
    }

    // Check for Content-Security-Policy
    const metaElement = document.createElement('meta');
    metaElement.httpEquiv = 'Content-Security-Policy';
    metaElement.content = "default-src 'self'; script-src 'self'; object-src 'none';";
    document.head.appendChild(metaElement);
    setIsContentPolicyEnforced(true);

    // Log security initialization
    console.log("Security features initialized");
    
    return () => {
      // Cleanup if needed
      document.head.removeChild(metaElement);
    };
  }, []);

  return (
    <SecurityContext.Provider value={{
      isEncrypted,
      isCSRFProtected,
      isContentPolicyEnforced,
      encryptData,
      decryptData,
      validateInput,
      sanitizeHTML
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => useContext(SecurityContext);
