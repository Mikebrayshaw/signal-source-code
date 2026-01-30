const Footer = () => {
  return (
    <footer className="bg-primary-section border-t border-border py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-foreground font-semibold">Build Signals</span>
          
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-foreground-muted hover:text-foreground-secondary transition-colors text-sm"
            >
              Twitter
            </a>
            <a 
              href="#" 
              className="text-foreground-muted hover:text-foreground-secondary transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="text-center md:text-left mt-8">
          <p className="text-foreground-muted text-sm">
            © 2025 Build Signals
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
