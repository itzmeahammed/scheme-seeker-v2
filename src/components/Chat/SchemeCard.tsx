import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Clock,
  Star,
  Heart,
  Users,
  FileText,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';
import { RootState } from '../../store';
import { saveScheme, unsaveScheme } from '../../store/slices/schemeSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { Scheme, TranslatedString } from '../../types';
import { checkEligibility } from '../../utils/eligibilityChecker';

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { darkMode, language } = useSelector((state: RootState) => state.ui);
  const { savedSchemes } = useSelector((state: RootState) => state.scheme);
  const { user } = useSelector((state: RootState) => state.auth);

  // Helper to get translated content
  const getContent = (content: TranslatedString | string) => {
    if (typeof content === 'string') return content;
    return content[language as keyof TranslatedString] || content.en;
  };

  const isSaved = savedSchemes.includes(scheme.id);
  const eligibilityResult = user?.profile
    ? checkEligibility(scheme, user.profile)
    : null;

  const handleSaveScheme = () => {
    if (isSaved) {
      dispatch(unsaveScheme(scheme.id));
      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'info',
        title: 'Scheme Removed',
        message: `${getContent(scheme.name)} has been removed from your saved schemes`,
        timestamp: new Date().toISOString(),
      }));
    } else {
      dispatch(saveScheme(scheme.id));
      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Scheme Saved',
        message: `${getContent(scheme.name)} has been saved to your collection`,
        timestamp: new Date().toISOString(),
      }));
    }
  };

  const handleApplyClick = () => {
    window.open(scheme.applicationLink, '_blank');
    dispatch(addNotification({
      id: Date.now().toString(),
      type: 'info',
      title: 'Application Started',
      message: `Opening application for ${getContent(scheme.name)}`,
      timestamp: new Date().toISOString(),
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return darkMode ? 'bg-green-900/30 text-green-400 border-green-700' : 'bg-green-50 text-green-700 border-green-200';
      case 'Medium':
        return darkMode ? 'bg-yellow-900/30 text-yellow-400 border-yellow-700' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard':
        return darkMode ? 'bg-red-900/30 text-red-400 border-red-700' : 'bg-red-50 text-red-700 border-red-200';
      default:
        return darkMode ? 'bg-gray-900/30 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      agriculture: 'from-green-500 to-green-600',
      education: 'from-blue-500 to-blue-600',
      healthcare: 'from-red-500 to-red-600',
      housing: 'from-purple-500 to-purple-600',
      employment: 'from-orange-500 to-orange-600',
      finance: 'from-yellow-500 to-yellow-600',
      pension: 'from-indigo-500 to-indigo-600',
      energy: 'from-teal-500 to-teal-600',
      insurance: 'from-pink-500 to-pink-600',
      food: 'from-emerald-500 to-emerald-600',
      infrastructure: 'from-gray-500 to-gray-600',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      agriculture: '🌾',
      education: '🎓',
      healthcare: '🏥',
      housing: '🏠',
      employment: '💼',
      finance: '💰',
      pension: '👴',
      energy: '⚡',
      insurance: '🛡️',
      food: '🍽️',
      infrastructure: '🏗️',
    };
    return icons[category] || '📋';
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${darkMode
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500/50'
        : 'bg-white border-gray-200 hover:border-orange-400 hover:shadow-xl'
        }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Category Accent Bar */}
      <div className={`h-1.5 bg-gradient-to-r ${getCategoryColor(scheme.category)}`} />

      <div className="p-5">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(scheme.category)} flex items-center justify-center text-white text-lg shadow-md`}>
                {getCategoryIcon(scheme.category)}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-base leading-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {getContent(scheme.name)}
                </h3>
                <p className={`text-xs capitalize flex items-center gap-1 mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Users size={10} />
                  {scheme.category}
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <motion.button
            onClick={handleSaveScheme}
            className={`p-2.5 rounded-lg transition-all ${isSaved
              ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
              : `${darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {getContent(scheme.description)}
        </p>

        {/* Eligibility Badge */}
        {eligibilityResult && (
          <div className="mb-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${eligibilityResult.eligible
              ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
              : eligibilityResult.probability > 50
                ? darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                : darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
              }`}>
              <CheckCircle2 size={14} />
              {eligibilityResult.eligible
                ? t('scheme.eligibility')
                : `${eligibilityResult.probability}% Match`
              }
            </div>
          </div>
        )}

        {/* Benefits Highlight */}
        <div className={`p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-r from-orange-50 to-green-50'}`}>
          <div className="flex items-start gap-2">
            <Award size={16} className={`mt-0.5 flex-shrink-0 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'} line-clamp-2`}>
              {getContent(scheme.benefits)}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`flex items-center gap-2 p-2.5 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <Clock size={14} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            <div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('scheme.processingTime')}</p>
              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {getContent(scheme.processingTime)}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 p-2.5 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <Star size={14} className="text-yellow-500" />
            <div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('scheme.rating')}</p>
              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {scheme.rating} ⭐
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 p-2.5 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <TrendingUp size={14} className={darkMode ? 'text-green-400' : 'text-green-600'} />
            <div>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('scheme.successRate')}</p>
              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {scheme.successRate}%
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-2 p-2.5 rounded-lg border ${getDifficultyColor(scheme.difficulty)}`}>
            <div className="w-2 h-2 rounded-full bg-current" />
            <div>
              <p className={`text-xs opacity-70`}>{t('scheme.difficulty')}</p>
              <p className={`text-xs font-semibold`}>
                {scheme.difficulty}
              </p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText size={12} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            <span className={`text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('scheme.documents')}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {scheme.docsRequired.slice(0, 3).map((doc, index) => (
              <span
                key={index}
                className={`text-xs px-2.5 py-1 rounded-md font-medium ${darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-700'
                  }`}
              >
                {getContent(doc)}
              </span>
            ))}
            {scheme.docsRequired.length > 3 && (
              <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                }`}>
                +{scheme.docsRequired.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Deadline Badge */}
        {scheme.deadline && (
          <div className="mb-4">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${darkMode ? 'bg-orange-900/20 text-orange-400' : 'bg-orange-50 text-orange-700'
              }`}>
              <Clock size={12} />
              Deadline: {new Date(scheme.deadline).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            onClick={handleApplyClick}
            className="flex-1 bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 px-4 rounded-lg text-sm font-bold hover:from-orange-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={16} />
            {t('scheme.apply')}
          </motion.button>

          <motion.button
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${darkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('scheme.viewDetails')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SchemeCard;