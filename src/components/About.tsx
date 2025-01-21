const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          className="rounded-2xl p-8 shadow-lg relative"
          style={{
            backgroundImage: "url('/lovable-uploads/59df5922-3c15-48c7-b48f-f2d65933b6af.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient border using pseudo-element with increased visibility */}
          <div 
            className="absolute inset-0 rounded-2xl p-[8px] bg-gradient-to-r from-cuba-red to-cuba-blue"
            style={{
              margin: '-4px',
              zIndex: 0,
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}
          />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
              What is <span className="text-cuba-red">$CUBA</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-6 text-white">
                  $CUBA is more than just a meme coin—it's a revolutionary movement and
                  the first-ever 'Country Takeover' (CTO).
                </p>
                <p className="text-lg mb-6 text-white">
                  Sparked by the Cuban government's failed attempts to launch a
                  cryptocurrency—and the bold response of a global community—$CUBA is
                  on a mission to empower the Cuban people and achieve true financial
                  independence.
                </p>
                <p className="text-lg text-white">
                  $CUBA bridges the gap between digital assets and humanitarian
                  initiatives, supporting the Cuban community worldwide while
                  amplifying their voices and aspirations for freedom.
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
    </section>
  );
};

export default About;