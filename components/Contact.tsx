"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const interestChips = [
    "AI Automation",
    "Mobile App",
    "Course Production",
    "UI/UX Design",
    "Other Consulting"
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill in all core form fields.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setSelectedInterests([]);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1800);
  };

  return (
    <section 
      id="contact" 
      className="relative w-full py-24 sm:py-32 px-4 md:px-8 border-t border-[rgba(242,242,236,0.03)] overflow-hidden"
    >
      <div className="absolute inset-0 industrial-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-ember)] mb-3">
            <span className="w-1.5 h-1.5 bg-[var(--color-ember)] rotate-45" />
            <span>Initiate Connection</span>
          </div>
          <h2 className="font-body text-3xl sm:text-5xl font-bold text-[var(--color-boneWhite)] tracking-tight leading-none">
            Get In Touch.
          </h2>
        </div>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-10 rounded-3xl border border-[rgba(242,242,236,0.06)] flex flex-col gap-8 shadow-2xl relative bg-gradient-to-br from-[#101010] to-carbon">
              
              <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-[rgba(242,242,236,0.04)] pointer-events-none" />

              {/* Form Headline */}
              <div>
                <span className="font-mono text-[10px] text-[var(--color-ember)] uppercase tracking-wider block mb-2">// INTENT MATRIX</span>
                <h3 className="font-body text-xl sm:text-2xl font-bold text-[var(--color-boneWhite)] tracking-tight">
                  What are we building today?
                </h3>
              </div>

              {/* Multi-choice chip selectors */}
              <div className="flex flex-wrap gap-2.5">
                {interestChips.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`interactive font-mono text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-lg border transition-all duration-300 ${
                        isSelected
                          ? "bg-[rgba(243,117,18,0.15)] border-[var(--color-ember)] text-[var(--color-ember)] shadow-[0_0_15px_rgba(243,117,18,0.1)]"
                          : "bg-graphite/40 border-[rgba(242,242,236,0.06)] text-[rgba(242,242,236,0.65)] hover:border-[rgba(242,242,236,0.2)]"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>

              {/* Input: Name */}
              <div className="relative w-full group">
                <input
                  type="text"
                  name="name"
                  id="form-name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-[rgba(242,242,236,0.15)] focus:border-[var(--color-ember)] py-3 text-sm text-[var(--color-boneWhite)] outline-none transition-all duration-300 font-mono"
                />
                <label
                  htmlFor="form-name"
                  className="absolute left-0 top-3 text-[rgba(242,242,236,0.4)] text-xs sm:text-sm font-mono tracking-wide transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    peer-focus:scale-80 peer-focus:-translate-y-5 peer-focus:text-[var(--color-ember)]
                    peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:scale-80 peer-[&:not(:placeholder-shown)]:text-[var(--color-ember)]"
                >
                  Your Name / Corporation
                </label>
              </div>

              {/* Input: Email */}
              <div className="relative w-full group">
                <input
                  type="email"
                  name="email"
                  id="form-email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-[rgba(242,242,236,0.15)] focus:border-[var(--color-ember)] py-3 text-sm text-[var(--color-boneWhite)] outline-none transition-all duration-300 font-mono"
                />
                <label
                  htmlFor="form-email"
                  className="absolute left-0 top-3 text-[rgba(242,242,236,0.4)] text-xs sm:text-sm font-mono tracking-wide transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    peer-focus:scale-80 peer-focus:-translate-y-5 peer-focus:text-[var(--color-ember)]
                    peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:scale-80 peer-[&:not(:placeholder-shown)]:text-[var(--color-ember)]"
                >
                  Your Email Address
                </label>
              </div>

              {/* Input: Message */}
              <div className="relative w-full group mt-2">
                <textarea
                  name="message"
                  id="form-message"
                  rows={4}
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-[rgba(242,242,236,0.15)] focus:border-[var(--color-ember)] py-3 text-sm text-[var(--color-boneWhite)] outline-none transition-all duration-300 resize-none font-mono"
                />
                <label
                  htmlFor="form-message"
                  className="absolute left-0 top-3 text-[rgba(242,242,236,0.4)] text-xs sm:text-sm font-mono tracking-wide transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                    peer-focus:scale-80 peer-focus:-translate-y-5 peer-focus:text-[var(--color-ember)]
                    peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:scale-80 peer-[&:not(:placeholder-shown)]:text-[var(--color-ember)]"
                >
                  Tell me about the project deliverables...
                </label>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="interactive font-mono text-xs uppercase tracking-widest bg-[var(--color-ember)] text-carbon w-full py-4.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[var(--color-boneWhite)] hover:text-carbon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-[0_10px_20px_rgba(243,117,18,0.15)]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-carbon border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Data...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <span className="text-sm">→</span>
                  </>
                )}
              </button>

              {/* Success Notification Alert */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-xs rounded-xl flex items-center gap-3"
                  >
                    <span>✔</span>
                    <span>Transmission complete! I will reach back within 24 standard cycles.</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

          {/* Right Column: Contact info cards */}
          <div className="lg:col-span-5 w-full flex flex-col gap-6">
            
            {/* Direct Channel Panel */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[rgba(242,242,236,0.06)] bg-gradient-to-br from-[#101010] to-carbon shadow-2xl relative">
              <span className="font-mono text-[9px] text-[var(--color-ember)] uppercase tracking-wider block mb-4">
                // DIRECT COMMUNICATIONS CHANNEL
              </span>

              <h4 className="font-body text-lg font-bold text-[var(--color-boneWhite)] tracking-tight mb-2">
                Professional Coordinates
              </h4>
              
              <p className="text-[rgba(242,242,236,0.55)] text-xs leading-relaxed mb-6 font-mono">
                Have direct inquiries, instructional consultation requirements, or contract openings? Let's connect directly.
              </p>

              {/* Email Detail Row */}
              <div className="flex flex-col gap-1.5 border-t border-[rgba(242,242,236,0.06)] pt-6">
                <span className="font-mono text-[9px] text-[rgba(242,242,236,0.4)] uppercase tracking-widest">
                  Secure Electronic Mail
                </span>
                <a
                  href="mailto:chetanpujari@example.com"
                  className="interactive font-mono text-sm sm:text-base text-[var(--color-boneWhite)] hover:text-[var(--color-ember)] transition-colors duration-300 font-bold"
                >
                  chetanpujari@example.com
                </a>
              </div>
            </div>

            {/* Social Grid Panel */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[rgba(242,242,236,0.06)] bg-gradient-to-br from-[#101010] to-carbon shadow-2xl relative">
              <span className="font-mono text-[9px] text-[rgba(242,242,236,0.4)] uppercase tracking-wider block mb-4">
                // EXTERNAL DATABASES
              </span>

              <h4 className="font-body text-lg font-bold text-[var(--color-boneWhite)] tracking-tight mb-6">
                Instructor & Developer Networks
              </h4>

              {/* Vertical link tree matrix */}
              <div className="flex flex-col gap-4 font-mono text-xs">
                
                <a
                  href="https://linkedin.com/in/chetanpujari"
                  target="_blank"
                  rel="noreferrer"
                  className="interactive flex justify-between items-center py-2.5 border-b border-[rgba(242,242,236,0.04)] text-[rgba(242,242,236,0.7)] hover:text-[var(--color-ember)] transition-colors duration-300"
                >
                  <span>LINKEDIN</span>
                  <span className="text-[rgba(242,242,236,0.3)]">/chetanpujari ↗</span>
                </a>

                <a
                  href="https://github.com/chetanpujari"
                  target="_blank"
                  rel="noreferrer"
                  className="interactive flex justify-between items-center py-2.5 border-b border-[rgba(242,242,236,0.04)] text-[rgba(242,242,236,0.7)] hover:text-[var(--color-ember)] transition-colors duration-300"
                >
                  <span>GITHUB</span>
                  <span className="text-[rgba(242,242,236,0.3)]">/chetanpujari ↗</span>
                </a>

                <a
                  href="https://udemy.com/user/chetanpujari"
                  target="_blank"
                  rel="noreferrer"
                  className="interactive flex justify-between items-center py-2.5 border-b border-[rgba(242,242,236,0.04)] text-[rgba(242,242,236,0.7)] hover:text-[var(--color-ember)] transition-colors duration-300"
                >
                  <span>UDEMY MASTERCLASSES</span>
                  <span className="text-[rgba(242,242,236,0.3)]">@chetanpujari ↗</span>
                </a>

                <a
                  href="https://twitter.com/chetanpujari"
                  target="_blank"
                  rel="noreferrer"
                  className="interactive flex justify-between items-center py-2.5 text-[rgba(242,242,236,0.7)] hover:text-[var(--color-ember)] transition-colors duration-300"
                >
                  <span>TWITTER / X</span>
                  <span className="text-[rgba(242,242,236,0.3)]">@chetanpujari ↗</span>
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
