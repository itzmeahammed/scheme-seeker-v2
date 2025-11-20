import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
    opacity: 1
  }
};

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
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
      title: t('settings.saveSuccess'),
      message: t('settings.saveSuccessMsg'),
      timestamp: new Date().toISOString(),
    }));
  };

  const SettingSection: React.FC<{
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
  }> = ({ icon: Icon, title, description, children }) => (
    <motion.div
      variants={itemVariants}
      className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gradient-to-br from-orange-500/20 to-green-500/20' : 'bg-gradient-to-br from-orange-50 to-green-50'}`}>
          <Icon className="text-orange-500" size={24} />
        </div>
        <div>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {description}
          </p>
        </div>
      </div>
      {children}
    </motion.div>
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
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-gradient-to-r from-orange-500 to-green-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
      </button>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-4xl mx-auto pb-12"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-white to-gray-50'} rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700`}
      >
        <h1 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('settings.title')}
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('settings.subtitle')}
        </p>
      </motion.div>

      {/* Account Settings */}
      <SettingSection
        icon={User}
        title={t('settings.account')}
        description={t('settings.accountDesc')}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              {t('settings.displayName')}
            </label>
            <input
              type="text"
              value={user?.name || ''}
              readOnly
              className={`w-full px-4 py-3 rounded-xl border ${darkMode
                ? 'bg-gray-700/50 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-default`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              {t('settings.email')}
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className={`w-full px-4 py-3 rounded-xl border ${darkMode
                ? 'bg-gray-700/50 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-default`}
            />
          </div>
          <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium">
            <Lock size={16} />
            <span>{t('settings.changePassword')}</span>
          </button>
        </div>
      </SettingSection>

      {/* Appearance */}
      <SettingSection
        icon={darkMode ? Sun : Moon}
        title={t('settings.appearance')}
        description={t('settings.appearanceDesc')}
      >
        <div className="space-y-4">
          <ToggleSwitch
            enabled={darkMode}
            onChange={() => dispatch(toggleDarkMode())}
            label={t('settings.darkMode')}
            description={t('settings.darkModeDesc')}
          />

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              {t('settings.language')}
            </label>
            <select
              value={language}
              onChange={(e) => dispatch(setLanguage(e.target.value as 'en' | 'hi' | 'te'))}
              className={`w-full px-4 py-3 rounded-xl border ${darkMode
                ? 'bg-gray-700/50 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-200 text-gray-900'
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
            label={t('settings.compactView')}
            description={t('settings.compactViewDesc')}
          />
        </div>
      </SettingSection>

      {/* Notifications */}
      <SettingSection
        icon={Bell}
        title={t('settings.notifications')}
        description={t('settings.notificationsDesc')}
      >
        <div className="space-y-2">
          <ToggleSwitch
            enabled={settings.notifications.email}
            onChange={(value) => handleSettingChange('notifications', 'email', value)}
            label={t('settings.emailNotif')}
            description={t('settings.emailNotifDesc')}
          />

          <ToggleSwitch
            enabled={settings.notifications.sms}
            onChange={(value) => handleSettingChange('notifications', 'sms', value)}
            label={t('settings.smsNotif')}
            description={t('settings.smsNotifDesc')}
          />

          <ToggleSwitch
            enabled={settings.notifications.push}
            onChange={(value) => handleSettingChange('notifications', 'push', value)}
            label={t('settings.pushNotif')}
            description={t('settings.pushNotifDesc')}
          />

          <ToggleSwitch
            enabled={settings.notifications.schemeUpdates}
            onChange={(value) => handleSettingChange('notifications', 'schemeUpdates', value)}
            label={t('settings.schemeUpdates')}
            description={t('settings.schemeUpdatesDesc')}
          />

          <ToggleSwitch
            enabled={settings.notifications.applicationStatus}
            onChange={(value) => handleSettingChange('notifications', 'applicationStatus', value)}
            label={t('settings.appStatus')}
            description={t('settings.appStatusDesc')}
          />

          <ToggleSwitch
            enabled={settings.notifications.deadlineReminders}
            onChange={(value) => handleSettingChange('notifications', 'deadlineReminders', value)}
            label={t('settings.deadlines')}
            description={t('settings.deadlinesDesc')}
          />
        </div>
      </SettingSection>

      {/* Privacy & Security */}
      <SettingSection
        icon={Shield}
        title={t('settings.privacy')}
        description={t('settings.privacyDesc')}
      >
        <div className="space-y-2">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              {t('settings.profileVisibility')}
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${darkMode
                ? 'bg-gray-700/50 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            >
              <option value="private">{t('settings.private')}</option>
              <option value="public">{t('settings.public')}</option>
              <option value="friends">{t('settings.friends')}</option>
            </select>
          </div>

          <ToggleSwitch
            enabled={settings.privacy.dataSharing}
            onChange={(value) => handleSettingChange('privacy', 'dataSharing', value)}
            label={t('settings.dataSharing')}
            description={t('settings.dataSharingDesc')}
          />

          <ToggleSwitch
            enabled={settings.privacy.analyticsTracking}
            onChange={(value) => handleSettingChange('privacy', 'analyticsTracking', value)}
            label={t('settings.analytics')}
            description={t('settings.analyticsDesc')}
          />
        </div>
      </SettingSection>

      {/* Data Management */}
      <SettingSection
        icon={Download}
        title={t('settings.dataMgmt')}
        description={t('settings.dataMgmtDesc')}
      >
        <div className="space-y-4">
          <ToggleSwitch
            enabled={settings.preferences.autoSave}
            onChange={(value) => handleSettingChange('preferences', 'autoSave', value)}
            label={t('settings.autoSave')}
            description={t('settings.autoSaveDesc')}
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}>
              <Download size={16} />
              <span>{t('settings.exportData')}</span>
            </button>

            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${darkMode
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-red-500 text-white hover:bg-red-600'
              }`}>
              <Trash2 size={16} />
              <span>{t('settings.deleteAccount')}</span>
            </button>
          </div>
        </div>
      </SettingSection>

      {/* Save Button */}
      <motion.div
        variants={itemVariants}
        className="flex justify-end sticky bottom-6"
      >
        <motion.button
          onClick={handleSaveSettings}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Save size={20} />
          <span>{t('common.save')}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SettingsPage;