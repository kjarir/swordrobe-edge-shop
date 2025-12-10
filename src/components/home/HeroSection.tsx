import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/50 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-muted-foreground/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted-foreground/5 blur-[100px] rounded-full" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '100px 100px'
      }} />

      {/* Content */}
      <div className="container-wide relative z-10 text-center py-20">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8 opacity-0 animate-fade-in">
            New Collection 2024
          </p>

          {/* Main Heading */}
          <h1 className="heading-xl mb-6 opacity-0 animate-slide-up stagger-1">
            <span className="block">WARDROBE FULL OF</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground via-muted-foreground to-foreground">
              SWORDROBE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-slide-up stagger-2">
            Edgy streetwear for the urban warrior. Premium quality meets 
            rebellious design in every piece we create.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up stagger-3">
            <Link to="/shop">
              <Button variant="hero" size="xl" className="group">
                Shop The New Drop
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
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
