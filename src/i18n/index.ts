import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.chat': 'Chat',
      'nav.schemes': 'Schemes',
      'nav.profile': 'Profile',
      'nav.help': 'Help',
      'nav.logout': 'Logout',
      
      // Authentication
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full Name',
      'auth.forgotPassword': 'Forgot Password?',
      'auth.createAccount': 'Create Account',
      'auth.haveAccount': 'Already have an account?',
      'auth.noAccount': "Don't have an account?",
      
      // Dashboard
      'dashboard.welcome': 'Welcome back,',
      'dashboard.eligibleSchemes': 'Eligible Schemes',
      'dashboard.savedSchemes': 'Saved Schemes',
      'dashboard.applications': 'Applications',
      'dashboard.recommendations': 'Recommendations',
      
      // Chat
      'chat.placeholder': 'Ask me about government schemes...',
      'chat.send': 'Send',
      'chat.typing': 'Bot is typing...',
      'chat.quickReply': 'Quick Reply',
      
      // Schemes
      'scheme.eligibility': 'Eligibility',
      'scheme.benefits': 'Benefits',
      'scheme.documents': 'Required Documents',
      'scheme.apply': 'Apply Now',
      'scheme.save': 'Save Scheme',
      'scheme.saved': 'Saved',
      'scheme.difficulty': 'Difficulty',
      'scheme.rating': 'Rating',
      'scheme.successRate': 'Success Rate',
      'scheme.processingTime': 'Processing Time',
      
      // Profile
      'profile.personal': 'Personal Information',
      'profile.age': 'Age',
      'profile.income': 'Annual Income',
      'profile.location': 'Location',
      'profile.occupation': 'Occupation',
      'profile.category': 'Category',
      'profile.education': 'Education Level',
      'profile.familySize': 'Family Size',
      'profile.hasDisability': 'Has Disability',
      'profile.landOwnership': 'Land Ownership',
      'profile.save': 'Save Profile',
      
      // Common
      'common.loading': 'Loading...',
      'common.error': 'Error occurred',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.edit': 'Edit',
      'common.delete': 'Delete',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.submit': 'Submit',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.clear': 'Clear',
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.dashboard': 'डैशबोर्ड',
      'nav.chat': 'चैट',
      'nav.schemes': 'योजनाएं',
      'nav.profile': 'प्रोफ़ाइल',
      'nav.help': 'सहायता',
      'nav.logout': 'लॉगआउट',
      
      // Authentication
      'auth.login': 'लॉगिन',
      'auth.signup': 'साइन अप',
      'auth.email': 'ईमेल',
      'auth.password': 'पासवर्ड',
      'auth.name': 'पूरा नाम',
      'auth.forgotPassword': 'पासवर्ड भूल गए?',
      'auth.createAccount': 'खाता बनाएं',
      'auth.haveAccount': 'पहले से खाता है?',
      'auth.noAccount': 'खाता नहीं है?',
      
      // Dashboard
      'dashboard.welcome': 'वापसी पर स्वागत है,',
      'dashboard.eligibleSchemes': 'योग्य योजनाएं',
      'dashboard.savedSchemes': 'सेव की गई योजनाएं',
      'dashboard.applications': 'आवेदन',
      'dashboard.recommendations': 'सुझाव',
      
      // Chat
      'chat.placeholder': 'सरकारी योजनाओं के बारे में पूछें...',
      'chat.send': 'भेजें',
      'chat.typing': 'बॉट टाइप कर रहा है...',
      'chat.quickReply': 'त्वरित उत्तर',
      
      // Schemes
      'scheme.eligibility': 'योग्यता',
      'scheme.benefits': 'लाभ',
      'scheme.documents': 'आवश्यक दस्तावेज',
      'scheme.apply': 'अभी आवेदन करें',
      'scheme.save': 'योजना सेव करें',
      'scheme.saved': 'सेव किया गया',
      'scheme.difficulty': 'कठिनाई',
      'scheme.rating': 'रेटिंग',
      'scheme.successRate': 'सफलता दर',
      'scheme.processingTime': 'प्रसंस्करण समय',
      
      // Profile
      'profile.personal': 'व्यक्तिगत जानकारी',
      'profile.age': 'उम्र',
      'profile.income': 'वार्षिक आय',
      'profile.location': 'स्थान',
      'profile.occupation': 'व्यवसाय',
      'profile.category': 'श्रेणी',
      'profile.education': 'शिक्षा स्तर',
      'profile.familySize': 'परिवार का आकार',
      'profile.hasDisability': 'विकलांगता है',
      'profile.landOwnership': 'भूमि स्वामित्व',
      'profile.save': 'प्रोफ़ाइल सेव करें',
      
      // Common
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'त्रुटि हुई',
      'common.success': 'सफलता',
      'common.cancel': 'रद्द करें',
      'common.save': 'सेव करें',
      'common.edit': 'संपादित करें',
      'common.delete': 'हटाएं',
      'common.back': 'वापस',
      'common.next': 'अगला',
      'common.submit': 'जमा करें',
      'common.search': 'खोजें',
      'common.filter': 'फ़िल्टर',
      'common.clear': 'साफ़ करें',
    }
  },
  te: {
    translation: {
      // Navigation
      'nav.dashboard': 'డాష్‌బోర్డ్',
      'nav.chat': 'చాట్',
      'nav.schemes': 'పథకాలు',
      'nav.profile': 'ప్రొఫైల్',
      'nav.help': 'సహాయం',
      'nav.logout': 'లాగ్ అవుట్',
      
      // Authentication
      'auth.login': 'లాగిన్',
      'auth.signup': 'సైన్ అప్',
      'auth.email': 'ఇమెయిల్',
      'auth.password': 'పాస్‌వర్డ్',
      'auth.name': 'పూర్తి పేరు',
      'auth.forgotPassword': 'పాస్‌వర్డ్ మరచిపోయారా?',
      'auth.createAccount': 'ఖాతా సృష్టించండి',
      'auth.haveAccount': 'ఇప్పటికే ఖాతా ఉందా?',
      'auth.noAccount': 'ఖాతా లేదా?',
      
      // Dashboard
      'dashboard.welcome': 'తిరిగి స్వాగతం,',
      'dashboard.eligibleSchemes': 'అర్హత పథకాలు',
      'dashboard.savedSchemes': 'సేవ్ చేసిన పథకాలు',
      'dashboard.applications': 'దరఖాస్తులు',
      'dashboard.recommendations': 'సిఫారసులు',
      
      // Chat
      'chat.placeholder': 'ప్రభుత్వ పథకాల గురించి అడగండి...',
      'chat.send': 'పంపండి',
      'chat.typing': 'బాట్ టైప్ చేస్తోంది...',
      'chat.quickReply': 'త్వరిత సమాధానం',
      
      // Schemes
      'scheme.eligibility': 'అర్హత',
      'scheme.benefits': 'ప్రయోజనాలు',
      'scheme.documents': 'అవసరమైన పత్రాలు',
      'scheme.apply': 'ఇప్పుడే దరఖాస్తు చేయండి',
      'scheme.save': 'పథకం సేవ్ చేయండి',
      'scheme.saved': 'సేవ్ అయింది',
      'scheme.difficulty': 'కష్టం',
      'scheme.rating': 'రేటింగ్',
      'scheme.successRate': 'విజయ రేటు',
      'scheme.processingTime': 'ప్రాసెసింగ్ సమయం',
      
      // Profile
      'profile.personal': 'వ్యక్తిగత సమాచారం',
      'profile.age': 'వయస్సు',
      'profile.income': 'వార్షిక ఆదాయం',
      'profile.location': 'స్థానం',
      'profile.occupation': 'వృత్తి',
      'profile.category': 'వర్గం',
      'profile.education': 'విద్య స్థాయి',
      'profile.familySize': 'కుటుంబ పరిమాణం',
      'profile.hasDisability': 'వైకల్యం ఉంది',
      'profile.landOwnership': 'భూమి యాజమాన్యం',
      'profile.save': 'ప్రొఫైల్ సేవ్ చేయండి',
      
      // Common
      'common.loading': 'లోడ్ అవుతోంది...',
      'common.error': 'లోపం జరిగింది',
      'common.success': 'విజయం',
      'common.cancel': 'రద్దు చేయండి',
      'common.save': 'సేవ్ చేయండి',
      'common.edit': 'సవరించండి',
      'common.delete': 'తొలగించండి',
      'common.back': 'వెనుకకు',
      'common.next': 'తదుపరి',
      'common.submit': 'సమర్పించండి',
      'common.search': 'వెతకండి',
      'common.filter': 'ఫిల్టర్',
      'common.clear': 'క్లియర్ చేయండి',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;