import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Clock, 
  Star, 
  Heart, 
  Users, 
  FileText,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { RootState } from '../../store';
import { saveScheme, unsaveScheme } from '../../store/slices/schemeSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { Scheme } from '../../types';
import { checkEligibility } from '../../utils/eligibilityChecker';

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { savedSchemes } = useSelector((state: RootState) => state.scheme);
  const { user } = useSelector((state: RootState) => state.auth);

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
        message: `${scheme.name} has been removed from your saved schemes`,
        timestamp: new Date().toISOString(),
      }));
    } else {
      dispatch(saveScheme(scheme.id));
      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Scheme Saved',
        message: `${scheme.name} has been saved to your collection`,
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
      message: `Opening application for ${scheme.name}`,
      timestamp: new Date().toISOString(),
    }));
  };

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

  const getCategoryColor = (category: string) => {
    const colors = {
      agriculture: 'bg-green-500',
      education: 'bg-blue-500',
      healthcare: 'bg-red-500',
      housing: 'bg-purple-500',
      employment: 'bg-orange-500',
      finance: 'bg-yellow-500',
      pension: 'bg-indigo-500',
      energy: 'bg-teal-500',
      insurance: 'bg-pink-500',
      food: 'bg-emerald-500',
      infrastructure: 'bg-gray-500',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <motion.div
      className={`border rounded-lg p-4 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      } hover:shadow-md transition-all duration-300`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className={`w-3 h-3 rounded-full ${getCategoryColor(scheme.category)}`}></div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {scheme.name}
            </h3>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            {scheme.description}
          </p>
        </div>
        
        <button
          onClick={handleSaveScheme}
          className={`p-2 rounded-lg transition-colors ${
            isSaved 
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Eligibility Status */}
      {eligibilityResult && (
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              eligibilityResult.eligible 
                ? 'bg-green-500' 
                : eligibilityResult.probability > 50 
                ? 'bg-yellow-500' 
                : 'bg-red-500'
            }`}></div>
            <span className={`text-xs font-medium ${
              eligibilityResult.eligible 
                ? 'text-green-600' 
                : eligibilityResult.probability > 50 
                ? 'text-yellow-600' 
                : 'text-red-600'
            }`}>
              {eligibilityResult.eligible 
                ? 'Fully Eligible' 
                : `${eligibilityResult.probability}% Match`
              }
            </span>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="mb-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          {scheme.benefits}
        </p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="flex items-center space-x-1">
          <Clock size={12} className="text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400">
            {scheme.processingTime}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Star size={12} className="text-yellow-500" />
          <span className="text-gray-600 dark:text-gray-400">
            {scheme.rating} ({scheme.successRate}%)
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <TrendingUp size={12} className="text-green-500" />
          <span className="text-gray-600 dark:text-gray-400">
            {scheme.successRate}% success
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Users size={12} className="text-blue-500" />
          <span className="text-gray-600 dark:text-gray-400 capitalize">
            {scheme.category}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center space-x-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(scheme.difficulty)}`}>
          {scheme.difficulty}
        </span>
        {scheme.deadline && (
          <span className="text-xs px-2 py-1 bg-orange-50 text-orange-600 rounded-full dark:bg-orange-900/20">
            Deadline: {new Date(scheme.deadline).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Documents Required */}
      <div className="mb-3">
        <div className="flex items-center space-x-1 mb-1">
          <FileText size={12} className="text-gray-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Required Documents:
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {scheme.docsRequired.slice(0, 3).map((doc, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded dark:bg-blue-900/20"
            >
              {doc}
            </span>
          ))}
          {scheme.docsRequired.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded dark:bg-gray-900/20">
              +{scheme.docsRequired.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <motion.button
          onClick={handleApplyClick}
          className="flex-1 bg-gradient-to-r from-orange-500 to-green-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center space-x-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink size={14} />
          <span>Apply Now</span>
        </motion.button>
        
        <button
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            darkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Details
        </button>
      </div>
    </motion.div>
  );
};

export default SchemeCard;