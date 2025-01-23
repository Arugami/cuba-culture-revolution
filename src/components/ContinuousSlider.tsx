import React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContinuousSliderProps {
  className?: string;
}

const items = [
  { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png", id: "1" },
  { type: "text", content: "$CUBA", id: "2" },
  { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png", id: "3" },
  { type: "text", content: "First Ever Country Take Over", id: "4" },
  { type: "image", content: "/lovable-uploads/669989ab-dd77-4577-98b7-ca8a10e1cd20.png", id: "5" },
  { type: "text", content: "Join The Community", id: "6" },
];

const SliderItem = React.memo(({ item, idx }: { item: typeof items[0], idx: string }) => {
  return (
    <div 
      className={cn(
        "flex items-center shrink-0 py-2 sm:py-3 md:py-4 justify-center px-2 sm:px-3 md:px-4",
        item.type === "text" && "flex-1 min-w-[200px] sm:min-w-[250px] md:min-w-[300px]"
      )}
    >
      {item.type === "image" ? (
        <img
          src={item.content}
          alt="Country Takeover Logo"
          className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full object-contain md:object-cover"
        />
      ) : (
        <span className="whitespace-nowrap text-sm sm:text-base md:text-xl lg:text-3xl xl:text-4xl font-patua text-white text-center w-full">
          {item.content}
        </span>
      )}
    </div>
  );
});

SliderItem.displayName = "SliderItem";

const ContinuousSlider = React.memo(({ className }: ContinuousSliderProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={cn("w-full bg-[#04041e] py-3 sm:py-4 overflow-hidden border-t-2 border-b-2 sm:border-t-4 sm:border-b-4 border-cuba-red", className)}>
        <div className="relative flex w-full">
          <div className="animate-mobile-scroll flex min-w-full items-center justify-start space-x-2 sm:space-x-4">
            {[...items, ...items].map((item, idx) => (
              <SliderItem key={`mobile-${item.id}-${idx}`} item={item} idx={`mobile-${idx}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-hidden bg-[#04041e] py-4 md:py-6 lg:py-8 border-t-4 border-b-4 border-cuba-red", className)}>
      <div className="relative flex w-full">
        {[1, 2].map((setIndex) => (
          <div 
            key={`set-${setIndex}`}
            className="animate-scroll flex min-w-full items-center justify-start sm:justify-evenly space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 px-4 sm:px-6 md:px-8"
          >
            {items.map((item) => (
              <SliderItem key={`${setIndex}-${item.id}`} item={item} idx={`${setIndex}-${item.id}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

ContinuousSlider.displayName = "ContinuousSlider";

export default ContinuousSlider;