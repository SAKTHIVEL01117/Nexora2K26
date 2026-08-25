import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  glowColor?: 'cyan' | 'red' | 'white';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  strength = 0.35,
  glowColor = 'cyan',
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  // Motion values for magnetic displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for magnetic elasticity
  const springConfig = { stiffness: 220, damping: 18, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowShadows = {
    cyan: 'shadow-[0_0_20px_rgba(0,220,255,0.4)] group-hover:shadow-[0_0_35px_rgba(0,220,255,0.8)]',
    red: 'shadow-[0_0_20px_rgba(239,68,68,0.4)] group-hover:shadow-[0_0_35px_rgba(239,68,68,0.8)]',
    white: 'shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_35px_rgba(255,255,255,0.6)]',
  };

  return (
    <motion.div
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block group"
    >
      <button
        onClick={onClick}
        className={`relative z-10 transition-shadow duration-300 ${glowShadows[glowColor]} ${className}`}
      >
        {children}
      </button>
    </motion.div>
  );
};
