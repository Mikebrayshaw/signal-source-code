import { useScrollFade } from "@/hooks/useScrollFade";
import { Check, X } from "lucide-react";

const forYou = [
  "You can ship with AI tools but don't know what to build",
  "You're tired of building things that go nowhere",
  "You want your next project to solve a real problem",
  "You'd rather start with validated demand than guess and hope"
];

const notForYou = [
  "You want someone to tell you exactly what to build step-by-step",
  "You're not willing to do any building yourself",
  "You think the idea is everything (it's not, but good ideas help)",
  "You need hand-holding through the entire process"
];

const WhoIsFor = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="section-padding bg-primary-section scroll-fade">
      <div className="container-custom max-w-[800px]">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For You */}
          <div className="card-feature">
            <h3 className="text-section-header mb-6">This is for you if:</h3>
            <ul className="space-y-4">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground-secondary">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For You */}
          <div className="card-feature">
            <h3 className="text-section-header mb-6">This is NOT for you if:</h3>
            <ul className="space-y-4">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground-secondary">
                  <X className="w-5 h-5 text-foreground-muted flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsFor;
