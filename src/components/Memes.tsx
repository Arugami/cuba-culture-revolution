import { useLanguage } from "@/contexts/LanguageContext";
import { useMemes } from "@/hooks/useMemes";
import { useVoteManagement } from "@/hooks/useVoteManagement";
import { useChatMemeUpload } from "@/hooks/useChatMemeUpload";
import MemeUpload from "./MemeUpload";
import MemeGrid from "./memes/MemeGrid";

const Memes = () => {
  const { t } = useLanguage();
  const { memes, isLoading, fetchMemes } = useMemes();
  const { handleVote } = useVoteManagement();
  const { handleMemeCommand } = useChatMemeUpload({ onUploadSuccess: fetchMemes });

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
        
        <div className="mb-8">
          {!isLoading && <MemeGrid memes={memes} onVote={handleVote} />}
        </div>
        
        <div className="mt-8 flex justify-center">
          <MemeUpload onUploadSuccess={fetchMemes} />
        </div>
      </div>
    </section>
  );
};

export default Memes;