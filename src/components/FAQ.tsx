import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

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
          {t('faq.title')}
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">{t('faq.what.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.what.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold">{t('faq.buy.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.buy.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold">{t('faq.safe.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.safe.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="font-semibold">{t('faq.join.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.join.answer')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="font-semibold">{t('faq.unique.question')}</AccordionTrigger>
              <AccordionContent>
                {t('faq.unique.answer')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;