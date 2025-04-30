
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { saveLead } from "@/services/crm/LeadService";
import { Lead } from '@/services/crm/types';

interface LeadCaptureFormProps {
  source?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  source = 'website', 
  onSuccess,
  compact = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast.error("Email Required", {
        description: "Please enter your email address"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create a lead object matching the required structure
      const leadData: Partial<Lead> = {
        ...formData,
        source,
        id: `lead_${Date.now()}`, // Generate temporary ID
        createdAt: new Date().toISOString() // Use ISO string format for dates
      };
      
      const success = await saveLead(leadData as Lead);
      
      if (success) {
        toast.success("Thank You!", {
          description: "We've received your information and will be in touch soon."
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("Submission Error", {
          description: "There was a problem submitting your information. Please try again."
        });
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Submission Error", {
        description: "There was a problem submitting your information. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${compact ? 'max-w-md' : ''}`}>
      <div>
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Smith"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      {!compact && (
        <>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="message">How can we help you?</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your needs..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </>
      )}
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Get Started"}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
};

export default LeadCaptureForm;
