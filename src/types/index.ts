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

export interface TranslatedString {
  en: string;
  hi: string;
  te: string;
}

export interface Scheme {
  id: string;
  name: TranslatedString;
  description: TranslatedString;
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
  benefits: TranslatedString;
  docsRequired: TranslatedString[];
  applicationLink: string;
  deadline?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  successRate: number;
  processingTime: TranslatedString;
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

export interface GuideStep {
  id: string;
  title: TranslatedString;
  description: TranslatedString;
  content: TranslatedString;
  imageUrl?: string;
  videoUrl?: string;
  tips?: TranslatedString[];
  completed?: boolean;
}

export interface Guide {
  id: string;
  title: TranslatedString;
  description: TranslatedString;
  category: string;
  type: 'video' | 'article' | 'pdf' | 'interactive';
  duration?: string;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  tags: string[];
  videoUrl?: string;
  articleContent?: TranslatedString;
  pdfUrl?: string;
  steps?: GuideStep[];
  views: number;
  likes: number;
  author: string;
  publishedDate: string;
  completionRate?: number;
}