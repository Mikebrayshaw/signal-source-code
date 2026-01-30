import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";
import { useScrollFade } from "@/hooks/useScrollFade";

const MidCTA = () => {
  const ref = useScrollFade();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-section scroll-fade">
      <div className="container-custom max-w-[600px] text-center">
        <h2 className="text-subheadline mb-4">Start finding what to build</h2>
        <p className="text-body-large mb-8">
          One purchase. Lifetime access. Updated weekly.
        </p>

        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-14 px-5 bg-card border-border text-foreground placeholder:text-foreground-muted input-glow"
            required
          />
          <Button 
            type="submit" 
            size="lg"
            className="btn-glow h-14 px-8 whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Lifetime Access — $99"}
          </Button>
        </form>

        <div className="badge-guarantee mx-auto w-fit">
          <Shield className="w-4 h-4" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default MidCTA;
