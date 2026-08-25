import React from 'react';
import { motion } from 'motion/react';
import {
  Clapperboard,
  Smile,
  Brain,
  Code2,
  Terminal,
  Rocket,
  FileText,
  Network,
  Gavel,
  Dribbble,
  Clock,
} from 'lucide-react';

interface EventsSectionProps {
  onBackToHero?: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onBackToHero }) => {
  return (
    <div className="relative w-full min-h-screen text-white flex flex-col justify-between overflow-hidden p-3 sm:p-6 md:p-8 selection:bg-cyan-500 selection:text-black">
      {/* Outer Red Hairline Framing Box matching reference image exactly */}
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

      {/* TOP HEADER BAR */}
      <header className="relative z-20 flex items-center justify-end pt-2 sm:pt-4 px-3 sm:px-6">
        <div className="flex items-center gap-4">
          {onBackToHero && (
            <button
              onClick={onBackToHero}
              className="px-3 py-1 bg-red-950/60 hover:bg-red-900/80 border border-red-600/60 rounded text-xs font-mono text-red-300 uppercase tracking-wider transition-all cursor-pointer"
            >
              ← HOME
            </button>
          )}
          <div className="px-4 py-1.5 border border-cyan-500/60 bg-black/60 rounded text-cyan-400 font-oswald text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            EVENTS
          </div>
        </div>
      </header>

      {/* MAIN TITLE BLOCK */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 text-center my-6 sm:my-8 space-y-1"
      >
        <div className="font-mono text-xs sm:text-sm text-red-500 tracking-[0.4em] uppercase font-semibold">
          E V E N T S
        </div>
        <h1 className="font-bebas text-5xl sm:text-8xl md:text-9xl tracking-[0.06em] uppercase text-red-600 font-extrabold drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">
          NEXORA 2K26
        </h1>
        <p className="font-sans text-xs sm:text-sm text-neutral-300 font-medium tracking-[0.2em] uppercase">
          CHOOSE YOUR ARENA. PROVE YOUR EXCELLENCE.
        </p>
      </motion.div>

      {/* CONTENT CATEGORIES GRID */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-2 sm:px-6 space-y-8 my-4">
        {/* ================= CATEGORY 01: MEDIA AND COMMUNICATION (RED) ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Category Header Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-red-600 text-black font-mono text-xs font-bold rounded-xs">
              01
            </span>
            <h2 className="font-oswald text-sm sm:text-base font-bold tracking-[0.15em] text-white uppercase">
              MEDIA AND COMMUNICATION
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-red-600/60 to-transparent ml-2" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Shortfilm Fest */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-red-600/70 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(239,68,68,0.15)] relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-red-600/90 text-white font-mono text-xs font-bold rounded-xs">
                    01
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clapperboard className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 stroke-[1.5]" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                    SHORTFILM FEST
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  The Short Film Fest at NEXORA 2K26 is a platform for students to showcase their creativity, storytelling, and filmmaking skills. Participants can present original short films based on any genre or theme. Films will be evaluated on concept, storytelling, direction, technical quality, and overall impact.
                </p>
              </div>

              <div className="pt-2 border-t border-red-900/40 flex items-center gap-2 text-xs font-mono text-red-400">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>2:00 PM - 3:00 PM</span>
                <span className="text-neutral-500">|</span>
                <span>2 HRS</span>
              </div>
            </motion.div>

            {/* Meme Marathon */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-red-600/70 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(239,68,68,0.15)] relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-red-600/90 text-white font-mono text-xs font-bold rounded-xs">
                    02
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 stroke-[1.5]" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                    MEME MARATHON
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Meme Marathon is a fun and engaging event where participants showcase their creativity and humor by creating original memes based on the given theme or topic. Memes will be evaluated on originality, relevance to the theme, creativity, and overall impact.
                </p>
              </div>

              <div className="pt-2 border-t border-red-900/40 flex items-center gap-2 text-xs font-mono text-red-400">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>10:00 AM - 12:00 PM</span>
                <span className="text-neutral-500">|</span>
                <span>2 HRS</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= CATEGORY 02: TECHNICAL ACTIVITIES (CYAN) ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Category Header Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-cyan-500 text-black font-mono text-xs font-bold rounded-xs">
              02
            </span>
            <h2 className="font-oswald text-sm sm:text-base font-bold tracking-[0.15em] text-white uppercase">
              TECHNICAL ACTIVITIES
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/60 to-transparent ml-2" />
          </div>

          {/* Cards Grid (6 Columns across wide screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* 01 THINKS PHERE */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
            >
              <div className="space-y-2">
                <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                  01
                </span>
                <div className="text-center space-y-2 pt-1">
                  <Brain className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                    THINK SPHERE
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Present your innovative ideas, research, or technical concepts with clarity and confidence. Showcase your knowledge, communication, and presentation skills.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>10-15 MINS / TEAM</span>
              </div>
            </motion.div>

            {/* 02 PROMPT2PRODUCT */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
            >
              <div className="space-y-2">
                <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                  02
                </span>
                <div className="text-center space-y-2 pt-1">
                  <Code2 className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                    PROMPT2PRODUCT
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Build a creative and functional application using AI-powered coding tools within the given time. Showcase innovation, speed, and problem-solving skills.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>8 HOURS</span>
              </div>
            </motion.div>

            {/* 03 CODE KNOCKOUT */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
            >
              <div className="space-y-2">
                <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                  03
                </span>
                <div className="text-center space-y-2 pt-1">
                  <Terminal className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                    CODE KNOCKOUT
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Solve programming challenges, optimize your solutions and claim the leaderboard in this exciting coding competition.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>90 MINS</span>
              </div>
            </motion.div>

            {/* 04 PRODUCT LAUNCH CHALLENGE */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
            >
              <div className="space-y-2">
                <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                  04
                </span>
                <div className="text-center space-y-2 pt-1">
                  <Rocket className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                    PRODUCT LAUNCH CHALLENGE
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Launch a new product by preparing a marketing strategy and presenting it.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>90 MINS</span>
              </div>
            </motion.div>

            {/* 05 DESIGN MIRROR */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
            >
              <div className="space-y-2">
                <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                  05
                </span>
                <div className="text-center space-y-2 pt-1">
                  <FileText className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                    DESIGN MIRROR
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    DESIGN MIRROR– Participants are given a design challenge or real-world problem, and they have to create an intuitive, creative, and user-friendly interface as the solution.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>90 MINS</span>
              </div>
            </motion.div>

            {/* 06 PROJECT EXPO */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
            >
              <div className="space-y-2">
                <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                  06
                </span>
                <div className="text-center space-y-2 pt-1">
                  <Network className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider">
                    PROJECT EXPO
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Present your innovative software, hardware, research, or IoT projects to industry experts and faculty. Showcase your creativity, technical expertise, and problem-solving skills while competing for exciting prizes and recognition.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-center gap-1 text-[10px] font-mono text-cyan-400">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>-</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= CATEGORY 03: EVENTS AND OUTREACH (AMBER/YELLOW) ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Category Header Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500 text-black font-mono text-xs font-bold rounded-xs">
              03
            </span>
            <h2 className="font-oswald text-sm sm:text-base font-bold tracking-[0.15em] text-white uppercase">
              EVENTS AND OUTREACH
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/60 to-transparent ml-2" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* IPL Auction */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-amber-500/70 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(245,158,11,0.15)] relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-amber-500/90 text-black font-mono text-xs font-bold rounded-xs">
                    01
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Gavel className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[1.5]" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                    IPL AUCTION
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Experience the thrill of team building by strategically bidding for players and assembling the strongest squad within a fixed budget.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-900/40 flex items-center gap-2 text-xs font-mono text-amber-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>2:00 PM - 3:00 PM</span>
                <span className="text-neutral-500">|</span>
                <span>2 HRS</span>
              </div>
            </motion.div>

            {/* EFOOTBALL */}
            <motion.div
              whileHover={{ y: -3 }}
              className="bg-black/80 backdrop-blur-md border border-amber-500/70 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(245,158,11,0.15)] relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-amber-500/90 text-black font-mono text-xs font-bold rounded-xs">
                    02
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Dribbble className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[1.5]" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                    E-GAMES
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  A friendly football tournament where participants compete in exciting matches, showcasing teamwork, strategy, and sportsmanship.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-900/40 flex items-center gap-2 text-xs font-mono text-amber-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>10:00 AM - 12:00 PM</span>
                <span className="text-neutral-500">|</span>
                <span>2 HRS</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* FOOTER BAR MATCHING REFERENCE IMAGE */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-20 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center pt-6 pb-2 px-3 sm:px-6"
      >
        {/* Left Footer - INNOVATE */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]" />
            <span className="font-oswald text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white">
              INNOVATE
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-neutral-400 font-sans leading-tight">
            Lightning-fast ideas that turn every challenge into an opportunity for breakthrough innovation.
          </p>
        </div>

        {/* Center Indicator Hexagon */}
        <div className="flex items-center justify-center my-2 md:my-0">
          <div className="w-7 h-7 bg-red-600/20 border border-red-500 flex items-center justify-center rotate-45 shadow-[0_0_12px_rgba(239,68,68,0.5)]">
            <div className="w-2.5 h-2.5 bg-red-500 rotate-45" />
          </div>
        </div>

        {/* Right Footer - COLLABORATE */}
        <div className="space-y-1 md:text-right">
          <div className="flex items-center gap-2 text-red-500 md:justify-end">
            <span className="font-oswald text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white">
              COLLABORATE
            </span>
            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]" />
          </div>
          <p className="text-[10px] sm:text-xs text-neutral-400 font-sans leading-tight">
            The collective strength and determination that push creators to rise again and again.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};
