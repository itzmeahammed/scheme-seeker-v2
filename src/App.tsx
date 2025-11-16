import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Layout from './components/Layout/Layout';
import LandingPage from './components/Landing/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import EmailVerification from './components/Auth/EmailVerification';
import Dashboard from './components/Dashboard/Dashboard';
import ChatInterface from './components/Chat/ChatInterface';
import SchemesPage from './components/Schemes/SchemesPage';
import ProfilePage from './components/Profile/ProfilePage';
import ApplicationsPage from './components/Applications/ApplicationsPage';
import AnalyticsPage from './components/Analytics/AnalyticsPage';
import GuidesPage from './components/Guides/GuidesPage';
import SettingsPage from './components/Settings/SettingsPage';
import HelpPage from './components/Help/HelpPage';
import ProtectedRoute from './components/Common/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Route>
          </Routes>
        </Router>
      </I18nextProvider>
    </Provider>
  );
}

export default App;