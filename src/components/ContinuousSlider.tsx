import React from "react";
import { cn } from "@/lib/utils";

interface ContinuousSliderProps {
  className?: string;
}

const ContinuousSlider = ({ className }: ContinuousSliderProps) => {
  const items = Array(6).fill({
    image: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png",
    texts: ["$CUBA", "First-Ever Country Takeover"]
  });

  return (
    <div className={cn("w-full overflow-hidden bg-[#0A0F29] py-8", className)}>
      <div className="relative flex w-full">
        {/* First set of scrolling items */}
        <div className="animate-scroll flex min-w-full justify-around gap-4">
          {items.map((item, idx) => (
            <div key={`first-${idx}`} className="flex items-center gap-4">
              <img
                src={item.image}
                alt="Country Takeover Logo"
                className="h-24 w-24 rounded-full object-cover"
              />
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold text-[#FFD700]">{item.texts[0]}</span>
                <span className="text-sm text-white">{item.texts[1]}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless scrolling */}
        <div className="animate-scroll flex min-w-full justify-around gap-4">
          {items.map((item, idx) => (
            <div key={`second-${idx}`} className="flex items-center gap-4">
              <img
                src={item.image}
                alt="Country Takeover Logo"
                className="h-24 w-24 rounded-full object-cover"
              />
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold text-[#FFD700]">{item.texts[0]}</span>
                <span className="text-sm text-white">{item.texts[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2 className="mt-4 text-center text-2xl font-bold text-[#FFD700]">
        JOIN THE COMMUNITY
      </h2>
    </div>
  );
};

export default ContinuousSlider;