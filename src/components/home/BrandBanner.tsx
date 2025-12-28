import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BrandBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background text parallax
      gsap.to(bgTextRef.current, {
        x: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Heading text reveal
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        const parts = text.split(/\n/).filter(part => part.trim());
        headingRef.current.innerHTML = parts
          .map(
            (part) =>
              `<span class="heading-line" style="display: block; opacity: 0; transform: translateY(50px);">${part.trim()}</span>`
          )
          .join("");

        gsap.to(".heading-line", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden bg-background">
      {/* Large Text Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span ref={bgTextRef} className="font-heading text-[25vw] font-bold tracking-tighter whitespace-nowrap text-secondary/50">
          LL
        </span>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />

      {/* Content */}
      <div className="container-wide relative z-10">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-12 h-px bg-muted-foreground" />
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
              The Philosophy
            </p>
            <span className="w-12 h-px bg-muted-foreground" />
          </div>
          
          <h2 ref={headingRef} className="heading-lg mb-8 leading-tight">
            Born from elegance.
            Crafted for you.
          </h2>
          
          <p className="body-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            LavenderLily isn't just clothing—it's an expression of your unique style. 
            Every stitch reflects grace. Every detail celebrates femininity.
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
