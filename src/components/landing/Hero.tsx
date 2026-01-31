import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/eVq6oB16F7o19v61s114400";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-primary-section">
      <div className="container-custom max-w-[800px] text-center">
        <div className="animate-fade-in-up">
          <span className="badge-pill mb-6 inline-block">
            For vibe coders who can build anything
          </span>
        </div>

        <h1 className="animate-fade-in-up stagger-1 text-headline mb-6">
          AI Can Help You Build Anything.{" "}
          <span className="text-primary">Here's What to Build.</span>
        </h1>

        <p className="animate-fade-in-up stagger-2 text-body-large max-w-[600px] mx-auto mb-12">
          A database of validated problems people are already complaining about + the GitHub repos to build solutions. Updated weekly.
        </p>

        <div className="animate-fade-in-up stagger-3 mb-6">
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

        <div className="animate-fade-in-up stagger-4 flex items-center justify-center gap-2 text-foreground-muted text-sm">
          <Shield className="w-4 h-4" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
