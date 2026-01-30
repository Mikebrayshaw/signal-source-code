import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const FinalCTA = () => {
  const ref = useScrollFade();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <section id="final-cta" ref={ref} className="section-padding bg-secondary-section scroll-fade">
      <div className="container-custom max-w-[600px] text-center">
        <h2 className="text-subheadline mb-6">Stop guessing. Start building.</h2>
        
        <div className="text-body-large max-w-[500px] mx-auto mb-10 space-y-4">
          <p>
            The difference between people who ship profitable projects and people who don't isn't coding ability. AI leveled that playing field.
          </p>
          <p>
            The difference is starting with a problem people already have.
          </p>
          <p>
            Build Signals gives you hundreds of those problems, matched to repos that'll help you build solutions faster.
          </p>
        </div>

        <p className="text-foreground-muted mb-6">
          $99. Lifetime access. 30-day guarantee.
        </p>

        <Button 
          size="lg"
          className="btn-glow h-14 px-10 text-lg mb-4"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get Lifetime Access — $99"}
        </Button>

        <div className="badge-guarantee mx-auto w-fit mt-4">
          <Shield className="w-4 h-4" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
