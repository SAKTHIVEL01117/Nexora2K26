import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const InteractiveGeometricGrid: React.FC = () => {
  // Raw mouse coordinates normalized (-1 to 1)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Fast, responsive spring physics for low-latency depth tracking
  const springConfig = { damping: 22, stiffness: 350 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Parallax layers for different depth levels
  const bgX = useTransform(smoothMouseX, [-1, 1], [-15, 15]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [-15, 15]);

  const midX = useTransform(smoothMouseX, [-1, 1], [-35, 35]);
  const midY = useTransform(smoothMouseY, [-1, 1], [-35, 35]);

  const fgX = useTransform(smoothMouseX, [-1, 1], [-65, 65]);
  const fgY = useTransform(smoothMouseY, [-1, 1], [-65, 65]);

  // Rotations tied to mouse
  const rotX = useTransform(smoothMouseY, [-1, 1], [12, -12]);
  const rotY = useTransform(smoothMouseX, [-1, 1], [-12, 12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      rawMouseX.set(normX);
      rawMouseY.set(normY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* BACKGROUND LAYER 1: Cyber Perspective Grid lines */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 opacity-20"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-cyber-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(6, 182, 212, 0.4)"
                strokeWidth="0.5"
              />
              <circle cx="0" cy="0" r="1.5" fill="#06b6d4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-cyber-grid)" />
        </svg>
      </motion.div>

      {/* MIDGROUND LAYER 2: Floating Interactive Geometric Shapes */}
      <motion.div
        style={{ x: midX, y: midY, rotateX: rotX, rotateY: rotY }}
        className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
      >
        {/* SHAPE 1: Top-Left Cyan Wireframe Hexagon */}
        <motion.div
          className="absolute top-[18%] left-[12%] sm:left-[18%] w-24 h-24 sm:w-32 sm:h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="rgba(6, 182, 212, 0.03)"
              stroke="#06b6d4"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            <polygon
              points="50,20 75,35 75,65 50,80 25,65 25,35"
              fill="none"
              stroke="rgba(239, 68, 68, 0.6)"
              strokeWidth="0.8"
            />
            <circle cx="50" cy="50" r="4" fill="#06b6d4" className="animate-ping" />
          </svg>
        </motion.div>

        {/* SHAPE 2: Top-Right Rotated Cyan Cyber Diamond with Brackets */}
        <motion.div
          className="absolute top-[22%] right-[10%] sm:right-[16%] w-20 h-20 sm:w-28 sm:h-28"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rotate-45 border border-cyan-400/60 bg-cyan-950/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)] relative flex items-center justify-center">
            <div className="w-2/3 h-2/3 border border-dashed border-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            {/* Corner accents */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-300" />
          </div>
        </motion.div>

        {/* SHAPE 3: Bottom-Left Red Octagon & Target Radar */}
        <motion.div
          className="absolute bottom-[22%] left-[8%] sm:left-[14%] w-28 h-28 sm:w-36 sm:h-36"
          animate={{ scale: [1, 1.06, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <polygon
              points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
              fill="rgba(239, 68, 68, 0.04)"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8" strokeDasharray="6 3" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(239,68,68,0.3)" strokeWidth="0.8" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(239,68,68,0.3)" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* SHAPE 4: Bottom-Right Concentric Target Ring & Crosshair */}
        <motion.div
          className="absolute bottom-[20%] right-[12%] sm:right-[18%] w-24 h-24 sm:w-32 sm:h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#06b6d4" strokeWidth="1" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="14" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill="#06b6d4" />
          </svg>
        </motion.div>
      </motion.div>

      {/* FOREGROUND LAYER 3: Dynamic Tech Nodes Directly Behind Hero Text */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Center Surrounding Neon Geometry Box */}
        <div className="relative w-[300px] sm:w-[550px] md:w-[750px] h-[160px] sm:h-[260px] md:h-[320px] border border-cyan-500/20 rounded-xs bg-cyan-950/5 backdrop-blur-[1px]">
          {/* Top-Left Corner Crosshair */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400 flex items-center justify-center">
            <span className="w-1 h-1 bg-cyan-400 rounded-full" />
          </div>
          {/* Top-Right Corner Crosshair */}
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400 flex items-center justify-center">
            <span className="w-1 h-1 bg-cyan-400 rounded-full" />
          </div>
          {/* Bottom-Left Corner Crosshair */}
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-red-500 flex items-center justify-center">
            <span className="w-1 h-1 bg-red-500 rounded-full" />
          </div>
          {/* Bottom-Right Corner Crosshair */}
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-red-500 flex items-center justify-center">
            <span className="w-1 h-1 bg-red-500 rounded-full" />
          </div>

          {/* Floating Geometric Micro Chips around text frame */}
          <div className="absolute -top-6 left-1/4 w-3 h-3 rotate-45 border border-cyan-400 bg-cyan-500/20 shadow-[0_0_8px_#06b6d4]" />
          <div className="absolute -bottom-6 right-1/4 w-3 h-3 rotate-45 border border-red-500 bg-red-500/20 shadow-[0_0_8px_#ef4444]" />

          {/* Geometric Tech Coordinate Labels */}
          <span className="absolute top-2 left-3 font-mono text-[9px] text-cyan-500/70 tracking-widest uppercase">
            SYS::GRID_MATRIX_V2.0
          </span>
          <span className="absolute bottom-2 right-3 font-mono text-[9px] text-red-500/70 tracking-widest uppercase">
            POS::3D_PARALLAX_ACTIVE
          </span>
        </div>
      </motion.div>
    </div>
  );
};
