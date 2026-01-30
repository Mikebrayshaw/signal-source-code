import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate checkout redirect
    setTimeout(() => {
      setIsLoading(false);
      // Would redirect to payment here
    }, 1500);
  };

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

        <form 
          onSubmit={handleSubmit}
          className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
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

        <div className="animate-fade-in-up stagger-4 flex items-center justify-center gap-2 text-foreground-muted text-sm">
          <Shield className="w-4 h-4" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
