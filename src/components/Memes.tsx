import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Memes = () => {
  const { translations } = useLanguage();

  const memes = [
    {
      id: 1,
      image: "/lovable-uploads/f4d689ad-5a03-4747-9888-9480eec549ad.png",
      title: "Change My Mind",
      description: "$Cuban will flip the peso and we will free the Cuban people"
    },
    {
      id: 2,
      image: "/lovable-uploads/653934c1-35ac-4801-b44c-e8bf33ce8242.png",
      title: "National Currency",
      description: "Cuban citizens ready to adopt $CUBA as their National Currency"
    },
    {
      id: 3,
      image: "/lovable-uploads/0ac9564d-fcfc-452f-a076-f1bbd55ccc58.png",
      title: "The Slap",
      description: "$CUBA vs Cuban Government Officials"
    },
    {
      id: 4,
      image: "/lovable-uploads/fc5ece16-5fe3-48cc-bba5-3927abd32442.png",
      title: "The Switch",
      description: "Cuban Citizens choosing their financial freedom"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-cuba-blue/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-patua text-cuba-blue sm:text-4xl md:text-5xl">
            {translations.memes.title}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {translations.memes.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {memes.map((meme) => (
            <Card key={meme.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={meme.image}
                    alt={meme.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                    <h3 className="text-white font-patua text-lg">{meme.title}</h3>
                    <p className="text-white/80 text-sm">{meme.description}</p>
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