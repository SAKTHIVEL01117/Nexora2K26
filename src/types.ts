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
