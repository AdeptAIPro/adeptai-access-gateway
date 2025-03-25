import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Book, SendIcon, Award, BookOpen, Briefcase, Users, Globe, ChevronRight, CalendarDays, GraduationCap as GraduationCapIcon, CheckCircle, BookIcon, Compass, Sparkles, ArrowUpRight } from "lucide-react";
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
      console.log("Form submitted with data:", data);
      
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
  
  const upcomingEvents = [
    {
      title: "Virtual Open House: IIT Programs",
      date: "June 15, 2023",
      time: "10:00 AM IST",
      description: "Join our virtual session to learn more about various engineering programs at IITs."
    },
    {
      title: "Stanford University Application Workshop",
      date: "June 22, 2023",
      time: "7:00 PM IST",
      description: "Learn tips and strategies for applying to Stanford University programs."
    },
    {
      title: "Career Pathways in Data Science",
      date: "July 5, 2023",
      time: "11:00 AM IST",
      description: "Explore career opportunities and educational pathways in the field of Data Science."
    }
  ];
  
  const successMetrics = [
    { metric: "95%", description: "Admission Success Rate" },
    { metric: "2500+", description: "Students Placed in Top Universities" },
    { metric: "150+", description: "University Partnerships Worldwide" },
    { metric: "30+", description: "Countries with AdeptAI Alumni" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
      
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-adept-light rounded-full mb-4">
              <GraduationCap className="h-6 w-6 text-adept" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Begin Your Educational Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your educational aspirations with us, and our expert counselors will help you find the perfect program.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-adept-light">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-adept flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Our Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {successMetrics.map((item, index) => (
                      <div key={index} className="text-center p-3">
                        <p className="text-2xl font-bold text-adept">{item.metric}</p>
                        <p className="text-xs text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-adept-light">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-adept flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <CalendarDays className="w-3 h-3 mr-1" />
                          {event.date} | {event.time}
                        </div>
                        <p className="text-xs mt-1 text-gray-600">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" size="sm" className="text-adept p-0">
                    View all events <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gradient-to-br from-adept-light to-white border-adept-light overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-adept">Skill Enhancement Programs</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    <p className="text-sm">Boost your profile with specialized skill certificates recognized by top employers and universities.</p>
                    
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-adept mr-2" />
                        Data Science Bootcamp
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-adept mr-2" />
                        AI & Machine Learning
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-adept mr-2" />
                        Cloud Computing Essentials
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-adept mr-2" />
                        Digital Marketing Mastery
                      </li>
                    </ul>
                    
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="text-adept border-adept hover:bg-adept-light">
                        Explore All Skills
                      </Button>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-adept/10 z-0"></div>
                  <div className="absolute -bottom-4 -right-12 w-32 h-32 rounded-full bg-adept/5 z-0"></div>
                </CardContent>
              </Card>
              
              <Card className="border-adept-light">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-adept flex items-center">
                    <GraduationCapIcon className="w-5 h-5 mr-2" />
                    Top University Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">1. IIT Delhi</span>
                      <span className="text-sm text-adept">India</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">2. IISc Bangalore</span>
                      <span className="text-sm text-adept">India</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">3. MIT</span>
                      <span className="text-sm text-adept">USA</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">4. Stanford University</span>
                      <span className="text-sm text-adept">USA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">5. Harvard University</span>
                      <span className="text-sm text-adept">USA</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" size="sm" className="text-adept p-0">
                    View all rankings <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-lg border shadow-md">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Book className="mr-2 h-5 w-5 text-adept" />
                  Course Interest Form
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="courseInterest"
                      render={({ field }) => (
                        <FormItem>
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
                            <SelectContent className="max-h-[200px]">
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="goals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Educational Goals</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please share your educational and career goals, and any specific queries you have..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Share your aspirations, timeline, and any specific requirements
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      variant="adept" 
                      className="w-full"
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
              
              <Card className="border-adept-light overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop"
                    alt="Education counseling session" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="text-white font-bold text-xl p-4">Your Personal Education Guide</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h4 className="font-medium text-adept mb-2">How Our Counselors Support Your Journey</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 bg-adept-light rounded-full p-1">
                        <Compass className="h-4 w-4 text-adept" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Personalized Path</p>
                        <p className="text-xs text-muted-foreground">Custom education roadmaps based on your career goals and interests</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 bg-adept-light rounded-full p-1">
                        <Sparkles className="h-4 w-4 text-adept" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cross-Skill Guidance</p>
                        <p className="text-xs text-muted-foreground">Identify complementary skills to enhance your primary expertise</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 bg-adept-light rounded-full p-1">
                        <BookIcon className="h-4 w-4 text-adept" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Application Excellence</p>
                        <p className="text-xs text-muted-foreground">Expert assistance with admissions essays and interviews</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 text-adept border-adept hover:bg-adept-light">
                    Schedule Free Consultation <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-adept-light rounded-full mb-4">
                <Book className="h-6 w-6 text-adept" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to the most common questions about our professional development programs.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="bg-white rounded-lg border">
              <AccordionItem value="item-1" className="px-4">
                <AccordionTrigger className="text-base">
                  How do I choose the right program for my career goals?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our expert counselors conduct a thorough assessment of your academic background, professional experience, and career aspirations. Based on this evaluation, we recommend programs that align with your goals and enhance your career prospects.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="px-4">
                <AccordionTrigger className="text-base">
                  What documents do I need for university applications?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Requirements vary by program and university, but typically include academic transcripts, standardized test scores (like GRE, GMAT, TOEFL, IELTS), statement of purpose, letters of recommendation, resume/CV, and sometimes portfolio samples for specific programs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="px-4">
                <AccordionTrigger className="text-base">
                  How long does the application process take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  The timeline varies depending on the program and university. Generally, we recommend starting the process 10-12 months before your intended start date. This allows sufficient time for test preparation, document collection, application submission, and visa processing if needed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="px-4">
                <AccordionTrigger className="text-base">
                  Are there scholarships available for international students?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, many universities offer scholarships for international students based on academic merit, research potential, or specific country of origin. Our counselors help identify scholarship opportunities and guide you through the application process to increase your chances of securing financial aid.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="px-4">
                <AccordionTrigger className="text-base">
                  What support do you provide after admission?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our support extends beyond admission. We assist with visa applications, pre-departure orientation, accommodation arrangements, and provide guidance throughout your academic journey. We also offer career placement services and networking opportunities with alumni and industry partners.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfessionalDevelopment;
