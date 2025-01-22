import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        toast({
          description: "Music paused",
          duration: 2000, // 2 seconds
        });
      } else {
        audioRef.current.play().catch(() => {
          toast({
            variant: "destructive",
            description: "Unable to play Flip the Peso. Please try again.",
            duration: 2000,
          });
        });
        toast({
          description: "Playing Flip the Peso 🎵",
          duration: 2000,
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        src="/Flip the Peso.mp3"
        loop
      />
      <Button
        onClick={togglePlay}
        variant="outline"
        size="icon"
        className="bg-cuba-red hover:bg-cuba-red/80 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      >
        {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default AudioPlayer;