import { useScrollFade } from "@/hooks/useScrollFade";

const Solution = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-primary-section scroll-fade">
      <div className="container-custom max-w-[720px]">
        <div className="space-y-6 text-body">
          <p className="text-foreground font-semibold text-lg">That's why I built Build Signals.</p>
          
          <p>
            Every week, we scan hundreds of posts on Hacker News. Specifically Ask HN ("I need help with...") and Show HN ("I built this, but...").
          </p>
          
          <p>
            These aren't random complaints. These are problems that got hundreds of developers talking. Upvoting. Commenting "yeah, I have this exact problem."
          </p>
          
          <p>
            Then we match each pain point to relevant GitHub repos. Open source code you can fork, learn from, or build on top of.
          </p>
          
          <p>
            So instead of asking ChatGPT for ideas (and getting generic garbage), you browse a database of validated problems.
          </p>
          
          <p>Each one comes with:</p>
          
          <ul className="space-y-2 text-foreground-secondary">
            <li className="flex items-start gap-2">
              <span className="text-primary">—</span>
              <span>The original post and discussion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">—</span>
              <span>Engagement signals (how many people care)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">—</span>
              <span>Keywords for quick scanning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">—</span>
              <span>GitHub repos to jumpstart your build</span>
            </li>
          </ul>
          
          <p className="prose-emphasis pt-4">
            Find a problem. Check the repos. Ship something people already want.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;
