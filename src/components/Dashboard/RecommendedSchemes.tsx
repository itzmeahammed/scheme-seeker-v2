import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { ExternalLink, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { RootState } from '../../store';
import { EligibilityResult } from '../../types';

interface RecommendedSchemesProps {
  schemes: EligibilityResult[];
}

const RecommendedSchemes: React.FC<RecommendedSchemesProps> = ({ schemes }) => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

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
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recommended for You
        </h3>
        <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center">
          View All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {topSchemes.map((result, index) => (
          <motion.div
            key={result.scheme.id}
            className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
              darkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {result.scheme.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {result.scheme.description}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className={`w-3 h-3 rounded-full ${getProbabilityColor(result.probability) === 'text-green-600' ? 'bg-green-500' : getProbabilityColor(result.probability) === 'text-yellow-600' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${getProbabilityColor(result.probability)}`}>
                      {result.probability}% match
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {result.scheme.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {result.scheme.successRate}% success
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {result.scheme.processingTime}
                </div>
                <div className="flex items-center">
                  <Users size={12} className="mr-1" />
                  {result.scheme.category}
                </div>
              </div>
              <button
                onClick={() => window.open(result.scheme.applicationLink, '_blank')}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center"
              >
                Apply Now <ExternalLink size={12} className="ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {schemes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Complete your profile to see personalized recommendations
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendedSchemes;