import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Globe, 
  User, 
  LogOut,
  Bell,
  Search,
  Settings,
  HelpCircle,
  MessageSquare,
  Shield,
  ChevronDown
} from 'lucide-react';
import { RootState } from '../../store';
import { toggleDarkMode, setLanguage, removeNotification } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { darkMode, language, notifications } = useSelector((state: RootState) => state.ui);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'hi' | 'te') => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
  };

  const handleNotificationClick = (notificationId: string) => {
    dispatch(removeNotification(notificationId));
  };

  const unreadCount = notifications.length;

  return (
    <motion.header 
      className={`${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } shadow-lg border-b-2 border-orange-500 sticky top-0 z-50 h-16`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
                🇮🇳
              </div>
              <h1 className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                SchemeSeeker
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} size={20} />
              <input
                type="text"
                placeholder="Search schemes, benefits..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`p-2 rounded-md transition-colors flex items-center space-x-1 ${
                  darkMode 
                    ? 'hover:bg-gray-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <Globe size={20} />
                <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === 'en' 
                          ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' 
                          : darkMode 
                            ? 'hover:bg-gray-700 text-white' 
                            : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('hi')}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === 'hi' 
                          ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' 
                          : darkMode 
                            ? 'hover:bg-gray-700 text-white' 
                            : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      हिंदी
                    </button>
                    <button
                      onClick={() => handleLanguageChange('te')}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === 'te' 
                          ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600' 
                          : darkMode 
                            ? 'hover:bg-gray-700 text-white' 
                            : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      తెలుగు
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-2 rounded-md transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-800 text-white' 
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-md transition-colors relative ${
                  darkMode 
                    ? 'hover:bg-gray-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg border max-h-96 overflow-y-auto ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notifications ({unreadCount})
                      </h3>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center">
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          No new notifications
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className={`p-3 border-b cursor-pointer transition-colors ${
                              darkMode 
                                ? 'border-gray-700 hover:bg-gray-700' 
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'error' ? 'bg-red-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <div className="flex-1">
                                <h4 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {notification.message}
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                                  {new Date(notification.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-800 text-white' 
                    : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user?.name || 'Guest'}
                </span>
                <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg border ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user?.name}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user?.email}
                      </p>
                    </div>
                    <button
                      className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <HelpCircle size={16} />
                      <span>Help</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <MessageSquare size={16} />
                      <span>Feedback</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm transition-colors ${
                        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <Shield size={16} />
                      <span>Privacy</span>
                    </button>
                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-red-600 transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <LogOut size={16} />
                        <span>{t('nav.logout')}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;