import { useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLabelRef = useRef<HTMLParagraphElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);

  const missionSectionRef = useRef<HTMLElement>(null);
  const missionLabelRef = useRef<HTMLParagraphElement>(null);
  const missionHeadingRef = useRef<HTMLHeadingElement>(null);
  const missionContentRef = useRef<HTMLDivElement>(null);
  const missionImageRef = useRef<HTMLDivElement>(null);

  const valuesSectionRef = useRef<HTMLElement>(null);
  const valuesHeaderRef = useRef<HTMLDivElement>(null);
  const valuesGridRef = useRef<HTMLDivElement>(null);

  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaDescriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animations
      // Background text parallax
      gsap.to(bgTextRef.current, {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero label animation
      gsap.fromTo(
        heroLabelRef.current,
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
        const parts = text.split(/\n/).filter(part => part.trim());
        heroHeadingRef.current.innerHTML = parts
          .map(
            (part) =>
              `<span class="hero-heading-line" style="display: block; opacity: 0; transform: translateY(100px); clip-path: inset(0 0 100% 0);">${part.trim()}</span>`
          )
          .join("");

        gsap.to(".hero-heading-line", {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroHeadingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Hero description animation
      gsap.fromTo(
        heroDescriptionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroDescriptionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Mission Section Animations
      gsap.fromTo(
        missionLabelRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Mission heading text reveal
      if (missionHeadingRef.current) {
        const text = missionHeadingRef.current.textContent || "";
        const parts = text.split(/\n/).filter(part => part.trim());
        missionHeadingRef.current.innerHTML = parts
          .map(
            (part) =>
              `<span class="mission-heading-line" style="display: block; opacity: 0; transform: translateY(80px);">${part.trim()}</span>`
          )
          .join("");

        gsap.to(".mission-heading-line", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionHeadingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Mission content paragraphs
      const paragraphs = missionContentRef.current?.querySelectorAll("p");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: missionContentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Mission image animation
      gsap.fromTo(
        missionImageRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionImageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Values Section Animations
      gsap.fromTo(
        valuesHeaderRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Values grid items stagger
      const valueItems = valuesGridRef.current?.children;
      if (valueItems) {
        gsap.fromTo(
          valueItems,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesGridRef.current,
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
        ctaDescriptionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaDescriptionRef.current,
            start: "top 85%",
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
          delay: 0.4,
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
      <section ref={heroSectionRef} className="py-20 md:py-32 bg-secondary relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <span ref={bgTextRef} className="font-heading text-[30vw] font-bold tracking-tighter whitespace-nowrap">
            LL
          </span>
        </div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-3xl">
            <p ref={heroLabelRef} className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              Our Story
            </p>
            <h1 ref={heroHeadingRef} className="heading-xl mb-6">
              Designed for Elegance.
              Worn with Confidence.
            </h1>
            <p ref={heroDescriptionRef} className="body-lg text-muted-foreground">
              LavenderLily was born in the heart of UAE, designed for the modern woman who 
              embraces her unique style with grace and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section ref={missionSectionRef} className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p ref={missionLabelRef} className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
                The Mission
              </p>
              <h2 ref={missionHeadingRef} className="heading-lg mb-8">
                More than clothing.
                It's confidence.
              </h2>
              <div ref={missionContentRef} className="space-y-6 body-md text-muted-foreground">
                <p>
                  LavenderLily isn't just a brand—it's a celebration of femininity. We create clothing for 
                  the modern woman who embraces elegance and expresses her unique style with confidence.
                </p>
                <p>
                  Every piece is designed with care. From the delicate lace of our blouses to the 
                  flowing fabrics of our dresses, we obsess over the details that matter. Quality materials. 
                  Flattering designs. Timeless elegance.
                </p>
                <p>
                  We believe your wardrobe should empower you, not confine you. That's why 
                  every LavenderLily piece is crafted to make you feel beautiful, confident, 
                  and ready to embrace every moment with grace.
                </p>
              </div>
            </div>
            <div ref={missionImageRef} className="aspect-square bg-secondary flex items-center justify-center">
              <span className="font-heading text-6xl text-muted-foreground/20 tracking-widest">
                LL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesSectionRef} className="section-padding bg-card">
        <div className="container-wide">
          <div ref={valuesHeaderRef} className="text-center mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              What We Stand For
            </p>
            <h2 className="heading-lg">Our Values</h2>
          </div>

          <div ref={valuesGridRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                description: "Premium materials, superior construction. We never compromise on what goes into our products.",
              },
              {
                title: "Elegant Design",
                description: "Born from a love of timeless fashion, staying true to feminine elegance. Every design reflects grace and sophistication.",
              },
              {
                title: "Confident Expression",
                description: "Fashion should make you feel beautiful. We create for those who embrace their style with confidence and grace.",
              },
            ].map((value, index) => (
              <div key={index} className="p-8 border border-border hover:border-foreground/30 transition-colors">
                <span className="text-6xl font-heading text-muted-foreground/30 block mb-4">
                  0{index + 1}
                </span>
                <h3 className="heading-sm mb-4">{value.title}</h3>
                <p className="body-md text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaSectionRef} className="section-padding">
        <div className="container-wide text-center">
          <h2 ref={ctaHeadingRef} className="heading-lg mb-6">
            Ready to find your style?
          </h2>
          <p ref={ctaDescriptionRef} className="body-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Explore our collection and discover pieces that make you feel beautiful.
          </p>
          <Link ref={ctaButtonRef} to="/shop">
            <Button variant="hero" size="xl" className="group">
              Shop Now
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
