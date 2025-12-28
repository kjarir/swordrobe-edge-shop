import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
      
      {/* Animated grain texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Floating accent lines */}
      <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 animate-fade-in stagger-4" />
      <div className="absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 animate-fade-in stagger-5" />

      {/* Content */}
      <div className="container-wide relative z-10 text-center py-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-10 opacity-0 animate-fade-in">
            <span className="w-8 h-px bg-muted-foreground" />
            <span className="text-muted-foreground text-xs tracking-[0.4em] uppercase font-medium">
              Season 01 — Now Live
            </span>
            <span className="w-8 h-px bg-muted-foreground" />
          </div>

          {/* Main Heading */}
          <h1 className="heading-xl mb-8">
            <span className="block opacity-0 animate-fade-in-up stagger-1">WARDROBE</span>
            <span className="block opacity-0 animate-fade-in-up stagger-2">FULL OF</span>
            <span className="block opacity-0 animate-blur-in stagger-3 text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground">
              SWORDROBE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="body-lg text-muted-foreground max-w-xl mx-auto mb-14 opacity-0 animate-fade-in-up stagger-4">
            Edgy streetwear for the urban warrior. Premium quality meets 
            rebellious design in every piece.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up stagger-5">
            <Link to="/shop">
              <Button variant="hero" size="xl" className="group min-w-[240px]">
                Shop The Drop
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/collections">
              <Button variant="outline" size="xl" className="min-w-[240px]">
                Explore Collections
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 md:gap-20 mt-20 pt-12 border-t border-border/50 opacity-0 animate-fade-in stagger-6">
            {[
              { value: "01", label: "Season" },
              { value: "10+", label: "Styles" },
              { value: "100%", label: "Premium" },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center opacity-0 animate-slide-up stagger-${i + 6}`}>
                <div className="font-heading text-2xl md:text-3xl mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground tracking-[0.2em] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
