import { useScrollFade } from "@/hooks/useScrollFade";
import { Shield } from "lucide-react";

const Guarantee = () => {
  const ref = useScrollFade();

  return (
    <section ref={ref} className="py-16 md:py-20 bg-secondary-section scroll-fade">
      <div className="container-custom max-w-[600px] text-center">
        <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
        
        <h3 className="text-section-header mb-6">30-Day Money-Back Guarantee</h3>
        
        <div className="space-y-4 text-body">
          <p>Try Build Signals for 30 days.</p>
          
          <p>
            Browse the database. Read the weekly emails. Use the validation guide.
          </p>
          
          <p>
            If you don't find at least one idea worth building, email me. Full refund. No questions. No weird forms.
          </p>
          
          <p className="text-foreground font-medium pt-2">
            You either find something worth shipping, or you pay nothing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
