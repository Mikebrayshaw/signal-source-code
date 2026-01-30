import { useScrollFade } from "@/hooks/useScrollFade";
import { Search, GitBranch, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "We scan Hacker News",
    description: "Every week, we pull the highest-engagement Ask HN and Show HN posts. Problems that resonated. Questions that got hundreds of comments. The stuff people actually care about."
  },
  {
    number: "02",
    icon: GitBranch,
    title: "We match to GitHub repos",
    description: "For each opportunity, we search for relevant open source projects. Boilerplates. Libraries. Working code you can reference. Stuff that saves you from building everything from scratch."
  },
  {
    number: "03",
    icon: Rocket,
    title: "You browse, filter, build",
    description: "Search by keyword. Sort by engagement. Find something that matches what you're interested in. Then open Cursor and start shipping."
  }
];

const HowItWorks = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-secondary-section scroll-fade">
      <div className="container-custom">
        <h2 className="text-subheadline text-center mb-16">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="card-feature"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-sm font-semibold text-primary mb-4 block">
                {step.number}
              </span>
              <step.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-section-header mb-3">{step.title}</h3>
              <p className="text-body">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
