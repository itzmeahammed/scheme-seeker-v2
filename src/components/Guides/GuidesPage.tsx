import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Play,
  FileText,
  Download,
  Clock,
  Star,
  Search,
  ChevronRight,
  CheckCircle2,
  X,
  Award,
  Bookmark,
  ThumbsUp,
  Eye
} from 'lucide-react';
import { RootState } from '../../store';
import { Guide, TranslatedString } from '../../types';
import { guides } from '../../data/guides';

const GuidesPage: React.FC = () => {
  const { t } = useTranslation();
  const { darkMode, language } = useSelector((state: RootState) => state.ui);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [savedGuides, setSavedGuides] = useState<Set<string>>(new Set());

  const getContent = (content: TranslatedString | string | undefined): string => {
    if (!content) return '';
    if (typeof content === 'string') return content;
    return content[language as keyof TranslatedString] || content.en;
  };

  const categories = [
    { value: 'all', label: 'All Categories', icon: '📚' },
    { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'education', label: 'Education', icon: '🎓' },
    { value: 'housing', label: 'Housing', icon: '🏠' },
    { value: 'employment', label: 'Employment', icon: '💼' },
    { value: 'finance', label: 'Finance', icon: '💰' },
    { value: 'general', label: 'General', icon: '📋' }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = getContent(guide.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getContent(guide.description).toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesType = selectedType === 'all' || guide.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const handleGuideClick = (guide: Guide) => {
    setSelectedGuide(guide);
    setCurrentStep(0);
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const handleSaveGuide = (guideId: string) => {
    setSavedGuides(prev => {
      const newSet = new Set(prev);
      if (newSet.has(guideId)) {
        newSet.delete(guideId);
      } else {
        newSet.add(guideId);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play size={16} />;
      case 'pdf':
        return <Download size={16} />;
      case 'interactive':
        return <CheckCircle2 size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return darkMode ? 'bg-green-900/30 text-green-400 border-green-700' : 'bg-green-50 text-green-700 border-green-200';
      case 'Intermediate':
        return darkMode ? 'bg-yellow-900/30 text-yellow-400 border-yellow-700' : 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Advanced':
        return darkMode ? 'bg-red-900/30 text-red-400 border-red-700' : 'bg-red-50 text-red-700 border-red-200';
      default:
        return darkMode ? 'bg-gray-900/30 text-gray-400 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const GuideCard: React.FC<{ guide: Guide; index: number }> = ({ guide, index }) => (
    <motion.div
      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${darkMode
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500/50'
        : 'bg-white border-gray-200 hover:border-orange-400 hover:shadow-xl'
        }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={() => handleGuideClick(guide)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={guide.thumbnail}
          alt={getContent(guide.title)}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm ${guide.type === 'video' ? 'bg-red-500/90 text-white' :
            guide.type === 'pdf' ? 'bg-blue-500/90 text-white' :
              guide.type === 'interactive' ? 'bg-purple-500/90 text-white' :
                'bg-green-500/90 text-white'
            }`}>
            {getTypeIcon(guide.type)}
            <span className="capitalize">{t(`guides.${guide.type}s`)}</span>
          </span>
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSaveGuide(guide.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm transition-all ${savedGuides.has(guide.id)
            ? 'bg-orange-500 text-white'
            : 'bg-white/20 text-white hover:bg-white/30'
            }`}
        >
          <Bookmark size={16} fill={savedGuides.has(guide.id) ? 'currentColor' : 'none'} />
        </button>

        {/* Duration */}
        {guide.duration && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-black/70 text-white px-2.5 py-1 rounded-md text-xs font-medium backdrop-blur-sm">
              <Clock size={12} className="inline mr-1" />
              {guide.duration}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-bold text-base line-clamp-2 flex-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {getContent(guide.title)}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Star className="text-yellow-500" size={14} fill="currentColor" />
            <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {guide.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {getContent(guide.description)}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs px-3 py-1 rounded-full border ${getDifficultyColor(guide.difficulty)}`}>
            {t(`guides.${guide.difficulty.toLowerCase()}`)}
          </span>
          <div className="flex items-center gap-3 text-xs">
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Eye size={12} />
              {(guide.views / 1000).toFixed(1)}k
            </span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <ThumbsUp size={12} />
              {guide.likes}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {guide.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className={`text-xs px-2.5 py-1 rounded-md font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Progress Bar (if applicable) */}
        {guide.completionRate && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t('guides.completionRate')}</span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{guide.completionRate}%</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-300"
                style={{ width: `${guide.completionRate}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-green-500 text-white py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-green-600 transition-all duration-200 font-semibold shadow-lg shadow-orange-500/20">
          <span>{t('guides.startLearning')}</span>
          <ChevronRight size={16} />
        </button>

        {/* Author & Date */}
        <div className={`mt-3 pt-3 border-t flex items-center justify-between text-xs ${darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
          <span>{t('guides.by')} {guide.author}</span>
          <span>{new Date(guide.publishedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );

  // Guide Detail Modal
  const GuideDetailModal = () => {
    if (!selectedGuide) return null;

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedGuide(null)}
        >
          <motion.div
            className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'
              }`}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`sticky top-0 z-10 p-6 border-b ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {getContent(selectedGuide.title)}
                  </h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                      {selectedGuide.rating}
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedGuide.views.toLocaleString()} {t('common.views')}
                    </span>
                    <span className={`px-2 py-1 rounded border text-xs ${getDifficultyColor(selectedGuide.difficulty)}`}>
                      {t(`guides.${selectedGuide.difficulty.toLowerCase()}`)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {selectedGuide.type === 'interactive' && selectedGuide.steps && (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {t('guides.step')} {currentStep + 1} {t('guides.of')} {selectedGuide.steps.length}
                      </span>
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {Math.round((completedSteps.size / selectedGuide.steps.length) * 100)}% {t('guides.complete')}
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-300"
                        style={{ width: `${(completedSteps.size / selectedGuide.steps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Current Step */}
                  <div className={`p-6 rounded-xl border-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {getContent(selectedGuide.steps[currentStep].title)}
                    </h3>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getContent(selectedGuide.steps[currentStep].description)}
                    </p>

                    {selectedGuide.steps[currentStep].imageUrl && (
                      <img
                        src={selectedGuide.steps[currentStep].imageUrl}
                        alt={getContent(selectedGuide.steps[currentStep].title)}
                        className="w-full rounded-lg mb-4"
                      />
                    )}

                    <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                      <div dangerouslySetInnerHTML={{ __html: getContent(selectedGuide.steps[currentStep].content).replace(/\n/g, '<br/>') }} />
                    </div>

                    {selectedGuide.steps[currentStep].tips && (
                      <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                        <h4 className={`font-semibold mb-2 flex items-center gap-2 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                          <Award size={16} />
                          {t('guides.proTips')}
                        </h4>
                        <ul className="space-y-1">
                          {selectedGuide.steps[currentStep].tips.map((tip, idx) => (
                            <li key={idx} className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                              • {getContent(tip)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${currentStep === 0
                        ? darkMode ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      {t('common.back')}
                    </button>

                    <button
                      onClick={() => {
                        handleStepComplete(selectedGuide.steps![currentStep].id);
                        if (currentStep < selectedGuide.steps!.length - 1) {
                          setCurrentStep(currentStep + 1);
                        }
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-green-600 transition-all"
                    >
                      {completedSteps.has(selectedGuide.steps[currentStep].id) ? t('guides.nextStep') : t('guides.markComplete')}
                    </button>
                  </div>
                </div>
              )}

              {selectedGuide.type === 'article' && selectedGuide.articleContent && (
                <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                  <div dangerouslySetInnerHTML={{ __html: getContent(selectedGuide.articleContent).replace(/\n/g, '<br/>') }} />
                </div>
              )}

              {selectedGuide.type === 'video' && selectedGuide.videoUrl && (
                <div className="aspect-video">
                  <iframe
                    src={selectedGuide.videoUrl}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-orange-50 to-green-50'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent'}`}>
              {t('guides.title')}
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('guides.subtitle')}
            </p>
          </div>
          <div className={`hidden md:flex items-center gap-4 px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>{guides.length}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{t('guides.totalGuides')}</div>
            </div>
            <div className={`w-px h-10 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{savedGuides.size}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{t('guides.saved')}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} size={20} />
            <input
              type="text"
              placeholder={t('guides.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all ${darkMode
                ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-orange-500'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                } focus:outline-none`}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${darkMode
              ? 'bg-gray-900 border-gray-700 text-gray-100 focus:border-orange-500'
              : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500'
              } focus:outline-none`}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${darkMode
              ? 'bg-gray-900 border-gray-700 text-gray-100 focus:border-orange-500'
              : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-orange-500'
              } focus:outline-none`}
          >
            <option value="all">🎯 {t('guides.allTypes')}</option>
            <option value="video">🎥 {t('guides.videos')}</option>
            <option value="article">📄 {t('guides.articles')}</option>
            <option value="pdf">📑 {t('guides.pdfs')}</option>
            <option value="interactive">✨ {t('guides.interactive')}</option>
          </select>
        </div>
      </motion.div>

      {/* Guides Grid */}
      <motion.div
        className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {filteredGuides.length === guides.length ? t('guides.allGuides') : t('guides.filteredResults')} ({filteredGuides.length})
          </h2>
          {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className={`text-sm font-medium ${darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'}`}
            >
              {t('scheme.clearFilters')}
            </button>
          )}
        </div>

        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => (
              <GuideCard key={guide.id} guide={guide} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={64} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('guides.noGuides')}
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {t('guides.tryAdjusting')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-green-600 transition-all font-semibold"
            >
              View All Guides
            </button>
          </div>
        )}
      </motion.div>

      {/* Guide Detail Modal */}
      {selectedGuide && <GuideDetailModal />}
    </div>
  );
};

export default GuidesPage;