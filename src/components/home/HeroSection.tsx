import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-accent/20" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 blur-[100px] rounded-full" />
      </div>

      {/* Floral Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 1px, transparent 1px),
                          radial-gradient(circle at 80% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className="container-wide relative z-10 text-center py-20">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-primary text-sm tracking-widest uppercase mb-8 opacity-0 animate-fade-in">
            New Collection 2024
          </p>

          {/* Main Heading */}
          <h1 className="heading-xl mb-6 opacity-0 animate-slide-up stagger-1">
            <span className="block text-foreground">Elegance in</span>
            <span className="block text-primary">
              Every Bloom
            </span>
          </h1>

          {/* Subtitle */}
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-slide-up stagger-2">
            Discover timeless elegance with our curated collection. 
            Beautiful designs crafted for the modern woman.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up stagger-3">
            <Link to="/shop">
              <Button variant="hero" size="xl" className="group">
                Shop New Arrivals
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/collections">
              <Button variant="outline" size="xl">
                View Collections
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
