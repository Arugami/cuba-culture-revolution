const Community = () => {
  return (
    <section id="community" className="py-20 bg-[#0b0f2a] relative">
      <div className="w-full h-1 bg-cuba-red absolute top-0 left-0"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-7xl font-bold text-center mb-8 text-white leading-tight">
          Buy Now with a
          <br />
          Debit Card or Crypto!
        </h2>

        <div className="relative w-full overflow-hidden mb-12">
          <div className="flex gap-3 animate-scroll md:animate-none md:justify-center">
            {[
              { src: "/lovable-uploads/bd4df84f-5141-449a-931a-0697893e45be.png", alt: "Apple Pay" },
              { src: "/lovable-uploads/6fdc1251-1345-45d7-81d1-82dd5b95f82d.png", alt: "Visa and Mastercard" },
              { src: "/lovable-uploads/781ccde2-2b6b-4942-b166-7dd4e7c669e5.png", alt: "Venmo" },
              { src: "/lovable-uploads/ca57a1c0-f081-4444-abcd-c168f38c2d9b.png", alt: "USD Coin" },
              { src: "/lovable-uploads/b07bbf82-d262-4091-90d9-236dc8b94681.png", alt: "Solana" }
            ].map((logo, index) => (
              <div 
                key={index}
                className="flex-shrink-0 bg-white/5 border border-white/10 p-3 rounded-lg transform transition-all duration-200 hover:scale-105 hover:bg-white/10"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center px-4">
          <a
            href="https://moonshot.money/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cuba-red text-white font-bold py-5 px-8 md:px-24 rounded-xl text-xl md:text-3xl hover:bg-cuba-blue transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full md:w-auto min-w-[280px] mx-auto"
          >
            BUY NOW
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 mt-12 md:mt-8">
          <p className="text-gray-400 text-lg md:text-2xl">Buy Easily with</p>
          <img
            src="/lovable-uploads/d4eb0fb2-d814-4c28-a5b5-4e986519abe5.png"
            alt="Moonshot Logo"
            className="h-20 md:h-32 w-auto hover:brightness-110 transition-all"
          />
        </div>
      </div>
      <div className="w-full h-1 bg-cuba-red absolute bottom-0 left-0"></div>
    </section>
  );
};

export default Community;