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
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Empowering the Cuban people through decentralized finance and community-driven initiatives
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-cuba-red hover:bg-cuba-red/90 text-white"
            asChild
          >
            <a href="#how-to-buy">Buy $CUBA Now</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white"
            asChild
          >
            <a
              href="https://t.me/CubaCoin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Community
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;