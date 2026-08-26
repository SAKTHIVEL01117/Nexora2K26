import React from 'react';
import { motion } from 'motion/react';
import { User, Phone, ExternalLink } from 'lucide-react';

interface Coordinator {
  id: string;
  name: string;
  role: string;
  phone: string;
}

const staffCoordinatorsList: Coordinator[] = [
  { id: '01', name: 'Ms. KAVIYA.R', role: 'STAFF COORDINATOR', phone: '93607 34997' },
  { id: '02', name: 'Mr. SATHISHKUMAR.S', role: 'STAFF COORDINATOR', phone: '95005 70248' },
  { id: '03', name: 'Mr. A.GANESAN', role: 'STAFF COORDINATOR', phone: '90802 36593' },
];

const studentCoordinatorsList: Coordinator[] = [
  { id: '01', name: 'Mr ROHITH P', role: 'PRESIDENT', phone: '99526 52246' },
  { id: '02', name: 'Mr RAGURAMAN', role: 'VICE PRESIDENT', phone: '98439 94351' },
  { id: '03', name: 'Mr SIVANESAN K', role: 'DIRECTOR OF TECHNICAL ACTIVITIES', phone: '73970 31907' },
  { id: '04', name: 'Mr SANJAY V V', role: 'DIRECTOR OF MEDIA & COMMUNICATION', phone: '96269 79250' },
  { id: '05', name: 'Ms SHARON RAJAPRIYA P', role: 'DIRECTOR OF EVENT & OUTREACH', phone: '93612 03005' },
  { id: '06', name: 'Mr HARIVIGNESH M', role: 'DIRECTOR OF PROFESSIONAL DEVELOPMENT', phone: '93637 75152' },
  { id: '07', name: 'Ms SWATHI R', role: 'DIRECTOR OF ENTERPRENEURSHIP & CLUBS', phone: '88259 36643' },
  { id: '08', name: 'Mr MOHAMMED ZUBAIR K', role: 'JOINT DIRECTOR OF ADMINISTRATION & FINANCE', phone: '94434 01958' },
  { id: '09', name: 'Mr IRSHAD', role: 'JOINT DIRECTOR OF ADMINISTRATION & FINANCE', phone: '90257 70338' },
];

export const CoordinatorsSection: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen text-white flex flex-col justify-between overflow-hidden p-3 sm:p-6 md:p-8 selection:bg-cyan-500 selection:text-black">
      {/* Outer Red Hairline Framing Box matching reference image */}
      <div className="absolute inset-2 sm:inset-4 md:inset-6 border border-red-600/90 pointer-events-none rounded-xs shadow-[0_0_20px_rgba(239,68,68,0.25)]" />

      {/* Outer Corner Hairlines */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-12 h-[2px] bg-red-600 pointer-events-none" />
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 h-[2px] bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-12 h-[2px] bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-12 h-[2px] bg-red-600 pointer-events-none" />

      {/* TOP BANNER & STICKERS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-5xl mx-auto w-full pt-4 pb-6 text-center space-y-6"
      >
        {/* Top Header Text */}
        <div className="space-y-1">
          <h2 className="font-bebas text-3xl sm:text-5xl font-extrabold tracking-widest text-white uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            IT'S ON
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-[0.3em] uppercase">
            THE MULTIVERSE IS OPEN - GET TO CAMPUS
          </p>
        </div>

        {/* Central Big Banner Box: "NEXORA 26 IS LIVE" with Spider Graphics */}
        <div className="relative inline-block my-4">
          {/* Top-Left Comic Sticker "FWASH!" */}
          <div className="absolute -top-8 -left-6 sm:-left-16 z-30 transform -rotate-12 bg-white text-red-600 font-bebas font-black text-xl sm:text-2xl px-3 py-0.5 border-2 border-red-600 shadow-[4px_4px_0px_#ef4444] tracking-wider select-none">
            FWASH!
          </div>

          {/* Red Offset Shadow Frame */}
          <div className="absolute inset-0 bg-red-600 rounded-sm translate-x-2 translate-y-2 pointer-events-none" />

          {/* Main White Border Banner Container */}
          <div className="relative bg-black border-4 border-white px-8 sm:px-16 py-4 sm:py-6 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
            <h1 className="font-bebas text-3xl sm:text-6xl md:text-7xl font-black tracking-wider uppercase text-white">
              NEXORA 2K26 IS LIVE
            </h1>

            {/* Top Right Cyber Spider */}
            <div className="absolute -top-7 -right-5 z-20 pointer-events-none text-red-500 transform rotate-12">
              <svg className="w-9 h-9 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.45 2 11 2.45 11 3V5.17C9.8 5.56 8.87 6.45 8.4 7.6L5.5 5.5C5.11 5.21 4.56 5.3 4.27 5.69C3.98 6.08 4.07 6.63 4.46 6.92L7.1 8.9C6.4 9.8 6 10.85 6 12C6 13.15 6.4 14.2 7.1 15.1L4.46 17.08C4.07 17.37 3.98 17.92 4.27 18.31C4.56 18.7 5.11 18.79 5.5 18.5L8.4 16.4C8.87 17.55 9.8 18.44 11 18.83V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V18.83C14.2 18.44 15.13 17.55 15.6 16.4L18.5 18.5C18.89 18.79 19.44 18.7 19.73 18.31C20.02 17.92 19.93 17.37 19.54 17.08L16.9 15.1C17.6 14.2 18 13.15 18 12C18 10.85 17.6 9.8 16.9 8.9L19.54 6.92C19.93 6.63 20.02 6.08 19.73 5.69C19.44 5.3 18.89 5.21 18.5 5.5L15.6 7.6C15.13 6.45 14.2 5.56 13 5.17V3C13 2.45 12.55 2 12 2ZM12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z" />
              </svg>
            </div>

            {/* Bottom Spider Graphic */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-red-500">
              <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.45 2 11 2.45 11 3V5.17C9.8 5.56 8.87 6.45 8.4 7.6L5.5 5.5C5.11 5.21 4.56 5.3 4.27 5.69C3.98 6.08 4.07 6.63 4.46 6.92L7.1 8.9C6.4 9.8 6 10.85 6 12C6 13.15 6.4 14.2 7.1 15.1L4.46 17.08C4.07 17.37 3.98 17.92 4.27 18.31C4.56 18.7 5.11 18.79 5.5 18.5L8.4 16.4C8.87 17.55 9.8 18.44 11 18.83V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V18.83C14.2 18.44 15.13 17.55 15.6 16.4L18.5 18.5C18.89 18.79 19.44 18.7 19.73 18.31C20.02 17.92 19.93 17.37 19.54 17.08L16.9 15.1C17.6 14.2 18 13.15 18 12C18 10.85 17.6 9.8 16.9 8.9L19.54 6.92C19.93 6.63 20.02 6.08 19.73 5.69C19.44 5.3 18.89 5.21 18.5 5.5L15.6 7.6C15.13 6.45 14.2 5.56 13 5.17V3C13 2.45 12.55 2 12 2ZM12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8Z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* EVENT COORDINATORS TITLE BLOCK */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-5xl mx-auto w-full my-4 text-center"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="h-[2px] w-8 sm:w-16 bg-red-600 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rotate-45" />
          </div>

          <h2 className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.25em] text-white uppercase">
            EVENT COORDINATORS
          </h2>

          <div className="h-[2px] w-8 sm:w-16 bg-red-600 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rotate-45" />
          </div>
        </div>
      </motion.div>

      {/* 1. STAFF COORDINATORS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-6xl mx-auto w-full my-4 space-y-4"
      >
        {/* Subheader: Staff Coordinators */}
        <div className="flex items-center gap-2 px-2">
          <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-red-600 text-black font-mono text-xs font-bold rounded-xs">
            FACULTY
          </span>
          <h3 className="font-oswald text-sm sm:text-base font-bold tracking-[0.2em] text-amber-300 uppercase">
            STAFF COORDINATORS
          </h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/60 to-transparent ml-2" />
        </div>

        {/* 3 Staff Coordinator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {staffCoordinatorsList.map((coordinator) => (
            <motion.div
              key={coordinator.id}
              whileHover={{ y: -3, scale: 1.01 }}
              className="relative bg-black/90 backdrop-blur-md border border-amber-500/60 hover:border-amber-400 rounded-lg p-3.5 sm:p-4 shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-between gap-3 group transition-all"
            >
              {/* Red Bottom-Right Shadow Accent for Cards */}
              <div className="absolute inset-0 border-r-2 border-b-2 border-red-600/80 rounded-lg pointer-events-none" />

              {/* Left Badge Number & Avatar Icon */}
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 border border-amber-400/80 text-amber-300 font-mono text-xs font-bold rounded-xs bg-amber-950/40">
                  {coordinator.id}
                </span>

                <div className="w-10 h-10 rounded-full border border-amber-500/60 bg-amber-950/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:text-amber-300 transition-colors">
                  <User className="w-5 h-5" />
                </div>
              </div>

              {/* Right Side Coordinator Info */}
              <div className="flex-1 text-left space-y-0.5">
                <h3 className="font-oswald text-sm sm:text-base font-bold tracking-wider text-white uppercase group-hover:text-amber-300 transition-colors">
                  {coordinator.name}
                </h3>
                <div className="font-mono text-[10px] sm:text-[11px] text-amber-300/80 tracking-widest uppercase">
                  {coordinator.role}
                </div>
                <a
                  href={`tel:${coordinator.phone.replace(/\s+/g, '')}`}
                  className="font-mono text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-200 tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{coordinator.phone}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 2. STUDENT COORDINATORS SECTION & LEFT STICKER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-6xl mx-auto w-full my-6 space-y-4"
      >
        {/* Subheader: Student Coordinators */}
        <div className="flex items-center gap-2 px-2">
          <span className="px-2 py-0.5 bg-cyan-500 text-black font-mono text-xs font-bold rounded-xs">
            CORE
          </span>
          <h3 className="font-oswald text-sm sm:text-base font-bold tracking-[0.2em] text-cyan-300 uppercase">
            STUDENT COORDINATORS
          </h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/60 to-transparent ml-2" />
        </div>

        {/* Bottom Left Comic Sticker "BREET!" */}
        <div className="absolute -left-4 sm:-left-12 bottom-12 z-30 transform -rotate-6 bg-white text-red-600 font-bebas font-black text-lg sm:text-2xl px-3 py-0.5 border-2 border-red-600 shadow-[4px_4px_0px_#ef4444] tracking-wider select-none hidden lg:block">
          BREET!
        </div>

        {/* 3x3 Grid of Coordinators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {studentCoordinatorsList.map((coordinator) => (
            <motion.div
              key={coordinator.id}
              whileHover={{ y: -3, scale: 1.01 }}
              className="relative bg-black/90 backdrop-blur-md border border-cyan-500/70 hover:border-cyan-400 rounded-lg p-3.5 sm:p-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center justify-between gap-3 group transition-all"
            >
              {/* Red Bottom-Right Shadow Accent for Cards matching reference */}
              <div className="absolute inset-0 border-r-2 border-b-2 border-red-600/80 rounded-lg pointer-events-none" />

              {/* Left Badge Number & Avatar Icon */}
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 border border-cyan-400/80 text-cyan-300 font-mono text-xs font-bold rounded-xs bg-cyan-950/40">
                  {coordinator.id}
                </span>

                <div className="w-10 h-10 rounded-full border border-cyan-500/60 bg-cyan-950/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <User className="w-5 h-5" />
                </div>
              </div>

              {/* Right Side Coordinator Info */}
              <div className="flex-1 text-left space-y-0.5">
                <h3 className="font-oswald text-sm sm:text-base font-bold tracking-wider text-white uppercase group-hover:text-cyan-300 transition-colors">
                  {coordinator.name}
                </h3>
                <div className="font-mono text-[10px] sm:text-[11px] text-cyan-300/80 tracking-widest uppercase">
                  {coordinator.role}
                </div>
                <a
                  href={`tel:${coordinator.phone.replace(/\s+/g, '')}`}
                  className="font-mono text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-200 tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>{coordinator.phone}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FOOTER SECTION MATCHING REFERENCE IMAGE EXACTLY */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-20 max-w-6xl mx-auto w-full mt-32 sm:mt-48 md:mt-60 pt-16 pb-12 text-center space-y-6 border-t border-red-900/30"
      >
        {/* SOCIAL & INSTITUTION LINKS (CIRCLED IN REFERENCE IMAGE) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pb-2">
          {/* College Website Link Card */}
          <motion.a
            href="https://hit.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-3 px-4 py-2.5 bg-black/85 hover:bg-cyan-950/40 border border-cyan-500/40 hover:border-cyan-400 rounded-lg backdrop-blur-md transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
          >
            {/* Tech Corner Accents */}
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400 opacity-60 group-hover:opacity-100" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400 opacity-60 group-hover:opacity-100" />

            <div className="w-9 h-9 rounded bg-white p-1 flex items-center justify-center shadow-md">
              <img
                src="/hitechlogo.svg"
                alt="Hindusthan Institute of Technology Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <div className="font-mono text-[10px] text-cyan-400/80 group-hover:text-cyan-300 uppercase tracking-widest leading-none">
                COLLEGE WEBSITE
              </div>
              <div className="font-oswald text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 tracking-wider flex items-center gap-1.5 mt-0.5">
                <span>hit.edu.in</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.a>

          {/* Instagram Link Card */}
          <motion.a
            href="https://www.instagram.com/hitech_cse/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-3 px-4 py-2.5 bg-black/85 hover:bg-pink-950/40 border border-pink-500/40 hover:border-pink-400 rounded-lg backdrop-blur-md transition-all shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] cursor-pointer"
          >
            {/* Tech Corner Accents */}
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-pink-400 opacity-60 group-hover:opacity-100" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-pink-400 opacity-60 group-hover:opacity-100" />

            <div className="w-9 h-9 rounded bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-1.5 flex items-center justify-center shadow-md">
              <img
                src="/instalogo.svg"
                alt="Instagram Logo"
                className="w-full h-full object-contain invert"
              />
            </div>
            <div className="text-left">
              <div className="font-mono text-[10px] text-pink-400/80 group-hover:text-pink-300 uppercase tracking-widest leading-none">
                INSTAGRAM
              </div>
              <div className="font-oswald text-sm sm:text-base font-bold text-white group-hover:text-pink-200 tracking-wider flex items-center gap-1.5 mt-0.5">
                <span>@hitech_cse</span>
                <ExternalLink className="w-3.5 h-3.5 text-pink-400 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.a>
        </div>

        {/* Tech Hash Lines & NEXORA 2K26 Title */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1 text-red-600/80 font-mono text-sm tracking-tighter select-none">
            <span>/////</span>
            <span>/////</span>
          </div>

          <h2 className="font-bebas text-2xl sm:text-4xl font-extrabold tracking-widest text-red-600 uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            NEXORA 2K26
          </h2>

          <div className="flex items-center gap-1 text-red-600/80 font-mono text-sm tracking-tighter select-none">
            <span>/////</span>
            <span>/////</span>
          </div>
        </div>

        {/* Institution Subtext */}
        <p className="font-sans text-xs sm:text-sm text-neutral-300 font-medium tracking-wide">
          Hindusthan Institute of Technology, Coimbatore- 641032
        </p>

        {/* Copyright */}
        <p className="font-mono text-[11px] sm:text-xs text-neutral-500 tracking-widest uppercase">
          © 2026 NEXORA 2K26. All realms reserved.
        </p>
      </motion.footer>
    </div>
  );
};
