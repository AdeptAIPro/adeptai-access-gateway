
import React from "react";
import { cn } from "@/lib/utils";

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onClick: (index: number) => void;
  className?: string;
}

const CarouselIndicators = ({ total, current, onClick, className }: CarouselIndicatorsProps) => {
  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            current === index 
              ? "bg-adept w-4" 
              : "bg-gray-300 hover:bg-gray-400"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
