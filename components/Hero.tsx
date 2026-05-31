"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";

// The structural dialogue lines matching the timeline of your video's audio track
const DIALOGUE_LINES = [
  "Hey! I'm Chetan Pujari 👋 — AI dev and course creator.",
  "I build high-performance mobile apps with Flutter and Firebase.",
  "I engineer custom AI automation workflows using Claude Code and n8n.",
  "Over 400,000 global students learn development from my masterclasses.",
  "Let's work together to build something rare."
];

export default function Hero() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle Text Typewriter Animation Effect
  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const fullText = DIALOGUE_LINES[currentLine];
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 35); // Clean typewriter speed tracking

    return () => clearInterval(interval);
  }, [currentLine]);

  // Cycle text lines smoothly in sync with your background video's loops
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLine((prev) => (prev + 1) % DIALOGUE_LINES.length);
    }, 5000); // Transitions to match your audio pacing

    return () => clearTimeout(timer);
  }, [currentLine]);

  // Synchronize dynamic muted property with React state, bypassing React's mute attribute bug
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 1.0;
    }
  }, [isMuted]);

  // Explicitly handle unmuting the native video audio track via user interaction
  const toggleAudio = () => {
    if (videoRef.current) {
      const newState = !isMuted;
      setIsMuted(newState);
      
      // Safety play check if browser paused it due to initialization restrictions
      if (!newState) {
        videoRef.current.play()
          .then(() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
            }
          })
          .catch(err => console.log("Audio play prevented:", err));
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-carbon flex flex-col justify-between overflow-hidden px-6 lg:px-16 pt-32 pb-12 z-10">
      
      {/* 1. MASTER FULL-BLEED BACKGROUND TRACKS (No clipping, matches inspiration site layout) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Transparent Alpha-Channel Video Asset utilizing native voice audio track */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute right-0 bottom-0 min-w-full min-h-full object-cover opacity-65 lg:opacity-85 mix-blend-normal pointer-events-auto"
          style={{ objectPosition: "85% center" }}
        >
          <source src="/hero-developer.webm" type="video/webm" />
          <source src="/hero-developer.mp4" type="video/mp4" />
        </video>

        {/* Ambient 3D Particle Space Layer overlaying video boundaries */}
        <div className="absolute inset-0 w-full h-full mix-blend-screen opacity-45">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Stars radius={100} depth={50} count={250} factor={4} saturation={0} fade speed={1} />
            </Float>
          </Canvas>
        </div>
        
        {/* Industrial Dark Vignette Overlay Frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/20 to-transparent pointer-events-none" />
      </div>

      {/* 2. FOREGROUND CORE CONTENT AREA */}
      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 my-auto">
        
        {/* Left Column Text Grid Assembly */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="flex items-center space-x-2 text-ember text-xs font-mono tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-ember rotate-45" />
            <span>AI Engineer / Educator / Creator</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-boneWhite tracking-tight leading-[0.95]">
            Crafting <br />
            <span className="font-light italic text-ember font-display">Digital</span> <br />
            Experiences.
          </h1>

          <p className="max-w-lg text-base md:text-lg text-boneWhite/60 font-body font-normal leading-relaxed">
            Specialized in deploying advanced AI workflows, custom cross-platform software systems, 
            and sharing deep-tech knowledge with half a million developers worldwide.
          </p>

          {/* Functional UX Action Gateways */}
          <div className="flex items-center space-x-4 pt-4">
            <a href="#projects" className="px-6 py-3 bg-ember text-carbon font-body font-medium rounded-none hover:bg-amberHighlight transition-all duration-300 transform active:scale-95">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 border border-boneWhite/20 text-boneWhite font-body font-medium rounded-none hover:bg-boneWhite hover:text-carbon transition-all duration-300">
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Column Glass-Morph Speech Bubble Deck */}
        <div className="lg:col-span-5 flex justify-start lg:justify-end items-center relative h-64 lg:h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLine}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-sm backdrop-blur-md bg-graphite/40 border border-boneWhite/10 p-5 shadow-2xl relative"
            >
              {/* Dynamic Native Audio Monitor Controller */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${!isMuted ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]' : 'bg-ember'}`} />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-boneWhite/40">
                    {!isMuted ? "Live Audio Feed Active" : "Audio Stream Suspended"}
                  </span>
                </div>
                
                {/* Premium Interactive Unmute/Mute Toggle */}
                <button
                  onClick={toggleAudio}
                  className="px-2 py-0.5 border border-ember/30 text-[9px] font-mono rounded bg-ember/10 text-ember hover:bg-ember hover:text-carbon transition-all duration-200 pointer-events-auto flex items-center space-x-1 uppercase tracking-wider cursor-pointer"
                >
                  {isMuted ? (
                    <>
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 12H2a1 1 0 01-1-1V9a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"></path></svg>
                      <span>Unmute Voice</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.914 18.707a1 1 0 11-1.414 1.414L15 18.586l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 16l-1.293-1.293a1 1 0 011.414-1.414L15 14.586l1.293 1.293a1 1 0 011.414-1.414L19.414 16l-1.293 1.293zM9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 12H2a1 1 0 01-1-1V9a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"></path></svg>
                      <span>Mute</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Typewriter Output Frame */}
              <p className="text-sm font-mono text-boneWhite/90 min-h-[48px] leading-relaxed select-none">
                {displayedText}
                <span className="animate-ping ml-0.5 text-ember">|</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 3. HARD BASELINE METRICS GRID */}
      <div className="relative w-full grid grid-cols-3 gap-4 border-t border-boneWhite/10 pt-8 mt-12 z-10 font-mono">
        <div>
          <div className="text-2xl md:text-4xl font-bold text-boneWhite">400K+</div>
          <div className="text-[10px] text-boneWhite/40 tracking-wider uppercase mt-1">Udemy Students</div>
        </div>
        <div>
          <div className="text-2xl md:text-4xl font-bold text-boneWhite">21+</div>
          <div className="text-[10px] text-boneWhite/40 tracking-wider uppercase mt-1">Tech Courses</div>
        </div>
        <div>
          <div className="text-2xl md:text-4xl font-bold text-boneWhite">5+</div>
          <div className="text-[10px] text-boneWhite/40 tracking-wider uppercase mt-1">AI Projects</div>
        </div>
      </div>

    </section>
  );
}
