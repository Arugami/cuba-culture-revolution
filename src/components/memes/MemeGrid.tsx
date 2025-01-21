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

interface MemeGridProps {
  memes: Meme[];
  onVote: (memeId: string, voteType: boolean) => Promise<void>;
}

const MemeGrid = ({ memes, onVote }: MemeGridProps) => {
  console.log('Rendering MemeGrid with memes:', memes);

  if (!memes || memes.length === 0) {
    console.log('No memes available');
    return (
      <div className="w-full px-8 text-center text-gray-500">
        No memes available yet
      </div>
    );
  }

  return (
    <div className="w-full px-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1 flex">
          {memes.map((meme) => {
            console.log('Rendering meme:', meme);
            return (
              <CarouselItem key={meme.id} className="pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <MemeCard {...meme} onVote={onVote} />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="absolute -left-12 top-1/2" />
          <CarouselNext className="absolute -right-12 top-1/2" />
        </div>
      </Carousel>
    </div>
  );
};

export default MemeGrid;