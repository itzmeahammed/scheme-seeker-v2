import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Shield, LogIn } from 'lucide-react';
import { addNotification } from '../../store/slices/uiSlice';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { User } from '../../types';
import ThreeJSBackground from './ThreeJSBackground';
import { authHelpers } from '../../lib/supabase';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    dispatch(loginStart());

    try {
      // Use Supabase authentication
      const { data, error } = await authHelpers.signIn(formData.email, formData.password);
      
      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        // Create user object for Redux store
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
          profile: {
            age: data.user.user_metadata?.age || 30,
            income: data.user.user_metadata?.income || 500000,
            location: data.user.user_metadata?.location || 'Urban',
            occupation: data.user.user_metadata?.occupation || 'Professional',
            category: data.user.user_metadata?.category || 'General',
            hasDisability: data.user.user_metadata?.hasDisability || false,
            landOwnership: data.user.user_metadata?.landOwnership || false,
            educationLevel: data.user.user_metadata?.educationLevel || 'Graduate',
            familySize: data.user.user_metadata?.familySize || 4,
          },
          createdAt: data.user.created_at || new Date().toISOString(),
        };

        dispatch(loginSuccess(user));
        dispatch(addNotification({
          id: Date.now().toString(),
          type: 'success',
          title: 'Welcome Back!',
          message: 'You have successfully logged in to SchemeSeeker',
          timestamp: new Date().toISOString(),
        }));
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorTitle = 'Login Failed';
      let errorMessage = 'Please check your credentials and try again';
      
      // Handle specific Supabase error codes
      if (error.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorTitle = 'Invalid Credentials';
          errorMessage = 'The email or password you entered is incorrect. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorTitle = 'Email Not Verified';
          errorMessage = 'Please check your email and click the verification link before logging in.';
        } else if (error.message.includes('Too many requests')) {
          errorTitle = 'Too Many Attempts';
          errorMessage = 'Too many login attempts. Please wait a moment before trying again.';
        } else if (error.message.includes('User not found')) {
          errorTitle = 'Account Not Found';
          errorMessage = 'No account found with this email. Please sign up first.';
        } else {
          errorMessage = error.message;
        }
      }
      
      dispatch(loginFailure(errorMessage));
      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'error',
        title: errorTitle,
        message: errorMessage,
        timestamp: new Date().toISOString(),
      }));
    } finally {
      setIsLoading(false);
    }
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <ThreeJSBackground darkMode={true} />
      
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mb-4 shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="text-3xl">🇮🇳</span>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            SchemeSeeker
          </motion.h1>
          <motion.p 
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            AI-Powered Government Benefit Navigator
          </motion.p>
        </div>

        {/* Login Methods */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
            <LogIn className="mr-2" size={24} />
            {t('auth.login')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password & Email Verification */}
              <div className="flex justify-between text-sm">
                <Link
                  to="/verify-email"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Verify Email
                </Link>
                <Link
                  to="/forgot-password"
                  className="text-orange-400 hover:text-orange-300 transition-colors"
                >
                  {t('auth.forgotPassword')}
                </Link>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-green-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="mr-2" size={20} />
                    {t('auth.login')}
                  </div>
                )}
              </motion.button>
            </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              {t('auth.noAccount')}{' '}
              <Link
                to="/signup"
                className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                {t('auth.signup')}
              </Link>
            </p>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400">
            <Shield size={14} />
            <span>Secured by Government of India</span>
          </div>
        </motion.div>


      </motion.div>
    </div>
  );
};

export default Login;