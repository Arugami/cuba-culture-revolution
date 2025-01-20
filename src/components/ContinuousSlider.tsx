import React from "react";
import { cn } from "@/lib/utils";

interface ContinuousSliderProps {
  className?: string;
}

const ContinuousSlider = ({ className }: ContinuousSliderProps) => {
  const items = [
    { type: "text", content: "$CUBA" },
    { type: "image", content: "/lovable-uploads/1ecb1aba-a82b-43ea-8602-e1c7f218135f.png" },
    { type: "text", content: "First-Ever Country Takeover" },
    { type: "image", content: "/lovable-uploads/1ecb1aba-a82b-43ea-8602-e1c7f218135f.png" },
  ];

  return (
    <div className={cn("w-full overflow-hidden bg-[#0A0F29] py-12 border-y border-white/10", className)}>
      <div className="relative flex w-full">
        {/* First set of scrolling items */}
        <div className="animate-scroll flex min-w-full justify-around gap-24">
          {items.map((item, idx) => (
            <div key={`first-${idx}`} className="flex items-center">
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-32 w-32 object-cover rounded-full shadow-lg shadow-white/5 border-2 border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-white/10"
                />
              ) : (
                <span className="text-4xl font-bold text-white tracking-wider transition-all duration-300 hover:text-white/90">
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless scrolling */}
        <div className="animate-scroll flex min-w-full justify-around gap-24">
          {items.map((item, idx) => (
            <div key={`second-${idx}`} className="flex items-center">
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-32 w-32 object-cover rounded-full shadow-lg shadow-white/5 border-2 border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-white/10"
                />
              ) : (
                <span className="text-4xl font-bold text-white tracking-wider transition-all duration-300 hover:text-white/90">
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