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
  userVote: boolean | null;
  isVoting: boolean;
}

const MemeGrid = ({ memes, onVote, userVote, isVoting }: MemeGridProps) => {
  if (!memes || memes.length === 0) {
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
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {memes.map((meme) => (
            <CarouselItem key={meme.id} className="pl-1 basis-full md:basis-1/3 lg:basis-1/4">
              <MemeCard 
                {...meme} 
                onVote={onVote}
                userVote={userVote}
                isVoting={isVoting}
              />
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