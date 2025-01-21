const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className="relative p-[12px] rounded-2xl shadow-lg overflow-hidden"
          style={{
            background: 'linear-gradient(45deg, #DA291C, #004B87)',
          }}
        >
          <div
            className="relative z-10 rounded-xl"
            style={{
              backgroundImage: "url('/lovable-uploads/59df5922-3c15-48c7-b48f-f2d65933b6af.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">
                $CUBA: <span className="text-cuba-red">The First Country Take Over</span>
              </h1>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-white">
                    On January 20, 2025, the Cuban government launched a cryptocurrency, claiming it would revolutionize the nation's financial future. For a brief moment, it seemed like hope had arrived for the Cuban people. The coin skyrocketed to a $30 million market cap, and investors believed change was within reach.
                  </p>
                  <p className="text-lg mt-6 text-white">
                    But in a cruel twist, the project collapsed just hours later in a devastating rug pull. It wasn't just a financial loss—it was a betrayal of trust. The government's failed attempt left the Cuban people disillusioned and abandoned. And yet, the story didn't end there.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/69044ac3-a853-4f81-95d9-69b3a070d3a4.png"
                    alt="Person holding $CUBA sign in front of colorful Cuban buildings"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;