import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/eVq6oB16F7o19v61s114400";

const MidCTA = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-section scroll-fade">
      <div className="container-custom max-w-[600px] text-center">
        <h2 className="text-subheadline mb-4">Start finding what to build</h2>
        <p className="text-body-large mb-8">
          One purchase. Lifetime access. Updated weekly.
        </p>

        <div className="mb-6">
          <Button
            asChild
            size="lg"
            className="btn-glow h-14 px-8 whitespace-nowrap"
          >
            <a
              href={STRIPE_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Lifetime Access — $99
            </a>
          </Button>
        </div>

        <div className="badge-guarantee mx-auto w-fit">
          <Shield className="w-4 h-4" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default MidCTA;
