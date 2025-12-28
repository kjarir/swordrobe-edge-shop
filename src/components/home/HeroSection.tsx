import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(backgroundRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Badge animation
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Heading animation - split text effect
      const headingLines = headingRef.current?.children;
      if (headingLines) {
        Array.from(headingLines).forEach((line, index) => {
          gsap.fromTo(
            line,
            {
              opacity: 0,
              y: 100,
              clipPath: "inset(0 0 100% 0)",
            },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.2,
              delay: 0.3 + index * 0.2,
              ease: "power3.out",
            }
          );
        });
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.9,
          ease: "power2.out",
        }
      );

      // CTA buttons animation
      const buttons = ctaRef.current?.children;
      if (buttons) {
        gsap.fromTo(
          buttons,
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)",
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.children;
      if (statItems) {
        gsap.fromTo(
          statItems,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: 1.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }

      // Scroll indicator animation
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 2,
          ease: "power2.out",
        }
      );

      // Floating accent lines
      gsap.to(".floating-line-1", {
        x: 100,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-line-2", {
        x: -100,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div ref={backgroundRef} className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />
      
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
      <div className="floating-line-1 absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      <div className="floating-line-2 absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      {/* Content */}
      <div className="container-wide relative z-10 text-center py-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-muted-foreground" />
            <span className="text-muted-foreground text-xs tracking-[0.4em] uppercase font-medium">
              Season 01 — Now Live
            </span>
            <span className="w-8 h-px bg-muted-foreground" />
          </div>

          {/* Main Heading */}
          <h1 ref={headingRef} className="heading-xl mb-8">
            <span className="block">WARDROBE</span>
            <span className="block">FULL OF</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground">
              LavenderLily
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="body-lg text-muted-foreground max-w-xl mx-auto mb-14">
            Elegant fashion for the modern woman. Premium quality meets 
            timeless elegance in every piece.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
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
          <div ref={statsRef} className="flex justify-center gap-12 md:gap-20 mt-20 pt-12 border-t border-border/50">
            {[
              { value: "01", label: "Season" },
              { value: "10+", label: "Styles" },
              { value: "100%", label: "Premium" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl md:text-3xl mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground tracking-[0.2em] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2">
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
