import React from "react";
import { cn } from "@/lib/utils";

interface ContinuousSliderProps {
  className?: string;
}

const ContinuousSlider = ({ className }: ContinuousSliderProps) => {
  const items = [
    { type: "text", content: "$CUBA" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
    { type: "text", content: "First-Ever Country Takeover" },
    { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png" },
  ];

  return (
    <div className={cn("w-full overflow-hidden bg-[#0A0F29] py-12", className)}>
      <div className="relative flex w-full">
        {/* First set of scrolling items */}
        <div className="animate-scroll flex min-w-full justify-around gap-24">
          {items.map((item, idx) => (
            <div key={`first-${idx}`} className="flex items-center">
              {item.type === "image" ? (
                <img
                  src={item.content}
                  alt="Country Takeover Logo"
                  className="h-32 w-32 rounded-full object-cover border-2 border-[#FFD700]/20"
                />
              ) : (
                <span className={cn(
                  "text-3xl font-bold",
                  item.content === "$CUBA" ? "text-[#FFD700]" : "text-white/90"
                )}>
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
                  className="h-32 w-32 rounded-full object-cover border-2 border-[#FFD700]/20"
                />
              ) : (
                <span className={cn(
                  "text-3xl font-bold",
                  item.content === "$CUBA" ? "text-[#FFD700]" : "text-white/90"
                )}>
                  {item.content}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <h2 className="mt-8 text-center text-3xl font-bold text-[#FFD700]">
        JOIN THE COMMUNITY
      </h2>
    </div>
  );
};

export default ContinuousSlider;