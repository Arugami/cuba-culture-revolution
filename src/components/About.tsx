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
              backgroundImage: "url('/lovable-uploads/4b12280b-2230-42bc-bb4a-aca8eb20d611.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-left mb-8 text-white">
                $CUBA
                <br />
                <span className="bg-gradient-to-r from-cuba-red via-cuba-blue to-cuba-white bg-clip-text text-transparent">The First Country Take Over</span>
              </h1>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/2">
                  <img 
                    src="/lovable-uploads/69044ac3-a853-4f81-95d9-69b3a070d3a4.png"
                    alt="Person holding $CUBA sign in front of colorful Cuban buildings"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <p className="text-lg text-white">
                    On January 20, 2025, the Cuban government launched a cryptocurrency, claiming it would revolutionize the nation's financial future. For a brief moment, it seemed like hope had arrived for the Cuban people. The coin skyrocketed to a $30 million market cap, and investors believed change was within reach.
                  </p>
                  <p className="text-lg mt-6 text-white">
                    But in a cruel twist, the project collapsed just hours later in a devastating rug pull. It wasn't just a financial loss—it was a betrayal of trust. The government's failed attempt left the Cuban people disillusioned and abandoned. And yet, the story didn't end there.
                  </p>
                  <p className="text-lg mt-6 text-white">
                    In the face of despair, a bold global community rose up. $CUBA was born—not as a government-backed project, but as a movement of the people.
                  </p>
                  <p className="text-lg mt-6 text-white">
                    $CUBA isn't just a token—it's a revolutionary symbol of resilience and hope. It represents a historic Country Takeover (CTO), proving that power can and should belong to the people.
                  </p>
                  <div className="mt-8 flex justify-end">
                    <a 
                      href="https://t.me/CubaCTO" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 bg-gradient-to-r from-cuba-red via-cuba-blue to-cuba-white text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                    >
                      Join the $CUBA Revolution
                    </a>
                  </div>
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