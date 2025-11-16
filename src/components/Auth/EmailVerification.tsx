import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { addNotification } from '../../store/slices/uiSlice';
import { authHelpers } from '../../lib/supabase';
import ThreeJSBackground from './ThreeJSBackground';

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error' | 'resending'>('pending');
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const handleEmailVerification = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');
      
      if (token && type === 'signup') {
        try {
          const { error } = await authHelpers.verifyOtp(token, 'signup');

          if (error) {
            throw error;
          }

          setVerificationStatus('success');
          dispatch(addNotification({
            id: Date.now().toString(),
            type: 'success',
            title: 'Email Verified Successfully!',
            message: 'Your account has been verified. You can now log in.',
            timestamp: new Date().toISOString(),
          }));

          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);

        } catch (error: any) {
          console.error('Email verification error:', error);
          setVerificationStatus('error');
          
          let errorMessage = 'Email verification failed. Please try again.';
          if (error.message.includes('expired')) {
            errorMessage = 'The verification link has expired. Please request a new one.';
          } else if (error.message.includes('invalid')) {
            errorMessage = 'The verification link is invalid. Please request a new one.';
          }

          dispatch(addNotification({
            id: Date.now().toString(),
            type: 'error',
            title: 'Verification Failed',
            message: errorMessage,
            timestamp: new Date().toISOString(),
          }));
        }
      }
    };

    handleEmailVerification();
  }, [searchParams, navigate, dispatch]);

  const handleResendVerification = async () => {
    if (!email) {
      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'error',
        title: 'Email Required',
        message: 'Please enter your email address to resend verification.',
        timestamp: new Date().toISOString(),
      }));
      return;
    }

    setIsResending(true);
    try {
      const { error } = await authHelpers.resendVerification(email);

      if (error) {
        throw error;
      }

      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'success',
        title: 'Verification Email Sent',
        message: 'Please check your email for the new verification link.',
        timestamp: new Date().toISOString(),
      }));

    } catch (error: any) {
      console.error('Resend verification error:', error);
      dispatch(addNotification({
        id: Date.now().toString(),
        type: 'error',
        title: 'Failed to Resend',
        message: error.message || 'Failed to resend verification email. Please try again.',
        timestamp: new Date().toISOString(),
      }));
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'success':
        return (
          <div className="text-center space-y-6">
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle size={40} className="text-white" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Email Verified Successfully!</h2>
            <p className="text-gray-300">
              Your account has been verified. You will be redirected to the login page in a few seconds.
            </p>
            <motion.button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Login
            </motion.button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center space-y-6">
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <XCircle size={40} className="text-white" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
            <p className="text-gray-300">
              The verification link is invalid or has expired. Please enter your email below to receive a new verification link.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <motion.button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50"
                whileHover={{ scale: isResending ? 1 : 1.02 }}
                whileTap={{ scale: isResending ? 1 : 0.98 }}
              >
                {isResending ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Mail className="mr-2" size={20} />
                    Resend Verification Email
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-6">
            <motion.div
              className="flex justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                <Mail size={40} className="text-white" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-bold text-white">Check Your Email</h2>
            <p className="text-gray-300">
              We've sent you a verification link. Please check your email and click the link to verify your account.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Didn't receive the email? Enter your email to resend:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <motion.button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50"
                whileHover={{ scale: isResending ? 1 : 1.02 }}
                whileTap={{ scale: isResending ? 1 : 0.98 }}
              >
                {isResending ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="mr-2" size={20} />
                    Resend Verification Email
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        );
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
            Email Verification
          </motion.p>
        </div>

        {/* Content */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {renderContent()}

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors flex items-center justify-center mx-auto"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Login
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
