
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const resumeFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  skills: z.string().min(2, { message: "Please enter at least one skill." }),
  experience: z.string().optional(),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

const ResumeUpload: React.FC = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
      experience: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = (data: ResumeFormValues) => {
    if (!file) {
      toast({
        title: "Resume required",
        description: "Please upload your resume before submitting.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully. Employers will be able to view your profile.",
        variant: "default",
      });
    }, 2000);
  };

  if (uploadComplete) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-green-600 flex items-center justify-center">
            <Check className="h-8 w-8 mr-2" />
            Resume Uploaded Successfully
          </CardTitle>
          <CardDescription className="text-center">
            Your resume has been added to our database
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6">
            Thank you for submitting your resume. Employers will now be able to find your profile when looking for candidates with your skills and experience.
          </p>
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => {
              setUploadComplete(false);
              setFile(null);
              form.reset();
            }}
          >
            Upload Another Resume
          </Button>
          <Button>
            Browse Job Listings
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Your Resume</CardTitle>
        <CardDescription>
          Submit your resume to be discovered by top employers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills (comma separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="JavaScript, React, Node.js" {...field} />
                    </FormControl>
                    <FormDescription>
                      List your top skills to help employers find you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Summary (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Briefly describe your experience and background" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mt-6">
                <FormLabel>Resume</FormLabel>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                  <div className="space-y-2 text-center">
                    <div className="flex justify-center">
                      {file ? <FileText className="h-12 w-12 text-blue-500" /> : <Upload className="h-12 w-12 text-gray-400" />}
                    </div>
                    <div className="text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>{file ? 'Change file' : 'Upload a file'}</span>
                        <Input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">{file ? file.name : 'or drag and drop'}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Submit Resume'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;
