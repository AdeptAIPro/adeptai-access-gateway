
import React from 'react';
import { SectionCard, SectionHeader } from '@/components/ui/section-card';
import { Quote, Star, UserRound } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CIO, Healthcare Solutions Inc.",
    company: "Healthcare Solutions Inc.",
    testimonial: "The cybersecurity overhaul implemented by the team exceeded our expectations. Our sensitive patient data is now protected by multiple layers of security, and we've achieved full HIPAA compliance with their guidance.",
    rating: 5,
    image: null
  },
  {
    name: "Michael Rodriguez",
    position: "VP of Technology",
    company: "Global Financial Group",
    testimonial: "Their IT consulting team helped us navigate a complex cloud migration with zero downtime. The infrastructure improvements have resulted in significant cost savings and enhanced our ability to scale rapidly.",
    rating: 5,
    image: null
  },
  {
    name: "Jennifer Chen",
    position: "Director of Operations",
    company: "TechManufacturing Co.",
    testimonial: "Working with their security consultants was transformative for our organization. The vulnerability assessment they conducted identified critical weaknesses in our network that we weren't aware of, and their remediation plan was clear and effective.",
    rating: 5,
    image: null
  },
  {
    name: "David Williams",
    position: "CEO",
    company: "RetailTech Solutions",
    testimonial: "The AI-powered monitoring system they implemented has been a game-changer for our business. We can now detect and respond to potential threats in real-time, which gives us peace of mind knowing our customer data is safe.",
    rating: 4,
    image: null
  }
];

// Simple star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <SectionCard>
      <SectionHeader title="Client Testimonials" icon={<Quote className="w-6 h-6 text-adept" />} />
      <p className="text-center text-lg text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto px-4 md:px-0">
        Don't just take our word for it - see what our clients have to say
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8 px-2 md:px-0">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center mb-3 md:mb-4">
              <div className="mr-3 md:mr-4">
                {testimonial.image ? (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserRound className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">{testimonial.position}</p>
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
            
            <blockquote className="relative">
              <span className="absolute text-gray-200 text-3xl md:text-4xl left-0 top-0">"</span>
              <p className="italic text-gray-700 text-sm md:text-base pl-5 md:pl-6 pr-3 md:pr-4">
                {testimonial.testimonial}
              </p>
              <span className="absolute text-gray-200 text-3xl md:text-4xl right-0 bottom-0">"</span>
            </blockquote>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default TestimonialsSection;
