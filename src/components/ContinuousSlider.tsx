import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContinuousSliderProps {
  className?: string;
}

const ContinuousSlider = ({ className }: ContinuousSliderProps) => {
  const isMobile = useIsMobile();
  
  const items = [
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "$CUBA" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "First Ever Country Take Over" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "Join The Community" },
  ];

  if (isMobile) {
    return (
      <div className={cn("w-full bg-[#0A0F29] py-4 overflow-hidden", className)}>
        <div className="relative flex w-full">
          <div className="animate-mobile-scroll flex min-w-full items-center justify-start space-x-4 px-2">
            {[...items, ...items].map((item, idx) => (
              <div 
                key={`first-${idx}`} 
                className="flex items-center shrink-0 py-2 justify-center"
              >
                {item.type === "image" ? (
                  <img
                    src={item.content}
                    alt="Country Takeover Logo"
                    className="h-6 w-6 rounded-full object-contain"
                  />
                ) : (
                  <span className="whitespace-nowrap text-sm font-bold text-white">
                    {item.content}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden bg-[#0A0F29] py-2 sm:py-4 md:py-6 lg:py-8", className)}>
      <div className="relative flex w-full">
        {/* First set of scrolling items */}
        <div className="animate-scroll flex min-w-full items-center justify-start sm:justify-evenly space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16 px-2 sm:px-4 md:px-6 lg:px-8">
          {items.map((item, idx) => (
            <div 
              key={`first-${idx}`} 
              className="flex items-center shrink-0 py-2 sm:py-3 md:py-4 justify-center"
            >
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 rounded-full object-contain md:object-cover"
                />
              ) : (
                <span className="whitespace-nowrap text-sm sm:text-base md:text-xl lg:text-3xl font-bold text-white text-center">
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless scrolling */}
        <div className="animate-scroll flex min-w-full items-center justify-start sm:justify-evenly space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16 px-2 sm:px-4 md:px-6 lg:px-8">
          {items.map((item, idx) => (
            <div 
              key={`second-${idx}`} 
              className="flex items-center shrink-0 py-2 sm:py-3 md:py-4 justify-center"
            >
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 rounded-full object-contain md:object-cover"
                />
              ) : (
                <span className="whitespace-nowrap text-sm sm:text-base md:text-xl lg:text-3xl font-bold text-white text-center">
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