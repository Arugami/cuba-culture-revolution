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
          <div className="bg-[#000033] p-4 rounded-lg">
            <img
              src="/lovable-uploads/bd4df84f-5141-449a-931a-0697893e45be.png"
              alt="Apple Pay"
              className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          {[2, 3, 4, 5].map((index) => (
            <div key={index} className="bg-[#000033] p-4 rounded-lg">
              <img
                src="/lovable-uploads/dfdf1c99-08ba-46d6-ad22-e8f1170a23ed.png"
                alt={`Payment method ${index}`}
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://raydium.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cuba-red text-white font-bold py-4 px-12 rounded-lg text-xl hover:bg-cuba-red/90 transition-colors"
          >
            BUY NOW
          </a>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Buy Easily with{" "}
          <a
            href="https://moonshot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-cuba-red"
          >
            moonshot
          </a>
        </p>
      </div>
    </section>
  );
};

export default Community;