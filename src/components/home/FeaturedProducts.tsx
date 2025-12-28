import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/50 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container-wide relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-muted-foreground" />
              <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
                Curated Selection
              </p>
            </div>
            <h2 className="heading-lg">Featured</h2>
          </div>
          <Link to="/shop" className="group">
            <Button variant="minimal" className="group">
              View All
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`opacity-0 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
