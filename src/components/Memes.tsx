import { useLanguage } from "@/contexts/LanguageContext";
import MemeUpload from "./MemeUpload";
import MemeGrid from "./memes/MemeGrid";
import { useMemes } from "@/hooks/useMemes";
import { useVoteManagement } from "@/hooks/useVoteManagement";

const Memes = () => {
  const { t } = useLanguage();
  const { memes, isLoading, fetchMemes } = useMemes();
  const { handleVote } = useVoteManagement();

  console.log('Memes component rendering with:', { memes, isLoading });

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
        
        {isLoading ? (
          <div className="text-center">Loading memes...</div>
        ) : (
          <MemeGrid memes={memes} onVote={handleVote} />
        )}
        
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