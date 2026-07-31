import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiCode } from "react-icons/fi";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Coaching", path: "/coaching" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md border-b border-accent/20 shadow-lg shadow-accent/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-accent/50 bg-accent/10 group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300">
            <FiCode className="text-accent text-lg" />
            <div className="absolute inset-0 rounded-lg bg-accent/10 blur-sm group-hover:bg-accent/20 transition-all" />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-white tracking-wider">
              THE CODE
            </span>
            <span className="font-display font-bold text-lg text-accent tracking-wider">
              {" "}LIMITED
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-body text-sm font-medium tracking-wide transition-all duration-300 hover:text-accent relative group ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-textSecondary"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="animated-border relative px-6 py-2.5 rounded-lg bg-accent/10 text-accent font-body font-medium text-sm tracking-wide hover:bg-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-textPrimary hover:text-accent transition-colors p-2"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-secondary/95 backdrop-blur-md border-t border-accent/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-body text-sm font-medium py-2 border-b border-borderColor/30 transition-colors ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-textSecondary hover:text-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-2 text-center py-3 rounded-lg bg-accent/10 border border-accent/30 text-accent font-medium text-sm hover:bg-accent/20 transition-all"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}