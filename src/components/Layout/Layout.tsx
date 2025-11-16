import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { loadUserFromStorage } from '../../store/slices/authSlice';
import { loadUIPreferences } from '../../store/slices/uiSlice';
import { loadMessagesFromStorage } from '../../store/slices/chatSlice';
import { loadSavedSchemes } from '../../store/slices/schemeSlice';
import Header from './Header';
import Sidebar from './Sidebar';
import Notifications from '../Common/Notifications';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Load persisted data from localStorage
    dispatch(loadUserFromStorage());
    dispatch(loadUIPreferences());
    dispatch(loadMessagesFromStorage());
    dispatch(loadSavedSchemes());
  }, [dispatch]);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`h-screen flex flex-col ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <motion.main
          className="flex-1 ml-64 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-full overflow-y-auto p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </motion.main>
      </div>
      <Notifications />
    </div>
  );
};

export default Layout;