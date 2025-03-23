
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Book, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  country: z.enum(["India", "United States", "Other"]),
  courseLevel: z.enum(["Bachelor's", "Master's", "PhD", "Other"]),
  courseInterest: z.string().min(1, "Please select a course"),
  goals: z.string().min(10, "Please share your goals (minimum 10 characters)"),
});

type FormValues = z.infer<typeof formSchema>;

const ProfessionalDevelopment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "India",
      courseLevel: "Bachelor's",
      courseInterest: "",
      goals: "",
    },
  });

  const bachelorsCoursesIndia = [
    "B.Tech Computer Science",
    "B.Tech Information Technology",
    "B.Tech Electronics & Communication",
    "BBA Business Administration",
    "B.Com Commerce",
    "BSc Computer Science",
    "BSc Data Science",
    "BSc Mathematics",
    "BA Economics",
  ];

  const mastersCoursesIndia = [
    "M.Tech Computer Science",
    "M.Tech Artificial Intelligence",
    "M.Tech Data Science",
    "MBA Business Administration",
    "MSc Computer Science",
    "MSc Data Analytics",
    "MSc Artificial Intelligence",
    "MA Economics",
  ];

  const bachelorsCoursesUS = [
    "BS Computer Science",
    "BS Information Technology",
    "BS Electrical Engineering",
    "BS Computer Engineering",
    "BBA Business Administration",
    "BS Data Science",
    "BS Information Systems",
  ];

  const mastersCoursesUS = [
    "MS Computer Science",
    "MS Software Engineering",
    "MS Data Science",
    "MS Artificial Intelligence",
    "MS Cybersecurity",
    "MBA Business Administration",
    "MS Information Technology",
  ];

  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedLevel, setSelectedLevel] = useState("Bachelor's");

  const getAvailableCourses = () => {
    if (selectedCountry === "India") {
      return selectedLevel === "Bachelor's" ? bachelorsCoursesIndia : mastersCoursesIndia;
    } else if (selectedCountry === "United States") {
      return selectedLevel === "Bachelor's" ? bachelorsCoursesUS : mastersCoursesUS;
    }
    return [];
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send data to a server endpoint
      // For now, we'll just simulate the submission
      console.log("Form submitted with data:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Form submitted successfully", {
        description: "Our team will contact you shortly for a counseling session.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form", {
        description: "Please try again later or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - similar to Index.tsx */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="/" className="font-bold text-2xl text-adept">
              AdeptAI
            </a>
            
            <div className="hidden md:flex space-x-6">
              <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="/professional-development" className="text-foreground font-medium transition-colors">
                Professional Development
              </a>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <a href="/dashboard">
                <Button variant="adept">
                  Dashboard
                </Button>
              </a>
            ) : (
              <React.Fragment>
                <a href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Log in
                </a>
                <a href="/signup">
                  <Button variant="adept">
                    Sign up
                  </Button>
                </a>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-adept-light rounded-full mb-4">
            <GraduationCap className="h-6 w-6 text-adept" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Professional Development</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated educational programs for bachelor's and master's courses in India and the US. Share your interests and goals to receive personalized guidance.
          </p>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-lg border shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <Book className="mr-2 h-5 w-5 text-adept" />
            Course Interest Form
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
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
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country of Interest</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCountry(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="courseLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Level</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedLevel(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                          <SelectItem value="Master's">Master's</SelectItem>
                          <SelectItem value="PhD">PhD</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="courseInterest"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Course of Interest</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getAvailableCourses().map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                          {getAvailableCourses().length === 0 && (
                            <SelectItem value="other">
                              Other (Please specify in goals)
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the course you're interested in pursuing
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Educational Goals</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please share your educational and career goals, and any specific queries you have..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Share your aspirations, timeline, and any specific requirements you may have
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                variant="adept" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <SendIcon className="mr-2 h-4 w-4" /> 
                    Submit Query
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-3">Need immediate assistance?</h3>
          <p className="text-muted-foreground mb-4">
            Contact our education counselors directly at education@adeptaipro.com
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="hover-lift">
              Schedule a Call
            </Button>
            <Button variant="adept" className="hover-lift">
              Chat with an Advisor
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer - Similar to Index.tsx */}
      <footer className="border-t bg-white py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">AdeptAI</h3>
            <p className="text-muted-foreground text-sm">
              Powering intelligent automation for businesses worldwide.
            </p>
          </div>
          
          {["Product", "Company", "Resources", "Legal"].map((category, i) => (
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
    </div>
  );
};

export default ProfessionalDevelopment;
