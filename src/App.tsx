/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Lenis from 'lenis';
import { BackgroundVideo } from './components/BackgroundVideo';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { FloatingParticles } from './components/FloatingParticles';
import { EventsSection } from './components/EventsSection';
import { CoordinatorsSection } from './components/CoordinatorsSection';
import { EventsModal } from './components/EventsModal';
import { CustomCursor } from './components/CustomCursor';
import { PageTransitionOverlay } from './components/PageTransitionOverlay';

export default function App() {
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const eventsSectionRef = useRef<HTMLDivElement | null>(null);
  const coordinatorsSectionRef = useRef<HTMLDivElement | null>(null);

  // Initialize Lenis Smooth Scroll for fast, responsive, low-latency momentum
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.45,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Fast cubic out curve
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToEvents = () => {
    if (eventsSectionRef.current) {
      eventsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsEventsModalOpen(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Cinematic Page Entry Transition Overlay */}
      <PageTransitionOverlay />

      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Background Video with smooth scroll sync & muted playback */}
      <BackgroundVideo videoUrl="https://res.cloudinary.com/zby2cx5x/video/upload/v1786207398/download_1_1_mqlrj9.mp4" />

      {/* Animated Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-cyan-400 to-amber-400 z-50 origin-left shadow-[0_0_12px_rgba(6,182,212,0.8)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Floating Animated Geometric Particles */}
      <FloatingParticles />

      {/* Main Content Layers */}
      <div className="relative z-10 space-y-16 pb-16">
        {/* Section 1: Hero Section */}
        <section className="min-h-screen flex flex-col justify-between">
          <HeroSection
            onOpenEvents={scrollToEvents}
            onOpenRegistration={() => setIsEventsModalOpen(true)}
          />
        </section>

        {/* Section 1.5: Centered Event Countdown Section */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative z-20 px-3 sm:px-6 py-4 flex justify-center items-center w-full max-w-7xl mx-auto"
        >
          <CountdownTimer targetDate="2026-09-16T09:00:00" />
        </motion.section>

        {/* Section 2: Events Section with Fast Cinematic Scroll Reveal */}
        <motion.section
          ref={eventsSectionRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="min-h-screen flex flex-col justify-between"
        >
          <EventsSection
            onBackToHero={scrollToTop}
            onOpenRegistration={() => setIsEventsModalOpen(true)}
          />
        </motion.section>

        {/* Section 3: Event Coordinators & Footer Section with Fast Scroll Reveal */}
        <motion.section
          ref={coordinatorsSectionRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="min-h-screen flex flex-col justify-between"
        >
          <CoordinatorsSection />
        </motion.section>
      </div>

      {/* Global Events Quick Modal */}
      <EventsModal isOpen={isEventsModalOpen} onClose={() => setIsEventsModalOpen(false)} />
    </div>
  );
}




