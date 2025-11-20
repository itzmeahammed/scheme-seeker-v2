import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  X,
  Check,
  Trash2,
  BellOff
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Refs for click outside detection
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleClearAllNotifications = () => {
    notifications.forEach(notification => {
      dispatch(removeNotification(notification.id));
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const unreadCount = notifications.length;

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' }
  ];

  return (
    <motion.header
      className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
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
              <div className="bg-gradient-to-r from-orange-500 to-green-500 text-white px-3 py-1 rounded-lg font-bold text-lg shadow-lg">
                🇮🇳
              </div>
              <h1 className="ml-2 text-xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                {t('app.name')}
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder={t('header.searchPlaceholder')}
                className={`w-full pl-10 pr-10 py-2 rounded-lg border-2 transition-all ${searchFocused
                  ? 'border-orange-500 ring-2 ring-orange-500/20'
                  : darkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <X size={16} />
                </button>
              )}
            </form>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative" ref={languageMenuRef}>
              <motion.button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className={`p-2 rounded-lg transition-all flex items-center space-x-1.5 ${darkMode
                  ? 'hover:bg-gray-800 text-white'
                  : 'hover:bg-gray-100 text-gray-900'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={t('header.changeLanguage')}
              >
                <Globe size={20} />
                <span className="hidden sm:block text-sm font-medium">
                  {languages.find(l => l.code === language)?.flag}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
              </motion.button>
              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                  >
                    <div className={`px-3 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                      <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t('header.selectLanguage')}
                      </p>
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code as 'en' | 'hi' | 'te')}
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-all ${language === lang.code
                          ? darkMode
                            ? 'bg-orange-900/30 text-orange-400'
                            : 'bg-orange-50 text-orange-600'
                          : darkMode
                            ? 'hover:bg-gray-700 text-white'
                            : 'hover:bg-gray-100 text-gray-900'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium">{lang.nativeName}</span>
                        </span>
                        {language === lang.code && (
                          <Check size={16} className="text-orange-500" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => dispatch(toggleDarkMode())}
              className={`p-2 rounded-lg transition-all ${darkMode
                ? 'hover:bg-gray-800 text-yellow-400'
                : 'hover:bg-gray-100 text-gray-700'
                }`}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              title={darkMode ? t('header.lightMode') : t('header.darkMode')}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-all relative ${darkMode
                  ? 'hover:bg-gray-800 text-white'
                  : 'hover:bg-gray-100 text-gray-900'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={t('header.notifications')}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
              </motion.button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-96 rounded-lg shadow-xl border max-h-[32rem] overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                  >
                    {/* Header */}
                    <div className={`px-4 py-3 border-b flex items-center justify-between ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                      <h3 className={`font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Bell size={16} />
                        {t('header.notifications')} ({unreadCount})
                      </h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={handleClearAllNotifications}
                          className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded transition-colors ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'
                            }`}
                        >
                          <Trash2 size={12} />
                          {t('header.clearAll')}
                        </button>
                      )}
                    </div>

                    {/* Notifications List */}
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <BellOff className={`mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {t('header.noNotifications')}
                        </p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {t('header.notificationsDesc')}
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-4 border-b cursor-pointer transition-all hover:scale-[1.02] ${darkMode
                              ? 'border-gray-700 hover:bg-gray-700/50'
                              : 'border-gray-200 hover:bg-gray-50'
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'error' ? 'bg-red-500' :
                                  notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                }`}></div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {notification.message}
                                </p>
                                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                  {new Date(notification.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNotificationClick(notification.id);
                                }}
                                className={`p-1 rounded transition-colors flex-shrink-0 ${darkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                                  }`}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all ${darkMode
                  ? 'hover:bg-gray-800 text-white'
                  : 'hover:bg-gray-100 text-gray-900'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user?.name || t('header.guest')}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </motion.button>
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                  >
                    {/* User Info */}
                    <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}`}>
                      <p className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user?.name || t('header.guest')}
                      </p>
                      <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user?.email || t('header.notLoggedIn')}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                          }`}
                      >
                        <User size={16} />
                        <span className="font-medium">{t('header.profile')}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                          }`}
                      >
                        <Settings size={16} />
                        <span className="font-medium">{t('header.settings')}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                          }`}
                      >
                        <HelpCircle size={16} />
                        <span className="font-medium">{t('header.help')}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                          }`}
                      >
                        <MessageSquare size={16} />
                        <span className="font-medium">{t('header.feedback')}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm transition-all ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'
                          }`}
                      >
                        <Shield size={16} />
                        <span className="font-medium">{t('header.privacy')}</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-3 w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 transition-all ${darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
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