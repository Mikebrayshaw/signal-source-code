import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToForm = () => {
    const element = document.getElementById('final-cta');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container-custom flex items-center justify-between h-[72px]">
        <span className="text-xl font-bold text-foreground">Build Signals</span>
        <Button 
          onClick={scrollToForm}
          className="btn-glow hidden sm:inline-flex"
          size="sm"
        >
          Get Access — $99
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
