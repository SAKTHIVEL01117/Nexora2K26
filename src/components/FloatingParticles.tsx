import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ClickBurst {
  id: number;
  x: number;
  y: number;
  particles: Array<{
    id: number;
    angle: number;
    distance: number;
    size: number;
    color: string;
    shape: 'dot' | 'spark' | 'diamond';
  }>;
}

export const FloatingParticles: React.FC = () => {
  const [bursts, setBursts] = useState<ClickBurst[]>([]);
  const [lastClick, setLastClick] = useState<{ x: number; y: number; id: number } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Track mouse movement with requestAnimationFrame for optimized high-framerate response
  useEffect(() => {
    let animFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Handle global click to trigger particle explosions
  const handleGlobalClick = useCallback((e: MouseEvent) => {
    // Avoid triggering on interactive form inputs if needed, but the prompt says "clicks anywhere on the screen"
    const clickX = e.clientX;
    const clickY = e.clientY;
    const burstId = Date.now() + Math.random();

    // Generate 18 radial explosion particles
    const particleCount = 18;
    const colors = ['#06b6d4', '#ef4444', '#f59e0b', '#38bdf8', '#ffffff'];
    const shapes: ('dot' | 'spark' | 'diamond')[] = ['dot', 'spark', 'diamond'];

    const newParticles = Array.from({ length: particleCount }, (_, i) => {
      const angle = (i * (360 / particleCount) + (Math.random() * 20 - 10)) * (Math.PI / 180);
      const distance = Math.random() * 120 + 80; // Explode 80px to 200px outward
      return {
        id: i,
        angle,
        distance,
        size: Math.random() * 6 + 3,
        color: colors[i % colors.length],
        shape: shapes[i % shapes.length],
      };
    });

    const newBurst: ClickBurst = {
      id: burstId,
      x: clickX,
      y: clickY,
      particles: newParticles,
    };

    setBursts((prev) => [...prev.slice(-6), newBurst]); // Keep max 6 recent bursts
    setLastClick({ x: clickX, y: clickY, id: burstId });

    // Clean up burst after animation finishes
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 900);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  // Generate a deterministic memoized array of shapes and dots for smooth floating background animations
  const particleDots = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? 'rgba(239, 68, 68, 0.7)' : i % 2 === 0 ? 'rgba(6, 182, 212, 0.7)' : 'rgba(245, 158, 11, 0.6)',
    }));
  }, []);

  const geometricShapes = [
    { type: 'diamond', size: 24, x: '12%', y: '22%', color: 'border-cyan-500/40', duration: 18, delay: 0 },
    { type: 'hexagon', size: 32, x: '85%', y: '15%', color: 'border-red-500/40', duration: 22, delay: 2 },
    { type: 'square', size: 18, x: '78%', y: '68%', color: 'border-amber-500/40', duration: 20, delay: 1 },
    { type: 'cross', size: 20, x: '8%', y: '75%', color: 'text-cyan-400/50', duration: 16, delay: 3 },
    { type: 'diamond', size: 28, x: '92%', y: '45%', color: 'border-cyan-400/30', duration: 24, delay: 4 },
    { type: 'cross', size: 22, x: '48%', y: '88%', color: 'text-red-400/50', duration: 19, delay: 2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {/* Interactive Click Explosions Layer */}
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={`burst-${burst.id}`}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ transform: `translate3d(${burst.x}px, ${burst.y}px, 0)` }}
          >
            {/* Primary Shockwave Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute -top-12 -left-12 w-24 h-24 rounded-full border-2 border-cyan-400 shadow-[0_0_20px_#06b6d4] pointer-events-none"
            />

            {/* Secondary Red Shockwave Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
              className="absolute -top-8 -left-8 w-16 h-16 rounded-full border border-red-500 shadow-[0_0_15px_#ef4444] pointer-events-none"
            />

            {/* Radial Exploding Sparks */}
            {burst.particles.map((p) => {
              const targetX = Math.cos(p.angle) * p.distance;
              const targetY = Math.sin(p.angle) * p.distance;

              return (
                <motion.div
                  key={`spk-${burst.id}-${p.id}`}
                  initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
                  animate={{
                    x: targetX,
                    y: targetY,
                    scale: [1, 1.4, 0],
                    opacity: [1, 0.9, 0],
                    rotate: p.angle * (180 / Math.PI),
                  }}
                  transition={{ duration: 0.7, ease: [0.15, 0.85, 0.35, 1] }}
                  className="absolute pointer-events-none -top-1 -left-1"
                  style={{
                    backgroundColor: p.shape === 'dot' ? p.color : 'transparent',
                    boxShadow: p.shape === 'dot' ? `0 0 10px ${p.color}` : 'none',
                    borderRadius: p.shape === 'dot' ? '50%' : '0px',
                    width: p.size,
                    height: p.size,
                  }}
                >
                  {p.shape === 'diamond' && (
                    <div
                      className="w-full h-full rotate-45 border"
                      style={{ borderColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
                    />
                  )}
                  {p.shape === 'spark' && (
                    <div
                      className="w-3 h-0.5 rounded-full"
                      style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </AnimatePresence>

      {/* Floating Glowing Dots with Reactive Mouse Drift & Click Explosion */}
      {particleDots.map((pt) => {
        let repelX = 0;
        let repelY = 0;

        // Compute mouse repulsion force
        if (mousePos && typeof window !== 'undefined') {
          const ptPxX = (pt.x / 100) * window.innerWidth;
          const ptPxY = (pt.y / 100) * window.innerHeight;
          const dx = ptPxX - mousePos.x;
          const dy = ptPxY - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 220; // Radius of mouse influence in px
          if (dist < radius && dist > 0) {
            const force = ((radius - dist) / radius) * 60; // Gently drift up to 60px away
            repelX = (dx / dist) * force;
            repelY = (dy / dist) * force;
          }
        }

        // Compute click burst push force
        let pushX = 0;
        let pushY = 0;
        if (lastClick && typeof window !== 'undefined') {
          const ptPxX = (pt.x / 100) * window.innerWidth;
          const ptPxY = (pt.y / 100) * window.innerHeight;
          const dx = ptPxX - lastClick.x;
          const dy = ptPxY - lastClick.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 350 && dist > 0) {
            const force = ((350 - dist) / 350) * 90;
            pushX = (dx / dist) * force;
            pushY = (dy / dist) * force;
          }
        }

        const totalX = repelX + pushX;
        const totalY = repelY + pushY;

        return (
          <motion.div
            key={`dot-wrapper-${pt.id}`}
            className="absolute"
            style={{
              left: `${pt.x}%`,
              top: `${pt.y}%`,
            }}
            animate={{
              x: totalX,
              y: totalY,
            }}
            transition={{
              type: 'spring',
              stiffness: 170,
              damping: 20,
              mass: 0.8,
            }}
          >
            <motion.div
              className="rounded-full"
              style={{
                width: pt.size,
                height: pt.size,
                backgroundColor: pt.color,
                boxShadow: `0 0 10px ${pt.color}`,
              }}
              animate={{
                y: [0, -30, 20, 0],
                x: [0, 15, -15, 0],
                opacity: [0.2, 0.9, 0.3, 0.2],
                scale: [1, 1.3, 0.9, 1],
              }}
              transition={{
                duration: pt.duration,
                repeat: Infinity,
                delay: pt.delay,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        );
      })}

      {/* Floating Geometric Wireframe Shapes with Reactive Mouse Drift & Click Push */}
      {geometricShapes.map((shape, idx) => {
        let repelX = 0;
        let repelY = 0;

        if (mousePos && typeof window !== 'undefined') {
          const ptPxX = (parseFloat(shape.x) / 100) * window.innerWidth;
          const ptPxY = (parseFloat(shape.y) / 100) * window.innerHeight;
          const dx = ptPxX - mousePos.x;
          const dy = ptPxY - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 260;
          if (dist < radius && dist > 0) {
            const force = ((radius - dist) / radius) * 75; // Up to 75px drift
            repelX = (dx / dist) * force;
            repelY = (dy / dist) * force;
          }
        }

        let pushX = 0;
        let pushY = 0;
        if (lastClick && typeof window !== 'undefined') {
          const ptPxX = (parseFloat(shape.x) / 100) * window.innerWidth;
          const ptPxY = (parseFloat(shape.y) / 100) * window.innerHeight;
          const dx = ptPxX - lastClick.x;
          const dy = ptPxY - lastClick.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 400 && dist > 0) {
            const force = ((400 - dist) / 400) * 110;
            pushX = (dx / dist) * force;
            pushY = (dy / dist) * force;
          }
        }

        const totalX = repelX + pushX;
        const totalY = repelY + pushY;

        return (
          <motion.div
            key={`geo-wrapper-${idx}`}
            className="absolute"
            style={{ left: shape.x, top: shape.y }}
            animate={{
              x: totalX,
              y: totalY,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 18,
            }}
          >
            <motion.div
              animate={{
                y: [0, -25, 15, 0],
                x: [0, 10, -10, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                delay: shape.delay,
                ease: 'easeInOut',
              }}
            >
              {shape.type === 'diamond' && (
                <div
                  className={`border ${shape.color} transform rotate-45 shadow-[0_0_12px_rgba(6,182,212,0.2)]`}
                  style={{ width: shape.size, height: shape.size }}
                />
              )}

              {shape.type === 'hexagon' && (
                <div
                  className={`border ${shape.color} rounded-sm shadow-[0_0_12px_rgba(239,68,68,0.2)]`}
                  style={{
                    width: shape.size,
                    height: shape.size,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                  }}
                />
              )}

              {shape.type === 'square' && (
                <div
                  className={`border ${shape.color} shadow-[0_0_10px_rgba(245,158,11,0.2)]`}
                  style={{ width: shape.size, height: shape.size }}
                />
              )}

              {shape.type === 'cross' && (
                <div className={`font-mono text-sm font-bold ${shape.color} select-none`}>
                  +
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

