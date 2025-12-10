import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

const StoreLocation = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map / Store Visual */}
          <div className="relative aspect-square lg:aspect-[4/3] bg-muted overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground/50 font-heading tracking-widest">
                  VISIT US
                </p>
              </div>
            </div>
            {/* Decorative Frame */}
            <div className="absolute inset-4 border border-border/50" />
          </div>

          {/* Store Info */}
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3">
              Physical Store
            </p>
            <h2 className="heading-lg mb-8">Visit Our Store</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 border border-border flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="heading-sm mb-1">Location</h4>
                  <p className="body-md text-muted-foreground">
                    Rassaz Multiplex, Shop No.51<br />
                    Mira Road, Mumbai
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 border border-border flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="heading-sm mb-1">Contact</h4>
                  <a 
                    href="tel:7977981325" 
                    className="body-md text-muted-foreground hover:text-foreground transition-colors"
                  >
                    7977981325
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 border border-border flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="heading-sm mb-1">Hours</h4>
                  <p className="body-md text-muted-foreground">
                    Mon - Sat: 11:00 AM - 9:00 PM<br />
                    Sunday: 12:00 PM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Get Directions
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocation;
