"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  skills: string[];
  details: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: "ai-auto",
    num: "01",
    title: "AI Automation Engineering",
    desc: "Build highly efficient automated systems leveraging cutting-edge LLMs and custom pipeline architecture.",
    skills: ["n8n", "Claude Code", "OpenAI API", "Firebase"],
    details: [
      "Custom multi-agent workflows integration",
      "API integrations & LLM prompt engineering",
      "Serverless automation script deployment",
      "AI vector databases & RAG configurations"
    ]
  },
  {
    id: "flutter",
    num: "02",
    title: "Cross-Platform App Development",
    desc: "Craft high-performance, visually stunning native mobile apps for iOS and Android.",
    skills: ["Flutter", "Dart", "Mobile Architecture"],
    details: [
      "Clean Architecture & BLoC state management",
      "Native platform integrations & plugins",
      "Complex custom animations & transitions",
      "Firebase backend syncing & offline sync"
    ]
  },
  {
    id: "course-design",
    num: "03",
    title: "Technical Course Design",
    desc: "Architect curriculum structures that scale to hundreds of thousands of active tech students.",
    skills: ["Curriculum Design", "UI/UX Essentials", "400K+ Scale"],
    details: [
      "Step-by-step practical pedagogy frameworks",
      "Interactive code exercises & challenge guides",
      "High-production video presentation architecture",
      "Global community support structures"
    ]
  },
  {
    id: "uiux",
    num: "04",
    title: "UI/UX Product Design",
    desc: "Create immersive digital interfaces with structural logic, micro-interactions, and premium layouts.",
    skills: ["Figma Design", "Cinematic Motion", "High-fidelity Systems"],
    details: [
      "Interactive component design systems",
      "Fluid scroll-driven animation prototyping",
      "User research and high-fidelity mockups",
      "Pixel-perfect responsive wireframing"
    ]
  },
  {
    id: "python",
    num: "05",
    title: "Python Scripting & Data Scraping",
    desc: "Deploy automated scraping bots, data pipelines, and terminal utilities.",
    skills: ["Automated Pipelines", "Web Data Extraction", "APIs"],
    details: [
      "Advanced selenium & beautifulsoup scrapers",
      "Cron-based data synchronization systems",
      "High-efficiency pandas operations",
      "CLI dashboard metrics utilities"
    ]
  }
];

// Interactive 3D Tilt Card Component
function TiltCard({ service }: { service: ServiceItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Tilt calculations (-10 to 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((centerY - y) / centerY) * 10;
    const ry = ((x - centerX) / centerX) * 10;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden group select-none flex flex-col justify-between min-h-[360px] cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Spotlight highlight backdrop */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${coords.x}px ${coords.y}px, rgba(243, 117, 18, 0.08) 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Grid line indicator details */}
      <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-[rgba(242,242,236,0.04)] pointer-events-none" />

      <div>
        {/* Card Number & Header Row */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-xs text-[var(--color-ember)] tracking-widest font-semibold uppercase">
            // SERVICE {service.num}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[rgba(242,242,236,0.2)] group-hover:bg-[var(--color-ember)] transition-colors duration-300" />
        </div>

        {/* Card Title */}
        <h3 className="font-body text-xl sm:text-2xl font-bold text-[var(--color-boneWhite)] tracking-tight mb-4 group-hover:text-[var(--color-amberHighlight)] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Card Description */}
        <p className="text-[rgba(242,242,236,0.55)] text-xs sm:text-sm leading-relaxed mb-6">
          {service.desc}
        </p>

        {/* Tags Container */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.skills.map((skill, idx) => (
            <span
              key={idx}
              className="font-mono text-[9px] uppercase tracking-wider bg-graphite/40 border border-[rgba(242,242,236,0.06)] text-[rgba(242,242,236,0.7)] px-2.5 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable Details Container */}
      <div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden mb-4 border-t border-[rgba(242,242,236,0.06)] pt-4"
            >
              <h4 className="font-mono text-[10px] text-[var(--color-amberHighlight)] uppercase tracking-widest mb-2.5">
                Deliverables:
              </h4>
              <ul className="flex flex-col gap-1.5">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[rgba(242,242,236,0.65)] font-mono text-[10px]">
                    <span className="text-[var(--color-ember)] select-none">→</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Expansion Bar */}
        <div className="flex justify-between items-center text-xs font-mono text-[rgba(242,242,236,0.4)] group-hover:text-[rgba(242,242,236,0.8)] mt-2 transition-colors duration-300">
          <span>{isExpanded ? "Collapse Specs" : "Expand Deliverables"}</span>
          <span className="text-[var(--color-ember)] font-light transform transition-transform duration-300">
            {isExpanded ? "[-]" : "[+]"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Special CTA Grid Card
function ContactCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[var(--color-ember)] p-8 rounded-2xl relative overflow-hidden group select-none flex flex-col justify-between min-h-[360px]"
    >
      {/* Light spotlight reflection */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 250px at ${coords.x}px ${coords.y}px, rgba(243, 117, 18, 0.15) 0%, transparent 80%)`,
          }}
        />
      )}

      {/* Cyber ambient ring accent */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border border-[rgba(243,117,18,0.08)] pointer-events-none flex items-center justify-center">
        <div className="w-[80%] h-[80%] rounded-full border border-[rgba(243,117,18,0.04)]" />
      </div>

      <div>
        <span className="font-mono text-xs text-[var(--color-ember)] tracking-widest font-semibold uppercase">
          // INITIATE
        </span>
        <h3 className="font-body text-2xl sm:text-3xl font-extrabold text-[var(--color-boneWhite)] tracking-tight leading-tight mt-6 mb-4">
          Have an engineering bottleneck?
        </h3>
        <p className="text-[rgba(242,242,236,0.6)] text-xs sm:text-sm leading-relaxed">
          Let's design rare cross-platform structures, deploy high-performance AI automations, or train your tech teams.
        </p>
      </div>

      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("contact");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="interactive font-mono text-xs uppercase tracking-widest bg-[var(--color-ember)] text-carbon w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-boneWhite)] hover:text-carbon transition-all duration-300 shadow-[0_10px_20px_rgba(243,117,18,0.15)] mt-6"
      >
        <span>Build Something Rare</span>
        <span className="text-sm">→</span>
      </a>
    </div>
  );
}

export default function Services() {
  return (
    <section 
      id="services" 
      className="relative w-full py-24 sm:py-32 px-4 md:px-8 border-t border-[rgba(242,242,236,0.03)]"
    >
      <div className="max-w-7xl w-full mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)] mb-3">
            <span className="w-1.5 h-1.5 bg-[var(--color-ember)] rotate-45" />
            <span>Scope of Services</span>
          </div>
          <h2 className="font-body text-3xl sm:text-5xl font-bold text-[var(--color-boneWhite)] tracking-tight leading-none">
            Workspace Solutions.
          </h2>
        </div>

        {/* Services 3-Column Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <TiltCard key={service.id} service={service} />
          ))}
          <ContactCard />
        </div>

      </div>
    </section>
  );
}
