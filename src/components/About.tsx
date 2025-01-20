const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          What is <span className="text-cuba-red">$CUBA</span>?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-6">
              $CUBA is more than just a meme coin – it's a movement. As the first-ever
              Country Takeover (CTO) token, we're building a decentralized,
              community-driven platform that aims to empower the Cuban people and
              promote financial independence.
            </p>
            <p className="text-lg">
              Through our innovative approach to cryptocurrency, we're creating a
              bridge between digital assets and real-world impact, focusing on
              humanitarian initiatives and supporting the Cuban community worldwide.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-video bg-cuba-blue/10 rounded-lg flex items-center justify-center">
              <span className="text-cuba-blue">Cuban Culture Image Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;