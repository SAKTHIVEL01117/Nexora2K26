import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'button' | 'link' | 'card' | 'input'>('default');
  const [hoverText, setHoverText] = useState<string>('');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for trailing smooth ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // Spring physics for trailing ghost effect (slight delay & momentum)
  const ghostConfig = { damping: 20, stiffness: 160, mass: 0.9 };
  const ghostX = useSpring(mouseX, ghostConfig);
  const ghostY = useSpring(mouseY, ghostConfig);

  // Secondary soft ghost spring for multi-tier color trail
  const ghost2Config = { damping: 16, stiffness: 90, mass: 1.2 };
  const ghost2X = useSpring(mouseX, ghost2Config);
  const ghost2Y = useSpring(mouseY, ghost2Config);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, input, textarea, select, [role="button"], [data-cursor], .cursor-pointer, .interactive-hover'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);

        const customCursorAttr = interactiveEl.getAttribute('data-cursor');
        if (customCursorAttr) {
          setHoverText(customCursorAttr);
          setHoverType('card');
        } else if (interactiveEl.tagName === 'BUTTON' || interactiveEl.getAttribute('role') === 'button') {
          setHoverType('button');
          setHoverText('');
        } else if (interactiveEl.tagName === 'A') {
          setHoverType('link');
          setHoverText('');
        } else if (interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA') {
          setHoverType('input');
          setHoverText('');
        } else {
          setHoverType('button');
          setHoverText('');
        }
      } else {
        setIsHovered(false);
        setHoverType('default');
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseenter', onMouseEnter);
    document.body.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseenter', onMouseEnter);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Determine size, color, and border-radius based on state
  let ringSize = 36;
  let ringColor = 'border-cyan-400/70 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.4)]';
  let dotColor = 'bg-cyan-400 shadow-[0_0_10px_#06b6d4]';

  if (isHovered) {
    if (hoverType === 'button') {
      ringSize = 56;
      ringColor = 'border-red-500/80 bg-red-500/15 shadow-[0_0_25px_rgba(239,68,68,0.6)]';
      dotColor = 'bg-red-400 scale-125 shadow-[0_0_12px_#ef4444]';
    } else if (hoverType === 'link') {
      ringSize = 48;
      ringColor = 'border-cyan-300/90 bg-cyan-400/20 shadow-[0_0_20px_rgba(6,182,212,0.6)]';
      dotColor = 'bg-cyan-300 scale-110';
    } else if (hoverType === 'card') {
      ringSize = 68;
      ringColor = 'border-amber-400/80 bg-amber-500/15 shadow-[0_0_30px_rgba(245,158,11,0.5)]';
      dotColor = 'bg-amber-300 opacity-0';
    } else if (hoverType === 'input') {
      ringSize = 28;
      ringColor = 'border-cyan-400 bg-transparent';
      dotColor = 'bg-cyan-400 h-5 w-0.5 rounded-none';
    }
  }

  if (isMouseDown) {
    ringSize = Math.max(20, ringSize - 12);
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Color-Shifting Ambient Ghost Glow (Slowest trail) */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-r from-cyan-500/40 via-purple-500/50 to-rose-500/40 blur-[10px] pointer-events-none"
        style={{
          x: ghost2X,
          y: ghost2Y,
          width: ringSize * 1.3,
          height: ringSize * 1.3,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: [0, 180, 360],
          scale: isMouseDown ? 0.7 : isHovered ? 1.3 : [0.95, 1.15, 0.95],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Trailing Precision Gradient Ghost Ring (Mid-speed trail) */}
      <motion.div
        className="absolute rounded-full p-[1.5px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-70 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
        style={{
          x: ghostX,
          y: ghostY,
          width: ringSize * 0.85,
          height: ringSize * 0.85,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: [0, -180, -360],
          scale: isMouseDown ? 0.8 : isHovered ? 1.2 : 1,
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-[1px]" />
      </motion.div>

      {/* Trailing Outer Magnetic Ring */}
      <motion.div
        className={`absolute rounded-full border transition-colors duration-200 flex items-center justify-center backdrop-blur-[1px] ${ringColor}`}
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 0.85 : isHovered ? 1.15 : 1,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Futuristic Crosshair corner accents on hover */}
        {isHovered && hoverType !== 'input' && (
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-300/40 animate-spin-slow pointer-events-none" />
        )}

        {/* Hover Label inside cursor if provided */}
        {hoverText && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300 font-bold px-1 text-center select-none">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Precision Inner Dot (Follows cursor instantly) */}
      <motion.div
        className={`absolute rounded-full transition-all duration-150 ${dotColor}`}
        style={{
          x: mouseX,
          y: mouseY,
          width: hoverType === 'input' ? 2 : 6,
          height: hoverType === 'input' ? 18 : 6,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 1.5 : 1,
        }}
      />
    </div>
  );
};
