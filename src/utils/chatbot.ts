import { ChatMessage, UserProfile, TranslatedString } from '../types';
import { schemes } from '../data/schemes';
import { getRecommendedSchemes, checkEligibility } from './eligibilityChecker';

/**
 * Comprehensive Chatbot Knowledge Base
 * Handles government scheme queries with intelligent intent detection
 */

interface IntentPattern {
  keywords: string[];
  category: string;
  priority: number;
}

export class ChatbotService {
  private userProfile: UserProfile | null = null;
  private language: string = 'en';

  // Comprehensive intent patterns for better query understanding
  private intentPatterns: IntentPattern[] = [
    // Greetings
    { keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'start', 'begin'], category: 'greeting', priority: 10 },

    // Help & Support
    { keywords: ['help', 'support', 'assistance', 'guide', 'how', 'what can you do', 'features', 'capabilities'], category: 'help', priority: 9 },

    // Agriculture
    { keywords: ['agriculture', 'farming', 'farmer', 'crop', 'kisan', 'kheti', 'krishi', 'soil', 'irrigation', 'tractor', 'seeds'], category: 'agriculture', priority: 8 },

    // Education
    { keywords: ['education', 'scholarship', 'student', 'study', 'school', 'college', 'university', 'course', 'learning', 'exam', 'degree'], category: 'education', priority: 8 },

    // Healthcare
    { keywords: ['health', 'medical', 'hospital', 'doctor', 'medicine', 'treatment', 'insurance', 'healthcare', 'ayushman', 'disease'], category: 'healthcare', priority: 8 },

    // Housing
    { keywords: ['house', 'housing', 'home', 'awas', 'construction', 'building', 'property', 'shelter', 'residence'], category: 'housing', priority: 8 },

    // Employment
    { keywords: ['job', 'employment', 'work', 'skill', 'training', 'career', 'unemployment', 'rozgar', 'business', 'startup'], category: 'employment', priority: 8 },

    // Finance
    { keywords: ['loan', 'finance', 'money', 'bank', 'credit', 'mudra', 'subsidy', 'grant', 'funding'], category: 'finance', priority: 8 },

    // Women Welfare
    { keywords: ['women', 'woman', 'girl', 'female', 'mother', 'maternity', 'pregnancy', 'mahila'], category: 'women', priority: 8 },

    // Pension
    { keywords: ['pension', 'senior citizen', 'old age', 'elderly', 'retirement', 'widow', 'disabled'], category: 'pension', priority: 8 },

    // Eligibility
    { keywords: ['eligibility', 'eligible', 'qualify', 'criteria', 'requirement', 'can i apply', 'am i eligible'], category: 'eligibility', priority: 7 },

    // Application
    { keywords: ['apply', 'application', 'how to apply', 'process', 'procedure', 'steps', 'registration', 'enroll'], category: 'application', priority: 7 },

    // Documents
    { keywords: ['document', 'documents', 'papers', 'certificate', 'proof', 'aadhaar', 'pan', 'income certificate'], category: 'documents', priority: 7 },

    // Status
    { keywords: ['status', 'track', 'progress', 'check status', 'application status', 'where is my'], category: 'status', priority: 7 },

    // General Scheme Query
    { keywords: ['scheme', 'schemes', 'yojana', 'program', 'benefit', 'benefits', 'government scheme'], category: 'schemes', priority: 6 },
  ];

  // Irrelevant query patterns
  private irrelevantPatterns = [
    'weather', 'time', 'date', 'joke', 'story', 'game', 'play', 'music', 'movie', 'food', 'recipe',
    'cricket', 'football', 'sports', 'news', 'politics', 'election', 'celebrity', 'gossip',
    'shopping', 'buy', 'sell', 'price', 'cost', 'market', 'stock', 'share',
    'love', 'relationship', 'dating', 'marriage', 'divorce',
    'religion', 'god', 'prayer', 'temple', 'church', 'mosque',
    'travel', 'tour', 'vacation', 'holiday', 'flight', 'hotel'
  ];

  setUserProfile(profile: UserProfile) {
    this.userProfile = profile;
  }

  setLanguage(lang: string) {
    this.language = lang;
  }

  private getContent(content: TranslatedString | string): string {
    if (typeof content === 'string') return content;
    return content[this.language as keyof TranslatedString] || content.en;
  }

  async processMessage(message: string): Promise<ChatMessage> {
    const lowerMessage = message.toLowerCase().trim();

    // Check for irrelevant queries first
    if (this.isIrrelevantQuery(lowerMessage)) {
      return this.createIrrelevantResponse();
    }

    // Detect intent
    const intent = this.detectIntent(lowerMessage);

    // Route to appropriate handler
    switch (intent) {
      case 'greeting':
        return this.createWelcomeMessage();

      case 'help':
        return this.createHelpMessage();

      case 'agriculture':
        return this.handleCategoryQuery('agriculture', 'Agriculture & Farming');

      case 'education':
        return this.handleCategoryQuery('education', 'Education & Scholarships');

      case 'healthcare':
        return this.handleCategoryQuery('healthcare', 'Healthcare & Medical');

      case 'housing':
        return this.handleCategoryQuery('housing', 'Housing & Construction');

      case 'employment':
        return this.handleCategoryQuery('employment', 'Employment & Skills');

      case 'finance':
        return this.handleFinanceQuery();

      case 'women':
        return this.handleWomenWelfareQuery();

      case 'pension':
        return this.handlePensionQuery();

      case 'eligibility':
        return this.handleEligibilityQuery(lowerMessage);

      case 'application':
        return this.handleApplicationQuery();

      case 'documents':
        return this.handleDocumentsQuery();

      case 'status':
        return this.handleStatusQuery();

      case 'schemes':
        return this.handleSchemeQuery(lowerMessage);

      default:
        // Check for specific scheme mentions
        const specificScheme = this.detectSpecificScheme(lowerMessage);
        if (specificScheme) {
          return this.handleSpecificScheme(specificScheme);
        }

        return this.createDefaultResponse();
    }
  }

  private isIrrelevantQuery(message: string): boolean {
    return this.irrelevantPatterns.some(pattern => message.includes(pattern));
  }

  private detectIntent(message: string): string {
    let bestMatch = { category: 'unknown', priority: 0 };

    for (const pattern of this.intentPatterns) {
      const matchCount = pattern.keywords.filter(keyword => message.includes(keyword)).length;
      if (matchCount > 0 && pattern.priority > bestMatch.priority) {
        bestMatch = { category: pattern.category, priority: pattern.priority };
      }
    }

    return bestMatch.category;
  }

  private detectSpecificScheme(message: string): string | null {
    const schemePatterns: { [key: string]: string[] } = {
      'PM-KISAN': ['pm kisan', 'pradhan mantri kisan', 'kisan samman', 'pm-kisan'],
      'PMJAY': ['ayushman', 'pmjay', 'ayushman bharat', 'health insurance'],
      'MUDRA': ['mudra', 'mudra loan', 'business loan', 'micro loan'],
      'PMAY-U': ['awas', 'pmay', 'pradhan mantri awas', 'housing scheme'],
      'NSP': ['scholarship', 'national scholarship', 'nsp'],
      'PMEGP': ['pmegp', 'employment generation', 'self employment'],
    };

    for (const [schemeId, patterns] of Object.entries(schemePatterns)) {
      if (patterns.some(pattern => message.includes(pattern))) {
        return schemeId;
      }
    }

    return null;
  }

  private createIrrelevantResponse(): ChatMessage {
    const responses = [
      {
        text: `I appreciate your question, but I'm specifically designed to help you with **Government Schemes and Benefits** in India. 🇮🇳\n\n**I can help you with:**\n\n✅ Finding suitable government schemes\n✅ Checking your eligibility\n✅ Understanding application processes\n✅ Tracking application status\n✅ Document requirements\n✅ Scheme benefits and details\n\n**Popular Categories:**\n• 🌾 Agriculture & Farming\n• 🎓 Education & Scholarships\n• 🏥 Healthcare & Insurance\n• 🏠 Housing & Construction\n• 💼 Employment & Skills\n• 👩 Women Welfare\n• 💰 Finance & Loans\n\nHow can I assist you with government schemes today?`,
        quickReplies: [
          '🔍 Show all schemes',
          '✅ Check eligibility',
          '📚 Popular schemes',
          '❓ How to apply'
        ]
      },
      {
        text: `I'm your **Government Schemes Assistant** 🤖, and I'm here to help you discover and apply for various Indian government benefits!\n\n**What I can do for you:**\n\n🎯 **Personalized Recommendations** - Based on your profile\n📊 **Eligibility Checking** - Instant verification\n📝 **Application Guidance** - Step-by-step help\n🔍 **Scheme Search** - 35+ schemes database\n📄 **Document Checklist** - Know what you need\n⏱️ **Status Tracking** - Monitor your applications\n\n**Try asking me:**\n• "Show me agriculture schemes"\n• "Am I eligible for PM Kisan?"\n• "How to apply for scholarships?"\n• "What documents do I need?"\n\nWhat would you like to know about government schemes?`,
        quickReplies: [
          '🌾 Agriculture schemes',
          '🎓 Education schemes',
          '🏥 Healthcare schemes',
          '💼 Employment schemes'
        ]
      },
      {
        text: `Thank you for reaching out! However, I specialize in **Indian Government Schemes and Welfare Programs**. 🇮🇳\n\n**My Expertise Includes:**\n\n📌 **Central Government Schemes**\n• PM-KISAN, Ayushman Bharat, MUDRA\n• National Scholarships, PMAY, PMEGP\n• And 30+ more schemes!\n\n📌 **Categories I Cover**\n• Agriculture & Rural Development\n• Education & Skill Development\n• Healthcare & Medical Insurance\n• Housing & Infrastructure\n• Employment & Entrepreneurship\n• Women & Child Welfare\n• Senior Citizen & Pension\n\n📌 **Services I Provide**\n• Scheme Discovery & Recommendations\n• Eligibility Assessment\n• Application Process Guidance\n• Document Requirements\n• Status Tracking Information\n\nLet me help you find the right government scheme for your needs!`,
        quickReplies: [
          '📋 Show recommended schemes',
          '🎯 Check my eligibility',
          '📚 Browse by category',
          '💡 How it works'
        ]
      }
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: Date.now().toString(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: response.quickReplies,
      type: 'text',
    };
  }

  private createWelcomeMessage(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `🙏 **Namaste and Welcome to SchemeSeeker!** 🇮🇳\n\nI'm your intelligent assistant for discovering and applying to **35+ Indian Government Schemes**!\n\n**🎯 What I Can Do For You:**\n\n✨ **Smart Recommendations** - Get personalized scheme suggestions based on your profile\n🔍 **Instant Eligibility Check** - Know if you qualify in seconds\n📊 **Comprehensive Database** - Access to all major central government schemes\n📝 **Application Guidance** - Step-by-step help with the application process\n📄 **Document Checklist** - Know exactly what documents you need\n⚡ **Real-time Updates** - Latest information on schemes and deadlines\n\n**🌟 Popular Scheme Categories:**\n\n🌾 **Agriculture** - PM-KISAN, Soil Health Card, Crop Insurance\n🎓 **Education** - National Scholarships, INSPIRE, Merit Scholarships\n🏥 **Healthcare** - Ayushman Bharat, PMJJBY, Maternity Benefits\n🏠 **Housing** - PMAY-Urban, PMAY-Gramin, Housing Loans\n💼 **Employment** - PMEGP, Skill India, Startup India\n👩 **Women Welfare** - Beti Bachao Beti Padhao, Maternity Schemes\n💰 **Finance** - MUDRA Loans, Stand-Up India, Credit Guarantee\n👴 **Pension** - APY, PMVVY, Senior Citizen Schemes\n\n**💡 Quick Start:**\nTry asking me:\n• "Show me agriculture schemes"\n• "Am I eligible for PM Kisan?"\n• "How to apply for Ayushman Bharat?"\n• "What are the education scholarships?"\n\nHow can I assist you today?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        '📋 Show recommended schemes',
        '✅ Check my eligibility',
        '🌾 Agriculture schemes',
        '🎓 Education schemes',
        '🏥 Healthcare schemes',
        '💼 Employment schemes'
      ],
      type: 'text',
    };
  }

  private createHelpMessage(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `📚 **Complete Guide to Using SchemeSeeker**\n\n**🎯 How I Can Help You:**\n\n**1️⃣ Discover Schemes**\n• Browse by category (Agriculture, Education, Healthcare, etc.)\n• Search for specific schemes by name\n• Get personalized recommendations based on your profile\n• View trending and popular schemes\n\n**2️⃣ Check Eligibility**\n• Instant eligibility verification\n• Detailed criteria breakdown\n• Probability matching score\n• Alternative scheme suggestions\n\n**3️⃣ Application Assistance**\n• Step-by-step application guide\n• Required documents checklist\n• Common mistakes to avoid\n• Application deadline alerts\n\n**4️⃣ Track Progress**\n• Application status tracking\n• Official portal links\n• Processing time estimates\n• Next steps guidance\n\n**5️⃣ Get Information**\n• Scheme benefits and features\n• Success rates and ratings\n• User reviews and experiences\n• FAQs and troubleshooting\n\n**🗣️ How to Talk to Me:**\n\n**Category Queries:**\n• "Show agriculture schemes"\n• "Education scholarships for students"\n• "Healthcare insurance programs"\n\n**Specific Schemes:**\n• "Tell me about PM Kisan"\n• "Ayushman Bharat details"\n• "MUDRA loan information"\n\n**Eligibility:**\n• "Am I eligible for PM Kisan?"\n• "Check my eligibility"\n• "What schemes can I apply for?"\n\n**Application:**\n• "How to apply for PMAY?"\n• "Application process for scholarships"\n• "What documents do I need?"\n\n**💡 Pro Tips:**\n✅ Complete your profile for better recommendations\n✅ Save schemes you're interested in\n✅ Apply before deadlines\n✅ Keep all documents ready in digital format\n✅ Track your applications regularly\n\nWhat would you like to explore?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        '📋 Browse schemes',
        '✅ Check eligibility',
        '📄 Document help',
        '🎯 Popular schemes'
      ],
      type: 'text',
    };
  }

  private handleSchemeQuery(_message: string): ChatMessage {
    const relevantSchemes = this.userProfile
      ? getRecommendedSchemes(schemes, this.userProfile).slice(0, 5).map(result => result.scheme)
      : schemes.slice(0, 5);

    const text = this.userProfile
      ? `🎯 **Personalized Scheme Recommendations**\n\nBased on your profile analysis, here are the top schemes matched for you:\n\n✨ These schemes have been selected considering:\n• Your age and demographics\n• Income level\n• Occupation and employment status\n• Location and state\n• Family composition\n\n📊 **Match Quality:**\nEach scheme shows an eligibility percentage indicating how well you match the criteria.\n\n💡 **Next Steps:**\n1. Review the scheme details\n2. Check specific eligibility criteria\n3. Prepare required documents\n4. Apply before the deadline\n\nClick on any scheme below to view full details and apply!`
      : `📚 **Popular Government Schemes**\n\nHere are some of the most sought-after government schemes in India:\n\n🌟 **Why These Schemes?**\n• High success rates\n• Easy application process\n• Significant benefits\n• Wide applicability\n\n💡 **Personalize Your Experience:**\nComplete your profile to get customized recommendations based on your specific situation!\n\n**Categories Available:**\n🌾 Agriculture | 🎓 Education | 🏥 Healthcare\n🏠 Housing | 💼 Employment | 👩 Women Welfare\n💰 Finance | 👴 Pension & Insurance\n\nExplore the schemes below:`;

    return {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: relevantSchemes,
      quickReplies: [
        '📋 Show more schemes',
        '✅ Check eligibility',
        '🌾 Agriculture schemes',
        '🎓 Education schemes'
      ],
      type: 'scheme',
    };
  }

  private handleEligibilityQuery(_message: string): ChatMessage {
    if (!this.userProfile) {
      return {
        id: Date.now().toString(),
        text: `⚠️ **Profile Required for Eligibility Check**\n\nTo provide accurate eligibility information, I need to know more about you!\n\n**📝 Complete Your Profile:**\n\nPlease provide the following information:\n• **Personal Details:** Age, Gender\n• **Financial Info:** Annual Income\n• **Professional:** Occupation, Employment Status\n• **Location:** State, District, Area Type (Urban/Rural)\n• **Family:** Marital Status, Dependents\n• **Education:** Qualification Level\n\n**🎯 Why Profile Matters:**\n✅ Get personalized scheme recommendations\n✅ Accurate eligibility calculations\n✅ Save time by seeing only relevant schemes\n✅ Higher application success rate\n✅ Avoid ineligible applications\n\n**🔒 Privacy Guaranteed:**\nYour information is secure and used only for matching schemes. We never share your data.\n\n**📍 How to Complete Profile:**\n1. Go to Dashboard\n2. Click on "Update Profile"\n3. Fill in your details\n4. Save and return here\n\nOnce your profile is complete, I'll show you exactly which schemes you qualify for!`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        quickReplies: [
          '📋 Show all schemes',
          '🌾 Agriculture schemes',
          '🎓 Education schemes',
          '💡 How it works'
        ],
        type: 'text',
      };
    }

    const eligibilityResults = getRecommendedSchemes(schemes, this.userProfile);
    const eligibleSchemes = eligibilityResults.filter(r => r.eligible);
    const partialMatches = eligibilityResults.filter(r => !r.eligible && r.probability > 50);

    const text = `✅ **Your Eligibility Report**\n\n**📊 Analysis Summary:**\n• **Fully Eligible:** ${eligibleSchemes.length} schemes\n• **Partial Matches:** ${partialMatches.length} schemes (50%+ match)\n• **Total Analyzed:** ${schemes.length} schemes\n\n**🎯 Top Matches for You:**\n\nBased on your profile:\n• Age: ${this.userProfile.age} years\n• Income: ₹${this.userProfile.income?.toLocaleString()}/year\n• Occupation: ${this.userProfile.occupation}\n• Location: ${this.userProfile.location}\n\n**💡 Recommendations:**\n${eligibleSchemes.length > 0
      ? '✨ Great news! You qualify for multiple schemes. Review them below and apply to maximize your benefits!'
      : '📌 While you don\'t fully qualify for schemes right now, check the partial matches below. Small changes to your profile might make you eligible!'}\n\n**📋 Next Steps:**\n1. Review eligible schemes below\n2. Check required documents\n3. Prepare your application\n4. Apply before deadlines\n\n${eligibleSchemes.length > 0 ? 'Here are your eligible schemes:' : 'Here are your best partial matches:'}`;

    return {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: (eligibleSchemes.length > 0 ? eligibleSchemes : partialMatches).slice(0, 5).map(result => result.scheme),
      quickReplies: [
        '📋 Show more matches',
        '📄 Document checklist',
        '💾 Save these schemes',
        '🎯 How to improve eligibility'
      ],
      type: 'eligibility',
    };
  }

  private handleCategoryQuery(category: string, displayName: string): ChatMessage {
    const categorySchemes = schemes.filter(s => s.category === category);

    const categoryInfo: { [key: string]: string } = {
      agriculture: `🌾 **Agriculture & Farming Schemes**\n\n**Available Programs:** ${categorySchemes.length} schemes\n\n**Key Benefits:**\n• Direct income support for farmers\n• Crop insurance and protection\n• Soil health improvement\n• Modern farming equipment subsidies\n• Irrigation support\n• Market linkage assistance\n\n**Popular Schemes:**\n• PM-KISAN - ₹6,000/year direct benefit\n• Soil Health Card - Free soil testing\n• PMFBY - Crop insurance at low premium\n• KCC - Easy credit for farmers\n\n**Who Can Apply:**\n✅ Small & marginal farmers\n✅ Landowners & tenant farmers\n✅ Agricultural laborers\n✅ Rural farming families`,

      education: `🎓 **Education & Scholarship Schemes**\n\n**Available Programs:** ${categorySchemes.length} schemes\n\n**Key Benefits:**\n• Financial assistance for studies\n• Merit-based scholarships\n• Support for SC/ST/OBC students\n• Professional course funding\n• Book and uniform allowances\n• Hostel and lodging support\n\n**Popular Schemes:**\n• National Scholarship Portal\n• INSPIRE Scholarship\n• Post Matric Scholarships\n• Merit-cum-Means Scholarships\n\n**Who Can Apply:**\n✅ School students (Class 1-12)\n✅ College & university students\n✅ Professional course students\n✅ Research scholars`,

      healthcare: `🏥 **Healthcare & Medical Schemes**\n\n**Available Programs:** ${categorySchemes.length} schemes\n\n**Key Benefits:**\n• Free health insurance coverage\n• Cashless treatment facilities\n• Maternity benefits\n• Accident insurance\n• Life insurance coverage\n• Preventive healthcare\n\n**Popular Schemes:**\n• Ayushman Bharat - ₹5 lakh coverage\n• PMJJBY - Accident insurance\n• PMSBY - Life insurance\n• Maternity Benefit Program\n\n**Who Can Apply:**\n✅ BPL families\n✅ Low-income households\n✅ Pregnant women\n✅ Senior citizens`,

      housing: `🏠 **Housing & Construction Schemes**\n\n**Available Programs:** ${categorySchemes.length} schemes\n\n**Key Benefits:**\n• Subsidy on home loans\n• Direct financial assistance\n• Free housing for eligible families\n• Construction material support\n• Infrastructure development\n• Sanitation facilities\n\n**Popular Schemes:**\n• PMAY-Urban - Urban housing\n• PMAY-Gramin - Rural housing\n• Credit Linked Subsidy\n• Affordable Housing\n\n**Who Can Apply:**\n✅ First-time home buyers\n✅ EWS/LIG/MIG families\n✅ Homeless families\n✅ Slum dwellers`,

      employment: `💼 **Employment & Skill Development Schemes**\n\n**Available Programs:** ${categorySchemes.length} schemes\n\n**Key Benefits:**\n• Skill training programs\n• Employment generation\n• Self-employment support\n• Entrepreneurship funding\n• Job placement assistance\n• Wage employment guarantee\n\n**Popular Schemes:**\n• PMEGP - Self-employment\n• Skill India Mission\n• PMKVY - Skill training\n• Startup India\n\n**Who Can Apply:**\n✅ Unemployed youth\n✅ Job seekers\n✅ Aspiring entrepreneurs\n✅ Skilled workers`
    };

    return {
      id: Date.now().toString(),
      text: categoryInfo[category] || `**${displayName} Schemes**\n\nExplore ${categorySchemes.length} schemes in this category:`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: categorySchemes.slice(0, 6),
      quickReplies: [
        '✅ Check eligibility',
        '📋 Show more categories',
        '💾 Save these schemes',
        '📄 Document requirements'
      ],
      type: 'scheme',
    };
  }

  private handleFinanceQuery(): ChatMessage {
    const financeSchemes = schemes.filter(s =>
      s.category === 'finance' ||
      this.getContent(s.name).toLowerCase().includes('loan') ||
      this.getContent(s.name).toLowerCase().includes('mudra')
    );

    return {
      id: Date.now().toString(),
      text: `💰 **Finance & Loan Schemes**\n\n**Available Programs:** ${financeSchemes.length} schemes\n\n**🏦 Loan Categories:**\n\n**1. Micro Loans (MUDRA)**\n• Shishu: Up to ₹50,000\n• Kishore: ₹50,000 - ₹5 lakh\n• Tarun: ₹5 lakh - ₹10 lakh\n\n**2. Business Loans**\n• Manufacturing units\n• Service sector\n• Trading activities\n• Agricultural allied activities\n\n**3. Special Categories**\n• Women entrepreneurs\n• SC/ST beneficiaries\n• Minority communities\n• Startups & innovations\n\n**✨ Key Features:**\n✅ Collateral-free loans\n✅ Low interest rates\n✅ Government guarantee\n✅ Easy application process\n✅ Quick disbursement\n✅ Flexible repayment\n\n**📋 Eligibility:**\n• Age: 18-65 years\n• Indian citizen\n• Viable business plan\n• No default history\n\n**💡 Application Tips:**\n• Prepare detailed business plan\n• Keep financial documents ready\n• Maintain good credit score\n• Apply through authorized banks\n\nExplore finance schemes below:`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: financeSchemes.slice(0, 5),
      quickReplies: [
        '📊 MUDRA loan details',
        '✅ Check eligibility',
        '📄 Required documents',
        '🏦 Partner banks'
      ],
      type: 'scheme',
    };
  }

  private handleWomenWelfareQuery(): ChatMessage {
    const womenSchemes = schemes.filter(s =>
      this.getContent(s.name).toLowerCase().includes('female') ||
      this.getContent(s.name).toLowerCase().includes('women') ||
      this.getContent(s.name).toLowerCase().includes('mahila') ||
      this.getContent(s.name).toLowerCase().includes('beti')
    );

    return {
      id: Date.now().toString(),
      text: `👩 **Women Welfare Schemes**\n\n**Available Programs:** ${womenSchemes.length}+ schemes\n\n**🌸 Scheme Categories:**\n\n**1. Girl Child Welfare**\n• Beti Bachao Beti Padhao\n• Sukanya Samriddhi Yojana\n• Girl child education schemes\n• Nutrition programs\n\n**2. Women Empowerment**\n• Self-employment schemes\n• Skill development programs\n• Entrepreneurship support\n• Financial inclusion\n\n**3. Maternity & Health**\n• Pradhan Mantri Matru Vandana Yojana\n• Free delivery schemes\n• Nutrition support\n• Healthcare insurance\n\n**4. Safety & Security**\n• Women helpline (181)\n• One Stop Centers\n• Legal aid programs\n• Safety apps & services\n\n**✨ Key Benefits:**\n✅ Financial assistance\n✅ Education support\n✅ Healthcare coverage\n✅ Skill training\n✅ Business loans\n✅ Safety measures\n\n**📋 Who Can Apply:**\n• Pregnant women\n• New mothers\n• Girl children\n• Women entrepreneurs\n• Working women\n• Widows & single mothers\n\n**💡 Special Features:**\n• Priority processing\n• Reserved quotas\n• Dedicated helplines\n• Women-only centers\n\nDiscover women-centric schemes:`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: womenSchemes.slice(0, 5),
      quickReplies: [
        '🤰 Maternity schemes',
        '👧 Girl child schemes',
        '💼 Women employment',
        '✅ Check eligibility'
      ],
      type: 'scheme',
    };
  }

  private handlePensionQuery(): ChatMessage {
    const pensionSchemes = schemes.filter(s =>
      s.category === 'pension' ||
      this.getContent(s.name).toLowerCase().includes('pension') ||
      this.getContent(s.name).toLowerCase().includes('senior')
    );

    return {
      id: Date.now().toString(),
      text: `👴 **Pension & Senior Citizen Schemes**\n\n**Available Programs:** ${pensionSchemes.length}+ schemes\n\n**🏦 Pension Types:**\n\n**1. Old Age Pension**\n• National Social Assistance\n• State pension schemes\n• Monthly financial support\n• Age: 60+ years\n\n**2. Widow Pension**\n• Support for widows\n• Monthly assistance\n• Age: 40+ years\n• Income criteria apply\n\n**3. Disability Pension**\n• For disabled persons\n• 40%+ disability required\n• Monthly support\n• Medical certificate needed\n\n**4. Investment Pension**\n• Atal Pension Yojana (APY)\n• PMVVY - Senior Citizens\n• Guaranteed returns\n• Tax benefits\n\n**✨ Benefits:**\n✅ Regular monthly income\n✅ Financial security\n✅ Healthcare support\n✅ Tax exemptions\n✅ Easy application\n✅ Direct bank transfer\n\n**📋 Eligibility:**\n• Age criteria (varies by scheme)\n• Income limits\n• Indian citizenship\n• Bank account (Aadhaar linked)\n\n**💰 Pension Amounts:**\n• Old Age: ₹200-₹1,000/month\n• APY: ₹1,000-₹5,000/month\n• PMVVY: Up to ₹9,250/month\n\n**💡 Application Process:**\n1. Visit nearest Common Service Center\n2. Submit required documents\n3. Fill application form\n4. Get acknowledgment\n5. Receive pension in bank account\n\nExplore pension schemes:`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: pensionSchemes.slice(0, 5),
      quickReplies: [
        '👴 Old age pension',
        '💰 APY details',
        '✅ Check eligibility',
        '📄 Documents needed'
      ],
      type: 'scheme',
    };
  }

  private handleApplicationQuery(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `📝 **Complete Application Guide**\n\n**🎯 Step-by-Step Process:**\n\n**STEP 1: Choose Your Scheme** ✅\n• Browse by category\n• Check eligibility criteria\n• Read scheme details carefully\n• Note down scheme ID/name\n• Check application deadline\n\n**STEP 2: Gather Documents** 📄\n\n**Essential Documents:**\n✅ Aadhaar Card (mandatory)\n✅ PAN Card\n✅ Bank Account details\n✅ Passport-size photographs\n✅ Mobile number (for OTP)\n✅ Email ID\n\n**Additional Documents (as required):**\n• Income Certificate\n• Caste Certificate\n• Domicile Certificate\n• Age Proof\n• Educational Certificates\n• Property Documents\n• Business Plan (for loans)\n\n**STEP 3: Online Application** 💻\n\n1. **Visit Official Portal**\n   • Go to scheme's official website\n   • Click on "Apply Online"\n   • Register/Login with credentials\n\n2. **Fill Application Form**\n   • Enter personal details\n   • Provide accurate information\n   • Double-check all entries\n   • Use CAPITAL letters where required\n\n3. **Upload Documents**\n   • Scan documents clearly\n   • File size: Usually under 200KB\n   • Format: PDF/JPG/PNG\n   • Ensure readability\n\n4. **Review & Submit**\n   • Preview filled form\n   • Verify all information\n   • Make corrections if needed\n   • Submit application\n\n5. **Save Acknowledgment**\n   • Note application ID\n   • Download acknowledgment\n   • Take printout\n   • Save email confirmation\n\n**STEP 4: Track Status** 🔍\n• Use application ID\n• Check portal regularly\n• Respond to queries promptly\n• Upload additional docs if asked\n\n**⚠️ Common Mistakes to Avoid:**\n❌ Incomplete information\n❌ Wrong document format\n❌ Blurry scanned copies\n❌ Missing signatures\n❌ Incorrect bank details\n❌ Applying after deadline\n❌ Multiple applications\n\n**💡 Pro Tips:**\n✨ Apply early (don't wait for deadline)\n✨ Keep digital copies of all documents\n✨ Use good internet connection\n✨ Fill form in one sitting\n✨ Take screenshots at each step\n✨ Keep application ID safe\n✨ Check email/SMS regularly\n\n**📞 Need Help?**\n• Helpline numbers on portal\n• Visit nearest CSC/Jan Seva Kendra\n• Contact scheme nodal officer\n• Email support team\n\n**⏱️ Processing Time:**\n• Easy schemes: 1-15 days\n• Medium schemes: 15-45 days\n• Complex schemes: 45-90 days\n\nReady to apply? Choose a scheme to get started!`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        '📄 Document checklist',
        '🔍 Track application',
        '📋 Browse schemes',
        '✅ Check eligibility'
      ],
      type: 'text',
    };
  }

  private handleDocumentsQuery(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `📄 **Complete Document Guide**\n\n**🎯 Universal Documents (Required for Most Schemes):**\n\n**1. Identity Proof** 🆔\n✅ **Aadhaar Card** (Mandatory for 90% schemes)\n   • Must be verified\n   • Link with mobile number\n   • Update address if changed\n\n✅ **PAN Card**\n   • Required for financial schemes\n   • Needed for tax benefits\n   • Link with Aadhaar\n\n**2. Address Proof** 🏠\nAny one of:\n• Aadhaar Card\n• Voter ID Card\n• Passport\n• Driving License\n• Utility Bills (recent)\n• Ration Card\n\n**3. Financial Documents** 💰\n✅ **Bank Account Details**\n   • Passbook copy\n   • Cancelled cheque\n   • IFSC code\n   • Account number\n\n✅ **Income Certificate**\n   • From Tehsildar/SDM\n   • Valid for 6 months\n   • Required for subsidized schemes\n\n**4. Category Certificates** 📋\n• SC/ST Certificate\n• OBC Certificate (Non-Creamy Layer)\n• EWS Certificate\n• Disability Certificate\n• BPL Card\n\n**5. Other Common Documents** 📑\n• Domicile Certificate\n• Age Proof (Birth Certificate)\n• Educational Certificates\n• Passport-size Photos (recent)\n• Mobile Number (active)\n• Email ID\n\n**📚 Scheme-Specific Documents:**\n\n**Agriculture Schemes:**\n• Land ownership documents\n• Khasra/Khatauni\n• Farmer registration number\n• Soil health card\n\n**Education Schemes:**\n• Mark sheets\n• Admission letter\n• Fee receipt\n• Institution ID\n• Bonafide certificate\n\n**Healthcare Schemes:**\n• Medical certificates\n• Hospital bills\n• Prescription copies\n• Diagnostic reports\n\n**Housing Schemes:**\n• Property documents\n• Building plan approval\n• Construction estimate\n• No-objection certificate\n\n**Employment/Loan Schemes:**\n• Business plan\n• Project report\n• Experience certificates\n• ITR (if applicable)\n• GST registration\n\n**💡 Document Preparation Tips:**\n\n**For Physical Copies:**\n✅ Use good quality paper\n✅ Clear, legible photocopies\n✅ Self-attest all copies\n✅ Keep originals for verification\n✅ Arrange in order\n✅ Use paper clips (not staples)\n\n**For Digital Copies:**\n✅ Scan at 200 DPI minimum\n✅ File size: Under 200KB\n✅ Format: PDF/JPG/PNG\n✅ Clear, readable text\n✅ Proper orientation\n✅ Name files appropriately\n✅ Keep backup copies\n\n**📱 Digital Document Services:**\n• DigiLocker - Store Aadhaar, PAN, etc.\n• UMANG App - Access certificates\n• e-District Portal - Apply for certificates\n• mParivahan - Driving License\n\n**⚠️ Important Notes:**\n• Keep documents updated\n• Renew expired certificates\n• Verify Aadhaar details\n• Link Aadhaar with bank account\n• Update mobile number in Aadhaar\n• Keep photocopies of everything\n\n**🔒 Document Safety:**\n• Don't share with unauthorized persons\n• Beware of fraudsters\n• Use official portals only\n• Keep passwords secure\n• Enable two-factor authentication\n\n**📞 Where to Get Certificates:**\n• Tehsil/SDM Office - Income, Domicile\n• Municipality - Birth, Residence\n• District Social Welfare - Caste\n• Medical Board - Disability\n• Panchayat Office - Rural certificates\n• e-District Portal - Online applications\n\nNeed help with specific documents?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        '📋 Scheme-specific docs',
        '💾 DigiLocker guide',
        '📝 How to apply',
        '🔍 Browse schemes'
      ],
      type: 'text',
    };
  }

  private handleStatusQuery(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `🔍 **Application Status Tracking Guide**\n\n**📊 How to Track Your Application:**\n\n**Method 1: Online Portal** 💻\n1. Visit scheme's official website\n2. Click "Track Application Status"\n3. Enter Application ID/Reference Number\n4. Enter registered mobile/email\n5. Submit and view status\n\n**Method 2: SMS Service** 📱\n• Send SMS to scheme helpline\n• Format: STATUS <Application ID>\n• Receive instant update\n\n**Method 3: Mobile App** 📲\n• Download official scheme app\n• Login with credentials\n• View application dashboard\n• Get push notifications\n\n**Method 4: Helpline** ☎️\n• Call scheme helpline number\n• Provide application details\n• Speak to customer care\n\n**🌐 Official Tracking Portals:**\n\n**🌾 Agriculture Schemes:**\n• **PM-KISAN:** pmkisan.gov.in\n  Track: Beneficiary Status\n• **Soil Health Card:** soilhealth.dac.gov.in\n• **Crop Insurance:** pmfby.gov.in\n• **KCC:** kcc.gov.in\n\n**🎓 Education Schemes:**\n• **National Scholarship:** scholarships.gov.in\n  Track: Application Status\n• **INSPIRE:** online-inspire.gov.in\n• **UGC Scholarships:** ugc.ac.in\n• **State Scholarships:** State portal\n\n**🏥 Healthcare Schemes:**\n• **Ayushman Bharat:** pmjay.gov.in\n  Track: Beneficiary Identification\n• **PMJJBY:** jansuraksha.gov.in\n• **PMSBY:** jansuraksha.gov.in\n• **State Health:** State portal\n\n**🏠 Housing Schemes:**\n• **PMAY-Urban:** pmaymis.gov.in\n  Track: Citizen Assessment\n• **PMAY-Gramin:** pmayg.nic.in\n• **State Housing:** State portal\n\n**💼 Employment Schemes:**\n• **PMEGP:** kviconline.gov.in\n  Track: Application Status\n• **Skill India:** skillindiadigital.gov.in\n• **MGNREGA:** nrega.nic.in\n• **Startup India:** startupindia.gov.in\n\n**💰 Finance Schemes:**\n• **MUDRA:** mudra.org.in\n  Track: Through lending bank\n• **Stand-Up India:** standupmitra.in\n• **Credit Guarantee:** cgtmse.in\n\n**📋 Application Status Types:**\n\n✅ **Submitted** - Application received\n⏳ **Under Review** - Being processed\n📄 **Documents Pending** - Upload required\n🔍 **Verification** - Being verified\n✔️ **Approved** - Application accepted\n💰 **Sanctioned** - Benefit approved\n📤 **Disbursed** - Payment released\n❌ **Rejected** - Not approved\n⚠️ **On Hold** - Additional info needed\n\n**⏱️ Typical Processing Times:**\n\n**Fast Track (1-15 days):**\n• PM-KISAN installments\n• DigiLocker certificates\n• Simple verifications\n\n**Standard (15-45 days):**\n• Scholarship applications\n• Health insurance cards\n• Most online schemes\n\n**Detailed Review (45-90 days):**\n• Housing schemes\n• Business loans\n• Complex applications\n\n**Extended (90+ days):**\n• Land-related schemes\n• Infrastructure projects\n• Multi-level approvals\n\n**💡 What to Do at Each Stage:**\n\n**If Status: "Documents Pending"**\n• Check what's missing\n• Upload immediately\n• Ensure correct format\n• Verify file size\n\n**If Status: "Under Verification"**\n• Wait patiently\n• Keep phone active\n• Check email regularly\n• Be ready for field visit\n\n**If Status: "On Hold"**\n• Contact helpline\n• Check for queries\n• Respond promptly\n• Provide clarifications\n\n**If Status: "Rejected"**\n• Read rejection reason\n• Check if reapplication allowed\n• Correct mistakes\n• Try alternative schemes\n\n**If Status: "Approved"**\n• Note sanction details\n• Complete formalities\n• Provide bank details\n• Wait for disbursement\n\n**⚠️ Common Issues & Solutions:**\n\n**Issue: Can't find application**\n✅ Check application ID\n✅ Try different portals\n✅ Contact helpline\n✅ Check email for confirmation\n\n**Issue: Status not updating**\n✅ Wait 24-48 hours\n✅ Clear browser cache\n✅ Try different browser\n✅ Contact support\n\n**Issue: Wrong information**\n✅ Contact helpline immediately\n✅ Submit correction request\n✅ Provide supporting documents\n✅ Follow up regularly\n\n**📞 Important Helpline Numbers:**\n• PM-KISAN: 155261 / 011-24300606\n• Ayushman Bharat: 14555\n• Scholarships: 0120-6619540\n• PMAY: 1800-11-6163\n• MUDRA: 1800-180-1111\n\n**💡 Pro Tips:**\n✨ Save application ID safely\n✨ Take screenshots at each stage\n✨ Check status weekly\n✨ Respond to queries within 48 hours\n✨ Keep documents ready\n✨ Update contact details\n✨ Enable SMS/email alerts\n\nNeed help tracking a specific scheme?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        '📋 Popular schemes',
        '✅ Check eligibility',
        '📄 Document help',
        '📞 Helpline numbers'
      ],
      type: 'text',
    };
  }

  private handleSpecificScheme(schemeId: string): ChatMessage {
    const scheme = schemes.find(s => s.id === schemeId);
    if (!scheme) {
      return this.createDefaultResponse();
    }

    const eligibility = this.userProfile ? checkEligibility(scheme, this.userProfile) : null;

    return {
      id: Date.now().toString(),
      text: `📋 **${this.getContent(scheme.name)}**\n\n${this.getContent(scheme.description)}\n\n**💰 Benefits:**\n${this.getContent(scheme.benefits)}\n\n**✅ Eligibility Criteria:**\n• **Age:** ${scheme.eligibility.age?.[0]}-${scheme.eligibility.age?.[1]} years\n${scheme.eligibility.income ? `• **Income:** Up to ₹${scheme.eligibility.income.toLocaleString()}/year` : ''}\n\n${scheme.eligibility.occupation ? `• **Occupation:** ${scheme.eligibility.occupation.join(', ')}` : ''}\n\n**📊 Scheme Details:**\n• **Category:** ${scheme.category}\n• **Difficulty:** ${scheme.difficulty}\n• **Success Rate:** ${scheme.successRate}%\n• **Processing Time:** ${this.getContent(scheme.processingTime)}\n• **Rating:** ${scheme.rating} ⭐\n\n${eligibility ? `\n**🎯 Your Match:** ${eligibility.eligible ? '✅ Fully Eligible!' : `${eligibility.probability}% Match`}\n` : ''}\n\n**📄 Required Documents:**\n${scheme.docsRequired.slice(0, 5).map(doc => `• ${this.getContent(doc)}`).join('\n')}\n${scheme.docsRequired.length > 5 ? `\n• And ${scheme.docsRequired.length - 5} more documents` : ''}\n\nClick the scheme card below for full details and to apply!`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      schemes: [scheme],
      quickReplies: [
        '✅ Check eligibility',
        '📝 How to apply',
        '🔍 Similar schemes',
        '📄 Full details'
      ],
      type: 'scheme',
    };
  }

  private createDefaultResponse(): ChatMessage {
    return {
      id: Date.now().toString(),
      text: `🤔 **Let me help you find the right scheme!**\n\n**🎯 You can ask me about:**\n\n**By Category:**\n• "Show me agriculture schemes"\n• "Education scholarships for students"\n• "Healthcare insurance programs"\n• "Housing schemes in my state"\n• "Employment and skill programs"\n\n**Specific Schemes:**\n• "Tell me about PM Kisan"\n• "Ayushman Bharat details"\n• "MUDRA loan information"\n• "Scholarship for SC/ST students"\n\n**Eligibility & Application:**\n• "Am I eligible for PM Kisan?"\n• "How to apply for scholarships?"\n• "What documents do I need?"\n• "Track my application status"\n\n**📚 Popular Schemes:**\n\n🌾 **PM-KISAN** - ₹6,000/year for farmers\n🏥 **Ayushman Bharat** - ₹5 lakh health coverage\n💰 **MUDRA** - Business loans up to ₹10 lakh\n🏠 **PMAY** - Housing subsidy for all\n🎓 **NSP** - Scholarships for students\n💼 **PMEGP** - Self-employment support\n\n**💡 Quick Actions:**\n• Browse schemes by category\n• Check your eligibility\n• Learn how to apply\n• Get document checklist\n\nWhat would you like to explore?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      quickReplies: [
        '📋 Show all schemes',
        '✅ Check eligibility',
        '🌾 Agriculture schemes',
        '🎓 Education schemes'
      ],
      type: 'text',
    };
  }


}