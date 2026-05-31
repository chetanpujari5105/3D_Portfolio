"use client";

import PageLoader from "@/components/PageLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    // Sync smooth inertia scrolling with custom animations
    const lenis = new Lenis({ 
      duration: 1.2, 
      lerp: 0.08,
      infinite: false,
      syncTouch: false
    });
    
    (window as any)._lenis = lenis;

    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickHandler);

    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="industrial-grid min-h-screen relative overflow-hidden select-none bg-carbon">
      <CustomCursor />
      <PageLoader />
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
