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
  Gamepad2,
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
    title: 'THINKSPHERE 2026',
    tagline: 'Think • Research • Present • Inspire',
    category: 'Technical',
    accentColor: 'cyan',
    time: '2–3 Hours',
    duration: '2–3 HOURS',
    description:
      'ThinkSphere 2026 is an Inter-Collegiate Technical Paper Presentation that provides students with an opportunity to explore emerging technologies, present innovative research ideas, and showcase their technical knowledge and creativity.',
    overview:
      'ThinkSphere 2026 is an Inter-Collegiate Technical Paper Presentation providing students with an opportunity to explore emerging technologies, present innovative research ideas, and showcase technical knowledge and creativity before an expert jury panel. Open Theme: Participants are free to present research papers on any emerging technology or computer-science-related topic.',
    formatDetails: [
      { label: 'Team Size', value: 'Max 2 Members' },
      { label: 'Duration', value: '2–3 Hours' },
      { label: 'Presentation', value: '6 Minutes' },
      { label: 'Q&A Defense', value: '2 Minutes' },
    ],
    rounds: [
      {
        stageBadge: 'PRESENTATION & DEFENSE',
        title: 'Technical Presentation & Defense',
        duration: '6 Mins Pres + 2 Mins Q&A',
        description:
          'Participants must clearly explain their research topic, technical approach, innovation, applications, and expected outcomes within the allotted time, followed by an interactive jury defense.',
        keyPoints: [
          'Open Theme: Emerging technology or computer-science-related topics',
          'Presentation: 6 Minutes | Interactive Q&A: 2 Minutes',
          'Clearly explain research topic, technical approach, innovation, applications & expected outcomes',
          'Eligibility: Students from any college and all academic years (Max 2 members per team)',
        ],
      },
      {
        stageBadge: 'ABSTRACT SUBMISSION & SCREENING',
        title: 'Abstract Submission & Selection',
        duration: 'Pre-Event Screening',
        description:
          'Participants must submit an abstract after registration. Submitted abstracts are thoroughly screened and evaluated by the expert committee.',
        keyPoints: [
          'Evaluated on Innovation, Technical Relevance, Problem Statement, Solution & Applicability',
          'Selected participants/teams informed through email to proceed to final presentation',
        ],
      },
    ],
    evaluation: {
      title: 'Abstract & Presentation Evaluation',
      description:
        'Participants and abstracts will be evaluated on technical depth, novelty, structured slide presentation, confidence, and Q&A defense.',
      focusPoints: [
        'Innovation & Originality',
        'Technical Relevance to Emerging Technologies',
        'Problem Statement & Proposed Solution Clarity',
        'Presentation Delivery (6 Mins) & Slide Quality',
        'Q&A Defense (2 Mins) & Practical Applicability',
      ],
    },
    requirements: [
      'Students from any college and all academic years are eligible.',
      'Team participation allowed (Maximum 2 members per team).',
      'Submit abstract within the specified deadline after registration.',
      'Prepare PPT presentation based on the submitted abstract.',
      'Bring presentation slides in standard PPT/PDF format.',
    ],
    rules: [
      'Participants must submit their abstract within the specified deadline.',
      'Submitted abstracts will be screened by the evaluation committee.',
      'Only shortlisted participants/teams will proceed to the final PPT presentation.',
      'Participants must prepare their PPT based on the submitted abstract.',
      'Participants must strictly adhere to the prescribed presentation (6 mins) and Q&A (2 mins) time limits.',
      "The judges' and organizing committee's decisions will be final.",
    ],
    slogan: 'THINK. RESEARCH. PRESENT. INSPIRE. • ONE IDEA. ONE PRESENTATION. INFINITE POSSIBILITIES.',
  },

  'code-knockout': {
    id: 'code-knockout',
    code: '03',
    title: 'CODE KNOCKOUT 2026',
    tagline: 'Think Fast • Code Smart • Conquer the Challenge',
    category: 'Technical',
    accentColor: 'cyan',
    time: '2 Hours',
    duration: '2 HOURS',
    description:
      'CODE KNOCKOUT 2026 is a fast-paced competitive coding challenge designed to test participants\' programming skills, logical thinking, problem-solving ability, coding efficiency, and accuracy.',
    overview:
      'CODE KNOCKOUT 2026 is a fast-paced competitive coding challenge on HackerRank designed to test participants\' programming skills, logical thinking, problem-solving ability, coding efficiency, and accuracy.',
    formatDetails: [
      { label: 'Duration', value: '2 Hours' },
      { label: 'Platform', value: 'HackerRank' },
      { label: 'Participation', value: 'Individual' },
      { label: 'Total Score', value: '100 Marks' },
    ],
    rounds: [
      {
        roundNumber: 1,
        stageBadge: 'ROUND 1 — CODING CHALLENGE',
        title: 'Batch Coding Challenge',
        duration: '1 Hour / Batch',
        description:
          'The participants will be divided into two batches based on total registrations (Batch 1: 10:00 AM – 11:00 AM, Batch 2: 11:00 AM – 12:00 PM). Participants solve programming problems on HackerRank.',
        keyPoints: [
          'Batch 1: 10:00 AM – 11:00 AM | Batch 2: 11:00 AM – 12:00 PM',
          'Tests programming fundamentals, logical thinking, problem-solving, algorithms & coding efficiency',
          'Top-performing participants from both batches shortlisted for the Final Round',
        ],
      },
      {
        roundNumber: 2,
        stageBadge: 'ROUND 2 — FINAL SHOWDOWN',
        title: 'Final Showdown',
        duration: '1 Hour (2:00 PM – 3:00 PM)',
        description:
          'Shortlisted participants from Batch 1 and Batch 2 will compete in the Final Showdown with advanced, challenging programming and problem-solving tasks.',
        keyPoints: [
          'Time: 2:00 PM – 3:00 PM',
          'Challenging algorithms, edge-cases & optimization',
          'Final podium ranking: Winner → 1st Runner-up → 2nd Runner-up',
        ],
      },
    ],
    evaluation: {
      title: 'Evaluation Criteria (Total: 100 Marks)',
      description:
        'Automated scoring on HackerRank combined with jury validation based on test case accuracy, runtime efficiency, logic, and code structure.',
      criteriaTable: [
        { criteria: 'Correctness / Test Cases', marks: 40 },
        { criteria: 'Problem Solving & Logic', marks: 20 },
        { criteria: 'Code Efficiency', marks: 15 },
        { criteria: 'Time Management', marks: 15 },
        { criteria: 'Code Quality', marks: 10 },
        { criteria: 'TOTAL SCORE', marks: 100 },
      ],
      focusPoints: [
        'Correctness / Test Cases (40 Marks)',
        'Problem Solving & Logic (20 Marks)',
        'Code Efficiency (15 Marks)',
        'Time Management (15 Marks)',
        'Code Quality (10 Marks)',
      ],
    },
    requirements: [
      'Individual participation only.',
      'Participants must carry their valid College ID.',
      'Participants must report before their allotted batch time.',
      'All solutions must be completed within the allotted time on HackerRank.',
      'Participants will use HackerRank for code submission, automatic test-case evaluation, and live ranking.',
    ],
    rules: [
      'Copying or sharing code is strictly prohibited.',
      'Unauthorized external assistance is not permitted.',
      'Batch 1 and Batch 2 evaluated separately; tie-breaker based on correctness and timestamp.',
      'Participants must follow all instructions given by the organizers.',
      'Any confirmed malpractice may result in immediate disqualification.',
      'The decision of the judges and organizing committee will be final and binding.',
    ],
    slogan: 'THINK FAST. CODE SMART. CONQUER THE CHALLENGE.',
  },

  'design-mirror': {
    id: 'design-mirror',
    code: '04',
    title: 'DESIGN MIRROR',
    tagline: 'Think • Design • Adapt • Experience',
    category: 'Technical',
    accentColor: 'cyan',
    time: '10:00 AM – 12:30 PM',
    duration: '2–2.5 HOURS',
    description:
      'Design Mirror is a fast-paced UI/UX Design Challenge where participants transform a given real-world problem statement into a creative, user-focused digital solution. Participants will plan, design, adapt to a surprise requirement, and present their final solution within the given time.',
    overview:
      'Design Mirror is a fast-paced UI/UX Design Challenge where participants transform a given real-world problem statement into a creative, user-focused digital solution. Participants will plan, design, adapt to a surprise requirement, and present their final solution within the given time.',
    formatDetails: [
      { label: 'Duration', value: 'Approx. 2–2.5 Hours' },
      { label: 'Team Size', value: 'Max 2 Members / Team' },
      { label: 'Date', value: '16 September 2026' },
      { label: 'Time', value: '10:00 AM – 12:30 PM' },
    ],
    rounds: [
      {
        roundNumber: 1,
        stageBadge: 'ROUND 1 — PROBLEM & DESIGN',
        title: 'Problem & Design',
        duration: '50 Minutes',
        description:
          'A unique real-world problem statement will be given to each team at the beginning of the challenge. Teams must understand the problem, identify the target users, brainstorm a suitable solution, and begin designing their UI/UX solution.',
        keyPoints: [
          'Unique real-world problem statement given to each team at start',
          'Identify target users, brainstorm architecture & solution design',
          'Participants may use provided starter files, assets, sample data & suitable design/dev tools',
        ],
      },
      {
        stageBadge: 'MID-CHALLENGE — SURPRISE REQUIREMENT',
        title: 'Surprise Requirement',
        duration: '5 Minutes',
        description:
          "A surprise client requirement will be revealed in the middle of the challenge. Teams must understand the new requirement and adapt their existing solution accordingly. The surprise task will be related to the original problem statement and will test the team's adaptability and problem-solving ability.",
        keyPoints: [
          'Surprise client requirement revealed mid-challenge',
          "Related to original problem statement to test agility & adaptability",
          'Must be thoughtfully integrated into final workflow and UI',
        ],
      },
      {
        roundNumber: 2,
        stageBadge: 'ROUND 2 — ADAPT & COMPLETE',
        title: 'Adapt & Complete',
        duration: '65 Minutes',
        description:
          'Teams will continue developing and refining their solution based on the original problem and the newly introduced requirement.',
        keyPoints: [
          'User experience & Visual design aesthetics',
          'Usability, Creativity & Problem solving',
          'Responsive design & interactive component states',
          'Successful integration of the surprise requirement',
        ],
      },
    ],
    evaluation: {
      title: 'Final Evaluation — Design Showcase',
      description:
        'At the end of the challenge, each team will submit and present their completed solution before the judges. Teams will briefly explain problem understanding, design approach, key features, user flow, and response to the surprise requirement.',
      focusPoints: [
        'Creative & User-Focused UI/UX Solution',
        'Intuitive User Flow & Usability',
        'Successful Adaptation to Surprise Requirement',
        'Visual Design & Responsive Polish',
      ],
    },
    requirements: [
      'Maximum 2 members per team.',
      'Participants should bring their own laptops.',
      'Starter files, assets and sample resources may be provided.',
      'Participants may use suitable design and development tools.',
      'Teams should be prepared to demonstrate their completed solution.',
    ],
    rules: [
      'The problem statement will be revealed only at the start of the event.',
      'The surprise requirement will be revealed during the challenge.',
      'All design and development work must be completed within the allotted time.',
      'Teams must submit their final solution before the deadline.',
      'Teams must be ready to present their solution to the judges.',
      'The surprise requirement must be incorporated into the final solution.',
      "The judges' and organizing committee's decisions will be final.",
      'Any violation of the event rules may result in disqualification.',
    ],
    slogan: 'THINK. DESIGN. ADAPT. EXPERIENCE.',
  },

  'project-expo': {
    id: 'project-expo',
    code: '05',
    title: 'PROJECTS EXPO 2026',
    tagline: 'Showcase • Innovate • Inspire',
    category: 'Technical',
    accentColor: 'cyan',
    time: 'Full Day Exhibition',
    duration: 'FULL DAY',
    description:
      'Projects Expo is an exhibition where participants present their innovative projects, working models, software solutions, and technical ideas. Participants will get an opportunity to demonstrate their projects before judges and showcase their creativity, technical knowledge, practical application, and future potential.',
    overview:
      'Projects Expo is an exhibition where participants present their innovative projects, working models, software solutions, and technical ideas. Participants display their projects at allotted tables, demonstrate their working, and answer technical questions from the judges.',
    formatDetails: [
      { label: 'Participation', value: 'Individual or Team' },
      { label: 'Max Team Size', value: '3 Members' },
      { label: 'Evaluation', value: 'Single Round' },
      { label: 'Total Marks', value: '100 Marks' },
    ],
    rounds: [
      {
        stageBadge: 'PROJECT PRESENTATION & DEMONSTRATION',
        title: 'Project Presentation & Demonstration',
        duration: 'Allotted Time per Team',
        description:
          'Participants will display their projects at their allotted tables and explain the project, demonstrate its working, and answer questions from the judges.',
        keyPoints: [
          'Problem Statement & Proposed Solution',
          'Technology Used & Working Principle',
          'Live Project Demonstration & Practical Applications',
          'Future Scope & Technical Defense',
        ],
      },
    ],
    evaluation: {
      title: 'Evaluation Criteria (Total: 100 Marks)',
      description:
        'Projects will be evaluated in a single round based on innovation, technical implementation, practical working demonstration, problem solving, and future scalability.',
      criteriaTable: [
        { criteria: 'Innovation & Originality', marks: 20 },
        { criteria: 'Technical Implementation', marks: 20 },
        { criteria: 'Working Demonstration', marks: 20 },
        { criteria: 'Practical Application / Problem Solving', marks: 15 },
        { criteria: 'Presentation & Explanation', marks: 15 },
        { criteria: 'Future Scope', marks: 10 },
        { criteria: 'TOTAL SCORE', marks: 100 },
      ],
      focusPoints: [
        'Innovation & Originality (20)',
        'Technical Implementation (20)',
        'Working Demonstration (20)',
        'Practical Application / Problem Solving (15)',
        'Presentation & Explanation (15)',
        'Future Scope (10)',
      ],
    },
    requirements: [
      'Individual participation or teams of up to 3 members are allowed.',
      'Participants may use a laptop for software/project demonstrations.',
      'Participants must bring their own project, hardware, components, cables, and required equipment.',
      'A PPT is recommended for project explanation (preferably 5–8 slides).',
      'Participants should keep a backup of their project/demo if possible.',
    ],
    rules: [
      'Each team can present one project.',
      "Participants must be able to explain their project's implementation and contribution.",
      'Projects should be original/student-developed or properly acknowledge external resources used.',
      'All project-specific equipment must be brought by the participants.',
      'Unsafe demonstrations, hazardous materials, weapons, explosives, or dangerous equipment are strictly prohibited.',
      'Participants must complete their setup within the time provided by the organizers.',
      'Participants must maintain discipline and cleanliness at the venue.',
      'The judging will be conducted in one round.',
      "Judges' and organizing committee's decisions will be final.",
      'Violation of the rules may result in disqualification.',
    ],
    slogan: 'BRING YOUR IDEA. SHOW YOUR PROJECT. MAKE AN IMPACT.',
  },

  'shortfilm-fest': {
    id: 'shortfilm-fest',
    code: '01',
    title: 'SHORTFILM FEST',
    tagline: 'Create • Capture • Inspire',
    category: 'Non-Technical',
    accentColor: 'red',
    time: '2 Hours',
    duration: '2 HOURS',
    description:
      'ShortFilm Fest is a creative filmmaking challenge where participants showcase their storytelling, creativity, and filmmaking skills through original short films. Participants can explore different genres and themes while presenting their unique perspectives through the medium of cinema.',
    overview:
      'ShortFilm Fest is a creative filmmaking challenge where participants showcase their storytelling, creativity, and filmmaking skills through original short films. Participants can explore different genres and themes while presenting their unique perspectives through the medium of cinema.',
    formatDetails: [
      { label: 'Duration', value: '2 Hours' },
      { label: 'Event Type', value: 'Screening & Jury Review' },
      { label: 'Participation', value: 'Individual or Team' },
      { label: 'Format', value: 'Original Short Film' },
    ],
    rounds: [
      {
        stageBadge: 'ROUND 1 — FILM SCREENING',
        title: 'Film Screening & Presentation',
        duration: 'Allotted Screening Time',
        description:
          'Participants will present their original short films before the judges and audience. Films may be based on different genres or themes, including social issues, comedy, thriller, drama, inspirational stories, and other creative concepts.',
        keyPoints: [
          'Original short film screening before jury & audience',
          'Open genres: Social issues, comedy, thriller, drama, inspirational stories & creative concepts',
          'Direct screening followed by jury interaction & review',
        ],
      },
    ],
    evaluation: {
      title: 'Final Evaluation — Film Showcase',
      description:
        'At the end of the event, participating films will be reviewed based on their creative execution, storytelling, technical aspects, and overall audience impact. The focus is on presenting an original, creative, technically engaging, and impactful short film.',
      focusPoints: [
        'Concept and Originality',
        'Storytelling & Narrative Flow',
        'Direction & Cinematography',
        'Technical Quality & Sound Design',
        'Creativity & Unique Perspective',
        'Overall Impact on Audience',
      ],
    },
    requirements: [
      'Participants must present an original short film.',
      'Films can explore different genres and themes.',
      'Participants should be prepared to showcase their film before the judges.',
      'The film should demonstrate creativity and effective storytelling.',
      'High-quality video file format (MP4/MKV) submitted prior to screening.',
    ],
    rules: [
      'The short film must be presented within the allotted event time.',
      'Participants must be ready for screening and evaluation.',
      'Content must be original and adhere to ethical standards.',
      "The judges' and organizing committee's decisions will be final.",
      'Any violation of the event rules may result in disqualification.',
    ],
    slogan: 'CREATE. CAPTURE. INSPIRE.',
  },

  'meme-marathon': {
    id: 'meme-marathon',
    code: '02',
    title: 'MEME MARATHON',
    tagline: 'Think Fast • Create Smart • Meme Hard',
    category: 'Non-Technical',
    accentColor: 'red',
    time: '2 Hours',
    duration: '2 HOURS',
    description:
      'Meme Marathon is a fun and engaging creative challenge where participants showcase their wit, humor, creativity, and originality by creating memes based on a given theme or topic.',
    overview:
      'Meme Marathon is a fun and engaging creative challenge where participants showcase their wit, humor, creativity, and originality by creating memes based on a given theme or topic across rapid elimination rounds.',
    formatDetails: [
      { label: 'Duration', value: '2 Hours' },
      { label: 'Rounds', value: '3 Progressive Rounds' },
      { label: 'Format', value: 'Round-by-Round Elimination' },
      { label: 'Tools', value: 'Editing & Design Tools' },
    ],
    rounds: [
      {
        roundNumber: 1,
        stageBadge: 'ROUND 1 — MEME CREATION',
        title: 'Meme Creation — Preliminary Round',
        duration: 'Allotted Round Time',
        description:
          'A theme or topic will be provided to the participants at the beginning of the event. Participants must understand the given theme and create original memes that are entertaining, creative, and relevant to the topic. After the round, teams will be evaluated and selected teams will advance to the next round.',
        keyPoints: [
          'Theme / topic revealed at commencement of round',
          'Create entertaining, creative, and highly relevant original memes',
          'Teams evaluated; top performers shortlisted for Round 2',
        ],
      },
      {
        roundNumber: 2,
        stageBadge: 'ROUND 2 — MEME CREATION',
        title: 'Meme Creation — Intermediate Challenge',
        duration: 'Allotted Round Time',
        description:
          'The same event format will continue with a new challenge or theme. Participants will create memes using their creativity, humor, and knowledge of trending meme formats. Teams will be evaluated at the end of the round, and selected teams will advance further.',
        keyPoints: [
          'New surprise topic / trending format challenge revealed',
          'Leverage creative humor, pop culture & viral meme formats',
          'Shortlisted teams qualify for the Grand Final Challenge',
        ],
      },
      {
        roundNumber: 3,
        stageBadge: 'ROUND 3 — FINAL MEME CHALLENGE',
        title: 'Final Meme Challenge',
        duration: 'Final Round Time',
        description:
          'The remaining teams will compete in the final round using the same meme-creation format. Participants will create their final memes and showcase their creativity, originality, humor, and relevance to the given theme. Teams will be evaluated to determine the winners of the Meme Marathon.',
        keyPoints: [
          'Ultimate creative showdown among top finalists',
          'Showcase maximum originality, humor, and punchline impact',
          'Evaluated to crown the Meme Marathon Champions',
        ],
      },
    ],
    evaluation: {
      title: 'Evaluation Criteria',
      description:
        'Memes will be evaluated in every round based on originality, relevance to the theme, creativity, humor, relatability, and overall impact.',
      focusPoints: [
        'Originality',
        'Relevance to the Theme',
        'Creativity & Visual Appeal',
        'Humor and Relatability',
        'Overall Impact & Virality',
      ],
    },
    requirements: [
      'Participants must create original memes based on the given theme or topic.',
      'Participants may use suitable creative and editing tools (Smartphones/Laptops).',
      'All work must be completed within the allotted time for each round.',
      'Participants must be ready to present their memes for evaluation.',
    ],
    rules: [
      'The theme or topic will be revealed at the beginning of each round.',
      'The same meme-creation format will be followed in every round.',
      'Teams will be evaluated after each round and eliminated based on performance.',
      'Only shortlisted teams will proceed to the next round.',
      'Participants must complete their work within the allotted time.',
      "The judges' and organizing committee's decisions will be final.",
      'Any violation of the event rules or offensive content may result in disqualification.',
    ],
    slogan: 'THINK FAST. CREATE SMART. MEME HARD.',
  },

  'ipl-auction': {
    id: 'ipl-auction',
    code: '03',
    title: 'IPL AUCTION GAME',
    tagline: 'Think Fast • Bid Smart • Build Your Team',
    category: 'Non-Technical',
    accentColor: 'amber',
    time: 'Approx. 1.5–2 Hours',
    duration: '1.5–2 HOURS',
    description:
      'IPL Auction Game is a fast-paced strategic bidding challenge where pre-registered participants compete in teams to build the strongest possible IPL squad within a fixed budget.',
    overview:
      'IPL Auction Game is a fast-paced strategic bidding challenge where pre-registered participants compete in teams to build the strongest possible IPL squad within a fixed budget.',
    formatDetails: [
      { label: 'Duration', value: 'Approx. 1.5–2 Hours' },
      { label: 'Team Formation', value: 'Formed via Pre-registration' },
      { label: 'Format', value: 'Single Round Auction' },
      { label: 'Evaluation', value: 'Team & Playing XI Showcase' },
    ],
    rounds: [
      {
        stageBadge: 'SINGLE ROUND — IPL AUCTION',
        title: 'Single Round — Live IPL Auction',
        duration: '1.5–2 Hours',
        description:
          'Each team will be assigned an IPL franchise and provided with a fixed auction purse. A selected pool of IPL players will be presented for auction. Teams must compete through live bidding and strategically build their squad while managing their limited budget.',
        keyPoints: [
          '🏏 Batsmen & Wicketkeepers acquisition',
          '⚡ Fast Bowlers & 🌀 Spinners selection',
          '🔄 All-rounders & 🌍 Overseas Players allocation',
          '💰 Purse Management & 📋 Squad Balance optimization',
        ],
      },
      {
        stageBadge: 'FINAL EVALUATION — TEAM SHOWCASE',
        title: 'Final Evaluation — Team Showcase',
        duration: 'Judges Defense & Review',
        description:
          'At the end of the auction, each team will present its final squad and proposed Playing XI to the judges. Teams will briefly explain their key purchases, auction strategy, budget utilisation, and squad combination.',
        keyPoints: [
          'Present final squad and proposed Playing XI combination',
          'Defend key purchases, bidding tactics & budget allocation',
          'Winning team determined on strength, balance, strategy, and overall value',
        ],
      },
    ],
    evaluation: {
      title: 'Evaluation Criteria',
      description:
        'The winning team will be determined based on the strength, balance, strategy, and value of the squad they have built.',
      focusPoints: [
        '💰 Budget Management',
        '🧠 Auction Strategy',
        '🏏 Squad Balance',
        '⭐ Player Selection',
        '🌍 Overseas Player Utilisation',
        '📋 Playing XI Combination',
        '🎯 Overall Team Strength',
      ],
    },
    requirements: [
      'Teams will be formed by the organizing committee from pre-registered participants.',
      'Each team will be assigned an IPL franchise.',
      'A fixed auction purse and player pool will be provided.',
      'Teams must follow the prescribed auction rules.',
      'All purchases must remain within the allocated purse.',
    ],
    rules: [
      'The player pool and auction rules will be provided before the event.',
      'The event will be conducted as a single auction round.',
      'Teams must manage their purse throughout the auction.',
      'Squad-size and player-category restrictions must be followed.',
      "The organizing committee's decisions will be final.",
      'Any violation of the event rules may result in disqualification.',
    ],
    slogan: 'THINK FAST. BID SMART. BUILD YOUR CHAMPIONS. 🏆🏏',
  },

  'efootball-tournament': {
    id: 'efootball-tournament',
    code: '04',
    title: 'eFOOTBALL TOURNAMENT',
    tagline: 'PLAY SMART • ATTACK HARD • BE THE CHAMPION 🏆⚽',
    category: 'Non-Technical',
    accentColor: 'amber',
    time: 'Approx. 2–3 Hours',
    duration: '2–3 HOURS',
    description:
      'The eFootball Tournament is a fast-paced competitive gaming challenge where pre-registered participants compete against each other in intense eFootball matches. Players will battle through a structured tournament format, using their skills, tactics, and game knowledge to progress through each stage and become the ultimate champion.',
    overview:
      'The eFootball Tournament is a fast-paced competitive gaming challenge where pre-registered participants compete against each other in intense eFootball matches. Players will battle through a structured tournament format, using their skills, tactics, and game knowledge to progress through each stage and become the ultimate champion.',
    formatDetails: [
      { label: 'Duration', value: 'Approx. 2–3 Hours' },
      { label: 'Participants', value: 'Pre-registered Players' },
      { label: 'Format', value: 'Knockout / Elimination' },
      { label: 'Discipline', value: 'Mobile / Console eFootball' },
    ],
    rounds: [
      {
        stageBadge: 'TOURNAMENT — eFOOTBALL MATCHES',
        title: 'Tournament Knockout Matches',
        duration: 'Match Timers as Scheduled',
        description:
          'Participants will compete in head-to-head eFootball matches according to prescribed tournament rules. Players must use their tactical skills, attacking ability, defensive strategies, and game knowledge to defeat opponents and advance.',
        keyPoints: [
          '⚽ Attacking Strategy, Finishing & Passing precision',
          '🛡️ Defensive Skills & Tactical Formations',
          '🧠 Formation & Player Selection adjustments',
          '⏱️ Time Management, Match Performance & Winning Mentality',
        ],
      },
      {
        stageBadge: 'FINAL STAGE — CHAMPIONSHIP MATCH',
        title: 'Championship Match',
        duration: 'Grand Final Match',
        description:
          'The players who successfully progress through the knockout stages will advance to the final. The finalists will compete in the Championship Match to determine the tournament winner according to official tournament rules.',
        keyPoints: [
          'High-intensity championship title decider',
          'Evaluated strictly on final match result under official tournament rules',
        ],
      },
    ],
    evaluation: {
      title: 'Evaluation & Gameplay Focus',
      description:
        'Every match matters. One mistake can change the game, so players must stay focused and make smart decisions throughout the tournament.',
      focusPoints: [
        '⚽ Match Performance & Scoreline',
        '🧠 Tactical Strategy & Formation Management',
        '🎯 Attacking & Finishing Accuracy',
        '🛡️ Defensive Performance',
        '🔥 Consistency & Overall Gameplay',
      ],
    },
    requirements: [
      'Participants must register before the tournament.',
      'Players will be paired according to the tournament draw.',
      'The tournament will follow a knockout/elimination format.',
      'Each player must follow the prescribed match settings.',
      'Players must use only the teams/players permitted by the organizers.',
      'Participants must report to the gaming area before their scheduled match.',
      'All matches must be completed within the allotted time.',
      'Players must follow fair-play rules throughout the tournament.',
    ],
    rules: [
      'The tournament rules and match settings will be announced before the event.',
      'The tournament will be conducted according to the official match schedule.',
      'Players must be ready when their match is called.',
      '🚫 Smart Assist must be turned OFF. All participants must play without Smart Assist enabled.',
      'Any player found using Smart Assist may be subject to disqualification.',
      'Any form of cheating, unfair play, or intentional disruption may result in disqualification.',
      'Players must not interfere with their opponent’s device or gameplay.',
      'In case of technical issues, the decision of the organizing committee will be final.',
      'The organizing committee reserves the right to make decisions regarding disputes and rule violations.',
      'Any violation of the tournament rules may result in disqualification.',
    ],
    slogan: 'PLAY SMART. ATTACK HARD. WIN THE MATCH. 🏆⚽',
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
    <div className="relative w-full text-white selection:bg-cyan-500 selection:text-black py-4 sm:py-6 px-3 sm:px-6 max-w-7xl mx-auto flex flex-col justify-between">
      {/* SECTION HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-20 flex flex-col md:flex-row md:items-end justify-between border-b border-cyan-500/30 pb-4 mb-8 sm:mb-12 gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase">
            <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span>NEXORA 2K26 // SYMPOSIUM SCHEDULE</span>
          </div>
          <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl tracking-wider text-white">
            EXPLORE <span className="text-cyan-400">EVENTS</span>
          </h1>
        </div>

        {/* Back to Hero quick link */}
        {onBackToHero && (
          <button
            onClick={onBackToHero}
            className="self-start md:self-auto px-4 py-1.5 text-xs font-mono tracking-widest text-neutral-400 hover:text-cyan-300 border border-neutral-800 hover:border-cyan-500/60 rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>↑ BACK TO TOP</span>
          </button>
        )}
      </motion.header>

      {/* MAIN CONTAINER */}
      <main className="relative z-20 space-y-12 sm:space-y-16">
        {/* ================= CATEGORY 01: TECHNICAL SESSIONS (CYAN) ================= */}
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

          {/* Cards Grid (5 Columns on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* 01 THINKSPHERE 2026 */}
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
                    THINKSPHERE 2026
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Inter-Collegiate Technical Paper Presentation exploring emerging technologies, innovative research ideas, and technical creativity.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>2–3 HOURS</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider group-hover:text-cyan-300">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 02 PROMPT 2 PRODUCT */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('prompt-2-product')}
              className="bg-black/80 backdrop-blur-md border border-cyan-500/60 hover:border-cyan-400 rounded-lg p-3 sm:p-4 flex flex-col justify-between space-y-3 shadow-[0_0_12px_rgba(6,182,212,0.12)] hover:shadow-[0_0_24px_rgba(6,182,212,0.3)] transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xs inline-block">
                    02
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    DETAILS <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <div className="text-center space-y-2 pt-1">
                  <Code2 className="w-8 h-8 text-cyan-400 mx-auto stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                    PROMPT 2 PRODUCT
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Build a creative and functional application using AI-powered coding tools within the given time. Showcase innovation, speed, and problem-solving skills.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>2-3 HOURS</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider group-hover:text-cyan-300">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 03 CODE KNOCKOUT 2026 */}
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
                    CODE KNOCKOUT 2026
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Competitive coding challenge on HackerRank testing programming skills, logic, algorithmic efficiency, and accuracy.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>2 HOURS</span>
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
                    Transform a real-world problem into a creative, user-focused UI/UX digital solution, adapt to surprise client requirements, and present your design.
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-cyan-900/40 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>2–2.5 HOURS</span>
                </div>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider group-hover:text-cyan-300">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 05 PROJECTS EXPO 2026 */}
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
                    PROJECTS EXPO 2026
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                    Present your innovative projects, working models, software solutions, and technical ideas before judges to showcase practical application and future potential.
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
            {/* 01 SHORTFILM FEST */}
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
                  Creative filmmaking challenge where participants showcase their storytelling, creativity, and filmmaking skills through original short films across diverse genres.
                </p>
              </div>

              <div className="pt-2 border-t border-red-900/40 flex items-center justify-between text-xs font-mono text-red-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>2 HOURS</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-red-400">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 02 MEME MARATHON */}
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
                  Fun and engaging creative challenge where participants showcase wit, humor, and creativity across 3 progressive elimination rounds based on given themes.
                </p>
              </div>

              <div className="pt-2 border-t border-red-900/40 flex items-center justify-between text-xs font-mono text-red-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>2 HOURS</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-red-400">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 03 IPL AUCTION GAME */}
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
                    IPL AUCTION GAME
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Experience the thrill of team building by strategically bidding for players and assembling the strongest squad within a fixed budget.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between text-xs font-mono text-amber-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>1.5–2 HOURS</span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider group-hover:text-amber-400">
                  VIEW →
                </span>
              </div>
            </motion.div>

            {/* 04 eFOOTBALL TOURNAMENT */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenEventModal('efootball-tournament')}
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
                  <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 stroke-[1.5] group-hover:scale-110 transition-transform" />
                  <h3 className="font-oswald text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase">
                    eFOOTBALL TOURNAMENT
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Fast-paced competitive gaming challenge where pre-registered players compete in head-to-head eFootball knockout matches to become the ultimate champion.
                </p>
              </div>

              <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between text-xs font-mono text-amber-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>2–3 HOURS</span>
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
