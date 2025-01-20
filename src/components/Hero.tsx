import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern animate-gradient"></div>
      <div className="relative container mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Join the Revolution
          <br />
          <span className="text-cuba-white">
            First-Ever Country Takeover ($CUBA)
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Empowering the Cuban people to break free from an oppressive regime that has stifled their potential for decades, forging a future built on hope, unity, and financial freedom.
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-cuba-red hover:bg-cuba-red/90 text-white"
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