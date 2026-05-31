"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section on scroll
      const sections = ["home", "services", "projects", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "About", href: "#about", id: "about" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      const offset = 80; // Offset for navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none px-4 md:px-8">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        className={`w-full flex items-center justify-between pointer-events-auto transition-all duration-500 ease-out ${
          isScrolled
            ? "max-w-xl mt-4 px-6 py-2.5 rounded-full glass-pill shadow-[0_15px_30px_rgba(5,5,5,0.8)] border border-[rgba(242,242,236,0.06)]"
            : "max-w-7xl mt-0 px-4 md:px-8 py-6 border-b border-[rgba(242,242,236,0.03)] bg-transparent"
        }`}
      >
        {/* Brand/Monogram */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className={`font-mono font-bold text-lg tracking-tighter flex items-center gap-1.5 transition-all duration-500 ${
            isScrolled ? "scale-90 opacity-0 w-0 overflow-hidden" : "scale-100 opacity-100"
          }`}
        >
          <span className="w-2.5 h-2.5 bg-[var(--color-ember)] rotate-45 inline-block" />
          <span className="text-[var(--color-boneWhite)]">CHETAN</span>
          <span className="text-[var(--color-ember)] font-light">PUJARI</span>
        </a>

        {/* Links Navigation */}
        <nav className={`flex items-center transition-all duration-500 ${isScrolled ? "w-full justify-around md:justify-center md:gap-8" : "gap-6 md:gap-8"}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`font-mono text-xs uppercase tracking-widest relative py-1.5 transition-all duration-300 ${
                activeSection === link.id
                  ? "text-[var(--color-ember)] font-medium"
                  : "text-[rgba(242,242,236,0.6)] hover:text-[var(--color-boneWhite)]"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-ember)] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Dynamic CTA */}
        <a
          href="#contact"
          onClick={(e) => handleScrollTo(e, "#contact")}
          className={`interactive font-mono text-xs uppercase tracking-widest border border-[var(--color-ember)] text-[var(--color-boneWhite)] px-4 py-2 hover:bg-[var(--color-ember)] hover:text-carbon transition-all duration-300 relative group overflow-hidden ${
            isScrolled ? "scale-90 opacity-0 w-0 overflow-hidden" : "scale-100 opacity-100"
          }`}
        >
          <span className="relative z-10">Let's Talk</span>
          {/* Shimmer button overlay */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.15)] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
        </a>
      </motion.header>
    </div>
  );
}
