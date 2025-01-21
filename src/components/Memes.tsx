import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import MemeUpload from "./MemeUpload";
import MemeGrid from "./memes/MemeGrid";
import { Meme } from "@/types/meme";
import { useAuth } from "@/contexts/AuthContext";

const Memes = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleVote = async (memeId: string, voteType: boolean) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please login to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('meme_votes')
        .select()
        .eq('meme_id', memeId)
        .eq('user_id', user.id)
        .single();

      if (existingVote) {
        // If vote type is the same, remove the vote
        if (existingVote.vote_type === voteType) {
          const { error } = await supabase
            .from('meme_votes')
            .delete()
            .eq('id', existingVote.id);

          if (error) throw error;

          toast({
            title: "Success!",
            description: "Vote removed",
          });
        } else {
          // If vote type is different, update the vote
          const { error } = await supabase
            .from('meme_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          if (error) throw error;

          toast({
            title: "Success!",
            description: `Vote changed to ${voteType ? 'up' : 'down'}`,
          });
        }
      } else {
        // Create new vote
        const { error } = await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            user_id: user.id,
            vote_type: voteType
          });

        if (error) throw error;

        toast({
          title: "Success!",
          description: `Vote ${voteType ? 'up' : 'down'} recorded`,
        });
      }

      // Refresh memes to get updated vote counts
      await fetchMemes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchMemes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("memes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedMemes = data.map(meme => ({
          id: meme.id,
          image: meme.image_url,
          title: meme.title,
          description: meme.description,
          upvotes: meme.upvotes || 0,
          downvotes: meme.downvotes || 0
        }));
        
        setMemes(formattedMemes);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch memes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <section 
      className="w-full py-12 md:py-24 lg:py-32 bg-cuba-blue/5 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/f079d44d-7232-4120-828e-03b0afa074f5.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: 'scaleY(-1)'
      }}
    >
      <div className="container px-4 md:px-6 relative z-10" style={{ transform: 'scaleY(-1)' }}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-patua text-cuba-blue sm:text-4xl md:text-5xl">
            {t('memes.title')}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {t('memes.subtitle')}
          </p>
        </div>
        
        {!isLoading && <MemeGrid memes={memes} onVote={handleVote} />}
        
        <div className="mt-16 flex flex-col items-center justify-center">
          <div className="flex justify-center w-full">
            <MemeUpload onUploadSuccess={fetchMemes} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memes;