import { useScrollFade } from "@/hooks/useScrollFade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How often is the database updated?",
    answer: "Every week. New opportunities drop every Monday."
  },
  {
    question: "Is this just a list of Hacker News links?",
    answer: "No. Each opportunity includes engagement scores, extracted keywords, and 3-5 matched GitHub repos. We connect problems to building blocks."
  },
  {
    question: "What if I already have an idea?",
    answer: "Use Build Signals to validate it. Search for similar problems. See if people are already asking for what you want to build. That's validation before you write any code."
  },
  {
    question: "Do I need to be a 'real' developer?",
    answer: "No. If you can ship something with Claude, Cursor, Replit, or similar tools, you're the target customer. Build Signals is for people who can build but need direction."
  },
  {
    question: "What's your refund policy?",
    answer: "30 days, no questions asked. If you don't find value, email me and I'll refund you immediately."
  }
];

const FAQ = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-primary-section scroll-fade">
      <div className="container-custom max-w-[720px]">
        <h2 className="text-subheadline text-center mb-12">Questions</h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-b border-border py-2"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground-secondary pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
