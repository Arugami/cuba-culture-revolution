import { useEffect } from "react";

const TwitterFeed = () => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    // Debug logging
    script.onload = () => {
      console.log("Twitter script loaded successfully");
    };
    script.onerror = (error) => {
      console.error("Error loading Twitter script:", error);
    };

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
            data-dnt="false"
            data-expand="1"
            href="https://twitter.com/search?q=%24CUBA%20OR%20%23CUBA"
          >
            Loading tweets about $CUBA...
          </a>
        </div>
      </div>
    </section>
  );
};

export default TwitterFeed;