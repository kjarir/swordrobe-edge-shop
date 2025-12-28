import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: "spring-collection",
    name: "Spring Collection",
    description: "Fresh florals and pastel hues for the season",
    tag: "NEW",
    pieces: "08",
  },
  {
    id: "summer-essentials",
    name: "Summer Essentials",
    description: "Light, breezy pieces for warm days",
    tag: "POPULAR",
    pieces: "06",
  },
  {
    id: "elegant-evenings",
    name: "Elegant Evenings",
    description: "Sophisticated pieces for special occasions",
    tag: "SIGNATURE",
    pieces: "10",
  },
  {
    id: "casual-chic",
    name: "Casual Chic",
    description: "Effortlessly stylish everyday wear",
    tag: "ESSENTIAL",
    pieces: "04",
  },
];

const Collections = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
  const collectionsSectionRef = useRef<HTMLElement>(null);
  const collectionsGridRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animations
      gsap.fromTo(
        heroBadgeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hero heading text reveal
      if (heroHeadingRef.current) {
        const text = heroHeadingRef.current.textContent || "";
        heroHeadingRef.current.innerHTML = `<span class="collections-heading-line" style="display: inline-block; opacity: 0; transform: translateY(100px); clip-path: inset(0 0 100% 0);">${text}</span>`;

        gsap.to(".collections-heading-line", {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroHeadingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      gsap.fromTo(
        heroDescriptionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroDescriptionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Collections Grid Animation
      const collectionCards = collectionsGridRef.current?.children;
      if (collectionCards) {
        gsap.fromTo(
          collectionCards,
          {
            opacity: 0,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: collectionsGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // CTA Section Animations
      gsap.fromTo(
        ctaHeadingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ctaButtonRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaButtonRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroSectionRef} className="py-24 md:py-32 bg-secondary relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        
        <div className="container-wide relative text-center">
          <div ref={heroBadgeRef} className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-muted-foreground" />
            <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
              Curated
            </p>
            <span className="w-8 h-px bg-muted-foreground" />
          </div>
          <h1 ref={heroHeadingRef} className="heading-xl mb-6">Collections</h1>
          <p ref={heroDescriptionRef} className="body-lg text-muted-foreground max-w-lg mx-auto">
            Explore our carefully curated drops and signature series
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section ref={collectionsSectionRef} className="section-padding">
        <div className="container-wide">
          <div ref={collectionsGridRef} className="grid md:grid-cols-2 gap-4 md:gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/shop?collection=${collection.id}`}
                className="group relative aspect-[4/3] bg-card overflow-hidden border border-border/50 hover:border-foreground/20 transition-all duration-300"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted/30 to-secondary opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{
                  backgroundImage: `linear-gradient(45deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }} />

                {/* Tag & Count */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <span className="text-[10px] font-heading tracking-[0.2em] text-muted-foreground border border-border/50 px-3 py-1.5 bg-background/50 backdrop-blur-sm">
                    {collection.tag}
                  </span>
                  <span className="text-[10px] font-heading tracking-[0.2em] text-muted-foreground">
                    {collection.pieces} PIECES
                  </span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="heading-md mb-2 transition-transform duration-300 group-hover:translate-x-2">
                    {collection.name}
                  </h3>
                  <p className="body-md text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-heading tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    <span>Explore Collection</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-foreground transition-all duration-500 ease-out" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section ref={ctaSectionRef} className="py-20 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        <div className="container-wide relative text-center">
          <h2 ref={ctaHeadingRef} className="font-heading text-2xl md:text-4xl tracking-wide uppercase mb-8">
            Can't decide? Browse everything
          </h2>
          <Link ref={ctaButtonRef} to="/shop">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-background/30 text-background hover:bg-background hover:text-foreground transition-all duration-200"
            >
              Shop All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Collections;
