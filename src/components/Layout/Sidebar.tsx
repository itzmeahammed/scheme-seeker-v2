import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  FileText, 
  User, 
  HelpCircle,
  Award,
  TrendingUp,
  Settings,
  BookOpen
} from 'lucide-react';
import { RootState } from '../../store';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const menuItems = [
    { icon: Home, label: t('nav.dashboard'), path: '/dashboard' },
    { icon: MessageCircle, label: t('nav.chat'), path: '/chat' },
    { icon: FileText, label: t('nav.schemes'), path: '/schemes' },
    { icon: User, label: t('nav.profile'), path: '/profile' },
    { icon: Award, label: 'My Applications', path: '/applications' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: BookOpen, label: 'Guides', path: '/guides' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: t('nav.help'), path: '/help' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 ${
      darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    } shadow-lg border-r-2 border-orange-500 z-40 overflow-y-auto`}>
      <div className="p-4 h-full">
        {/* Quick Stats */}
        <motion.div
          className={`mb-6 p-4 rounded-lg border border-orange-200 ${
            darkMode 
              ? 'bg-gray-800' 
              : 'bg-gradient-to-r from-orange-50 to-green-50'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-orange-600 mb-2">Your Progress</h3>
          <div className="space-y-2">
            <div className={`flex justify-between text-xs ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span>Eligible Schemes</span>
              <span className="font-medium">24</span>
            </div>
            <div className={`flex justify-between text-xs ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span>Applications</span>
              <span className="font-medium">8</span>
            </div>
            <div className={`flex justify-between text-xs ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span>Approved</span>
              <span className="font-medium text-green-600">5</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? darkMode
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-orange-500 text-white shadow-lg'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Achievements Section */}
        <motion.div
          className={`mt-8 p-4 rounded-lg border border-blue-200 ${
            darkMode 
              ? 'bg-gray-800' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-sm font-semibold text-blue-600 mb-2">Latest Achievement</h3>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Award size={16} className="text-white" />
            </div>
            <div>
              <p className={`text-xs font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>First Application</p>
              <p className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Completed your first scheme application</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;