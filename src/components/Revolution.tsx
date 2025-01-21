import React from "react";

const Revolution = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-cuba-blue via-cuba-red to-cuba-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-cuba-white mb-6">
              Join the $CUBA Revolution!
            </h2>
            <div className="bg-[rgba(0,0,0,0.5)] p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl md:text-2xl font-semibold text-cuba-white mb-4">
                Mission
              </h3>
              <p className="text-lg text-cuba-white leading-relaxed">
                This is YOUR chance to join a movement that's all about empowering the Cuban people. $CUBA bridges digital innovation with real-world impact, fostering hope, freedom, and a brighter future. Together, we'll rewrite history! 🚀
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1">
            <img
              src="/lovable-uploads/43aa06bf-91a0-45d1-9952-0a9349bbe641.png"
              alt="$CUBA Community Support"
              className="w-full h-auto max-w-md mx-auto rounded-lg shadow-xl"
              style={{
                filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Revolution;