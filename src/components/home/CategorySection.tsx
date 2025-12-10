import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "tees",
    name: "Tees",
    description: "Premium heavyweight basics",
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Jackets, hoodies & layers",
  },
  {
    id: "cargos",
    name: "Cargos & Pants",
    description: "Tactical utility bottoms",
  },
  {
    id: "denim",
    name: "Denim",
    description: "Raw & distressed styles",
  },
];

const CategorySection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3">
            Explore
          </p>
          <h2 className="heading-lg">Shop By Category</h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative overflow-hidden bg-secondary aspect-[4/5] flex flex-col justify-end p-6 transition-all duration-500 hover:bg-muted"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    hsl(var(--foreground)) 10px,
                    hsl(var(--foreground)) 11px
                  )`
                }} />
              </div>

              {/* Category Name */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="heading-md">{category.name}</h3>
                  <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <p className="body-md text-muted-foreground">
                  {category.description}
                </p>
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-foreground transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
