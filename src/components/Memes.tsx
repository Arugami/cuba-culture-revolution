import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Memes = () => {
  const { translations } = useLanguage();

  const memes = [
    {
      id: 1,
      image: "/lovable-uploads/photo-1582562124811-c09040d0a901",
      title: "Cuban Cat",
      description: "When you finally get your $CUBA tokens"
    },
    {
      id: 2,
      image: "/lovable-uploads/photo-1618160702438-9b02ab6515c9",
      title: "To The Moon",
      description: "$CUBA price prediction 2025"
    },
    {
      id: 3,
      image: "/lovable-uploads/photo-1501286353178-1ec881214838",
      title: "Wen Moon",
      description: "Waiting for $CUBA to moon like"
    },
    {
      id: 4,
      image: "/lovable-uploads/photo-1485833077593-4278bba3f11f",
      title: "HODL",
      description: "Diamond hands watching the charts"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-cuba-blue/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-patua text-cuba-blue sm:text-4xl md:text-5xl">
            $CUBA Memes
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Join the fun and share your favorite $CUBA memes with our community!
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