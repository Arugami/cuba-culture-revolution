const Community = () => {
  return (
    <section id="community" className="py-12 md:py-20 bg-[#0b0f2a] relative">
      <div className="w-full h-1 bg-cuba-red absolute top-0 left-0"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-6 md:mb-8 text-white">
          Buy Now with a
          <br />
          Debit Card or Crypto!
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12 justify-items-center">
          <div className="bg-[#0b0f2a] border border-white p-3 md:p-4 rounded-lg">
            <img
              src="/lovable-uploads/bd4df84f-5141-449a-931a-0697893e45be.png"
              alt="Apple Pay"
              className="h-16 sm:h-20 md:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border border-white p-3 md:p-4 rounded-lg">
            <img
              src="/lovable-uploads/6fdc1251-1345-45d7-81d1-82dd5b95f82d.png"
              alt="Visa and Mastercard"
              className="h-16 sm:h-20 md:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border border-white p-3 md:p-4 rounded-lg">
            <img
              src="/lovable-uploads/781ccde2-2b6b-4942-b166-7dd4e7c669e5.png"
              alt="Venmo"
              className="h-16 sm:h-20 md:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border border-white p-3 md:p-4 rounded-lg">
            <img
              src="/lovable-uploads/ca57a1c0-f081-4444-abcd-c168f38c2d9b.png"
              alt="USD Coin"
              className="h-16 sm:h-20 md:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border border-white p-3 md:p-4 rounded-lg">
            <img
              src="/lovable-uploads/b07bbf82-d262-4091-90d9-236dc8b94681.png"
              alt="Solana"
              className="h-16 sm:h-20 md:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <div className="text-center px-4">
          <a
            href="https://moonshot.money/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cuba-red text-white font-bold py-4 sm:py-6 px-8 sm:px-24 rounded-lg text-xl sm:text-2xl md:text-3xl hover:bg-cuba-blue transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto min-w-[280px]"
          >
            BUY NOW
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-4">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400">Buy Easily with</p>
          <img
            src="/lovable-uploads/d4eb0fb2-d814-4c28-a5b5-4e986519abe5.png"
            alt="Moonshot Logo"
            className="h-20 sm:h-24 md:h-32 w-auto hover:brightness-110 transition-all"
          />
        </div>
      </div>
      <div className="w-full h-1 bg-cuba-red absolute bottom-0 left-0"></div>
    </section>
  );
};

export default Community;