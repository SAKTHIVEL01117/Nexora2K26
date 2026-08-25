import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const PageTransitionOverlay: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Brief cinematic timer for initial page load assets sync
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="page-overlay"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.95,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Cyber Curtain Bottom Accent Glowing Border Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-cyan-400 to-amber-400 shadow-[0_0_20px_#06b6d4]" />

          {/* Center Brand Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center px-4"
          >
            {/* Tech Badge Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              SYSTEM INITIALIZING
            </div>

            {/* Glowing Brand Title */}
            <h1 className="font-bebas text-5xl sm:text-7xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]">
              NEXORA <span className="text-red-500">2K26</span>
            </h1>

            {/* Futuristic Loading Progress Bar */}
            <div className="w-48 sm:w-64 h-1 bg-neutral-900 rounded-full overflow-hidden border border-cyan-900/50 mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-red-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
