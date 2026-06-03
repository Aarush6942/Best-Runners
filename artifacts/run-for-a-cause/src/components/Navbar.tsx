import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Volunteer Work", path: "/volunteer" },
    { name: "Juniors", path: "/juniors" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-2 rounded-full group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Run for a Cause
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="rounded-full px-6 font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            data-testid="navbar-donate-btn"
          >
            <a href="https://www.paypal.com/donate?token=oAkLV_0JxoRs2EWoks7LT1_FukLIY2-wX-l2ObTEZYikjq6bVGyo3yDTfIXhAd5K_04NLN6L0nBnPJGG" target="_blank" rel="noopener noreferrer">
              Donate Now
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="navbar-mobile-toggle"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`block text-lg font-medium ${
                    location === link.path ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="w-full rounded-full font-bold mt-2"
          >
            <a href="https://www.paypal.com/donate?token=oAkLV_0JxoRs2EWoks7LT1_FukLIY2-wX-l2ObTEZYikjq6bVGyo3yDTfIXhAd5K_04NLN6L0nBnPJGG" target="_blank" rel="noopener noreferrer">
              Donate Now
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
