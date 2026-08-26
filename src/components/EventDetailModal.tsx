import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Clock,
  Laptop,
  Lightbulb,
  Code2,
  Trophy,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { EventDetail } from '../types';
import { GOOGLE_FORM_REGISTRATION_URL } from '../constants';

interface EventDetailModalProps {
  event: EventDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (eventId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  onRegister,
}) => {
  // Close on Escape key press and manage scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!event) return null;

  const isCyan = event.accentColor === 'cyan';
  const isRed = event.accentColor === 'red';
  const isAmber = event.accentColor === 'amber';

  const accentBorder = isCyan
    ? 'border-cyan-500/70'
    : isRed
    ? 'border-red-600/70'
    : 'border-amber-500/70';

  const accentShadow = isCyan
    ? 'shadow-[0_0_60px_rgba(6,182,212,0.25)]'
    : isRed
    ? 'shadow-[0_0_60px_rgba(239,68,68,0.25)]'
    : 'shadow-[0_0_60px_rgba(245,158,11,0.25)]';

  const accentBadgeBg = isCyan
    ? 'bg-cyan-500 text-black'
    : isRed
    ? 'bg-red-600 text-white'
    : 'bg-amber-500 text-black';

  const accentText = isCyan
    ? 'text-cyan-400'
    : isRed
    ? 'text-red-400'
    : 'text-amber-400';

  const accentGradText = isCyan
    ? 'from-cyan-300 via-teal-200 to-cyan-500'
    : isRed
    ? 'from-red-400 via-rose-300 to-red-600'
    : 'from-amber-300 via-yellow-200 to-amber-500';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
        >
          {/* Backdrop with High-Tech Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.94, y: 16, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-4xl max-h-[92vh] bg-neutral-950/95 border ${accentBorder} ${accentShadow} rounded-xl flex flex-col overflow-hidden text-white backdrop-blur-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tactical Corner Hairlines */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30" />

            {/* MODAL HEADER */}
            <div className="relative z-20 flex items-start justify-between p-5 sm:p-6 border-b border-neutral-800/90 bg-neutral-900/60 backdrop-blur-md">
              <div className="space-y-2 max-w-[85%]">
                {/* Category & Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 font-mono text-[11px] font-bold rounded-xs tracking-wider uppercase ${accentBadgeBg}`}>
                    {event.code}
                  </span>
                  <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-[11px] font-semibold rounded-xs tracking-widest uppercase flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCyan ? 'bg-cyan-400' : isRed ? 'bg-red-500' : 'bg-amber-400'}`} />
                    {event.category} EVENT
                  </span>
                  {event.duration && (
                    <span className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono text-[11px] rounded-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {event.duration}
                    </span>
                  )}
                </div>

                {/* Event Main Title */}
                <h2
                  id="event-dialog-title"
                  className={`font-bebas text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase font-extrabold bg-gradient-to-r ${accentGradText} bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]`}
                >
                  {event.title}
                </h2>

                {/* Subtitle / Tagline */}
                {event.tagline && (
                  <p className="font-oswald text-sm sm:text-base text-neutral-200 tracking-[0.18em] uppercase font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{event.tagline}</span>
                  </p>
                )}
              </div>

              {/* Close Button with ESC hint */}
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="p-2 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 rounded-lg transition-all cursor-pointer shadow-sm group"
                >
                  <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                </button>
                <span className="hidden sm:inline-block font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                  ESC
                </span>
              </div>
            </div>

            {/* MODAL SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 sm:space-y-8 custom-scrollbar">
              {/* 1. OVERVIEW & DESCRIPTION */}
              <section className="space-y-3 bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Layers className={`w-4 h-4 ${accentText}`} />
                  <h3 className="font-oswald text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white">
                    EVENT OVERVIEW
                  </h3>
                </div>
                <p className="text-neutral-300 font-sans-body text-xs sm:text-sm leading-relaxed sm:leading-relaxed">
                  {event.overview || event.description}
                </p>
              </section>

              {/* 2. ROUNDS PIPELINE (IF AVAILABLE) */}
              {event.rounds && event.rounds.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 font-mono text-[10px] font-bold rounded-xs ${accentBadgeBg}`}>
                      FORMAT
                    </span>
                    <h3 className="font-oswald text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white">
                      EVENT ROUNDS & TIMELINE
                    </h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent ml-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.rounds.map((round) => (
                      <div
                        key={round.roundNumber}
                        className="bg-neutral-900/70 border border-cyan-900/60 hover:border-cyan-500/50 rounded-xl p-4 sm:p-5 space-y-3 transition-all group flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      >
                        <div className="space-y-2.5">
                          {/* Round Header */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-oswald text-xs sm:text-sm font-bold text-cyan-300 tracking-wider uppercase flex items-center gap-1.5">
                              {round.roundNumber === 1 ? (
                                <Lightbulb className="w-4 h-4 text-cyan-400" />
                              ) : (
                                <Code2 className="w-4 h-4 text-cyan-400" />
                              )}
                              ROUND {round.roundNumber} — {round.title}
                            </span>
                            <span className="px-2 py-0.5 bg-neutral-950 border border-cyan-800/80 text-cyan-300 font-mono text-[10px] sm:text-xs font-semibold rounded">
                              {round.duration}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-neutral-300 font-sans-body leading-relaxed">
                            {round.description}
                          </p>

                          {round.keyPoints && round.keyPoints.length > 0 && (
                            <ul className="space-y-1.5 pt-1">
                              {round.keyPoints.map((point, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-xs text-neutral-300 font-sans"
                                >
                                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 3. FINAL EVALUATION / SHOWCASE (IF AVAILABLE) */}
              {event.evaluation && (
                <section className="bg-gradient-to-br from-neutral-900/90 to-neutral-950 border border-cyan-500/40 rounded-xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <h3 className="font-oswald text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white">
                      {event.evaluation.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans-body leading-relaxed">
                    {event.evaluation.description}
                  </p>
                  {event.evaluation.focusPoints && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {event.evaluation.focusPoints.map((fp, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-cyan-950/70 border border-cyan-800/70 text-cyan-300 font-mono text-[11px] rounded-md font-semibold"
                        >
                          ✦ {fp}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* 4. REQUIREMENTS & IMPORTANT INSTRUCTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Requirements */}
                {event.requirements && event.requirements.length > 0 && (
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-300">
                      <Laptop className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-oswald text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white">
                        REQUIREMENTS & SETUP
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {event.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300 font-sans"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Important Instructions */}
                {event.rules && event.rules.length > 0 && (
                  <div className="bg-neutral-900/60 border border-red-900/40 rounded-xl p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2 text-red-400">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <h4 className="font-oswald text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white">
                        IMPORTANT INSTRUCTIONS
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {event.rules.map((rule, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300 font-sans"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 5. SLOGAN / PUNCHLINE BANNER */}
              {event.slogan && (
                <div className="relative overflow-hidden rounded-xl border border-cyan-500/50 bg-gradient-to-r from-neutral-950 via-cyan-950/40 to-neutral-950 p-4 text-center shadow-[0_0_25px_rgba(6,182,212,0.15)]">
                  <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
                  <p className="font-bebas text-xl sm:text-2xl md:text-3xl tracking-[0.15em] uppercase text-cyan-300 font-bold drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                    {event.slogan}
                  </p>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6 border-t border-neutral-800 bg-neutral-900/80 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>NEXORA 2K26 • DEPARTMENT OF CSE</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-2 text-xs font-oswald tracking-widest uppercase bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-lg transition-all cursor-pointer font-bold"
                >
                  Close
                </button>
                <a
                  href={GOOGLE_FORM_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (onRegister) onRegister(event.id);
                  }}
                  className="w-1/2 sm:w-auto px-6 py-2 text-xs font-oswald tracking-widest uppercase bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Register</span>
                  <span className="font-bold">↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
