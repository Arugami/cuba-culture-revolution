import { FC } from "react";

const About: FC = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-0.5 w-16 bg-cuba-red"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            About <span className="text-cuba-red">$CUBA</span>
          </h2>
          <div className="h-0.5 w-16 bg-cuba-red"></div>
        </div>
        <p className="text-lg text-center max-w-2xl mx-auto">
          $CUBA is the first-ever 'Country Takeover' (CTO) meme coin, designed to empower the Cuban people and promote financial independence through decentralized technology. Our mission is to create a vibrant community that supports the growth and adoption of cryptocurrency in Cuba and beyond.
        </p>
      </div>
    </section>
  );
};

export default About;
