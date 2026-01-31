import { Button } from "@/components/ui/button";

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/eVq6oB16F7o19v61s114400";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-custom flex items-center justify-between h-[72px]">
        <span className="text-xl font-bold text-foreground">Build Signals</span>
        <Button
          asChild
          className="btn-glow hidden sm:inline-flex"
          size="sm"
        >
          <a
            href={STRIPE_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Access — $99
          </a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
