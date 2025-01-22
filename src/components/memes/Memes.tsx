import { useLanguage } from "@/contexts/LanguageContext";
import { useMemes } from "@/hooks/memes/useMemes";
import MemeUpload from "./upload/MemeUpload";
import MemeGrid from "./core/MemeGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Memes = () => {
  const { t } = useLanguage();
  const { memes, isLoading, fetchMemes, sortBy, setSortBy } = useMemes();

  const handleSortChange = (value: string) => {
    setSortBy('newest');
  };

  // Subscribe to real-time updates
  useEffect(() => {
    console.log('Setting up real-time subscriptions');
    
    const memesChannel = supabase
      .channel('memes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'memes'
        },
        (payload) => {
          console.log('Memes change received:', payload);
          fetchMemes();
        }
      )
      .subscribe();

    const votesChannel = supabase
      .channel('votes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'meme_votes'
        },
        (payload) => {
          console.log('Vote change received:', payload);
          fetchMemes();
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscriptions');
      supabase.removeChannel(memesChannel);
      supabase.removeChannel(votesChannel);
    };
  }, [fetchMemes]);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-cuba-blue/5 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-patua text-cuba-blue sm:text-4xl md:text-5xl">
            {t('memes.title')}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {t('memes.subtitle')}
          </p>
        </div>

        <div className="flex justify-end mb-4 px-8">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8">
          {!isLoading && <MemeGrid memes={memes} />}
        </div>

        <div className="mt-8 flex justify-center">
          <MemeUpload onUploadSuccess={fetchMemes} />
        </div>
      </div>
    </section>
  );
};

export default Memes;