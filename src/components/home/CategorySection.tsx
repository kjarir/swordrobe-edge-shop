import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: "dresses",
    name: "Dresses",
    description: "Elegant pieces for every occasion",
    count: "01",
  },
  {
    id: "tops",
    name: "Tops & Blouses",
    description: "Feminine and sophisticated",
    count: "03",
  },
  {
    id: "bottoms",
    name: "Bottoms",
    description: "Stylish skirts and pants",
    count: "02",
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Cozy cardigans and jackets",
    count: "03",
  },
];

const CategorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Categories stagger animation
      const categoryItems = categoriesRef.current?.children;
      if (categoryItems) {
        gsap.fromTo(
          categoryItems,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-card relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container-wide relative">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-muted-foreground" />
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                Categories
              </p>
            </div>
            <h2 className="heading-lg">Shop By Type</h2>
          </div>
        </div>

        {/* Categories List */}
        <div ref={categoriesRef} className="space-y-0">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group block border-t border-border/50 last:border-b py-8 md:py-10 transition-colors duration-200 hover:bg-secondary/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-xs text-muted-foreground font-heading tracking-widest w-8">
                    {category.count}
                  </span>
                  <div>
                    <h3 className="heading-md mb-1 transition-transform duration-200 group-hover:translate-x-2">
                      {category.name}
                    </h3>
                    <p className="body-md text-muted-foreground hidden md:block">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground tracking-widest uppercase hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Explore
                  </span>
                  <div className="h-10 w-10 border border-border flex items-center justify-center transition-all duration-200 group-hover:border-foreground group-hover:bg-foreground">
                    <ArrowUpRight className="h-4 w-4 transition-all duration-200 group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
