export interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  createdAt: string;
}

export interface UserProfile {
  age: number;
  income: number;
  location: string;
  occupation: string;
  category: string;
  hasDisability: boolean;
  landOwnership: boolean;
  educationLevel: string;
  familySize: number;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: {
    age?: [number, number];
    income?: number;
    occupation?: string[];
    location?: string[];
    category?: string[];
    hasDisability?: boolean;
    landOwnership?: boolean;
    educationLevel?: string[];
  };
  benefits: string;
  docsRequired: string[];
  applicationLink: string;
  deadline?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  successRate: number;
  processingTime: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  schemes?: Scheme[];
  quickReplies?: string[];
  type?: 'text' | 'scheme' | 'eligibility';
}

export interface EligibilityResult {
  scheme: Scheme;
  eligible: boolean;
  probability: number;
  missingCriteria: string[];
  improvementTips: string[];
}