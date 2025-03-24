
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Book, SendIcon, Award, BookOpen, Briefcase, Users, Globe } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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

  // Enhanced course listings with university affiliations
  const bachelorsCoursesIndia = [
    "B.Tech Computer Science - IIT Delhi",
    "B.Tech Information Technology - IIT Bombay",
    "B.Tech Electronics & Communication - IIT Madras",
    "BBA Business Administration - IIM Ahmedabad",
    "B.Com Commerce - Delhi University",
    "BSc Computer Science - BITS Pilani",
    "BSc Data Science - ISI Kolkata",
    "BSc Artificial Intelligence - IIT Hyderabad",
    "BA Economics - St. Xavier's College Mumbai",
    "BCA Software Development - Manipal Institute of Technology",
    "B.Tech Biotechnology - VIT Vellore",
    "BSc Cyber Security - IIIT Bangalore",
  ];

  const mastersCoursesIndia = [
    "M.Tech Computer Science - IIT Kanpur",
    "M.Tech Artificial Intelligence - IISc Bangalore",
    "M.Tech Data Science - IIT Kharagpur",
    "MBA Business Administration - IIM Bangalore",
    "MSc Computer Science - IIT Roorkee",
    "MSc Data Analytics - ISB Hyderabad",
    "MSc Artificial Intelligence - IIIT Hyderabad",
    "MA Economics - Delhi School of Economics",
    "MTech Machine Learning - IIT Delhi",
    "MBA Technology Management - NITIE Mumbai",
    "MSc Quantum Computing - IISc Bangalore",
    "MTech Robotics - IIT Bombay",
    "MBA Digital Transformation - IIM Calcutta",
  ];

  const bachelorsCoursesUS = [
    "BS Computer Science - Stanford University",
    "BS Information Technology - MIT",
    "BS Electrical Engineering - Caltech",
    "BS Computer Engineering - Carnegie Mellon",
    "BBA Business Administration - Harvard Business School",
    "BS Data Science - UC Berkeley",
    "BS Information Systems - University of Michigan",
    "BA Economics - Princeton University",
    "BS Artificial Intelligence - Georgia Tech",
    "BS Cybersecurity - Purdue University",
    "BS Software Engineering - University of Washington",
    "BS Cognitive Science - UCLA",
  ];

  const mastersCoursesUS = [
    "MS Computer Science - Stanford University",
    "MS Software Engineering - MIT",
    "MS Data Science - Columbia University",
    "MS Artificial Intelligence - Carnegie Mellon",
    "MS Cybersecurity - Georgia Tech",
    "MBA Business Administration - Harvard Business School",
    "MS Information Technology - UC Berkeley",
    "MS Machine Learning - University of Washington",
    "MS Cloud Computing - University of Illinois",
    "MBA Technology Management - Kellogg School of Management",
    "MS Human-Computer Interaction - Cornell University",
    "MS Robotics - University of Pennsylvania",
    "MS Blockchain Technology - UC San Diego",
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

  const testimonialsData = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      course: "M.Tech in Computer Science, IIT Delhi",
      quote: "The guidance I received through AdeptAI helped me secure admission at my dream institute. Their counselors provided personalized assistance throughout the application process."
    },
    {
      name: "James Wilson",
      role: "Data Scientist at Amazon",
      course: "MS in Data Science, Stanford University",
      quote: "AdeptAI's professional development program was instrumental in my career transition from finance to data science. Their course recommendations and application assistance were top-notch."
    },
    {
      name: "Ananya Patel",
      role: "Product Manager at Microsoft",
      course: "MBA from IIM Bangalore",
      quote: "I was confused about which program would align with my career goals. AdeptAI's counselors helped me identify the perfect course and guided me through each step of the admission process."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-adept-light via-white to-adept-light py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-adept">Transform Your Career Journey</h1>
              <p className="text-lg text-gray-700 mb-6">
                Discover premier educational programs at top universities around the globe. 
                Our expert counselors guide you from application to admission, helping you 
                achieve your professional aspirations.
              </p>
              <div className="flex gap-4">
                <Button variant="adept" size="lg" className="shadow-md">
                  Explore Programs
                </Button>
                <Button variant="outline" size="lg">
                  Meet Our Counselors
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop" 
                alt="Students in a university campus" 
                className="rounded-lg shadow-lg w-full object-cover h-80"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Benefits Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-adept mb-4">Why Choose AdeptAI for Your Educational Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect ambitious professionals with world-class educational opportunities,
              providing end-to-end support throughout your academic journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-adept-light hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-adept-light p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                  <GraduationCap className="h-7 w-7 text-adept" />
                </div>
                <CardTitle className="text-xl">Premium University Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Exclusive access to top-ranked programs at leading universities in India, the US, and worldwide.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-adept-light hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-adept-light p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                  <Users className="h-7 w-7 text-adept" />
                </div>
                <CardTitle className="text-xl">Expert Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Personalized guidance from experienced advisors who match your profile with ideal programs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-adept-light hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto bg-adept-light p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                  <Briefcase className="h-7 w-7 text-adept" />
                </div>
                <CardTitle className="text-xl">Career Advancement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Programs specifically selected to enhance your skill set and accelerate your professional growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Programs Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-adept-light rounded-full mb-4">
              <BookOpen className="h-6 w-6 text-adept" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Featured Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our curated selection of programs across various disciplines and educational levels.
            </p>
          </div>
          
          <Tabs defaultValue="bachelor" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto md:grid-cols-3 mb-8">
              <TabsTrigger value="bachelor">Bachelor's Programs</TabsTrigger>
              <TabsTrigger value="master">Master's Programs</TabsTrigger>
              <TabsTrigger value="phd">PhD Programs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bachelor" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-adept" />
                      Technology & Engineering
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      {bachelorsCoursesIndia.slice(0, 5).map((course, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                          {course}
                        </li>
                      ))}
                      <li className="text-adept text-xs mt-2 font-medium">+ 15 more programs</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-adept" />
                      Business & Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      {bachelorsCoursesUS.slice(0, 5).map((course, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                          {course}
                        </li>
                      ))}
                      <li className="text-adept text-xs mt-2 font-medium">+ 12 more programs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="master" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-adept" />
                      Advanced Technology
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      {mastersCoursesIndia.slice(0, 5).map((course, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                          {course}
                        </li>
                      ))}
                      <li className="text-adept text-xs mt-2 font-medium">+ 18 more programs</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-adept" />
                      Business Leadership
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      {mastersCoursesUS.slice(0, 5).map((course, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                          {course}
                        </li>
                      ))}
                      <li className="text-adept text-xs mt-2 font-medium">+ 14 more programs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="phd" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-adept" />
                      Research Programs in India
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                        PhD in Computer Science - IISc Bangalore
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                        PhD in AI and Machine Learning - IIT Delhi
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                        PhD in Data Science - ISI Kolkata
                      </li>
                      <li className="text-adept text-xs mt-2 font-medium">+ 8 more programs</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-adept" />
                      Research Programs in US
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                        PhD in Computer Science - Stanford University
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                        PhD in Robotics - MIT
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-adept rounded-full mr-2"></span>
                        PhD in Quantum Computing - Caltech
                      </li>
                      <li className="text-adept text-xs mt-2 font-medium">+ 10 more programs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-adept-light rounded-full mb-4">
              <Award className="h-6 w-6 text-adept" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who transformed their careers through our educational programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="border-adept-light">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-adept font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <CardTitle className="text-base">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic text-sm">"{testimonial.quote}"</p>
                  <p className="text-xs text-adept mt-4 font-medium">{testimonial.course}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our professional development programs.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4 hover:no-underline hover:bg-gray-50 rounded-t-lg">
                How does AdeptAI help with university admissions?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Our comprehensive services include program selection, application preparation, document review, 
                personal statement assistance, interview coaching, and ongoing support throughout the admission process. 
                We have partnerships with top universities globally, enabling us to provide valuable insights and guidance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="p-4 hover:no-underline hover:bg-gray-50">
                What makes AdeptAI different from other educational consultants?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                AdeptAI combines AI-powered program matching with human expertise. Our counselors have direct experience 
                with the universities we recommend and use data-driven insights to provide personalized guidance. We focus 
                on long-term career outcomes, not just admissions.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="p-4 hover:no-underline hover:bg-gray-50">
                Do you offer financial aid and scholarship guidance?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                Yes, we provide comprehensive scholarship and financial aid guidance, including identifying opportunities, 
                application preparation, and interview coaching. Our team stays updated on the latest funding options at 
                our partner universities.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="p-4 hover:no-underline hover:bg-gray-50 rounded-b-lg">
                How soon should I start the application process?
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                We recommend starting 12-18 months before your intended enrollment date. This timeline allows sufficient 
                preparation for entrance exams, document gathering, application writing, and addressing any unexpected challenges. 
                However, we also offer accelerated services for those with tighter timelines.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Application Form Section */}
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-adept-light rounded-full mb-4">
            <GraduationCap className="h-6 w-6 text-adept" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Begin Your Educational Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your educational aspirations with us, and our expert counselors will help you find the perfect program.
          </p>
        </div>
        
        <div className="bg-white p-6 md:p-8 rounded-lg border shadow-sm">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Book className="mr-2 h-5 w-5 text-adept" />
            Course Interest Form
          </h3>
          
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
                        <SelectContent className="max-h-[300px]">
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
                size="lg"
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
          <p className="text-gray-600 mb-6">
            Our education counselors are available to provide personalized guidance for your academic journey.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button variant="outline" className="hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Schedule a Call
            </Button>
            <Button variant="adept">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat with an Advisor
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfessionalDevelopment;
