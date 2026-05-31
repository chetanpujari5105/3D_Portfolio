"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      
      gsap.to(counter, {
        val: 100,
        duration: 2.8,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(Math.floor(counter.val));
        },
        onComplete: () => {
          gsap.delayedCall(0.5, () => {
            setIsComplete(true);
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 w-full h-full bg-[#050505] z-[99999] flex flex-col items-center justify-center select-none"
        >
          {/* Noise background */}
          <div className="absolute inset-0 industrial-grid opacity-20 pointer-events-none" />

          {/* Loader Container */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Outer Industrial Diamond Ring */}
            <motion.div 
              initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 45, scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-44 h-44 border border-[rgba(242,242,236,0.15)] flex items-center justify-center relative shadow-[0_0_50px_rgba(243,117,18,0.03)]"
            >
              {/* Inner Diamond */}
              <div className="w-[90%] h-[90%] border border-[rgba(243,117,18,0.1)] flex items-center justify-center relative">
                {/* Glow Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--color-ember)]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[var(--color-ember)]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[var(--color-ember)]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--color-ember)]" />
              </div>

              {/* Counter Display (Counter-rotated back to 0deg to remain upright) */}
              <div className="-rotate-45 absolute flex flex-col items-center justify-center">
                <span className="font-mono text-xs text-[rgba(242,242,236,0.4)] tracking-widest uppercase mb-1">
                  System.Init
                </span>
                <span className="font-mono text-4xl font-semibold text-[var(--color-boneWhite)] tracking-tighter tabular-nums drop-shadow-[0_0_8px_rgba(242,242,236,0.3)]">
                  {progress}%
                </span>
                <span className="font-mono text-[9px] text-[var(--color-ember)] tracking-[0.2em] uppercase mt-1 animate-pulse">
                  {progress < 100 ? "Loading_..." : "Armed"}
                </span>
              </div>
            </motion.div>

            {/* Bottom Status Layout */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-4 text-xs font-mono text-[rgba(242,242,236,0.5)]">
                <span className="text-[var(--color-ember)]">●</span>
                <span>CP_PORTFOLIO_v1.0.0</span>
                <span className="opacity-30">|</span>
                <span>HEX_0x{progress.toString(16).toUpperCase().padStart(2, '0')}</span>
              </div>
              <div className="w-48 h-[2px] bg-graphite relative overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-[var(--color-ember)] absolute left-0 top-0"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
