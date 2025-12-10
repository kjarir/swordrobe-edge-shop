import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BrandBanner = () => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-background">
      {/* Large Text Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="font-heading text-[25vw] font-bold tracking-tighter whitespace-nowrap text-secondary/50">
          SW
        </span>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 h-px bg-muted-foreground" />
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
              The Philosophy
            </p>
            <span className="w-12 h-px bg-muted-foreground" />
          </div>
          
          <h2 className="heading-lg mb-8 leading-tight">
            Born from the streets.<br />
            Crafted for warriors.
          </h2>
          
          <p className="body-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Swordrobe isn't just clothing—it's armor for the modern urban warrior. 
            Every stitch reflects rebellion. Every detail demands attention.
          </p>
          
          <Link to="/about">
            <Button variant="outline" size="lg" className="group">
              Our Story
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-12 left-12 w-20 h-px bg-border hidden lg:block" />
      <div className="absolute top-12 left-12 w-px h-20 bg-border hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-20 h-px bg-border hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-px h-20 bg-border hidden lg:block" />
    </section>
  );
};

export default BrandBanner;
