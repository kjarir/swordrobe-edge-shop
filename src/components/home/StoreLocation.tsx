import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

const StoreLocation = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(45deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Map / Store Visual */}
          <div className="relative aspect-square lg:aspect-[4/3] bg-muted/50 overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-foreground/5 rounded-full animate-pulse" style={{ width: '120px', height: '120px', margin: 'auto' }} />
                  <MapPin className="h-12 w-12 text-foreground/40 mx-auto mb-6 relative" />
                </div>
                <p className="text-muted-foreground font-heading tracking-[0.3em] text-sm uppercase">
                  Mumbai
                </p>
              </div>
            </div>
            {/* Decorative Frame */}
            <div className="absolute inset-6 border border-border/30 transition-all duration-300 group-hover:inset-4 group-hover:border-border/50" />
            
            {/* Corner marks */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-foreground/30" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-foreground/30" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-foreground/30" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-foreground/30" />
          </div>

          {/* Store Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-muted-foreground" />
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                Flagship Store
              </p>
            </div>
            <h2 className="heading-lg mb-10">Visit Us</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-5 group">
                <div className="h-14 w-14 border border-border flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-foreground/50 group-hover:bg-foreground/5">
                  <MapPin className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div>
                  <h4 className="heading-sm mb-2">Location</h4>
                  <p className="body-md text-muted-foreground">
                    Rassaz Multiplex, Shop No.51<br />
                    Mira Road, Mumbai
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="h-14 w-14 border border-border flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-foreground/50 group-hover:bg-foreground/5">
                  <Phone className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div>
                  <h4 className="heading-sm mb-2">Contact</h4>
                  <a 
                    href="tel:7977981325" 
                    className="body-md text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    +91 797 798 1325
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="h-14 w-14 border border-border flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:border-foreground/50 group-hover:bg-foreground/5">
                  <Clock className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div>
                  <h4 className="heading-sm mb-2">Hours</h4>
                  <p className="body-md text-muted-foreground">
                    Mon – Sat: 11AM – 9PM<br />
                    Sunday: 12PM – 8PM
                  </p>
                </div>
              </div>
            </div>

            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Get Directions
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocation;
