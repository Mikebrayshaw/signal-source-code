import { useScrollFade } from "@/hooks/useScrollFade";

const Agitation = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-secondary-section scroll-fade">
      <div className="container-custom max-w-[720px]">
        <div className="space-y-6 text-body">
          <p>Think about the last thing you built.</p>
          
          <p>How did you come up with the idea? Probably one of these:</p>
          
          <div className="pl-4 space-y-2 text-foreground-muted italic">
            <p>"I think this would be cool"</p>
            <p>"I saw someone on Twitter mention this"</p>
            <p>"ChatGPT suggested it"</p>
            <p>"I have this problem myself" (but maybe nobody else does)</p>
          </div>
          
          <p>
            Then you spent a weekend building it. Maybe two weekends. You launched it somewhere. Got a few comments. Maybe some upvotes.
          </p>
          
          <p className="text-foreground text-lg font-medium">Then nothing.</p>
          
          <p>
            No signups. No sales. Just another repo collecting dust.
          </p>
          
          <p>
            And the worst part? You don't know if the idea was bad, the execution was bad, or you just didn't market it right.
          </p>
          
          <p>
            So you start over. New idea. Same process. Same result.
          </p>
          
          <p>
            Meanwhile, the people actually making money from their weekend projects aren't smarter than you. They're not better at prompting Claude.
          </p>
          
          <p className="prose-emphasis">
            They just started with problems people already have.
          </p>
          
          <p className="prose-emphasis">
            Real problems. Validated problems. Problems where hundreds of people are already saying "I wish someone would build this."
          </p>
          
          <p className="prose-emphasis">
            Those problems exist. People post about them every day.
          </p>
          
          <p className="prose-emphasis">
            You're just not seeing them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Agitation;
