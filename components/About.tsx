"use client";

import { motion } from "framer-motion";

interface SkillBar {
  name: string;
  level: number; // Percentage
  tags: string[];
}

const skillsData: SkillBar[] = [
  { name: "AI Automation (n8n & Claude Code)", level: 95, tags: ["AI", "Pipelines"] },
  { name: "Cross-Platform Mobile (Flutter & Dart)", level: 92, tags: ["Mobile", "Architecture"] },
  { name: "Technical Curriculum Design", level: 96, tags: ["Education", "UDEMY"] },
  { name: "UI/UX & Web Prototyping", level: 85, tags: ["Figma", "GSAP"] },
  { name: "Python Scripting & Data Pipeline", level: 88, tags: ["Scraping", "Data"] }
];

export default function About() {
  return (
    <section 
      id="about" 
      className="relative w-full py-24 sm:py-32 px-4 md:px-8 border-t border-[rgba(242,242,236,0.03)] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-20">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)] mb-3">
            <span className="w-1.5 h-1.5 bg-[var(--color-ember)] rotate-45" />
            <span>Profile Synopsis</span>
          </div>
          <h2 className="font-body text-3xl sm:text-5xl font-bold text-[var(--color-boneWhite)] tracking-tight leading-none">
            About Chetan.
          </h2>
        </div>

        {/* About Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          
          {/* Left Column: Typographic Monogram Block */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="glass-panel w-full aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#101010] to-carbon shadow-2xl border border-[rgba(242,242,236,0.06)]"
            >
              {/* Dynamic decorative backdrop grids */}
              <div className="absolute inset-0 industrial-grid opacity-25 pointer-events-none" />
              <div className="absolute w-40 h-40 rounded-full bg-[var(--color-ember)]/5 blur-3xl pointer-events-none" />

              {/* Bold CP Monogram */}
              <span className="font-display italic text-[10rem] sm:text-[14rem] font-light text-[rgba(242,242,236,0.06)] select-none absolute z-0">
                CP
              </span>
              
              {/* Foreground Monogram Overlay */}
              <span className="font-display italic text-[8rem] sm:text-[11rem] font-extralight text-[var(--color-boneWhite)] select-none relative z-10 drop-shadow-[0_0_30px_rgba(242,242,236,0.1)]">
                CP<span className="text-[var(--color-ember)]">.</span>
              </span>

              {/* Tech Spec Tagging */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between font-mono text-[9px] text-[rgba(242,242,236,0.4)] tracking-widest uppercase">
                <span>EST: 2018</span>
                <span>SYS_INIT: ACTIVE</span>
                <span>LOC: INDIA</span>
              </div>
            </motion.div>

            {/* Micro Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-2xl flex flex-col justify-center border border-[rgba(242,242,236,0.04)] bg-graphite/10">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--color-ember)]">400,000+</span>
                <span className="font-mono text-[9px] text-[rgba(242,242,236,0.4)] uppercase tracking-wider mt-1">Udemy Students</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl flex flex-col justify-center border border-[rgba(242,242,236,0.04)] bg-graphite/10">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--color-boneWhite)]">21+ Tech</span>
                <span className="font-mono text-[9px] text-[rgba(242,242,236,0.4)] uppercase tracking-wider mt-1">Global Masterclasses</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Skill Shimmer Bars */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-10">
            
            {/* Biography Description */}
            <div className="flex flex-col gap-6 text-[rgba(242,242,236,0.7)] text-sm sm:text-base leading-relaxed">
              <h3 className="font-body text-xl sm:text-2xl font-bold text-[var(--color-boneWhite)] tracking-tight">
                Self-Taught Systems Architect & Tech Educator.
              </h3>
              <p>
                My coding journey began as a raw self-taught quest to understand how logic structures drive high-fidelity digital systems. Over the years, this evolved into a double-threat profile: engineering state-of-the-art software systems while educating the next generation of technical minds.
              </p>
              <p>
                Today, I focus on designing high-performance mobile architectures utilizing <span className="text-[var(--color-ember)]">Flutter & Firebase</span>, deploying automated AI-driven workflows powered by <span className="text-[var(--color-amberHighlight)]">n8n and custom Claude Code scripts</span>, and translating complex concepts into structured pedagogy for Udemy.
              </p>
              <p>
                Whether it is building pixel-perfect digital assets or training professional software teams, my approach remains focused on structural logic, premium aesthetic details, and performance scalability.
              </p>
            </div>

            {/* Skill Bars with dynamically loaded shimmer */}
            <div className="flex flex-col gap-6 mt-4">
              <h4 className="font-mono text-xs text-[var(--color-ember)] uppercase tracking-widest font-semibold border-b border-[rgba(242,242,236,0.06)] pb-3">
                // System Skill Matrix
              </h4>

              <div className="flex flex-col gap-5">
                {skillsData.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    {/* Label & Tags Row */}
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[var(--color-boneWhite)] font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[var(--color-ember)] tabular-nums">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Shimmer Meter Bar */}
                    <div className="w-full h-2.5 bg-graphite rounded-full relative overflow-hidden border border-[rgba(242,242,236,0.03)]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-[var(--color-ember)] to-[var(--color-amberHighlight)] absolute left-0 top-0 rounded-full overflow-hidden"
                      >
                        {/* High-speed sliding CSS Shimmer Overlay */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Global CSS Shimmer Keyframe rule helper */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}
