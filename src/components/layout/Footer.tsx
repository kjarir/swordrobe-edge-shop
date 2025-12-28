import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 relative">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6 group">
              <span className="font-heading text-2xl font-bold tracking-[0.25em] text-foreground transition-all duration-200 group-hover:tracking-[0.3em]">
                LavenderLily
              </span>
            </Link>
            <p className="body-md text-muted-foreground mb-2 max-w-xs">
              Wardrobe Full of LavenderLily
            </p>
            <p className="text-xs text-muted-foreground/60 tracking-wide mb-8">
              Elegant fashion for the modern woman
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/LavenderLily"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 border border-border flex items-center justify-center transition-all duration-200 hover:border-foreground hover:bg-foreground group"
              >
                <Instagram className="h-4 w-4 transition-colors group-hover:text-background" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-heading tracking-[0.2em] uppercase mb-6 text-muted-foreground">Shop</h4>
            <ul className="space-y-3">
              {["All Products", "Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="body-md text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-heading tracking-[0.2em] uppercase mb-6 text-muted-foreground">Collections</h4>
            <ul className="space-y-3">
              {["Spring Collection", "Summer Essentials", "Elegant Evenings", "Casual Chic"].map((item) => (
                <li key={item}>
                  <Link
                    to="/collections"
                    className="body-md text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-heading tracking-[0.2em] uppercase mb-6 text-muted-foreground">Info</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Size Guide", path: "/shop" },
                { name: "Shipping", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="body-md text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-heading tracking-[0.2em] uppercase mb-6 text-muted-foreground">Visit</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dubai Mall, Level 2<br />
                  Fashion Avenue<br />
                  Dubai, UAE
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a
                  href="tel:+971501234567"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  +971 50 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60">
            © 2025 LavenderLily. All rights reserved | Designed & Developed by <a href="https://www.linkedin.com/in/mohdjarirnoorkhan/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200">Mohd Jarir Khan</a>
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/contact" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
