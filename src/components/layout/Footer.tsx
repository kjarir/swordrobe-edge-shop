import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading text-2xl font-bold tracking-[0.2em] text-foreground">
                SWORDROBE
              </span>
            </Link>
            <p className="body-md text-muted-foreground mb-6">
              Wardrobe Full of Swordrobe!
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/swordrobe"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 border border-border flex items-center justify-center hover:border-foreground hover:bg-foreground/5 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="heading-sm mb-6">Shop</h4>
            <ul className="space-y-3">
              {["All Products", "Tees", "Outerwear", "Denim & Cargos", "Accessories"].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="body-md text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="heading-sm mb-6">Info</h4>
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
                    className="body-md text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="heading-sm mb-6">Visit Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="body-md text-muted-foreground">
                  Rassaz Multiplex, Shop No.51<br />
                  Mira Road, Mumbai
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="tel:7977981325"
                  className="body-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  7977981325
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Swordrobe. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
