import { useScrollFade } from "@/hooks/useScrollFade";
import { ArrowRight } from "lucide-react";

const PS = () => {
  const ref = useScrollFade();

  const scrollToForm = () => {
    const element = document.getElementById('final-cta');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="py-16 md:py-20 bg-primary-section scroll-fade">
      <div className="container-custom max-w-[600px] text-center">
        <div className="text-body space-y-4">
          <p>
            <span className="text-primary font-semibold">P.S.</span> Think about how many weekends you've spent on projects that went nowhere.
          </p>
          
          <p>
            Now imagine your next project starts with a validated problem. A pain point that already has hundreds of people saying "yeah, I'd pay for that."
          </p>
          
          <p className="text-foreground">That's what you get.</p>
        </div>

        <button 
          onClick={scrollToForm}
          className="link-arrow mt-6 text-primary font-medium"
        >
          Get started <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default PS;
