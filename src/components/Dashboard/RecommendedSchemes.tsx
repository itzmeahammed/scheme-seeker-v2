import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { RootState } from '../../store';
import { EligibilityResult, TranslatedString } from '../../types';

interface RecommendedSchemesProps {
  schemes: EligibilityResult[];
}

const RecommendedSchemes: React.FC<RecommendedSchemesProps> = ({ schemes }) => {
  const { t } = useTranslation();
  const { darkMode, language } = useSelector((state: RootState) => state.ui);

  // Helper to get translated content
  const getContent = (content: TranslatedString | string) => {
    if (typeof content === 'string') return content;
    return content[language as keyof TranslatedString] || content.en;
  };

  const topSchemes = schemes.slice(0, 3);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Hard':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-lg border`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {t('dashboard.recommended')}
        </h3>
        <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center">
          {t('dashboard.viewAll')} <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {topSchemes.map((result, index) => (
          <motion.div
            key={result.scheme.id}
            className={`border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'} rounded-lg p-4 hover:shadow-md transition-all duration-300`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className={`font-medium mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {getContent(result.scheme.name)}
                </h4>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                  {getContent(result.scheme.description)}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className={`w-3 h-3 rounded-full ${getProbabilityColor(result.probability) === 'text-green-600' ? 'bg-green-500' : getProbabilityColor(result.probability) === 'text-yellow-600' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${getProbabilityColor(result.probability)}`}>
                      {result.probability}% {t('dashboard.match')}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(result.scheme.difficulty)}`}>
                    {result.scheme.difficulty}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="text-yellow-500" size={14} />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {result.scheme.rating}
                  </span>
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {result.scheme.successRate}% {t('dashboard.success')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-4 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {getContent(result.scheme.processingTime)}
                </div>
                <div className="flex items-center capitalize">
                  <Users size={12} className="mr-1" />
                  {result.scheme.category}
                </div>
              </div>
              <button
                onClick={() => window.open(result.scheme.applicationLink, '_blank')}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center"
              >
                {t('scheme.apply')} <ExternalLink size={12} className="ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {schemes.length === 0 && (
        <div className="text-center py-8">
          <p className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {t('dashboard.completeProfile')}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendedSchemes;