
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const heroSlides = [
  {
    title: "Unlock the power of intelligent automation",
    description: "AdeptAI helps businesses streamline workflows, reduce manual effort, and make smarter decisions with cutting-edge AI tools.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80",
    alt: "AI-powered dashboard visualization"
  },
  {
    title: "AI-Powered Talent Matching",
    description: "Find the perfect candidates for any position with our advanced semantic matching algorithm that understands the nuances of job requirements.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    alt: "Talent matching visualization"
  },
  {
    title: "Streamline Your Compliance",
    description: "Automate compliance checks and verification processes to ensure your organization meets all regulatory requirements effortlessly.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    alt: "Compliance dashboard"
  },
  {
    title: "Comprehensive Analytics",
    description: "Gain valuable insights with our powerful analytics dashboard, helping you make data-driven decisions that drive business growth.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80",
    alt: "Analytics dashboard"
  },
  {
    title: "Seamless Integrations",
    description: "Connect all your existing tools and systems with our platform for a unified workflow that enhances productivity across your organization.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    alt: "Integration dashboard"
  }
];

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-8 md:py-16 px-6 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-1/2 space-y-6 text-center lg:text-left animate-fade-in-up">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                      <span className="text-adept">{slide.title}</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-4 pt-4">
                      <Link to="/signup">
                        <Button size="lg" className="bg-adept hover:bg-adept-dark px-8 w-full sm:w-auto">
                          Try for Free
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto">
                          Book a Demo
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <div className="rounded-lg overflow-hidden shadow-2xl glass-morphism">
                      <img 
                        src={slide.image} 
                        alt={slide.alt}
                        className="w-full aspect-[16/9] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {!isMobile && (
            <>
              <CarouselPrevious className="left-2 lg:-left-12" />
              <CarouselNext className="right-2 lg:-right-12" />
            </>
          )}
        </Carousel>
        
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-gray-300 cursor-pointer"
                // Navigation indicators - in a real app these would be connected to the carousel
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
