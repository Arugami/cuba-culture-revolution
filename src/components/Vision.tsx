import { Heart, Home, Users, Newspaper, Vote } from "lucide-react";

const Vision = () => {
  return (
    <section id="vision" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Empowering the <span className="text-cuba-red">Cuban</span> People
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-cuba-red/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-cuba-red" />
            </div>
            <h3 className="font-bold mb-2">Humanitarian Initiatives</h3>
            <p>Funding critical humanitarian projects to support Cuban families in need</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-cuba-red/10 rounded-full flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-cuba-red" />
            </div>
            <h3 className="font-bold mb-2">Decentralized Real Estate</h3>
            <p>Supporting decentralized real estate opportunities for Cubans and global investors</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-cuba-red/10 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-cuba-red" />
            </div>
            <h3 className="font-bold mb-2">Community Support</h3>
            <p>Building a strong, supportive community focused on positive change</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-cuba-red/10 rounded-full flex items-center justify-center mb-4">
              <Newspaper className="w-6 h-6 text-cuba-red" />
            </div>
            <h3 className="font-bold mb-2">Independent Media</h3>
            <p>Supporting independent media and organizations advocating for freedom</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-cuba-red/10 rounded-full flex items-center justify-center mb-4">
              <Vote className="w-6 h-6 text-cuba-red" />
            </div>
            <h3 className="font-bold mb-2">Democracy Support</h3>
            <p>Supporting Cuban dissidents and activists fighting for democracy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;