import React, { useState, useEffect } from 'react';
import { motion, Variants, useMotionValue, useTransform, useSpring } from 'motion/react';
import { HitechTrustLogo, NexoraBadgeLogo } from './Logos';
import { MagneticButton } from './MagneticButton';
import { InteractiveGeometricGrid } from './InteractiveGeometricGrid';

interface HeroSectionProps {
  onOpenEvents: () => void;
  onOpenRegistration?: () => void;
}

// Container animation variants for staggering children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// Top Header elements
const headerVariants: Variants = {
  hidden: { opacity: 0, y: -25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Futuristic Glitch Entrance for NEXORA 26 headline
const glitchHeadlineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.88,
    skewX: -8,
    filter: 'blur(12px) drop-shadow(0 0 0px rgba(0,220,255,0))',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    skewX: 0,
    filter: 'blur(0px) drop-shadow(0 0 25px rgba(0,220,255,0.4))',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Fade In Up for left sub-text (INNOVATE)
const leftSubtextVariants: Variants = {
  hidden: { opacity: 0, y: 35, x: -20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

// Fade In Up for right sub-text (COLLABORATE)
const rightSubtextVariants: Variants = {
  hidden: { opacity: 0, y: 35, x: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenEvents, onOpenRegistration }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Framer Motion Title Tilt Values
  const titleX = useMotionValue(0);
  const titleY = useMotionValue(0);

  const rotateX = useSpring(useTransform(titleY, [-250, 250], [14, -14]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(titleX, [-250, 250], [-14, 14]), { stiffness: 180, damping: 22 });
  const shiftX = useSpring(useTransform(titleX, [-250, 250], [-10, 10]), { stiffness: 180, damping: 22 });
  const shiftY = useSpring(useTransform(titleY, [-250, 250], [-10, 10]), { stiffness: 180, damping: 22 });

  const handleTitleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    titleX.set(e.clientX - centerX);
    titleY.set(e.clientY - centerY);
  };

  const handleTitleMouseLeave = () => {
    titleX.set(0);
    titleY.set(0);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full min-h-screen bg-transparent text-white flex flex-col justify-between overflow-hidden p-3 sm:p-6 md:p-8 selection:bg-cyan-500 selection:text-black"
    >
      {/* Outer Red Hairline Framing Box matching reference */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute inset-2 sm:inset-4 md:inset-6 border border-red-600/90 pointer-events-none rounded-xs shadow-[0_0_15px_rgba(239,68,68,0.25)]"
      />

      {/* Top Left Red Hairline Corner Accent */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-[2px] h-14 bg-red-600 pointer-events-none" />
      {/* Bottom Right Red Hairline Corner Accent */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-[2px] h-14 bg-red-600 pointer-events-none" />

      {/* Subtle Dot Matrix Background */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />

      {/* Interactive Glowing Geometric Grid (Parallax Mouse Follow) */}
      <InteractiveGeometricGrid />

      {/* Dynamic Cursor Light Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-radial from-cyan-500/10 via-blue-900/5 to-transparent blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
          left: 'calc(50% - 250px)',
          top: 'calc(50% - 250px)',
        }}
      />

      {/* Floating Accent Dots from Reference Image */}
      {/* Top Cyan Dot */}
      <div className="absolute top-[15%] left-[33%] w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8] animate-pulse" />
      {/* Bottom Left Red Dot */}
      <div className="absolute bottom-[30%] left-[19%] w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
      {/* Bottom Right Red Dot */}
      <div className="absolute bottom-[28%] right-[12%] w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />

      {/* HEADER SECTION */}
      <header className="relative z-20 flex items-start justify-between pt-3 sm:pt-4 px-3 sm:px-6">
        {/* Logos Group */}
        <motion.div variants={headerVariants} className="flex items-center gap-3">
          <HitechTrustLogo className="h-12 sm:h-14 md:h-16" />
          <NexoraBadgeLogo className="h-12 sm:h-14 md:h-16" />
        </motion.div>

        {/* Navigation / Events Button */}
        <motion.div variants={headerVariants}>
          <MagneticButton onClick={onOpenEvents} glowColor="cyan" strength={0.4}>
            <div className="font-oswald tracking-[0.35em] text-sm sm:text-base md:text-lg font-bold text-gray-100 hover:text-cyan-300 transition-colors uppercase cursor-pointer px-4 py-1.5 rounded-sm border border-cyan-500/30 hover:border-cyan-400 bg-black/40 backdrop-blur-md group flex items-center gap-2">
              <span>EVENTS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-80 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#22d3ee]" />
            </div>
          </MagneticButton>
        </motion.div>
      </header>

      {/* MAIN CENTER TITLE SECTION WITH SUBTLE 3D PARALLAX TILT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6 sm:my-10 [perspective:1000px] gap-6 sm:gap-8">
        <motion.div
          variants={glitchHeadlineVariants}
          className="text-center select-none"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: shiftX,
              y: shiftY,
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleTitleMouseMove}
            onMouseLeave={handleTitleMouseLeave}
            className="relative inline-block group cursor-pointer p-2 sm:p-6"
          >
            {/* Red Channel Chromatic Aberration Layer (Shifted Left on Hover) */}
            <h1
              className="absolute inset-0 font-bebas text-5xl sm:text-8xl md:text-[130px] lg:text-[170px] xl:text-[200px] leading-none tracking-[0.05em] uppercase text-red-500 opacity-0 group-hover:opacity-90 group-hover:-translate-x-2 group-hover:-translate-y-0.5 mix-blend-screen transition-all duration-150 pointer-events-none filter blur-[0.5px]"
              aria-hidden="true"
            >
              NEXORA 2K26
            </h1>

            {/* Cyan Channel Chromatic Aberration Layer (Shifted Right on Hover) */}
            <h1
              className="absolute inset-0 font-bebas text-5xl sm:text-8xl md:text-[130px] lg:text-[170px] xl:text-[200px] leading-none tracking-[0.05em] uppercase text-cyan-400 opacity-0 group-hover:opacity-90 group-hover:translate-x-2 group-hover:translate-y-0.5 mix-blend-screen transition-all duration-150 pointer-events-none filter blur-[0.5px]"
              aria-hidden="true"
            >
              NEXORA 2K26
            </h1>

            {/* 3D Offset Dark Shadow Layer */}
            <h1
              className="absolute inset-0 font-bebas text-5xl sm:text-8xl md:text-[130px] lg:text-[170px] xl:text-[200px] leading-none tracking-[0.05em] text-black uppercase pointer-events-none translate-x-1.5 translate-y-1.5 opacity-80"
              aria-hidden="true"
            >
              NEXORA 2K26
            </h1>

            {/* Main Title Layer with Exact Metallic Cyan Fill, Glow & Hover Chromatic Aberration */}
            <motion.h1
              animate={{
                textShadow: [
                  '0 0 25px rgba(0, 220, 255, 0.4)',
                  '0 0 35px rgba(0, 220, 255, 0.7), -2px 0 #ef4444, 2px 0 #06b6d4',
                  '0 0 25px rgba(0, 220, 255, 0.4)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="relative font-bebas text-5xl sm:text-8xl md:text-[130px] lg:text-[170px] xl:text-[200px] leading-none tracking-[0.05em] uppercase text-[#e0f7fa] nexora-3d-main transition-all duration-200 group-hover:[filter:drop-shadow(-3px_0px_2px_rgba(239,68,68,0.9))_drop-shadow(3px_0px_2px_rgba(6,182,212,0.9))] group-hover:scale-[1.01]"
            >
              NEXORA 2K26
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Call-To-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-20"
        >
          {/* Explore Events Button */}
          <MagneticButton onClick={onOpenEvents} glowColor="cyan" strength={0.45}>
            <div className="relative px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-cyan-950/80 via-black/90 to-cyan-950/80 border border-cyan-400/60 hover:border-cyan-300 text-white rounded-xs font-oswald text-base sm:text-lg tracking-[0.25em] font-semibold uppercase flex items-center gap-3 backdrop-blur-md cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]">
              {/* Corner Bracket Accents */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

              {/* Glowing Pulse Orb */}
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="relative z-10 text-cyan-100 group-hover:text-cyan-300 transition-colors">
                EXPLORE EVENTS
              </span>
              <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </MagneticButton>

          {/* Register Now Button with bright red/amber glow */}
          <MagneticButton onClick={onOpenRegistration || onOpenEvents} glowColor="red" strength={0.45}>
            <div className="relative px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-to-r from-red-950/90 via-black/95 to-amber-950/90 border border-red-500/80 hover:border-red-400 text-white rounded-xs font-oswald text-base sm:text-lg tracking-[0.25em] font-semibold uppercase flex items-center gap-3 backdrop-blur-md cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.03] shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:shadow-[0_0_45px_rgba(239,68,68,0.8)]">
              {/* Corner Bracket Accents */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-400" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-400" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-400" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-400" />

              {/* Glowing Pulse Orb */}
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shadow-[0_0_10px_#ef4444]" />
              <span className="relative z-10 text-red-100 group-hover:text-amber-200 transition-colors font-bold">
                REGISTER NOW
              </span>
              <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform"></span>
            </div>
          </MagneticButton>
        </motion.div>
      </main>

      {/* FOOTER / BOTTOM CONTENT SECTION */}
      <footer className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-6 pb-3 sm:pb-4 px-3 sm:px-6">
        {/* Left Section: INNOVATE */}
        <motion.div variants={leftSubtextVariants} className="max-w-md space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444]" />
            <h2 className="font-oswald text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase">
              INNOVATE
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans italic text-neutral-300 leading-relaxed font-light pl-4">
            Lightning-fast ideas that turn every challenge into an opportunity for breakthrough innovation.
          </p>
        </motion.div>

        {/* Right Section: COLLABORATE */}
        <motion.div
          variants={rightSubtextVariants}
          className="max-w-md space-y-1.5 md:ml-auto md:text-right"
        >
          <div className="flex items-center gap-2 md:justify-end">
            <h2 className="font-oswald text-lg sm:text-xl font-bold tracking-[0.2em] text-white uppercase">
              COLLABORATE
            </h2>
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444]" />
          </div>
          <p className="text-xs sm:text-sm font-sans italic text-neutral-300 leading-relaxed font-light pr-0 md:pr-4">
            The collective strength and determination that push creators to rise again and again.
          </p>
        </motion.div>
      </footer>
    </motion.div>
  );
};

