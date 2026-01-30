import { useScrollFade } from "@/hooks/useScrollFade";

const valueItems = [
  {
    title: "The Opportunities Database",
    description: "A searchable, filterable database of validated pain points. Each entry includes engagement scores, keywords, and 3-5 matched GitHub repos. Updated every week with fresh opportunities.",
    value: "$297 value"
  },
  {
    title: "Weekly Top Opportunities Email",
    description: "Every Wednesday, the top 5 opportunities land in your inbox. Highest engagement. Best matches. The ones worth your weekend. You don't have to remember to check the database.",
    value: "$97 value"
  },
  {
    title: "Bonus: How to Validate in 48 Hours",
    description: "A guide to making sure people will actually pay before you build. Covers finding potential customers, the questions to ask, and the 'fake door' test. Available as a Claude Skill or Google Doc.",
    value: "$47 value"
  }
];

const ValueStack = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-secondary-section scroll-fade">
      <div className="container-custom max-w-[720px]">
        <h2 className="text-subheadline text-center mb-12">What You Get</h2>
        
        <div className="space-y-4">
          {valueItems.map((item) => (
            <div key={item.title} className="value-item">
              <div className="flex-1">
                <h3 className="text-foreground font-semibold mb-2">{item.title}</h3>
                <p className="text-body text-sm">{item.description}</p>
              </div>
              <span className="badge-value">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Total Value */}
        <div className="bg-muted border border-border rounded-xl p-6 mt-6 flex items-center justify-between">
          <span className="text-foreground-secondary font-medium text-lg">Total Value</span>
          <span className="price-struck">$441</span>
        </div>

        {/* Price Reveal */}
        <div className="text-center mt-10">
          <p className="text-foreground-muted mb-2">Your price:</p>
          <p className="price-big">$99</p>
          <p className="text-foreground-secondary mt-2">One-time. Lifetime access.</p>
        </div>
      </div>
    </section>
  );
};

export default ValueStack;
