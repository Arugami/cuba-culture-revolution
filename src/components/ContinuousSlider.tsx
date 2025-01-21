import React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ContinuousSliderProps {
  className?: string;
}

const ContinuousSlider = ({ className }: ContinuousSliderProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const items = [
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "$CUBA" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "First Ever Country Take Over" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "Join The Community" },
  ];

  // For mobile, we'll show fewer items
  const mobileItems = [
    { type: "text", content: "$CUBA" },
    { type: "text", content: "First Ever Country Take Over" },
    { type: "text", content: "Join The Community" },
  ];

  const displayItems = isMobile ? mobileItems : items;

  return (
    <div className={cn("w-full overflow-hidden bg-[#0A0F29] py-3 sm:py-4 md:py-6", className)}>
      <div className="relative flex w-full">
        {/* First set of scrolling items */}
        <div className="animate-scroll flex min-w-full items-center justify-start space-x-6 sm:space-x-8 md:space-x-12 px-4 sm:px-6 md:px-8">
          {displayItems.map((item, idx) => (
            <div 
              key={`first-${idx}`} 
              className="flex items-center shrink-0 py-2 sm:py-3 justify-center"
            >
              {item.type === "image" && !isMobile ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full object-contain"
                />
              ) : (
                <span className="whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless scrolling */}
        <div className="animate-scroll flex min-w-full items-center justify-start space-x-6 sm:space-x-8 md:space-x-12 px-4 sm:px-6 md:px-8">
          {displayItems.map((item, idx) => (
            <div 
              key={`second-${idx}`} 
              className="flex items-center shrink-0 py-2 sm:py-3 justify-center"
            >
              {item.type === "image" && !isMobile ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full object-contain"
                />
              ) : (
                <span className="whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinuousSlider;