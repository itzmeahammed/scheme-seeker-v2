import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle, 
  Users, 
  Target,
  ArrowRight,
  Star
} from 'lucide-react';
import { RootState } from '../../store';
import { setSchemes } from '../../store/slices/schemeSlice';
import { schemes } from '../../data/schemes';
import { getRecommendedSchemes, predictEligibilityTrends } from '../../utils/eligibilityChecker';
import DashboardStats from './DashboardStats';
import RecommendedSchemes from './RecommendedSchemes';
import EligibilityChart from './EligibilityChart';
import RecentActivity from './RecentActivity';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { savedSchemes } = useSelector((state: RootState) => state.scheme);
  const { darkMode } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    dispatch(setSchemes(schemes));
  }, [dispatch]);

  const recommendedSchemes = user?.profile 
    ? getRecommendedSchemes(schemes, user.profile)
    : [];

  const eligibilityTrends = user?.profile
    ? predictEligibilityTrends(schemes, user.profile)
    : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg border border-gray-200`}
        variants={itemVariants}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.welcome')} {user?.name || 'Citizen'}! 🇮🇳
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your gateway to government benefits and schemes
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-4 py-2 rounded-lg font-medium">
              <Star className="inline mr-1" size={16} />
              Verified Citizen
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants}>
        <DashboardStats 
          eligibilityTrends={eligibilityTrends}
          savedSchemesCount={savedSchemes.length}
          recommendedSchemesCount={recommendedSchemes.length}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recommendations */}
        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
          <RecommendedSchemes schemes={recommendedSchemes} />
          <EligibilityChart eligibilityTrends={eligibilityTrends} />
        </motion.div>

        {/* Right Column - Activity & Quick Actions */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <RecentActivity />
          
          {/* Quick Actions */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 rounded-lg transition-colors">
                <span className="font-medium text-orange-700 dark:text-orange-400">
                  Update Profile
                </span>
                <ArrowRight size={16} className="text-orange-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 rounded-lg transition-colors">
                <span className="font-medium text-green-700 dark:text-green-400">
                  Chat with Assistant
                </span>
                <ArrowRight size={16} className="text-green-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                <span className="font-medium text-blue-700 dark:text-blue-400">
                  View All Schemes
                </span>
                <ArrowRight size={16} className="text-blue-600" />
              </button>
            </div>
          </div>

          {/* Achievement Card */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
            <div className="flex items-center mb-3">
              <Award className="mr-2" size={20} />
              <h3 className="font-semibold">Latest Achievement</h3>
            </div>
            <p className="text-sm opacity-90 mb-3">
              Profile Completion Champion! You've completed 85% of your profile.
            </p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-4/5"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;