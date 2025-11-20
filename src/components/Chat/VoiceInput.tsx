import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Radio } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';

interface VoiceInputProps {
  isActive: boolean;
  onToggle: () => void;
  onTranscript: (transcript: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ isActive, onToggle, onTranscript }) => {
  const { t } = useTranslation();
  const { darkMode, language } = useSelector((state: RootState) => state.ui);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      // Set language based on current app language
      const speechLang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-US';
      recognitionInstance.lang = speechLang;

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece;
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        setTranscript(interimTranscript || finalTranscript);

        if (finalTranscript) {
          onTranscript(finalTranscript);
          setIsListening(false);
          setTranscript('');
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setTranscript('');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript]);

  const handleToggle = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setTranscript('');
    } else {
      recognition.start();
      setIsListening(true);
    }

    onToggle();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleToggle}
        className={`p-3 rounded-xl transition-all duration-200 shadow-lg relative overflow-hidden ${isListening
          ? `${darkMode ? 'bg-red-900/30 text-red-400' : 'bg-gradient-to-r from-red-500 to-red-600 text-white'} shadow-red-200 dark:shadow-red-900/20`
          : isActive
            ? `${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-gradient-to-r from-green-500 to-green-600 text-white'} shadow-green-200 dark:shadow-green-900/20`
            : `${darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isListening ? {
          boxShadow: darkMode
            ? ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
            : ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
        } : {}}
        transition={{
          repeat: isListening ? Infinity : 0,
          duration: 1.5
        }}
        title={isListening ? t('chat.stopListening') : t('chat.voiceInput')}
      >
        {/* Animated background for listening state */}
        {isListening && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5
            }}
          />
        )}

        <div className="relative z-10">
          {isListening ? (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <Radio size={20} />
            </motion.div>
          ) : (
            <Mic size={20} />
          )}
        </div>
      </motion.button>

      {/* Listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${darkMode ? 'bg-red-900/90 text-red-200' : 'bg-red-500 text-white'
              } shadow-lg`}
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <motion.div
                  className={`w-1 h-3 rounded-full ${darkMode ? 'bg-red-300' : 'bg-white'}`}
                  animate={{ height: ['12px', '20px', '12px'] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                />
                <motion.div
                  className={`w-1 h-3 rounded-full ${darkMode ? 'bg-red-300' : 'bg-white'}`}
                  animate={{ height: ['12px', '20px', '12px'] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                />
                <motion.div
                  className={`w-1 h-3 rounded-full ${darkMode ? 'bg-red-300' : 'bg-white'}`}
                  animate={{ height: ['12px', '20px', '12px'] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                />
              </div>
              <span>Listening...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript preview */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute -top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm max-w-xs ${darkMode ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-white text-gray-900 border border-gray-200'
              } shadow-xl`}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transcript:</div>
            <div className="font-medium">{transcript}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInput;