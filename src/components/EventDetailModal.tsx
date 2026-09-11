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
  Calendar,
  Users,
  Award,
  Zap,
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
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 transition-all"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1], // snappy cinematic spring curve
            }}
            className={`relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col bg-neutral-950 border ${accentBorder} rounded-2xl ${accentShadow} overflow-hidden font-sans text-neutral-100 backdrop-blur-2xl`}
          >
            {/* Tech Grid Accent Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            {/* Glowing Edge Bars */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                isCyan
                  ? 'from-cyan-500 via-teal-300 to-blue-500 shadow-[0_0_15px_#06b6d4]'
                  : isRed
                  ? 'from-red-600 via-rose-400 to-amber-500 shadow-[0_0_15px_#ef4444]'
                  : 'from-amber-500 via-yellow-300 to-orange-500 shadow-[0_0_15px_#f59e0b]'
              }`}
            />

            {/* MODAL HEADER */}
            <div className="relative z-20 flex items-start justify-between p-5 sm:p-7 border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md">
              <div className="space-y-1.5 pr-4">
                {/* Event Category & Code Tag */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider uppercase rounded-xs ${accentBadgeBg}`}
                  >
                    {event.category}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    EVENT // {event.code}
                  </span>
                </div>

                {/* Event Title */}
                <h2
                  id="event-dialog-title"
                  className={`font-bebas text-3xl sm:text-4xl md:text-5xl tracking-[0.08em] uppercase bg-gradient-to-r ${accentGradText} bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]`}
                >
                  {event.title}
                </h2>

                {/* Subtitle / Tagline */}
                {event.tagline && (
                  <p className="font-oswald text-sm sm:text-base text-neutral-200 tracking-[0.18em] uppercase font-semibold flex items-center gap-2">
                    <Sparkles className={`w-4 h-4 ${accentText} shrink-0`} />
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
              {/* FORMAT PILLS / QUICK INFO (IF AVAILABLE) */}
              {event.formatDetails && event.formatDetails.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {event.formatDetails.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-900/80 border border-neutral-800 p-3 rounded-lg flex flex-col justify-between space-y-1"
                    >
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="font-oswald text-xs sm:text-sm font-bold text-white tracking-wide">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

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
                    <span
                      className={`px-2 py-0.5 font-mono text-[10px] font-bold rounded-xs ${accentBadgeBg}`}
                    >
                      STRUCTURE
                    </span>
                    <h3 className="font-oswald text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white">
                      EVENT ROUNDS & FORMAT
                    </h3>
                    <div
                      className={`h-[1px] flex-1 bg-gradient-to-r ${
                        isCyan
                          ? 'from-cyan-500/40'
                          : isRed
                          ? 'from-red-600/40'
                          : 'from-amber-500/40'
                      } to-transparent ml-2`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.rounds.map((round, idx) => (
                      <div
                        key={idx}
                        className="bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 sm:p-5 space-y-3 transition-all group flex flex-col justify-between shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                      >
                        <div className="space-y-2.5">
                          {/* Round Header */}
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-oswald text-xs sm:text-sm font-bold ${accentText} tracking-wider uppercase flex items-center gap-1.5`}
                            >
                              <Zap className={`w-3.5 h-3.5 ${accentText}`} />
                              {round.stageBadge ||
                                (round.title.toUpperCase().startsWith('ROUND') ||
                                round.title.toUpperCase().startsWith('MID-CHALLENGE') ||
                                round.title.toUpperCase().startsWith('SINGLE') ||
                                round.title.toUpperCase().startsWith('TOURNAMENT') ||
                                round.title.toUpperCase().startsWith('FINAL')
                                  ? round.title
                                  : `ROUND ${round.roundNumber || idx + 1} — ${round.title}`)}
                            </span>
                            {round.duration && (
                              <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[10px] sm:text-xs font-semibold rounded">
                                {round.duration}
                              </span>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-neutral-300 font-sans-body leading-relaxed">
                            {round.description}
                          </p>

                          {round.keyPoints && round.keyPoints.length > 0 && (
                            <ul className="space-y-1.5 pt-1">
                              {round.keyPoints.map((point, pIdx) => (
                                <li
                                  key={pIdx}
                                  className="flex items-start gap-2 text-xs text-neutral-300 font-sans"
                                >
                                  <ArrowRight
                                    className={`w-3.5 h-3.5 ${accentText} shrink-0 mt-0.5`}
                                  />
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

              {/* 3. EVALUATION / SHOWCASE / CRITERIA (IF AVAILABLE) */}
              {event.evaluation && (
                <section
                  className={`bg-gradient-to-br from-neutral-900/90 to-neutral-950 border ${
                    isCyan
                      ? 'border-cyan-500/40'
                      : isRed
                      ? 'border-red-500/40'
                      : 'border-amber-500/40'
                  } rounded-xl p-4 sm:p-5 space-y-4 relative overflow-hidden`}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <h3 className="font-oswald text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white">
                      {event.evaluation.title}
                    </h3>
                  </div>

                  {event.evaluation.description && (
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans-body leading-relaxed">
                      {event.evaluation.description}
                    </p>
                  )}

                  {/* Marks / Criteria Table if provided */}
                  {event.evaluation.criteriaTable &&
                    event.evaluation.criteriaTable.length > 0 && (
                      <div className="overflow-hidden border border-neutral-800 rounded-lg">
                        <table className="w-full text-left text-xs font-sans">
                          <thead className="bg-neutral-900 border-b border-neutral-800 font-mono text-[11px] text-cyan-300 uppercase">
                            <tr>
                              <th className="py-2.5 px-3">Criteria</th>
                              <th className="py-2.5 px-3 text-right">Marks</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-800/60 bg-black/40">
                            {event.evaluation.criteriaTable.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={
                                  row.criteria.toLowerCase().includes('total')
                                    ? 'bg-neutral-900 font-bold text-amber-300'
                                    : 'hover:bg-neutral-900/40 text-neutral-300'
                                }
                              >
                                <td className="py-2 px-3">{row.criteria}</td>
                                <td className="py-2 px-3 text-right font-mono font-semibold">
                                  {row.marks}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                  {/* Focus Points Badges */}
                  {event.evaluation.focusPoints && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {event.evaluation.focusPoints.map((fp, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 ${
                            isCyan
                              ? 'bg-cyan-950/70 border border-cyan-800/70 text-cyan-300'
                              : isRed
                              ? 'bg-red-950/70 border border-red-800/70 text-red-300'
                              : 'bg-amber-950/70 border border-amber-800/70 text-amber-300'
                          } font-mono text-[11px] rounded-md font-semibold`}
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
                    <div className="flex items-center gap-2 text-neutral-200">
                      <Laptop className={`w-4 h-4 ${accentText}`} />
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
                          <CheckCircle
                            className={`w-3.5 h-3.5 ${accentText} shrink-0 mt-0.5`}
                          />
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
                <div
                  className={`relative overflow-hidden rounded-xl border ${
                    isCyan
                      ? 'border-cyan-500/50 bg-gradient-to-r from-neutral-950 via-cyan-950/40 to-neutral-950'
                      : isRed
                      ? 'border-red-500/50 bg-gradient-to-r from-neutral-950 via-red-950/40 to-neutral-950'
                      : 'border-amber-500/50 bg-gradient-to-r from-neutral-950 via-amber-950/40 to-neutral-950'
                  } p-4 text-center shadow-[0_0_25px_rgba(0,0,0,0.5)]`}
                >
                  <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
                  <p
                    className={`font-bebas text-xl sm:text-2xl md:text-3xl tracking-[0.15em] uppercase ${
                      isCyan
                        ? 'text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                        : isRed
                        ? 'text-red-300 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]'
                        : 'text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                    } font-bold`}
                  >
                    {event.slogan}
                  </p>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6 border-t border-neutral-800 bg-neutral-900/80 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isCyan ? 'bg-cyan-400' : isRed ? 'bg-red-500' : 'bg-amber-400'
                  } animate-ping`}
                />
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
                  className={`w-1/2 sm:w-auto px-6 py-2 text-xs font-oswald tracking-widest uppercase ${
                    isCyan
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : isRed
                      ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  } font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2`}
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
