import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { EventItem, RegistrationFormData } from '../types';
import { GOOGLE_FORM_REGISTRATION_URL } from '../constants';

const EVENTS_DATA: EventItem[] = [
  {
    id: 'code-blitz',
    title: 'CODE BLITZ (ALGO HACK)',
    category: 'Technical',
    time: '10:00 AM - 01:00 PM',
    location: 'Lab 3, Department of CSE',
    description: 'Competitive coding challenge testing data structures, algorithms, and rapid problem-solving skills.',
    prizePool: '₹25,000',
    iconName: 'Code'
  },
  {
    id: 'paper-pres',
    title: 'TECH PULSE (PAPER PRESENTATION)',
    category: 'Technical',
    time: '11:30 AM - 02:30 PM',
    location: 'Auditorium 2',
    description: 'Present breakthrough research papers on AI/ML, Quantum Computing, IoT, and Cyber Security.',
    prizePool: '₹20,000',
    iconName: 'FileText'
  },
  {
    id: 'web-craft',
    title: 'WEB CRAFT (UI/UX DASH)',
    category: 'Technical',
    time: '01:30 PM - 04:30 PM',
    location: 'Design Studio B',
    description: 'Design and build high-precision, highly responsive modern web interfaces under time constraints.',
    prizePool: '₹15,000',
    iconName: 'Layout'
  },
  {
    id: 'ai-prompt',
    title: 'PROMPT MASTER (AI ARENA)',
    category: 'Flagship',
    time: '02:00 PM - 05:00 PM',
    location: 'Main Seminar Hall',
    description: 'Harness generative AI models to solve complex real-world logic, image synthesis, and system prompts.',
    prizePool: '₹30,000',
    iconName: 'Cpu'
  },
  {
    id: 'gaming-arena',
    title: 'NEXUS CLASH (E-SPORTS)',
    category: 'Non-Technical',
    time: '10:00 AM - 05:00 PM',
    location: 'E-Sports Hub, Block C',
    description: 'High-octane gaming tournament featuring Valorant, BGMI, and FIFA 26.',
    prizePool: '₹40,000',
    iconName: 'Gamepad2'
  }
];

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventsModal: React.FC<EventsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'Technical' | 'Flagship' | 'Non-Technical'>('all');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    selectedEvents: ['code-blitz']
  });

  const filteredEvents = EVENTS_DATA.filter(ev => activeTab === 'all' || ev.category === activeTab);

  const handleCheckbox = (eventId: string) => {
    setFormData(prev => {
      const exists = prev.selectedEvents.includes(eventId);
      if (exists) {
        return { ...prev, selectedEvents: prev.selectedEvents.filter(id => id !== eventId) };
      } else {
        return { ...prev, selectedEvents: [...prev.selectedEvents, eventId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop with Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85"
          />

          {/* Modal Container with Blur-In & Scale-Up Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.92, y: 15, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950/95 border border-cyan-500/40 rounded-xl shadow-[0_0_60px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden text-white backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <div>
                  <h2 className="font-oswald text-2xl tracking-wider text-cyan-300">NEXORA 2K26 EVENTS</h2>
                  <p className="text-xs text-neutral-400 font-sans">National Level Technical Symposium • Hindusthan Trust</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {!showRegisterForm ? (
                  <motion.div
                    key="events-list"
                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="space-y-6"
                  >
                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                      <div className="flex gap-2">
                        {(['all', 'Technical', 'Flagship', 'Non-Technical'] as const).map(tab => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3.5 py-1.5 text-xs font-oswald tracking-widest uppercase rounded-md transition-all cursor-pointer ${
                              activeTab === tab
                                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <a
                        href={GOOGLE_FORM_REGISTRATION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 text-xs font-oswald tracking-widest uppercase bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-md shadow-[0_0_15px_rgba(225,29,72,0.4)] transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Register Now ↗
                      </a>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredEvents.map(event => (
                        <div
                          key={event.id}
                          className="bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/50 p-5 rounded-lg transition-all group hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/60 rounded">
                                {event.category}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-amber-400 font-mono font-semibold">
                                <Trophy className="w-3.5 h-3.5" /> {event.prizePool}
                              </span>
                            </div>

                            <h3 className="font-oswald text-lg tracking-wide text-white group-hover:text-cyan-300 transition-colors mb-2">
                              {event.title}
                            </h3>

                            <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
                              {event.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-neutral-800/80 flex flex-col gap-1.5 text-[11px] text-neutral-400 font-sans">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-red-400" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  /* Registration Form with Blur-In Scale-Up */
                  <motion.div
                    key="register-form"
                    initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-xl mx-auto space-y-6 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => { setShowRegisterForm(false); setSubmitted(false); }}
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono cursor-pointer"
                      >
                        ← Back to events list
                      </button>
                      <span className="text-xs text-neutral-400 font-mono">NEXORA 2K26 REGISTRATION</span>
                    </div>

                    {submitted ? (
                      <motion.div
                        initial={{ scale: 0.88, opacity: 0, filter: 'blur(8px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-neutral-900 border border-cyan-500/50 p-8 rounded-xl text-center space-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                      >
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="font-oswald text-2xl tracking-wider text-white">REGISTRATION CONFIRMED!</h3>
                        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                          Thank you <strong className="text-cyan-300">{formData.fullName}</strong>. A confirmation pass with event instructions has been dispatched to <span className="text-cyan-300">{formData.email}</span>.
                        </p>
                        <button
                          onClick={() => { setSubmitted(false); setShowRegisterForm(false); }}
                          className="px-6 py-2 bg-cyan-500 text-black font-oswald font-bold text-sm tracking-wider uppercase rounded hover:bg-cyan-400 transition-colors cursor-pointer"
                        >
                          Return to Events
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-xl space-y-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <h3 className="font-oswald text-xl tracking-wider text-cyan-300 border-b border-neutral-800 pb-2 flex items-center justify-between">
                          <span>SYMPOSIUM PASS REGISTRATION</span>
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        </h3>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-mono text-neutral-400 mb-1">Full Name</label>
                            <input
                              required
                              type="text"
                              value={formData.fullName}
                              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="John Doe"
                              className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-mono text-neutral-400 mb-1">Email Address</label>
                              <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@college.edu"
                                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono text-neutral-400 mb-1">Phone Number</label>
                              <input
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+91 9876543210"
                                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-mono text-neutral-400 mb-1">College Name</label>
                              <input
                                required
                                type="text"
                                value={formData.college}
                                onChange={e => setFormData({ ...formData, college: e.target.value })}
                                placeholder="Hindusthan Institute of Technology"
                                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono text-neutral-400 mb-1">Department</label>
                              <input
                                required
                                type="text"
                                value={formData.department}
                                onChange={e => setFormData({ ...formData, department: e.target.value })}
                                placeholder="CSE / IT / AI-DS"
                                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-neutral-400 mb-2">Select Participating Events</label>
                            <div className="space-y-2 max-h-36 overflow-y-auto p-2 bg-neutral-950 rounded border border-neutral-800">
                              {EVENTS_DATA.map(ev => (
                                <label key={ev.id} className="flex items-center gap-2 text-xs text-neutral-300 hover:text-white cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={formData.selectedEvents.includes(ev.id)}
                                    onChange={() => handleCheckbox(ev.id)}
                                    className="accent-cyan-500 rounded"
                                  />
                                  <span className="font-semibold">{ev.title}</span>
                                  <span className="text-[10px] text-neutral-500 font-mono">({ev.category})</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-oswald font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer mt-4"
                        >
                          Submit Registration
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
