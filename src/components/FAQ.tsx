import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section 
      className="py-16 bg-white relative" 
      id="faq"
      style={{
        backgroundImage: "url('/lovable-uploads/c3b2f105-1048-42cc-8b5b-f987c9353be6.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is $CUBA?</AccordionTrigger>
              <AccordionContent>
                $CUBA is the first-ever 'Country Takeover' (CTO) meme coin, designed to empower the Cuban people and promote financial independence through decentralized technology.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How can I buy $CUBA?</AccordionTrigger>
              <AccordionContent>
                You can buy $CUBA on Raydium by connecting your Solana wallet and using the contract address: 27T4BetBEXjxfqeUb7WWcCz8rKPUJuxNu2CGzApPpump.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Is $CUBA safe to invest in?</AccordionTrigger>
              <AccordionContent>
                Like all cryptocurrencies, investing in $CUBA carries risks. Always do your own research and never invest more than you can afford to lose.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How can I join the $CUBA community?</AccordionTrigger>
              <AccordionContent>
                You can join our vibrant community on Telegram and X (formerly Twitter). Links to our social media platforms can be found in the Community section above.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What makes $CUBA unique?</AccordionTrigger>
              <AccordionContent>
                $CUBA is unique as it's the first meme coin that aims to create a meaningful impact through the concept of 'Country Takeover' while incorporating elements of Cuban culture and community engagement.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;