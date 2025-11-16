import { ChatMessage, UserProfile } from '../types';
import { schemes } from '../data/schemes';
import { getRecommendedSchemes } from './eligibilityChecker';

export class ChatbotService {
  private userProfile: UserProfile | null = null;

  setUserProfile(profile: UserProfile) {
    this.userProfile = profile;
  }

  async processMessage(message: string): Promise<ChatMessage> {
    const lowerMessage = message.toLowerCase();
    
    // Quick reply patterns
    const quickReplies = [
      'Show me more schemes',
      'Check my eligibility',
      'Education schemes',
      'Healthcare schemes',
      'Agriculture schemes',
      'Housing schemes',
    ];

    // Enhanced intent detection with more keywords and better matching
    if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'start', 'namaste', 'good morning', 'good afternoon', 'good evening'])) {
      return this.createWelcomeMessage();
    }

    if (this.containsKeywords(lowerMessage, ['help', 'support', 'assistance', 'guide', 'how to', 'what can you do'])) {
      return this.createHelpMessage();
    }

    // Category queries
    if (this.containsKeywords(lowerMessage, ['agriculture', 'farming', 'farmer', 'crop'])) {
      return this.handleCategoryQuery('agriculture');
    }
    if (this.containsKeywords(lowerMessage, ['education', 'scholarship', 'student', 'study'])) {
      return this.handleCategoryQuery('education');
    }
    if (this.containsKeywords(lowerMessage, ['health', 'medical', 'insurance', 'healthcare'])) {
      return this.handleCategoryQuery('healthcare');
    }
    if (this.containsKeywords(lowerMessage, ['house', 'housing', 'home', 'awas'])) {
      return this.handleCategoryQuery('housing');
    }
    if (this.containsKeywords(lowerMessage, ['job', 'employment', 'work', 'skill'])) {
      return this.handleCategoryQuery('employment');
    }

    // General queries
    if (this.containsKeywords(lowerMessage, ['scheme', 'benefit', 'program'])) {
      return this.handleSchemeQuery(lowerMessage);
    }
    if (this.containsKeywords(lowerMessage, ['eligibility', 'eligible', 'qualify'])) {
      return this.handleEligibilityQuery(lowerMessage);
    }
    if (this.containsKeywords(lowerMessage, ['apply', 'application', 'how to apply'])) {
      return this.handleApplicationQuery();
    }
    if (this.containsKeywords(lowerMessage, ['status', 'track', 'progress'])) {
      return this.handleStatusQuery();
    }

    // Specific scheme searches
    if (this.containsKeywords(lowerMessage, ['pm kisan', 'pradhan mantri kisan', 'kisan samman'])) {
      return this.handleSpecificScheme('PM-KISAN');
    }

    if (this.containsKeywords(lowerMessage, ['ayushman', 'pmjay', 'health insurance'])) {
      return this.handleSpecificScheme('PMJAY');
    }

    if (this.containsKeywords(lowerMessage, ['mudra', 'loan', 'business loan'])) {
      return this.handleSpecificScheme('MUDRA');
    }

    if (this.containsKeywords(lowerMessage, ['awas', 'housing', 'pmay'])) {
      return this.handleSpecificScheme('PMAY-U');
    }

    // Default response with recommendations
    return this.createDefaultResponse(quickReplies);
  }

  private containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  private createWelcomeMessage(): ChatMessage {
    const userName = 'there'; // UserProfile doesn't have name property
    return {
      id: Date.now().toString(),
      text: `Namaste ${userName}! 🇮🇳 Welcome to SchemeSeeker - your personal government schemes assistant! 

I can help you with:
• 🌾 Agriculture & Farming schemes
• 🎓 Education & Scholarships  
• 🏥 Healthcare & Insurance
• 🏠 Housing & Construction
• 💼 Employment & Skill Development
• 👩 Women Welfare schemes
• 💰 Finance & Business loans

I have access to 35+ comprehensive government schemes with real-time eligibility checking. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        'Show recommended schemes',
        'Check my eligibility',
        'Popular schemes',
        'Agriculture schemes',
        'Education schemes',
        'Healthcare schemes'
      ],
      type: 'text',
    };
  }

  private createHelpMessage(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: "I can help you with:\n\n• Finding government schemes based on your profile\n• Checking your eligibility for specific schemes\n• Providing details about benefits and requirements\n• Guiding you through application processes\n• Recommending schemes by category\n\nJust ask me about any scheme or category you're interested in!",
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        'Show recommended schemes',
        'Agriculture schemes',
        'Education schemes',
        'Healthcare schemes',
      ],
      type: 'text',
    };
  }

  private handleSchemeQuery(_message: string): ChatMessage {
    const relevantSchemes = this.userProfile 
      ? getRecommendedSchemes(schemes, this.userProfile).slice(0, 5).map(result => result.scheme)
      : schemes.slice(0, 5);

    return {
      id: Date.now().toString(),
      text: this.userProfile 
        ? "Based on your profile, here are the schemes I recommend for you:"
        : "Here are some popular government schemes:",
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: relevantSchemes,
      quickReplies: [
        'Show more schemes',
        'Check eligibility',
        'Agriculture schemes',
        'Education schemes',
      ],
      type: 'scheme',
    };
  }

  private handleEligibilityQuery(_message: string): ChatMessage {
    if (!this.userProfile) {
      return {
        id: Date.now().toString(),
        text: "To check your eligibility, please complete your profile first. Go to your dashboard and fill in your details like age, income, occupation, and location.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        quickReplies: [
          'Show all schemes',
          'Agriculture schemes',
          'Education schemes',
          'Healthcare schemes',
        ],
        type: 'text',
      };
    }

    const eligibilityResults = getRecommendedSchemes(schemes, this.userProfile);
    const eligibleSchemes = eligibilityResults.filter(r => r.eligible);

    return {
      id: Date.now().toString(),
      text: `Great! Based on your profile, you're eligible for ${eligibleSchemes.length} schemes. Here are your top matches:`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: eligibleSchemes.slice(0, 5).map(result => result.scheme),
      quickReplies: [
        'Show more eligible schemes',
        'Check partial matches',
        'Save these schemes',
      ],
      type: 'eligibility',
    };
  }

  private handleCategoryQuery(category: string): ChatMessage {
    const categorySchemes = schemes.filter(s => s.category === category);
    
    return {
      id: Date.now().toString(),
      text: `Here are the ${category} schemes available:`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: categorySchemes.slice(0, 6),
      quickReplies: [
        'Check my eligibility',
        'Show more categories',
        'Save these schemes',
      ],
      type: 'scheme',
    };
  }

  private handleSpecificScheme(schemeId: string): ChatMessage {
    const scheme = schemes.find(s => s.id === schemeId);
    if (!scheme) {
      return this.createDefaultResponse(['Show all schemes', 'Popular schemes']);
    }

    return {
      id: Date.now().toString(),
      text: `📋 **${scheme.name}**\n\n${scheme.description}\n\n**Benefits:** ${scheme.benefits}\n\n**Eligibility:** Age ${scheme.eligibility.age?.[0]}-${scheme.eligibility.age?.[1]} years\n\n**Difficulty:** ${scheme.difficulty}\n**Success Rate:** ${scheme.successRate}%\n**Processing Time:** ${scheme.processingTime}`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: [scheme],
      quickReplies: [
        'Check eligibility',
        'How to apply',
        'Similar schemes',
        'Show more details'
      ],
      type: 'scheme',
    };
  }

  private handleApplicationQuery(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `📝 **How to Apply for Government Schemes**\n\n**Step 1:** Choose your scheme\n• Browse by category or search specific schemes\n• Check eligibility criteria\n\n**Step 2:** Gather documents\n• Aadhaar Card (mandatory for most schemes)\n• Income Certificate\n• Caste Certificate (if applicable)\n• Bank Account details\n• Passport-size photographs\n\n**Step 3:** Apply online\n• Visit the official portal\n• Fill the application form\n• Upload required documents\n• Submit and note application ID\n\n**Step 4:** Track status\n• Use application ID to track progress\n• Check for any additional requirements\n\n💡 **Pro Tip:** Apply early before deadlines and keep all documents ready in digital format!`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        'Document checklist',
        'Track application',
        'Popular schemes',
        'Eligibility check'
      ],
      type: 'text',
    };
  }

  private handleStatusQuery(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `🔍 **Track Your Application Status**\n\n**Common Status Tracking Portals:**\n\n🌾 **Agriculture Schemes:**\n• PM-KISAN: pmkisan.gov.in\n• Soil Health Card: soilhealth.dac.gov.in\n\n🎓 **Education Schemes:**\n• NSP: scholarships.gov.in\n• INSPIRE: online-inspire.gov.in\n\n🏥 **Healthcare:**\n• Ayushman Bharat: pmjay.gov.in\n• PMJJBY: jansuraksha.gov.in\n\n💰 **Finance:**\n• MUDRA: mudra.org.in\n• PMEGP: kviconline.gov.in\n\n**What you need:**\n• Application/Reference number\n• Registered mobile number\n• Aadhaar number\n\n**Typical Processing Times:**\n• Easy schemes: 1-15 days\n• Medium schemes: 15-45 days\n• Complex schemes: 45-90 days`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        'Check eligibility',
        'Apply for schemes',
        'Document help',
        'Contact support'
      ],
      type: 'text',
    };
  }

  private createDefaultResponse(quickReplies: string[]): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `🤔 I'd be happy to help you find relevant government schemes! \n\n**You can ask me about:**\n• Specific schemes (e.g., "Tell me about PM Kisan")\n• Categories (e.g., "Show agriculture schemes")\n• Eligibility (e.g., "Am I eligible for healthcare schemes?")\n• Application process (e.g., "How to apply for MUDRA loan?")\n• Document requirements\n• Application status tracking\n\n**Popular searches:**\n• PM Kisan Samman Nidhi\n• Ayushman Bharat\n• MUDRA Yojana\n• Pradhan Mantri Awas Yojana\n• Scholarship schemes`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: quickReplies.slice(0, 4),
      type: 'text',
    };
  }
}