import { useAuth } from "@/contexts/AuthContext";
import { useUserMemes } from "@/hooks/memes/useUserMemes";
import { useLanguage } from "@/contexts/LanguageContext";
import MemeGrid from "./MemeGrid";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";

const UserMemes = () => {
  const { user } = useAuth();
  const { data: memes, isLoading } = useUserMemes();
  const { t } = useLanguage();

  if (!user) {
    return (
      <div className="text-center py-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">{t('memes.signInToView')}</h3>
        <AuthModal />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md mb-8">
        <p>{t('memes.loading')}</p>
      </div>
    );
  }

  if (!memes?.length) {
    return (
      <div className="text-center py-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-2">{t('memes.noMemesYet')}</h3>
        <p className="text-gray-600 mb-4">{t('memes.startUploading')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md mb-8 p-6">
      <h3 className="text-xl font-semibold mb-4">
        {t('memes.yourMemes')} ({memes.length})
      </h3>
      <MemeGrid memes={memes} />
    </div>
  );
};

export default UserMemes;