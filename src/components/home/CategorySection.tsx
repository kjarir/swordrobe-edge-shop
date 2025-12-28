import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "tees",
    name: "Tees & Basics",
    description: "Premium heavyweight essentials",
    count: "03",
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Layers for the streets",
    count: "03",
  },
  {
    id: "cargos",
    name: "Cargos & Pants",
    description: "Tactical utility bottoms",
    count: "02",
  },
  {
    id: "denim",
    name: "Denim",
    description: "Raw & distressed cuts",
    count: "01",
  },
];

const CategorySection = () => {
  return (
    <section className="section-padding bg-card relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container-wide relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
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
        <div className="space-y-0">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group block border-t border-border/50 last:border-b py-8 md:py-10 transition-colors duration-200 hover:bg-secondary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
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
