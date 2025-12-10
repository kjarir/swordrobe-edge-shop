import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BrandBanner = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/30 to-background" />
      
      {/* Large Text Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
        <span className="font-heading text-[20vw] font-bold tracking-tighter whitespace-nowrap">
          SWORDROBE
        </span>
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
            The Brand Story
          </p>
          <h2 className="heading-lg mb-8">
            Born from the streets,<br />crafted for warriors
          </h2>
          <p className="body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Swordrobe isn't just clothing—it's armor for the modern urban warrior. 
            Every stitch, every detail is designed for those who refuse to blend in 
            with the crowd.
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
