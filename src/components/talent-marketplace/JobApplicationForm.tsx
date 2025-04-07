
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Job } from "@/data/mockJobs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, FileText, Upload } from "lucide-react";

// Form schema with validation
const applicationSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  coverLetter: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  job: Job;
  onSubmit: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onSubmit }) => {
  const { toast } = useToast();
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      agreeToTerms: false,
    },
  });

  const handleSubmit = (values: ApplicationFormValues) => {
    console.log("Application submitted:", values);
    
    // Show success toast
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully.",
    });
    
    // Reset form
    form.reset();
    
    // Close the dialog
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Apply for {job.title}</h2>
          <p className="text-sm text-gray-500">at {job.company} • {job.location}</p>
        </div>

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" placeholder="John Doe" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" placeholder="your.email@example.com" type="email" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input className="pl-10" placeholder="(123) 456-7890" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resume Upload */}
        <div className="space-y-2">
          <FormLabel htmlFor="resume">Resume/CV</FormLabel>
          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <div className="text-sm text-center">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-gray-500">PDF, DOCX, or RTF (Max 5MB)</p>
            </div>
            <input
              id="resume"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.rtf"
            />
            <Button variant="outline" type="button" className="mt-4" onClick={() => document.getElementById('resume')?.click()}>
              Select File
            </Button>
          </div>
        </div>

        {/* Cover Letter */}
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea 
                    placeholder="Tell us why you're a good fit for this position..."
                    className="min-h-[120px]"
                    {...field}
                  />
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormDescription>
                Briefly explain why you're interested in this role and what makes you a good candidate.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Terms Agreement */}
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions
                </FormLabel>
                <FormDescription>
                  By submitting this application, you agree to our privacy policy and terms of service.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onSubmit}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobApplicationForm;
