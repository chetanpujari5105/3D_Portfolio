"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the GSAP plugin only on the client
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Use GSAP Context & matchMedia for clean assembly and clean garbage collection
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only perform horizontal scroll pinning on large screen sizes (desktop)
      mm.add("(min-width: 1024px)", () => {
        const slides = gsap.utils.toArray(".project-slide");
        
        gsap.to(container, {
          x: () => -(container.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => "+=" + (container.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const projectsData = [
    {
      id: "ironforge",
      num: "01",
      title: "IronForge",
      sub: "Premium Structural Workout Tracker",
      desc: "A premium cross-platform fitness app for structural workout tracking, enabling custom strength sets, interactive weight matrices, and local offline syncing.",
      tech: ["Flutter", "Firebase", "Dart", "BLoC State"],
      accent: "from-[var(--color-ember)] to-[var(--color-amberHighlight)]",
      mockup: (
        <div className="w-full h-full bg-carbon rounded-2xl border border-[rgba(242,242,236,0.08)] relative overflow-hidden flex flex-col p-4 font-mono text-[10px] text-[rgba(242,242,236,0.7)] shadow-inner">
          {/* Mock Mobile Top Bar */}
          <div className="flex justify-between items-center pb-3 border-b border-[rgba(242,242,236,0.05)] text-[9px] opacity-60">
            <span>IRONFORGE_v2.0</span>
            <span className="text-[var(--color-ember)]">● REC</span>
            <span>12:23 PM</span>
          </div>

          {/* Active Workout Dashboard */}
          <div className="flex-1 py-4 flex flex-col gap-3 justify-center">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[9px] uppercase tracking-wider block opacity-40">Active Routine</span>
                <span className="text-sm font-bold text-[var(--color-boneWhite)] tracking-tight">Hypertrophy B (Pull)</span>
              </div>
              <span className="text-[var(--color-ember)] text-xs">Sets: 4 / 6</span>
            </div>
            
            {/* Progress Visualizer */}
            <div className="w-full bg-graphite h-10 border border-[rgba(242,242,236,0.06)] rounded-lg flex items-center justify-between px-3 relative overflow-hidden">
              <div className="w-[66%] h-full bg-gradient-to-r from-[rgba(243,117,18,0.15)] to-transparent absolute left-0 top-0 border-r border-[var(--color-ember)]/30" />
              <span className="relative z-10 text-[9px] tracking-wide">66% Completed</span>
              <span className="relative z-10 font-bold text-[var(--color-boneWhite)]">0:42:15</span>
            </div>

            {/* Set Matrix Table */}
            <div className="flex flex-col gap-1.5 mt-2">
              <div className="grid grid-cols-4 text-[9px] opacity-40 font-semibold uppercase py-1 border-b border-[rgba(242,242,236,0.03)]">
                <span>Set</span>
                <span>Load</span>
                <span>Reps</span>
                <span className="text-right">Status</span>
              </div>
              <div className="grid grid-cols-4 py-1 text-[var(--color-boneWhite)] border-b border-[rgba(242,242,236,0.03)]">
                <span>01</span>
                <span>80 kg</span>
                <span>10</span>
                <span className="text-right text-[var(--color-ember)]">✔</span>
              </div>
              <div className="grid grid-cols-4 py-1 text-[var(--color-boneWhite)] border-b border-[rgba(242,242,236,0.03)]">
                <span>02</span>
                <span>85 kg</span>
                <span>8</span>
                <span className="text-right text-[var(--color-ember)]">✔</span>
              </div>
              <div className="grid grid-cols-4 py-1 text-[rgba(242,242,236,0.5)]">
                <span>03</span>
                <span>90 kg</span>
                <span>6</span>
                <span className="text-right text-[rgba(242,242,236,0.3)] animate-pulse">Running_</span>
              </div>
            </div>
          </div>
          
          {/* Glowing bottom grid mesh overlay */}
          <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />
        </div>
      )
    },
    {
      id: "slapdash",
      num: "02",
      title: "SlapDash",
      sub: "macOS CoreMotion Automation",
      desc: "A powerful utility workspace application automating complex tasks with native macOS motion triggers and hardware accelerometer tracking, integrating seamlessly into workflow tools.",
      tech: ["Swift", "CoreMotion", "Apple Script", "Tailwind CSS"],
      accent: "from-blue-500 to-[var(--color-amberHighlight)]",
      mockup: (
        <div className="w-full h-full bg-[#0d0d0d] rounded-2xl border border-[rgba(242,242,236,0.08)] relative overflow-hidden flex flex-col p-5 font-mono text-[10px] text-[rgba(242,242,236,0.7)] shadow-inner">
          
          {/* Mock Desktop Window Frame */}
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(242,242,236,0.05)] mb-4">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="text-[9px] tracking-wider uppercase opacity-45">SlapDash_Preferences</span>
            <div className="w-6" /> {/* Spacer */}
          </div>

          {/* CoreMotion Dashboard Mockup */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[9px] opacity-40 uppercase tracking-wider block">Accelerometer Input</span>
                <span className="text-sm font-bold text-[var(--color-boneWhite)]">CoreMotion API Connected</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[8px] bg-green-500/10 text-green-400 border border-green-500/20">Active</span>
            </div>

            {/* Gesture Mapping Config */}
            <div className="flex flex-col gap-2 bg-carbon p-3 border border-[rgba(242,242,236,0.04)] rounded-lg">
              <span className="text-[9px] text-[var(--color-ember)] uppercase font-semibold">// Gesture Triggers</span>
              
              <div className="flex justify-between items-center py-1 border-b border-[rgba(242,242,236,0.03)] text-[var(--color-boneWhite)]">
                <span>Tilt Right (30°)</span>
                <span className="text-[rgba(242,242,236,0.5)]">→ Toggle Slack Focus</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[rgba(242,242,236,0.03)] text-[var(--color-boneWhite)]">
                <span>Double Tap Base</span>
                <span className="text-[rgba(242,242,236,0.5)]">→ Build & Compile Workspace</span>
              </div>
              <div className="flex justify-between items-center py-1 text-[var(--color-boneWhite)]">
                <span>Shake (Lateral)</span>
                <span className="text-[rgba(242,242,236,0.5)]">→ Log Out & Secure Disk</span>
              </div>
            </div>

            {/* Visual Vector Grid Ticker */}
            <div className="h-10 flex items-end gap-1 px-1 border-b border-[rgba(242,242,236,0.1)] pb-1 relative">
              <span className="absolute left-1 top-1 text-[7px] opacity-35">VECTOR_X/Y/Z TIMELINE</span>
              <div className="flex-1 bg-graphite h-[10%] rounded-sm" />
              <div className="flex-1 bg-graphite h-[25%] rounded-sm" />
              <div className="flex-1 bg-graphite h-[18%] rounded-sm" />
              <div className="flex-1 bg-[var(--color-ember)] h-[80%] rounded-sm shadow-[0_0_10px_rgba(243,117,18,0.2)]" />
              <div className="flex-1 bg-graphite h-[40%] rounded-sm" />
              <div className="flex-1 bg-graphite h-[22%] rounded-sm" />
            </div>
          </div>

          <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      {/* 
        This is the trigger section. 
        On desktop, GSAP pins it. On mobile, it scrolls normally.
      */}
      <section
        ref={sectionRef}
        className="projects-section relative min-h-screen lg:h-screen w-full bg-carbon overflow-hidden select-none border-t border-[rgba(242,242,236,0.03)]"
      >
        {/* 
          This is the horizontal wrapper. 
          Desktop: translated horizontally. Mobile: default display flex-col.
        */}
        <div
          ref={containerRef}
          className="projects-container flex flex-col lg:flex-row w-full lg:w-[300vw] h-full lg:absolute lg:left-0 lg:top-0 py-24 sm:py-32 px-4 md:px-8 lg:p-0"
        >
          {/* SLIDE 0: Introductory Card */}
          <div className="project-slide w-full lg:w-screen h-full flex flex-col justify-center px-4 md:px-12 xl:px-24 mb-16 lg:mb-0 shrink-0">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)] mb-4">
                <span className="w-1.5 h-1.5 bg-[var(--color-ember)] rotate-45" />
                <span>Selected Works</span>
              </div>
              <h2 className="font-body text-4xl sm:text-6xl font-extrabold text-[var(--color-boneWhite)] tracking-tight leading-none mb-6">
                Featured Builds.
              </h2>
              <p className="text-[rgba(242,242,236,0.6)] text-base sm:text-lg leading-relaxed mb-8">
                Explore hand-crafted software projects focused on premium motion-mechanics, high-performance UI structures, and deep hardware integrations.
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-[rgba(242,242,236,0.4)]">
                <span className="animate-pulse text-[var(--color-ember)]">●</span>
                <span>DESKTOP: SWIPE OR SCROLL DOWN TO SLIDE HORIZONTALLY</span>
              </div>
            </div>
          </div>

          {/* SLIDES 1 & 2: Project Display Cards */}
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="project-slide w-full lg:w-screen h-full flex items-center justify-center px-4 md:px-12 xl:px-24 mb-16 lg:mb-0 shrink-0"
            >
              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                
                {/* Text column */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <span className="font-mono text-xs text-[var(--color-ember)] tracking-widest font-semibold uppercase mb-4">
                    // WORK {project.num}
                  </span>
                  
                  <h3 className="font-body text-3xl sm:text-4xl font-extrabold text-[var(--color-boneWhite)] tracking-tight mb-2">
                    {project.title}
                  </h3>
                  
                  <h4 className="font-mono text-xs text-[var(--color-amberHighlight)] uppercase tracking-wider mb-6">
                    {project.sub}
                  </h4>
                  
                  <p className="text-[rgba(242,242,236,0.6)] text-sm sm:text-base leading-relaxed mb-8">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[9px] uppercase tracking-wider bg-graphite border border-[rgba(242,242,236,0.06)] text-[var(--color-boneWhite)] px-3 py-1.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="interactive font-mono text-xs uppercase tracking-widest border-b-2 border-[var(--color-ember)] text-[var(--color-boneWhite)] pb-1 hover:text-[var(--color-ember)] transition-all duration-300 self-start group flex items-center gap-2"
                  >
                    <span>Inquire About Integration</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </a>
                </div>

                {/* Interactive CSS Mockup column */}
                <div className="lg:col-span-6 w-full h-[280px] sm:h-[400px] relative">
                  {/* Subtle color backglow */}
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${project.accent} opacity-5 blur-2xl rounded-3xl pointer-events-none`} />
                  
                  {/* Render Visual CSS component */}
                  <div className="w-full h-full relative z-10 p-2 sm:p-4 bg-graphite/40 border border-[rgba(242,242,236,0.05)] rounded-3xl">
                    {project.mockup}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
