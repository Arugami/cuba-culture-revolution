import React from "react";
import { cn } from "@/lib/utils";

interface ContinuousSliderProps {
  className?: string;
}

const ContinuousSlider = ({ className }: ContinuousSliderProps) => {
  const items = [
    { type: "text", content: "$CUBA" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "First Ever Country Take Over" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "Join The Community" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
  ];

  return (
    <div className={cn("w-full overflow-hidden bg-[#0A0F29] py-6 md:py-8", className)}>
      <div className="relative flex w-full">
        {/* First set of scrolling items */}
        <div className="animate-scroll flex min-w-full items-center justify-center gap-8 md:gap-16 px-4 md:px-8">
          {items.map((item, idx) => (
            <div key={`first-${idx}`} className="flex items-center shrink-0">
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-12 w-12 md:h-24 md:w-24 rounded-full object-cover"
                />
              ) : (
                <span className="whitespace-nowrap text-lg md:text-3xl font-bold text-white">
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless scrolling */}
        <div className="animate-scroll flex min-w-full items-center justify-center gap-8 md:gap-16 px-4 md:px-8">
          {items.map((item, idx) => (
            <div key={`second-${idx}`} className="flex items-center shrink-0">
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-12 w-12 md:h-24 md:w-24 rounded-full object-cover"
                />
              ) : (
                <span className="whitespace-nowrap text-lg md:text-3xl font-bold text-white">
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