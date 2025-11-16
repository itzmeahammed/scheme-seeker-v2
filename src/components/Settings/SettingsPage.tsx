import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  Smartphone,
  Mail,
  Lock,
  Download,
  Trash2,
  Save
} from 'lucide-react';
import { RootState } from '../../store';
import { toggleDarkMode, setLanguage } from '../../store/slices/uiSlice';
import { addNotification } from '../../store/slices/uiSlice';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { darkMode, language } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      schemeUpdates: true,
      applicationStatus: true,
      deadlineReminders: true,
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analyticsTracking: true,
    },
    preferences: {
      autoSave: true,
      compactView: false,
      showTutorials: true,
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    dispatch(addNotification({
      id: Date.now().toString(),
      type: 'success',
      title: 'Settings Saved',
      message: 'Your preferences have been updated successfully',
      timestamp: new Date().toISOString(),
    }));
  };

  const SettingSection: React.FC<{
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
  }> = ({ icon: Icon, title, description, children }) => (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
          <Icon className="text-orange-600" size={20} />
        </div>
        <div>
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>
      {children}
    </div>
  );

  const ToggleSwitch: React.FC<{
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    label: string;
    description?: string;
  }> = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {label}
        </p>
        {description && (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
          Customize your SchemeSeeker experience
        </p>
      </div>

      {/* Account Settings */}
      <SettingSection
        icon={User}
        title="Account Settings"
        description="Manage your account information and preferences"
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Display Name
            </label>
            <input
              type="text"
              value={user?.name || ''}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ''}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
          </div>
          <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium">
            <Lock size={16} />
            <span>Change Password</span>
          </button>
        </div>
      </SettingSection>

      {/* Appearance */}
      <SettingSection
        icon={darkMode ? Sun : Moon}
        title="Appearance"
        description="Customize the look and feel of the application"
      >
        <div className="space-y-4">
          <ToggleSwitch
            enabled={darkMode}
            onChange={() => dispatch(toggleDarkMode())}
            label="Dark Mode"
            description="Switch between light and dark themes"
          />
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Language
            </label>
            <select
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value as 'en' | 'hi' | 'te'))}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>

          <ToggleSwitch
            enabled={settings.preferences.compactView}
            onChange={(value) => handleSettingChange('preferences', 'compactView', value)}
            label="Compact View"
            description="Show more content in less space"
          />
        </div>
      </SettingSection>

      {/* Notifications */}
      <SettingSection
        icon={Bell}
        title="Notifications"
        description="Control how and when you receive notifications"
      >
        <div className="space-y-2">
          <ToggleSwitch
            enabled={settings.notifications.email}
            onChange={(value) => handleSettingChange('notifications', 'email', value)}
            label="Email Notifications"
            description="Receive updates via email"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.sms}
            onChange={(value) => handleSettingChange('notifications', 'sms', value)}
            label="SMS Notifications"
            description="Receive updates via text message"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.push}
            onChange={(value) => handleSettingChange('notifications', 'push', value)}
            label="Push Notifications"
            description="Receive browser notifications"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.schemeUpdates}
            onChange={(value) => handleSettingChange('notifications', 'schemeUpdates', value)}
            label="Scheme Updates"
            description="Get notified about new schemes"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.applicationStatus}
            onChange={(value) => handleSettingChange('notifications', 'applicationStatus', value)}
            label="Application Status"
            description="Updates on your application progress"
          />
          
          <ToggleSwitch
            enabled={settings.notifications.deadlineReminders}
            onChange={(value) => handleSettingChange('notifications', 'deadlineReminders', value)}
            label="Deadline Reminders"
            description="Reminders for application deadlines"
          />
        </div>
      </SettingSection>

      {/* Privacy & Security */}
      <SettingSection
        icon={Shield}
        title="Privacy & Security"
        description="Manage your privacy settings and data"
      >
        <div className="space-y-2">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Profile Visibility
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
          
          <ToggleSwitch
            enabled={settings.privacy.dataSharing}
            onChange={(value) => handleSettingChange('privacy', 'dataSharing', value)}
            label="Data Sharing"
            description="Share anonymized data to improve services"
          />
          
          <ToggleSwitch
            enabled={settings.privacy.analyticsTracking}
            onChange={(value) => handleSettingChange('privacy', 'analyticsTracking', value)}
            label="Analytics Tracking"
            description="Help us improve by tracking usage patterns"
          />
        </div>
      </SettingSection>

      {/* Data Management */}
      <SettingSection
        icon={Download}
        title="Data Management"
        description="Export or delete your data"
      >
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.preferences.autoSave}
            onChange={(value) => handleSettingChange('preferences', 'autoSave', value)}
            label="Auto-save"
            description="Automatically save your progress"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}>
              <Download size={16} />
              <span>Export Data</span>
            </button>
            
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}>
              <Trash2 size={16} />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </SettingSection>

      {/* Save Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleSaveSettings}
          className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save size={16} />
          <span>Save Settings</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SettingsPage;