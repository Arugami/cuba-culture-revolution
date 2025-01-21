import { useEffect } from "react";

const TwitterFeed = () => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";

    // Debug logging
    script.onload = () => {
      console.log("Twitter script loaded successfully");
      // Force widget refresh
      if (window.twttr) {
        window.twttr.widgets.load();
      }
    };
    script.onerror = (error) => {
      console.error("Error loading Twitter script:", error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-cuba-blue">
          Latest Updates from X
        </h2>
        <div className="max-w-3xl mx-auto">
          <a
            className="twitter-timeline"
            data-height="600"
            data-theme="light"
            data-chrome="noheader nofooter noborders transparent"
            data-tweet-limit="5"
            href="https://twitter.com/search?q=$CUBA OR #CUBA"
          >
            Loading tweets about $CUBA...
          </a>
        </div>
      </div>
    </section>
  );
};

export default TwitterFeed;