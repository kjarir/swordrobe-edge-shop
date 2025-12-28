import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const filteredProducts = getProductsByCategory(activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLabelRef = useRef<HTMLParagraphElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
  const filtersSectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animations
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
        heroHeadingRef.current.innerHTML = `<span class="shop-heading-line" style="display: inline-block; opacity: 0; transform: translateY(100px); clip-path: inset(0 0 100% 0);">${text}</span>`;

        gsap.to(".shop-heading-line", {
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

      // Filters animation
      const filterButtons = filtersRef.current?.children;
      if (filterButtons) {
        gsap.fromTo(
          filterButtons,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Products grid animation
      const productCards = productsGridRef.current?.children;
      if (productCards && productCards.length > 0) {
        gsap.fromTo(
          productCards,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: productsGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroSectionRef} className="py-20 md:py-28 bg-secondary">
        <div className="container-wide text-center">
          <p ref={heroLabelRef} className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Shop All
          </p>
          <h1 ref={heroHeadingRef} className="heading-xl mb-4">The Collection</h1>
          <p ref={heroDescriptionRef} className="body-lg text-muted-foreground max-w-xl mx-auto">
            Explore our full range of elegant women's fashion
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section ref={filtersSectionRef} className="section-padding">
        <div className="container-wide">
          {/* Category Filters */}
          <div ref={filtersRef} className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-border">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "px-6 py-3 text-sm font-heading tracking-[0.15em] uppercase transition-all duration-300 border",
                  activeCategory === category.id
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                )}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div ref={productsGridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground body-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
