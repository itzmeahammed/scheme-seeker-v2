import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  FileText, 
  Download,
  Clock,
  Star,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';
import { RootState } from '../../store';

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'article' | 'pdf';
  duration?: string;
  rating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  tags: string[];
}

const GuidesPage: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const guides: Guide[] = [
    {
      id: '1',
      title: 'Complete Guide to PM-KISAN Application',
      description: 'Step-by-step tutorial on how to apply for Pradhan Mantri Kisan Samman Nidhi scheme',
      category: 'agriculture',
      type: 'video',
      duration: '15 min',
      rating: 4.8,
      difficulty: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['farming', 'subsidy', 'application']
    },
    {
      id: '2',
      title: 'Understanding PMJAY Health Insurance',
      description: 'Comprehensive guide to Pradhan Mantri Jan Arogya Yojana benefits and eligibility',
      category: 'healthcare',
      type: 'article',
      duration: '8 min read',
      rating: 4.6,
      difficulty: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['health', 'insurance', 'benefits']
    },
    {
      id: '3',
      title: 'Scholarship Application Checklist',
      description: 'Essential documents and requirements for education scheme applications',
      category: 'education',
      type: 'pdf',
      rating: 4.7,
      difficulty: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['education', 'scholarship', 'documents']
    },
    {
      id: '4',
      title: 'Housing Scheme Eligibility Calculator',
      description: 'Interactive tool to check your eligibility for various housing schemes',
      category: 'housing',
      type: 'video',
      duration: '12 min',
      rating: 4.5,
      difficulty: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['housing', 'eligibility', 'calculator']
    },
    {
      id: '5',
      title: 'Employment Scheme Success Stories',
      description: 'Real-life examples of successful applications and career transformations',
      category: 'employment',
      type: 'article',
      duration: '10 min read',
      rating: 4.9,
      difficulty: 'Beginner',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['employment', 'success', 'career']
    },
    {
      id: '6',
      title: 'Digital Document Preparation Guide',
      description: 'How to scan, format, and submit digital documents for online applications',
      category: 'general',
      type: 'video',
      duration: '18 min',
      rating: 4.4,
      difficulty: 'Advanced',
      thumbnail: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['documents', 'digital', 'preparation']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'housing', label: 'Housing' },
    { value: 'employment', label: 'Employment' },
    { value: 'general', label: 'General' }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesType = selectedType === 'all' || guide.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play size={16} />;
      case 'pdf':
        return <Download size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'Advanced':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const GuideCard: React.FC<{ guide: Guide; index: number }> = ({ guide, index }) => (
    <motion.div
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={guide.thumbnail}
          alt={guide.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
            guide.type === 'video' ? 'bg-red-500 text-white' :
            guide.type === 'pdf' ? 'bg-blue-500 text-white' :
            'bg-green-500 text-white'
          }`}>
            {getTypeIcon(guide.type)}
            <span className="capitalize">{guide.type}</span>
          </span>
        </div>
        {guide.duration && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
              {guide.duration}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className={`font-semibold line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {guide.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="text-yellow-500" size={14} />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {guide.rating}
            </span>
          </div>
        </div>

        <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {guide.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(guide.difficulty)}`}>
            {guide.difficulty}
          </span>
          <span className={`text-xs capitalize ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {guide.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {guide.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        <button className="w-full flex items-center justify-center space-x-2 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
          <span>Start Learning</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Learning Guides
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Master government schemes with our comprehensive guides and tutorials
        </p>
      </div>

      {/* Search and Filters */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} size={20} />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
          </div>

          {/* Category Filter */}
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

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          >
            <option value="all">All Types</option>
            <option value="video">Videos</option>
            <option value="article">Articles</option>
            <option value="pdf">PDFs</option>
          </select>
        </div>
      </div>

      {/* Featured Guide */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center space-x-2 mb-4">
          <Star className="text-yellow-500" size={20} />
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Guide
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Featured Guide"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Complete Beginner's Guide to Government Schemes
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to know about finding, applying for, and managing government benefits. 
              This comprehensive guide covers all major categories and provides practical tips for success.
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <span className="flex items-center space-x-1 text-sm">
                <Clock size={14} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>25 min</span>
              </span>
              <span className="flex items-center space-x-1 text-sm">
                <Star size={14} className="text-yellow-500" />
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>4.9</span>
              </span>
              <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full dark:bg-green-900/20">
                Beginner
              </span>
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Start Learning
            </button>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            All Guides ({filteredGuides.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide, index) => (
            <GuideCard key={guide.id} guide={guide} index={index} />
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
            <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No Guides Found
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Try adjusting your search criteria or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidesPage;