import { useScrollFade } from "@/hooks/useScrollFade";

const Problem = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-primary-section scroll-fade">
      <div className="container-custom max-w-[720px]">
        <div className="space-y-6 text-body">
          <p>You've seen the tweets.</p>
          
          <p>
            Some guy ships a tool in a weekend with Claude and it's doing $3k/month. Another person builds a Chrome extension in an afternoon and quits their job six months later.
          </p>
          
          <p>
            You could do that. You've got the same tools. Cursor, Claude, Replit, v0, whatever.
          </p>
          
          <p>But when you sit down to build... you don't know what to build.</p>
          
          <p>
            You scroll Twitter for ideas. You ask ChatGPT for "SaaS ideas in 2025." You bookmark 47 "build this" threads and never look at them again.
          </p>
          
          <p>Nothing sticks.</p>
          
          <p className="prose-emphasis">
            Here's the thing: the problem isn't your ability to ship. AI solved that. You can vibe code your way to a working product in a weekend.
          </p>
          
          <p className="prose-emphasis">
            The problem is you're guessing at what to ship.
          </p>
          
          <p className="prose-emphasis">
            And guessing is why most side projects die with 12 GitHub stars and zero users.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
