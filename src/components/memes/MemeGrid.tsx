import React from "react";
import { Meme } from "@/types/meme";
import MemeCard from "./MemeCard";
import { supabase } from "@/integrations/supabase/client";
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
    const existingMeme = localMemes.find(meme => meme.id === memeId);
    if (!existingMeme) return;

    // Get the current vote state
    const sessionId = localStorage.getItem('voteSessionId');
    if (!sessionId) return;

    const { data: existingVote } = await supabase
      .from('meme_votes')
      .select('vote_type')
      .eq('meme_id', memeId)
      .eq('session_id', sessionId)
      .maybeSingle();

    // Calculate vote changes based on current state
    let upvoteDelta = 0;
    let downvoteDelta = 0;

    if (existingVote) {
      if (existingVote.vote_type === voteType) {
        // Removing vote
        upvoteDelta = voteType ? -1 : 0;
        downvoteDelta = voteType ? 0 : -1;
      } else {
        // Switching vote
        upvoteDelta = voteType ? 1 : -1;
        downvoteDelta = voteType ? -1 : 1;
      }
    } else {
      // New vote
      upvoteDelta = voteType ? 1 : 0;
      downvoteDelta = voteType ? 0 : 1;
    }

    // Update UI optimistically
    setLocalMemes(prevMemes =>
      prevMemes.map(meme => {
        if (meme.id === memeId) {
          return {
            ...meme,
            upvotes: Math.max(0, (meme.upvotes || 0) + upvoteDelta),
            downvotes: Math.max(0, (meme.downvotes || 0) + downvoteDelta)
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