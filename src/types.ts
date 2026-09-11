export interface EventItem {
  id: string;
  title: string;
  category: 'Technical' | 'Non-Technical' | 'Workshop' | 'Flagship';
  time: string;
  location: string;
  description: string;
  prizePool: string;
  iconName: string;
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  selectedEvents: string[];
}

export interface EventRound {
  roundNumber?: number;
  stageBadge?: string;
  title: string;
  duration: string;
  description: string;
  keyPoints?: string[];
}

export interface EventDetail {
  id: string;
  code: string;
  title: string;
  tagline?: string;
  category: 'Technical' | 'Non-Technical' | 'Workshop' | 'Flagship';
  accentColor: 'cyan' | 'red' | 'amber';
  time: string;
  duration?: string;
  location?: string;
  description: string;
  overview?: string;
  formatDetails?: { label: string; value: string }[];
  rounds?: EventRound[];
  evaluation?: {
    title: string;
    description: string;
    focusPoints?: string[];
    criteriaTable?: { criteria: string; marks: string | number }[];
  };
  requirements?: string[];
  rules?: string[];
  slogan?: string;
  prizePool?: string;
}
