import React from "react";
import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface MemeGridProps {
  memes: Meme[];
}

const MemeGrid = ({ memes }: MemeGridProps) => {
  const isMobile = useIsMobile();

  if (!memes || memes.length === 0) {
    return (
      <div className="w-full px-8 text-center text-gray-500">
        No memes available yet
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full px-4 grid grid-cols-1 gap-4">
        {memes.map((meme) => (
          <div key={meme.id}>
            <MemeCard {...meme} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {memes.map((meme) => (
            <CarouselItem key={meme.id} className="pl-1 basis-1/4">
              <MemeCard {...meme} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MemeGrid;