import { MessageSquare, Twitter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Community = () => {
  return (
    <section id="community" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Join the <span className="text-cuba-red">$CUBA</span> Revolution
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <a
            href="https://t.me/CubaCoin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Telegram</h3>
            <p>Join our active Telegram community</p>
          </a>

          <a
            href="https://twitter.com/CubaCoin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Twitter className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Twitter</h3>
            <p>Follow us for the latest updates</p>
          </a>

          <a
            href="https://discord.gg/CubaCoin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-cuba-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-cuba-blue" />
            </div>
            <h3 className="font-bold mb-2">Discord</h3>
            <p>Join our Discord server</p>
          </a>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-cuba-red hover:bg-cuba-red/90 text-white"
            asChild
          >
            <a
              href="https://t.me/CubaCoin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Our Community
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Community;