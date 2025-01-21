import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import MemeUpload from "./MemeUpload";

interface Meme {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  upvotes: number;
  downvotes: number;
  user_vote?: boolean | null;
}

const Memes = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMemes = async () => {
    try {
      const { data: memesData, error } = await supabase
        .from('memes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get user votes if authenticated
      const user = await supabase.auth.getUser();
      if (user.data.user) {
        const { data: votesData } = await supabase
          .from('meme_votes')
          .select('meme_id, vote_type')
          .eq('user_id', user.data.user.id);

        const votesMap = new Map(votesData?.map(vote => [vote.meme_id, vote.vote_type]));
        
        setMemes(memesData.map(meme => ({
          ...meme,
          user_vote: votesMap.get(meme.id) ?? null
        })));
      } else {
        setMemes(memesData);
      }
    } catch (error) {
      console.error('Error fetching memes:', error);
      toast({
        title: "Error",
        description: "Failed to load memes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (memeId: string, voteType: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Please sign in to vote",
          variant: "destructive",
        });
        return;
      }

      const { data: existingVote } = await supabase
        .from('meme_votes')
        .select()
        .eq('meme_id', memeId)
        .eq('user_id', user.id)
        .single();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote
          await supabase
            .from('meme_votes')
            .delete()
            .eq('id', existingVote.id);
        } else {
          // Update vote
          await supabase
            .from('meme_votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);
        }
      } else {
        // Insert new vote
        await supabase
          .from('meme_votes')
          .insert({
            meme_id: memeId,
            vote_type: voteType,
          });
      }

      // Refresh memes to update vote counts
      await fetchMemes();
    } catch (error) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to register vote",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMemes();

    // Subscribe to changes
    const channel = supabase
      .channel('memes_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'memes' },
        () => {
          fetchMemes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading memes...</div>;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-cuba-blue/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-patua text-cuba-blue sm:text-4xl md:text-5xl">
            {t('memes.title')}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {t('memes.subtitle')}
          </p>
        </div>

        <MemeUpload />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {memes.map((meme) => (
            <Card key={meme.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={meme.image_url}
                    alt={meme.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                    <h3 className="text-white font-patua text-lg">{meme.title}</h3>
                    {meme.description && (
                      <p className="text-white/80 text-sm">{meme.description}</p>
                    )}
                    <div className="flex justify-between mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-white hover:text-white ${meme.user_vote === true ? 'bg-green-500/50' : ''}`}
                        onClick={() => handleVote(meme.id, true)}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {meme.upvotes || 0}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-white hover:text-white ${meme.user_vote === false ? 'bg-red-500/50' : ''}`}
                        onClick={() => handleVote(meme.id, false)}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {meme.downvotes || 0}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memes;