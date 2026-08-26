import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Clapperboard,
  Smile,
  Brain,
  Code2,
  Terminal,
  FileText,
  Network,
  Gavel,
  Dribbble,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { EventDetail } from '../types';
import { EventDetailModal } from './EventDetailModal';

interface EventsSectionProps {
  onBackToHero?: () => void;
  onOpenRegistration?: () => void;
}

const EVENTS_DETAILS_MAP: Record<string, EventDetail> = {
  'prompt-2-product': {
    id: 'prompt-2-product',
    code: '02',
    title: 'PROMPT2PRODUCT',
    tagline: 'Think Fast • Build Smart • Ship Your Idea',
    category: 'Technical',
    accentColor: 'cyan',
    time: 'Approx. 2-3 Hours',
    duration: '2-3 HOURS',
    description:
      'Build a creative and functional application using AI-powered coding tools within the given time. Showcase innovation, speed, and problem-solving skills.',
    overview:
      'Prompt2Product is a fast-paced product-building challenge where participants transform a given problem statement into a functional Minimum Viable Product (MVP) using modern development and AI tools.',
    rounds: [
      {
        roundNumber: 1,
        title: 'Idea & Design',
        duration: '45 Minutes',
        description:
          'A problem statement will be given to the participants at the beginning of the event. Participants must understand the problem, brainstorm a creative solution, and plan their product approach.',
        keyPoints: [
          'Problem statement revealed at commencement',
          'Brainstorming, architecture & solution design',
          'Best-performing participants/teams shortlisted for Round 2',
        ],
      },
      {
        roundNumber: 2,
        title: 'Build & Code',
        duration: '1 Hour 45 Minutes',
        description:
          'Shortlisted participants/teams will develop a functional MVP based on the given problem statement and their proposed solution.',
        keyPoints: [
          'Develop functional MVP within allotted time',
          'Allowed to use suitable dev tools, programming languages & AI tools',
          'Personal laptops allowed; lab computer facilities provided',
        ],
      },
    ],
    evaluation: {
      title: 'Final Evaluation — MVP Showcase',
      description:
        'At the end of the development round, participants will demonstrate their completed MVP before the judges and explain their solution and key features.',
      focusPoints: [
        'Functional MVP Execution',
        'Innovative Approach & Architecture',
        'Impactful Solution within Time Limits',
      ],
    },
    requirements: [
      'Personal laptops are Mandotary.',
      'Computer lab facilities will also be provided for round 2 participants.',
      'Participants may use suitable development and AI tools.',
    ],
    rules: [
      'The problem statement will be revealed only at the start of the event.',
      'All work must be completed within the allotted time.',
      'Participants must be ready to demonstrate their MVP at the end of the event.',
      "The judges' and organizing committee's decisions will be final.",
      'Any violation of the event rules may result in disqualification.',
    ],
    slogan: 'THINK FAST. BUILD SMART. SHIP YOUR IDEA.',
  },

  'think-sphere': {
    id: 'think-sphere',
    code: '01',
    title: 'THINK SPHERE',
    tagline: 'Innovate • Present • Inspire',
    category: 'Technical',
    accentColor: 'cyan',
    time: '10-15 Mins / Team',
    duration: '10-15 MINS / TEAM',
    description:
      'Present your innovative ideas, research, or technical concepts with clarity and confidence. Showcase your knowledge, communication, and presentation skills.',
    overview:
      'Think Sphere is a premier paper and idea presentation event designed for students to articulate cutting-edge technological concepts, research breakthroughs, and engineered solutions before an esteemed jury panel.',
    rounds: [
      {
        roundNumber: 1,
        title: 'Presentation & Defense',
        duration: '10-15 Minutes',
        description:
          'Teams will deliver a concise presentation summarizing their research, novel algorithm, or technical project, followed by an interactive Q&A session with the judges.',
        keyPoints: [
          'Presentation time: 8-10 minutes',
          'Judge Q&A / Defense: 3-5 minutes',
          'Evaluation on originality, technical depth, and slide clarity',
        ],
      },
    ],
    requirements: [
      'Bring presentation slides in standard PPT/PDF format on a USB drive or cloud drive.',
      'Team members must be present during the Q&A session.',
    ],
    rules: [
      'Submissions must adhere to ethical research standards without plagiarism.',
      'Time limits must be strictly respected.',
      "Judges' evaluation is final.",
    ],
    slogan: 'SHAPE THE FUTURE WITH YOUR IDEAS.',
  },

  'code-knockout': {
    id: 'code-knockout',
    code: '03',
    title: 'CODE KNOCKOUT',
    tagline: 'Code Fast • Optimize Hard • Conquer the Grid',
    category: 'Technical',
    accentColor: 'cyan',
    time: '90 Minutes',
    duration: '90 MINS',
    description:
      'Solve programming challenges, optimize your solutions and claim the leaderboard in this exciting coding competition.',
    overview:
      'An adrenaline-packed competitive programming contest testing data structures, algorithmic prowess, computational speed, and edge-case mastery under strict time pressure.',
    rounds: [
      {
        roundNumber: 1,
        title: 'Algorithmic Speed Run',
        duration: '90 Minutes',
        description:
          'Participants will tackle algorithmic challenges of ascending difficulty on an automated competitive judging platform.',
        keyPoints: [
          'Languages supported: C++, Java, Python, C',
          'Strict time & space complexity constraints',
          'Live dynamic scoreboard',
        ],
      },
    ],
    requirements: [
      'Lab systems with development environments will be provided.',
      'Individual participation.',
    ],
    rules: [
      'External assistance, plagiarized code, or cheating will result in immediate disqualification.',
      'Ties will be broken based on submission timestamps and execution efficiency.',
    ],
    slogan: 'UNLEASH YOUR CODE PRECISION.',
  },

  'design-mirror': {
    id: 'design-mirror',
    code: '04',
    title: 'DESIGN MIRROR',
    tagline: 'Craft Intuitive Experiences',
    category: 'Technical',
    accentColor: 'cyan',
    time: '90 Minutes',
    duration: '90 MINS',
    description:
      'DESIGN MIRROR– Participants are given a design challenge or real-world problem, and they have to create an intuitive, creative, and user-friendly interface as the solution.',
    overview:
      'Design Mirror is a fast-paced UI/UX design battle where designers craft sleek wireframes, interactive user flows, and aesthetic prototypes addressing modern user experience challenges.',
    rounds: [
      {
        roundNumber: 1,
        title: 'UI/UX Sprint',
        duration: '90 Minutes',
        description:
          'Create high-fidelity screens and seamless user flows in Figma based on the given design prompt and constraints.',
        keyPoints: [
          'Problem statement given at start',
          'Figma / Design tools permitted',
          'Evaluated on usability, visual hierarchy, and creativity',
        ],
      },
    ],
    requirements: [
      'Personal laptops with Figma or preferred design tools.',
      'Active internet connection provided.',
    ],
    rules: [
      'All design components must be created during the event session.',
      'Submissions must include link to prototype or source file.',
    ],
    slogan: 'DESIGN THE INTERFACES OF TOMORROW.',
  },

  'project-expo': {
    id: 'project-expo',
    code: '05',
    title: 'PROJECT EXPO',
    tagline: 'Display • Demonstrate • Dominate',
    category: 'Technical',
    accentColor: 'cyan',
    time: 'Full Day Showcase',
    duration: 'FULL DAY',
    description:
      'Present your innovative software, hardware, research, or IoT projects to industry experts and faculty. Showcase your creativity, technical expertise, and problem-solving skills while competing for exciting prizes and recognition.',
    overview:
      'The Project Expo at NEXORA 2K26 is the ultimate exhibition for working hardware models, IoT ecosystems, AI software architectures, and robotics creations created by talented engineers.',
    rounds: [
      {
        roundNumber: 1,
        title: 'Live Exhibition & Jury Walkthrough',
        duration: 'Full Day',
        description:
          'Exhibition booths where teams demonstrate their working prototypes, explain technical schematics, and interact with visitors and jury members.',
        keyPoints: [
          'Live working prototype demonstration',
          'Hardware / Software architecture explanation',
          'Impact, scalability, and market readiness evaluation',
        ],
      },
    ],
    requirements: [
      'Bring all necessary hardware modules, sensors, power adapters, and project documentation.',
      'Power supply and Wi-Fi will be arranged at exhibition booths.',
    ],
    rules: [
      'Working demo is mandatory for hardware and software entries.',
      "Judges' decisions are final.",
    ],
    slogan: 'ENGINEERING VISIONS INTO REALITY.',
  },

  'shortfilm-fest': {
    id: 'shortfilm-fest',
    code: '01',
    title: 'SHORTFILM FEST',
    tagline: 'Cinematic Expressions & Creative Storytelling',
    category: 'Non-Technical',
    accentColor: 'red',
    time: '2:00 PM - 3:00 PM',
    duration: '2 HRS',
    description:
      'The Short Film Fest at NEXORA 2K26 is a platform for students to showcase their creativity, storytelling, and filmmaking skills. Participants can present original short films based on any genre or theme.',
    overview:
      'Celebrate visual storytelling, cinematography, direction, and sound design. Screen your original short film to an enthusiastic audience and panel of creative critics.',
    requirements: [
      'Video file in MP4 format (1080p minimum resolution) submitted via USB or Drive link prior to the event.',
    ],
    rules: [
      'Film duration must not exceed 10 minutes including credits.',
      'Content must be original and free from hate speech or copyright infringements.',
    ],
    slogan: 'FRAME YOUR VISION. TELL YOUR STORY.',
  },

  'meme-marathon': {
    id: 'meme-marathon',
    code: '02',
    title: 'MEME MARATHON',
    tagline: 'Humor • Wit • Viral Creativity',
    category: 'Non-Technical',
    accentColor: 'red',
    time: '10:00 AM - 12:00 PM',
    duration: '2 HRS',
    description:
      'Meme Marathon is a fun and engaging event where participants showcase their creativity and humor by creating original memes based on the given theme or topic.',
    overview:
      'A laughter-filled digital showdown where wit meets topical pop-culture and tech humor. Create original, relatable memes under time pressure.',
    requirements: ['Smartphones or laptops with photo/meme editing tools.'],
    rules: [
      'Memes must be original and created during the event.',
      'Offensive, vulgar, or abusive content will result in immediate disqualification.',
    ],
    slogan: 'CRACK THE CODE OF HUMOR.',
  },

  'ipl-auction': {
    id: 'ipl-auction',
    code: '03',
    title: 'IPL AUCTION',
    tagline: 'Bid Smart • Build Champions',
    category: 'Non-Technical',
    accentColor: 'amber',
    time: '2:00 PM - 3:00 PM',
    duration: '2 HRS',
    description:
      'Experience the thrill of team building by strategically bidding for players and assembling the strongest squad within a fixed budget.',
    overview:
      'Step into the shoes of a franchise owner! Manage budgets, outbid rivals, and calculate player stats to assemble the ultimate balanced dream cricket squad.',
    requirements: ['Calculators / note sheets provided.'],
    rules: [
      'Teams must strictly stay within the allocated virtual budget.',
      'Squad composition rules (batsmen, bowlers, all-rounders) must be satisfied.',
    ],
    slogan: 'STRATEGIZE. BID. ASSEMBLE THE LEGENDS.',
  },

  'e-games': {
    id: 'e-games',
    code: '04',
    title: 'E-GAMES',
    tagline: 'Digital Turf • Ultimate Glory',
    category: 'Non-Technical',
    accentColor: 'amber',
    time: '10:00 AM - 12:00 PM',
    duration: '2 HRS',
    description:
      'A friendly gaming tournament where participants compete in exciting matches, showcasing teamwork, strategy, and sportsmanship.',
    overview:
      'High-energy competitive digital sports tournament where reflexes, tactics, and precision decide the champions on the virtual field.',
    requirements: ['Gaming devices/controllers provided at tournament arena.'],
    rules: [
      'Standard tournament bracket rules apply.',
      'Fair play and sportsmanship are mandatory.',
    ],
    slogan: 'PLAY WITH PASSION. WIN WITH PRIDE.',
  },
};

export const EventsSection: React.FC<EventsSectionProps> = ({
  onBackToHero,
  onOpenRegistration,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  const handleOpenEventModal = (eventId: string) => {
    const detail = EVENTS_DETAILS_MAP[eventId];
    if (detail) {
      setSelectedEvent(detail);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col justify-between overflow-hidden p-3 sm:p-6 md:p-8 selection:bg-cyan-500 selection:text-black">
      {/* Outer Red Hairline Framing Box matching reference image */}
      <div className="absolute inset-2 sm:inset-4 md:inset-6 border border-red-600/90 pointer-events-none rounded-xs shadow-[0_0_20px_rgba(239,68,68,0.25)]" />

      {/* Outer Corner Hairlines */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-12 h-[2px] bg-red-600 pointer-events-none" />
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-12 h-[2px] bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-12 h-[2px] bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-[2px] h-12 bg-red-600 pointer-events-none" />
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-12 h-[2px] bg-red-600 pointer-events-none" />

      {/* TOP HEADER BAR */}
      <header className="relative z-20 flex items-center justify-end pt-2 sm:pt-4 px-3 sm:px-6">
        <div className="flex items-center gap-4">
          {onBackToHero && (
            <button
              onClick={onBackToHero}
              className="px-3 py-1 bg-red-950/60 hover:bg-red-900/80 border border-red-600/60 rounded text-xs font-mono text-red-300 uppercase tracking-wider transition-all cursor-pointer"
            >
              ← HOME
            </button>
          )}
          <div className="px-4 py-1.5 border border-cyan-500/60 bg-black/60 rounded text-cyan-400 font-oswald text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            EVENTS
          </div>
        </div>
      </header>

      {/* MAIN TITLE BLOCK */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 text-center my-6 sm:my-8 space-y-1"
      >
        <div className="font-mono text-xs sm:text-sm text-red-500 tracking-[0.4em] uppercase font-semibold">
          E V E N T S
        </div>
        <h1 className="font-bebas text-5xl sm:text-8xl md:text-9xl tracking-[0.06em] uppercase text-red-600 font-extrabold drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">
          NEXORA 2K26
        </h1>
        <p className="font-sans text-xs sm:text-sm text-neutral-300 font-medium tracking-[0.2em] uppercase">
          CHOOSE YOUR ARENA. CLICK AN EVENT TO VIEW FULL DETAILS.
        </p>
      </motion.div>

      {/* CONTENT CATEGORIES GRID */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-2 sm:px-6 space-y-8 my-4">
        {/* ================= CATEGORY 01: TECHNICAL ACTIVITIES (CYAN) ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Category Header Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-cyan-500 text-black font-mono text-xs font-bold rounded-xs">
              01
            </span>
            <h2 className="font-oswald text-sm sm:text-base font-bold tracking-[0.15em] text-white uppercase">
              TECHNICAL EVENTS
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/60 to-transparent ml-2" />
          </div>

          {/* Cards Grid (5 Columns across wide screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* 01 THINK SPHERE */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('think-sphere')}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 hover:border-cyan-400 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)] hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                    01
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-center space-y-2 pt-1">
                  <Brain className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                    THINK SPHERE
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Present your innovative ideas, research, or technical concepts with clarity and confidence. Showcase your knowledge, communication, and presentation skills.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>10-15 MINS</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider group-hover:text-cyan-300">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 02 PROMPT2PRODUCT (PRIMARY FEATURED EVENT) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('prompt-2-product')}
              className="bg-black/85 backdrop-blur-md border-2 border-cyan-400 hover:border-cyan-300 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all cursor-pointer group relative overflow-hidden ring-1 ring-cyan-400/50"
            >
              {/* Highlight Badge */}
              <div className="absolute top-0 right-0 bg-cyan-500 text-black font-mono text-[9px] font-extrabold px-2 py-0.5 rounded-bl tracking-wider">
                FEATURED
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                    02
                  </span>
                </div>
                <div className="text-center space-y-2 pt-1">
                  <Code2 className="w-8 h-8 text-cyan-300 mx-auto stroke-[1.5] group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                    PROMPT2PRODUCT
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Build a creative and functional application using AI-powered coding tools within the given time. Showcase innovation, speed, and problem-solving skills.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-300">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>2-3 HOURS</span>
                </div>
                <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  EXPLORE →
                </span>
              </div>
            </motion.div>

            {/* 03 CODE KNOCKOUT */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('code-knockout')}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 hover:border-cyan-400 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)] hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                    03
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-center space-y-2 pt-1">
                  <Terminal className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                    CODE KNOCKOUT
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Solve programming challenges, optimize your solutions and claim the leaderboard in this exciting coding competition.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>90 MINS</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider group-hover:text-cyan-300">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 04 DESIGN MIRROR */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('design-mirror')}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 hover:border-cyan-400 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)] hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                    04
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-center space-y-2 pt-1">
                  <FileText className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                    DESIGN MIRROR
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    DESIGN MIRROR– Participants are given a design challenge or real-world problem, and they have to create an intuitive, creative, and user-friendly interface as the solution.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>90 MINS</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider group-hover:text-cyan-300">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 05 PROJECT EXPO */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('project-expo')}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 hover:border-cyan-400 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)] hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                    05
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-center space-y-2 pt-1">
                  <Network className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                    PROJECT EXPO
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Present your innovative software, hardware, research, or IoT projects to industry experts and faculty. Showcase your creativity, technical expertise, and problem-solving skills while competing for exciting prizes and recognition.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>FULL DAY</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider group-hover:text-cyan-300">
                  VIEW →
                </span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= CATEGORY 02: NON-TECHNICAL ACTIVITIES (RED/AMBER) ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Category Header Tag */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-red-600 text-white font-mono text-xs font-bold rounded-xs">
              02
            </span>
            <h2 className="font-oswald text-sm sm:text-base font-bold tracking-[0.15em] text-white uppercase">
              NON-TECHNICAL EVENTS
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-red-600/60 to-transparent ml-2" />
          </div>

          {/* Cards Grid (4 Columns across desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 01 Shortfilm Fest */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('shortfilm-fest')}
              className="bg-black/80 backdrop-blur-md border border-red-600/70 hover:border-red-500 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:shadow-[0_0_25px_rgba(239,68,68,0.35)] relative overflow-hidden group cursor-pointer transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-red-600/90 text-white font-mono text-xs font-bold rounded-xs">
                    01
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-red-400 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clapperboard className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-red-400 transition-colors uppercase">
                    SHORTFILM FEST
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  The Short Film Fest at NEXORA 2K26 is a platform for students to showcase their creativity, storytelling, and filmmaking skills. Participants can present original short films based on any genre or theme. Films will be evaluated on concept, storytelling, direction, technical quality, and overall impact.
                </p>
              </div>

              <div className="pt-2 border-t border-red-900/40 flex items-center justify-between text-xs font-mono text-red-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>2:00 PM - 3:00 PM</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-red-400">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 02 Meme Marathon */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('meme-marathon')}
              className="bg-black/80 backdrop-blur-md border border-red-600/70 hover:border-red-500 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:shadow-[0_0_25px_rgba(239,68,68,0.35)] relative overflow-hidden group cursor-pointer transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-red-600/90 text-white font-mono text-xs font-bold rounded-xs">
                    02
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-red-400 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Smile className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-red-400 transition-colors uppercase">
                    MEME MARATHON
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Meme Marathon is a fun and engaging event where participants showcase their creativity and humor by creating original memes based on the given theme or topic. Memes will be evaluated on originality, relevance to the theme, creativity, and overall impact.
                </p>
              </div>

              <div className="pt-2 border-t border-red-900/40 flex items-center justify-between text-xs font-mono text-red-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>10:00 AM - 12:00 PM</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-red-400">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 03 IPL Auction */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('ipl-auction')}
              className="bg-black/80 backdrop-blur-md border border-amber-500/70 hover:border-amber-400 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] relative overflow-hidden group cursor-pointer transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-amber-500/90 text-black font-mono text-xs font-bold rounded-xs">
                    03
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Gavel className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase">
                    IPL AUCTION
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Experience the thrill of team building by strategically bidding for players and assembling the strongest squad within a fixed budget.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between text-xs font-mono text-amber-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>2:00 PM - 3:00 PM</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-amber-400">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 04 E-GAMES */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('e-games')}
              className="bg-black/80 backdrop-blur-md border border-amber-500/70 hover:border-amber-400 rounded-lg p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] relative overflow-hidden group cursor-pointer transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2 py-0.5 bg-amber-500/90 text-black font-mono text-xs font-bold rounded-xs">
                    04
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Dribbble className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase">
                    E-GAMES
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  A friendly football tournament where participants compete in exciting matches, showcasing teamwork, strategy, and sportsmanship.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between text-xs font-mono text-amber-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>10:00 AM - 12:00 PM</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-amber-400">
                  VIEW →
                </span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* FOOTER BAR MATCHING REFERENCE IMAGE */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-20 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center pt-6 pb-2 px-3 sm:px-6"
      >
        {/* Left Footer - INNOVATE */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-500">
            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]" />
            <span className="font-oswald text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white">
              INNOVATE
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-neutral-400 font-sans leading-tight">
            Lightning-fast ideas that turn every challenge into an opportunity for breakthrough innovation.
          </p>
        </div>

        {/* Center Indicator Hexagon */}
        <div className="flex items-center justify-center my-2 md:my-0">
          <div className="w-7 h-7 bg-red-600/20 border border-red-500 flex items-center justify-center rotate-45 shadow-[0_0_12px_rgba(239,68,68,0.5)]">
            <div className="w-2.5 h-2.5 bg-red-500 rotate-45" />
          </div>
        </div>

        {/* Right Footer - COLLABORATE */}
        <div className="space-y-1 md:text-right">
          <div className="flex items-center gap-2 text-red-500 md:justify-end">
            <span className="font-oswald text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white">
              COLLABORATE
            </span>
            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]" />
          </div>
          <p className="text-[10px] sm:text-xs text-neutral-400 font-sans leading-tight">
            The collective strength and determination that push creators to rise again and again.
          </p>
        </div>
      </motion.footer>

      {/* EVENT DETAILS MODAL DIALOG */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={Boolean(selectedEvent)}
        onClose={handleCloseModal}
        onRegister={onOpenRegistration}
      />
    </div>
  );
};
