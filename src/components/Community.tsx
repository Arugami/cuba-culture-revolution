const Community = () => {
  return (
    <section id="community" className="py-20 bg-[#0b0f2a]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">
          Buy Now with a
          <br />
          Debit Card or Crypto!
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
          <div className="bg-[#0b0f2a] border-2 border-white p-4 rounded-lg">
            <img
              src="/lovable-uploads/bd4df84f-5141-449a-931a-0697893e45be.png"
              alt="Apple Pay"
              className="h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border-2 border-white p-4 rounded-lg">
            <img
              src="/lovable-uploads/6fdc1251-1345-45d7-81d1-82dd5b95f82d.png"
              alt="Visa and Mastercard"
              className="h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border-2 border-white p-4 rounded-lg">
            <img
              src="/lovable-uploads/781ccde2-2b6b-4942-b166-7dd4e7c669e5.png"
              alt="Venmo"
              className="h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border-2 border-white p-4 rounded-lg">
            <img
              src="/lovable-uploads/ca57a1c0-f081-4444-abcd-c168f38c2d9b.png"
              alt="USD Coin"
              className="h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="bg-[#0b0f2a] border-2 border-white p-4 rounded-lg">
            <img
              src="/lovable-uploads/b07bbf82-d262-4091-90d9-236dc8b94681.png"
              alt="Solana"
              className="h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://raydium.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cuba-red text-white font-bold py-6 px-24 rounded-lg text-3xl hover:bg-cuba-blue transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto min-w-[280px]"
          >
            BUY NOW
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 mt-3">
          <p className="text-gray-400 text-2xl">Buy Easily with</p>
          <img
            src="/lovable-uploads/d4eb0fb2-d814-4c28-a5b5-4e986519abe5.png"
            alt="Moonshot Logo"
            className="h-32 w-auto hover:brightness-110 transition-all"
          />
        </div>
      </div>
    </section>
  );
};

export default Community;