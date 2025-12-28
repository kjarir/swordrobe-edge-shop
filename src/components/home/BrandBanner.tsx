import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BrandBanner = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-accent/20 to-background" />
      
      {/* Large Text Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
        <span className="font-heading text-[15vw] font-bold tracking-tighter whitespace-nowrap">
          LavenderLily
        </span>
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-sm tracking-widest uppercase mb-6">
            Our Story
          </p>
          <h2 className="heading-lg mb-8">
            Where elegance<br />meets simplicity
          </h2>
          <p className="body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            LavenderLily celebrates the beauty of feminine grace. 
            Each piece is thoughtfully designed to make you feel 
            confident and beautiful every day.
          </p>
          <Link to="/about">
            <Button variant="outline" size="lg">
              Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandBanner;
