import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern animate-gradient"></div>
      <div className="relative container mx-auto px-6 md:px-8 py-24 md:py-32 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 md:mb-10 leading-tight">
          Join the Revolution
          <br />
          <span className="text-cuba-white mt-4 block">
            First-Ever Country Takeover ($CUBA)
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          Empowering the Cuban people to break free from an oppressive regime that has stifled their potential for decades, forging a future built on hope, unity, and financial freedom.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-cuba-red hover:bg-cuba-red/90 text-white text-lg px-8 py-6"
            asChild
          >
            <a href="#how-to-buy">Buy $CUBA Now</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;