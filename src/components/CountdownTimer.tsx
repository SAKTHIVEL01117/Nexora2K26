import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Zap } from 'lucide-react';

interface CountdownTimerProps {
  targetDate?: string; // Default '2026-09-16T09:00:00'
  className?: string;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = '2026-09-16T09:00:00',
  className = '',
  compact = false,
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, total: difference };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const isEventLive = timeLeft.total <= 0;

  return (
    <div
      className={`relative block w-full max-w-4xl mx-auto ${className}`}
    >
      {/* Container Box with Cyber Corner Brackets */}
      <div className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/40 rounded-lg p-4 sm:p-6 md:p-8 shadow-[0_0_30px_rgba(0,220,255,0.15)] overflow-hidden group">
        {/* Subtle Cyber Grid Background Overlay */}
        <div className="absolute inset-0 bg-dot-matrix opacity-30 pointer-events-none" />

        {/* Ambient Top Glow Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4]" />

        {/* Corner Bracket Accents */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

        {/* Header Tag / Live Indicator */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-4 sm:mb-6 border-b border-cyan-950/80 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
            </span>
            <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-cyan-400 font-bold uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400 inline" />
              EVENT COUNTDOWN
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-neutral-400">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            <span className="text-white font-semibold tracking-wider">16 SEP 2026</span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-red-400 font-mono">09:00 AM IST</span>
          </div>
        </div>

        {isEventLive ? (
          <div className="relative z-10 text-center py-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-red-950/80 border border-red-500 text-red-300 rounded font-bebas text-2xl sm:text-4xl tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            >
              <Zap className="w-6 h-6 text-red-400 animate-bounce" />
              SYMPOSIUM IS LIVE NOW!
            </motion.div>
          </div>
        ) : (
          /* Timer Digits Grid */
          <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 text-center">
            {/* DAYS */}
            <div className="flex flex-col items-center">
              <div className="relative w-full bg-gradient-to-b from-black/90 to-cyan-950/40 border border-cyan-500/50 rounded-md py-2 sm:py-4 px-1 shadow-[inset_0_0_12px_rgba(0,220,255,0.1)] group-hover:border-cyan-400 transition-colors">
                <span className="font-bebas text-3xl sm:text-5xl md:text-6xl text-cyan-300 tracking-wider font-extrabold drop-shadow-[0_0_12px_rgba(0,220,255,0.6)]">
                  {padZero(timeLeft.days)}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500/60" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-[0.25em] mt-2 font-semibold">
                DAYS
              </span>
            </div>

            {/* HOURS */}
            <div className="flex flex-col items-center">
              <div className="relative w-full bg-gradient-to-b from-black/90 to-cyan-950/40 border border-cyan-500/50 rounded-md py-2 sm:py-4 px-1 shadow-[inset_0_0_12px_rgba(0,220,255,0.1)] group-hover:border-cyan-400 transition-colors">
                <span className="font-bebas text-3xl sm:text-5xl md:text-6xl text-cyan-300 tracking-wider font-extrabold drop-shadow-[0_0_12px_rgba(0,220,255,0.6)]">
                  {padZero(timeLeft.hours)}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500/60" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-[0.25em] mt-2 font-semibold">
                HOURS
              </span>
            </div>

            {/* MINUTES */}
            <div className="flex flex-col items-center">
              <div className="relative w-full bg-gradient-to-b from-black/90 to-cyan-950/40 border border-cyan-500/50 rounded-md py-2 sm:py-4 px-1 shadow-[inset_0_0_12px_rgba(0,220,255,0.1)] group-hover:border-cyan-400 transition-colors">
                <span className="font-bebas text-3xl sm:text-5xl md:text-6xl text-cyan-300 tracking-wider font-extrabold drop-shadow-[0_0_12px_rgba(0,220,255,0.6)]">
                  {padZero(timeLeft.minutes)}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500/60" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-neutral-400 uppercase tracking-[0.25em] mt-2 font-semibold">
                MINUTES
              </span>
            </div>

            {/* SECONDS */}
            <div className="flex flex-col items-center">
              <div className="relative w-full bg-gradient-to-b from-black/90 to-red-950/40 border border-red-500/60 rounded-md py-2 sm:py-4 px-1 shadow-[inset_0_0_12px_rgba(239,68,68,0.2)] group-hover:border-red-400 transition-colors">
                <span className="font-bebas text-3xl sm:text-5xl md:text-6xl text-red-400 tracking-wider font-extrabold drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] animate-pulse">
                  {padZero(timeLeft.seconds)}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500/80" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-red-400 uppercase tracking-[0.25em] mt-2 font-semibold">
                SECONDS
              </span>
            </div>
          </div>
        )}

        {/* Footer info banner */}
        <div className="relative z-10 mt-5 pt-3 border-t border-cyan-950/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 text-cyan-400/90">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            NEXORA 2K26 SYMPOSIUM
          </span>
          <span className="text-red-400/90 font-medium tracking-wider uppercase">
            LOCATION: RAMAN AUDITORIUM, HITECH
          </span>
        </div>
      </div>
    </div>
  );
};
