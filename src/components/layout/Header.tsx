import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="font-heading text-xl md:text-2xl font-bold tracking-[0.25em] text-foreground transition-all duration-200 group-hover:tracking-[0.3em]">
              SWORDROBE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link",
                  location.pathname === link.path && "text-foreground after:w-full"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-secondary transition-colors duration-200">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary transition-colors duration-200">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-foreground text-background text-[9px] font-heading flex items-center justify-center">
                0
              </span>
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-secondary transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu className={cn("h-5 w-5 absolute inset-0 transition-all duration-200", isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0")} />
                <X className={cn("h-5 w-5 absolute inset-0 transition-all duration-200", isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90")} />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bg-background/98 backdrop-blur-md border-b border-border transition-all duration-300 ease-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <nav className="container-wide py-8 flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-2xl font-heading tracking-[0.1em] uppercase py-3 transition-all duration-200 border-b border-border/30",
                location.pathname === link.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:translate-x-2"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
