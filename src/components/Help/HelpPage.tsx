import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Book,
  Video,
  FileText
} from 'lucide-react';
import { RootState } from '../../store';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpPage: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I check my eligibility for a scheme?',
      answer: 'You can check your eligibility by completing your profile with accurate information about your age, income, occupation, and location. Our AI-powered system will automatically calculate your eligibility percentage for each scheme and provide personalized recommendations.',
      category: 'eligibility'
    },
    {
      id: '2',
      question: 'What documents do I need to apply for schemes?',
      answer: 'Required documents vary by scheme, but commonly needed documents include: Aadhaar Card, Income Certificate, Caste Certificate (if applicable), Bank Account Details, Educational Certificates, and Land Records (for agriculture schemes). Each scheme page lists specific document requirements.',
      category: 'documents'
    },
    {
      id: '3',
      question: 'How long does it take for applications to be processed?',
      answer: 'Processing times vary by scheme and can range from 7 days to 6 months. Most schemes show estimated processing times on their detail pages. You can track your application status through the "My Applications" section in your dashboard.',
      category: 'application'
    },
    {
      id: '4',
      question: 'Can I apply for multiple schemes at the same time?',
      answer: 'Yes, you can apply for multiple schemes simultaneously as long as you meet the eligibility criteria for each. However, some schemes may have restrictions on concurrent applications, which will be clearly mentioned in the scheme details.',
      category: 'application'
    },
    {
      id: '5',
      question: 'How do I update my profile information?',
      answer: 'Go to the Profile section from the sidebar menu, click "Edit Profile", make your changes, and save. Updated information will automatically refresh your eligibility calculations for all schemes.',
      category: 'profile'
    },
    {
      id: '6',
      question: 'What should I do if my application is rejected?',
      answer: 'If your application is rejected, check the remarks section for the reason. You can often reapply after addressing the issues mentioned. Common reasons include incomplete documents, income exceeding limits, or not meeting specific criteria.',
      category: 'application'
    },
    {
      id: '7',
      question: 'How do I use the chatbot effectively?',
      answer: 'The AI chatbot can help you find schemes, check eligibility, and get application guidance. Use specific queries like "agriculture schemes for farmers" or "education scholarships under 2 lakh income" for best results. You can also use voice input for convenience.',
      category: 'chatbot'
    },
    {
      id: '8',
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your data. Your information is only used for eligibility calculations and application assistance. We never share personal data with third parties without your consent.',
      category: 'security'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'eligibility', label: 'Eligibility' },
    { value: 'application', label: 'Applications' },
    { value: 'documents', label: 'Documents' },
    { value: 'profile', label: 'Profile' },
    { value: 'chatbot', label: 'Chatbot' },
    { value: 'security', label: 'Security' }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call our helpline for immediate assistance',
      contact: '1800-XXX-XXXX',
      availability: 'Mon-Fri, 9 AM - 6 PM'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your queries via email',
      contact: 'support@schemeseeker.gov.in',
      availability: 'Response within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available in app',
      availability: 'Mon-Fri, 10 AM - 5 PM'
    }
  ];

  const quickLinks = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Complete guide to using SchemeSeeker',
      link: '/guides'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step tutorials',
      link: '/guides?type=video'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Detailed documentation and FAQs',
      link: '/help'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Help & Support
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Find answers to common questions and get the help you need
        </p>
      </div>

      {/* Quick Links */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                darkMode 
                  ? 'border-gray-700 hover:border-orange-500 hover:bg-gray-700' 
                  : 'border-gray-200 hover:border-orange-500 hover:bg-orange-50'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <link.icon className="text-orange-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {link.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {link.description}
                  </p>
                </div>
                <ExternalLink className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Support
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <method.icon className="text-blue-600" size={20} />
                </div>
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {method.title}
                </h3>
              </div>
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {method.description}
              </p>
              <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {method.contact}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {method.availability}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Frequently Asked Questions
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className={`border rounded-lg ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  expandedFAQ === faq.id ? 'rounded-t-lg' : 'rounded-lg'
                }`}
              >
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                {expandedFAQ === faq.id ? (
                  <ChevronDown className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />
                ) : (
                  <ChevronRight className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />
                )}
              </button>
              {expandedFAQ === faq.id && (
                <motion.div
                  className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
            <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No FAQs Found
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Try adjusting your search terms or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Still Need Help */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg text-center`}>
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Still Need Help?
        </h3>
        <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Contact Support
          </button>
          <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            darkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}>
            Request Feature
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;