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
  const [localMemes, setLocalMemes] = React.useState<Meme[]>(memes);

  React.useEffect(() => {
    setLocalMemes(memes);
  }, [memes]);

  const handleVote = async (memeId: string, voteType: boolean) => {
    // Optimistically update the UI
    setLocalMemes(prevMemes =>
      prevMemes.map(meme => {
        if (meme.id === memeId) {
          return {
            ...meme,
            upvotes: voteType ? (meme.upvotes || 0) + 1 : meme.upvotes,
            downvotes: !voteType ? (meme.downvotes || 0) + 1 : meme.downvotes,
          };
        }
        return meme;
      })
    );

    // Make the actual API call
    await onVote(memeId, voteType);
  };

  if (!localMemes || localMemes.length === 0) {
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
          {localMemes.map((meme) => (
            <CarouselItem key={meme.id} className="pl-1 basis-full md:basis-1/3 lg:basis-1/4">
              <MemeCard {...meme} onVote={handleVote} />
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