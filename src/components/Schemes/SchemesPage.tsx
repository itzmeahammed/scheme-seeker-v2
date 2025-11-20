import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Type declaration for Electron API
declare global {
  interface Window {
    electron?: {
      shell: {
        openExternal: (url: string) => Promise<void>;
      };
    };
  }
}
import {
  Search,
  Grid,
  List,
  Star,
  Clock,
  Users,
  ExternalLink,
  Heart,
  TrendingUp
} from 'lucide-react';
import { RootState } from '../../store';
import { setSchemes, setFilters, saveScheme, unsaveScheme } from '../../store/slices/schemeSlice';
import { schemes } from '../../data/schemes';
import { checkEligibility } from '../../utils/eligibilityChecker';
import { Scheme, TranslatedString } from '../../types';

const SchemesPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { darkMode, language } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  const { savedSchemes, filters } = useSelector((state: RootState) => state.scheme);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);

  // Helper to get translated content
  const getContent = (content: TranslatedString | string) => {
    if (typeof content === 'string') return content;
    return content[language as keyof TranslatedString] || content.en;
  };

  useEffect(() => {
    dispatch(setSchemes(schemes));
  }, [dispatch]);

  useEffect(() => {
    let filtered = schemes.filter(scheme => {
      const name = getContent(scheme.name).toLowerCase();
      const description = getContent(scheme.description).toLowerCase();
      const category = scheme.category.toLowerCase();
      const term = searchTerm.toLowerCase();

      return name.includes(term) || description.includes(term) || category.includes(term);
    });

    if (filters.category !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === filters.category);
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(scheme => scheme.difficulty === filters.difficulty);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(scheme => scheme.rating >= filters.minRating);
    }

    setFilteredSchemes(filtered);
  }, [searchTerm, filters, language]);

  const handleSaveScheme = (schemeId: string) => {
    if (savedSchemes.includes(schemeId)) {
      dispatch(unsaveScheme(schemeId));
    } else {
      dispatch(saveScheme(schemeId));
    }
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

  const SchemeCard: React.FC<{ scheme: Scheme; index: number }> = ({ scheme, index }) => {
    const eligibilityResult = user?.profile ? checkEligibility(scheme, user.profile) : null;
    const isSaved = savedSchemes.includes(scheme.id);

    return (
      <motion.div
        className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
          border rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(scheme.category)}`}></div>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {getContent(scheme.name)}
              </h3>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2`}>
              {getContent(scheme.description)}
            </p>
          </div>
          <button
            onClick={() => handleSaveScheme(scheme.id)}
            className={`p-2 rounded-lg transition-colors ${isSaved
              ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
          >
            <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {eligibilityResult && (
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${eligibilityResult.eligible
                ? 'bg-green-500'
                : eligibilityResult.probability > 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
                }`}></div>
              <span className={`text-sm font-medium ${eligibilityResult.eligible
                ? 'text-green-600'
                : eligibilityResult.probability > 50
                  ? 'text-yellow-600'
                  : 'text-red-600'
                }`}>
                {eligibilityResult.eligible
                  ? t('dashboard.eligibleSchemes')
                  : `${eligibilityResult.probability}% Match`
                }
              </span>
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>
            {getContent(scheme.benefits)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center space-x-1">
            <Clock size={14} className="text-gray-400" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {getContent(scheme.processingTime)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {scheme.rating} ({scheme.successRate}%)
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp size={14} className="text-green-500" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {scheme.successRate}% success
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={14} className="text-blue-500" />
            <span className={`capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {scheme.category}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm px-3 py-1 rounded-full ${getDifficultyColor(scheme.difficulty)}`}>
            {scheme.difficulty}
          </span>
          {scheme.deadline && (
            <span className="text-sm px-3 py-1 bg-orange-50 text-orange-600 rounded-full dark:bg-orange-900/20">
              {new Date(scheme.deadline).toLocaleDateString()}
            </span>
          )}
        </div>

        <button
          onClick={() => {
            if (window.electron && window.electron.shell) {
              window.electron.shell.openExternal(scheme.applicationLink);
            } else {
              window.open(scheme.applicationLink, '_blank');
            }
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-2 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ExternalLink size={16} />
          <span>{t('scheme.apply')}</span>
        </button>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('scheme.title')}
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          {t('scheme.subtitle')}
        </p>
      </div>

      {/* Search and Filters */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} size={20} />
            <input
              type="text"
              placeholder={t('scheme.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
          </div>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
            className={`px-4 py-2 rounded-lg border ${darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          >
            <option value="all">{t('scheme.allCategories')}</option>
            <option value="agriculture">Agriculture</option>
            <option value="education">Education</option>
            <option value="healthcare">Healthcare</option>
            <option value="housing">Housing</option>
            <option value="employment">Employment</option>
            <option value="finance">Finance</option>
            <option value="pension">Pension</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={filters.difficulty}
            onChange={(e) => dispatch(setFilters({ difficulty: e.target.value }))}
            className={`px-4 py-2 rounded-lg border ${darkMode
              ? 'bg-gray-700 border-gray-600 text-white'
              : 'bg-gray-50 border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid'
                ? 'bg-orange-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-600'
                }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list'
                ? 'bg-orange-500 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-200 text-gray-600'
                }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {filteredSchemes.length} {t('scheme.allSchemes')}
          </h2>
        </div>

        <div className={`grid ${viewMode === 'grid'
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
          } gap-6`}>
          {filteredSchemes.map((scheme, index) => (
            <SchemeCard key={scheme.id} scheme={scheme} index={index} />
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('scheme.noSchemes')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                dispatch(setFilters({ category: 'all', difficulty: 'all', minRating: 0 }));
              }}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {t('scheme.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesPage;