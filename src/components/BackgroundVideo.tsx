import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface BackgroundVideoProps {
  videoUrl: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = false;
    video.playbackRate = 1.4;
    video.pause();

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    let lastScrollY = window.scrollY || document.documentElement.scrollTop;
    let isScrolling = false;
    let animFrameId: number;

    let targetPlaybackRate = 1.4;
    let currentPlaybackRate = 1.4;

    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Adapt playback rate seamlessly to scroll velocity scaled at 1.4x base (0.98x to 2.8x)
      const scrollSpeed = Math.min(Math.max(0.98, 1.4 + deltaY * 0.04), 2.8);
      targetPlaybackRate = scrollSpeed;

      isScrolling = true;

      // Ensure video is playing during scroll gesture (only if it has not reached the end)
      if (video.paused && !video.ended) {
        video.play().catch(() => {
          // Fallback if browser requires gesture
        });
      }

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 160);
    };

    const updateLoop = () => {
      if (video) {
        if (isScrolling && !video.paused) {
          // Smoothly lerp playbackRate for liquid motion feel
          currentPlaybackRate += (targetPlaybackRate - currentPlaybackRate) * 0.12;
          try {
            video.playbackRate = currentPlaybackRate;
          } catch {
            // ignore unsupported rate boundary
          }
        } else if (!isScrolling && !video.paused) {
          video.pause();
        }
      }

      animFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });

    animFrameId = requestAnimationFrame(updateLoop);

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, [videoUrl]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden pointer-events-none z-0 bg-black">
      {/* Motion Container for Background Video with lightweight GPU transforms */}
      <motion.div
        className="absolute inset-0 w-full h-full will-change-transform transform-gpu"
        animate={{
          x: [0, 0, -3, 3, -1, 0, 0],
          scale: [1, 1, 1.01, 0.995, 1.003, 1, 1],
          opacity: [0.9, 0.9, 0.96, 0.8, 0.94, 0.9, 0.9],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: 'loop',
          times: [0, 0.82, 0.84, 0.86, 0.88, 0.9, 1],
          ease: 'easeInOut',
        }}
      >
        <video
          key={videoUrl}
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center [transform:translateZ(0)]"
        />
      </motion.div>

      {/* Periodic Digital Chromatic Scanline Glitch Slice Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-500/10 via-transparent to-red-500/10 mix-blend-screen"
        animate={{
          opacity: [0, 0, 0.35, 0, 0.25, 0, 0],
          y: ['0%', '0%', '-5%', '8%', '-3%', '0%', '0%'],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: 'loop',
          times: [0, 0.82, 0.84, 0.86, 0.88, 0.9, 1],
        }}
      />

      {/* Cinematic Vignette Overlays for Ambient Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
    </div>
  );
};



