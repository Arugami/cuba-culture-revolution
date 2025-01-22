import { useLanguage } from "@/contexts/LanguageContext";
import { useUserMemes } from "@/hooks/memes/useUserMemes";
import { useAuth } from "@/contexts/AuthContext";
import MemeGrid from "./core/MemeGrid";
import { AuthModal } from "../AuthModal";
import { Button } from "../ui/button";

const UserMemes = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { memes, isLoading } = useUserMemes();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white/80 rounded-lg">
        <h3 className="text-xl font-semibold">{t('memes.signInToView')}</h3>
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h3 className="text-2xl font-patua text-cuba-blue">
            {t('memes.yourMemes')} ({memes.length})
          </h3>
        </div>

        <div className="mb-8">
          {!isLoading && <MemeGrid memes={memes} />}
        </div>
      </div>
    </div>
  );
};

export default UserMemes;