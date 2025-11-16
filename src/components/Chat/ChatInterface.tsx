import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Volume2, VolumeX } from 'lucide-react';
import { RootState } from '../../store';
import { addMessage, setTyping } from '../../store/slices/chatSlice';
import { setSchemes } from '../../store/slices/schemeSlice';
import { schemes } from '../../data/schemes';
import { ChatbotService } from '../../utils/chatbot';
import { ChatMessage } from '../../types';
import ChatMessages from './ChatMessages';
import QuickReplies from './QuickReplies';

const ChatInterface: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, isTyping } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const { darkMode } = useSelector((state: RootState) => state.ui);
  
  const [inputValue, setInputValue] = useState('');
  const [chatbot] = useState(new ChatbotService());
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setSchemes(schemes));
    if (user?.profile) {
      chatbot.setUserProfile(user.profile);
    }
  }, [dispatch, user, chatbot]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Send welcome message if no messages exist
    if (messages.length === 0) {
      handleSendMessage('hello');
    }
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    dispatch(addMessage(userMessage));
    setInputValue('');

    // Show typing indicator
    dispatch(setTyping(true));

    try {
      // Get bot response
      const botResponse = await chatbot.processMessage(message);
      
      // Simulate typing delay
      setTimeout(() => {
        dispatch(setTyping(false));
        dispatch(addMessage(botResponse));
        
        // Speak response if speech is enabled
        if (isSpeechEnabled && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(botResponse.text);
          utterance.lang = 'en-US';
          speechSynthesis.speak(utterance);
        }
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      dispatch(setTyping(false));
      console.error('Error processing message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };



  return (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} bg-gradient-to-r from-orange-50 to-green-50 dark:from-gray-800 dark:to-gray-800 rounded-t-xl`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">🤖</span>
          </div>
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              SchemeSeeker Assistant
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isTyping ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
              {isTyping ? 'Analyzing your query...' : 'Online • Ready to help with 35+ schemes'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
            className={`p-3 rounded-lg transition-all duration-200 ${
              isSpeechEnabled 
                ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 dark:from-green-900/30 dark:to-green-800/30 dark:text-green-400 shadow-md' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            title="Toggle speech output"
          >
            {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ChatMessages messages={messages} />
        
        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm animate-pulse">🤖</span>
              </div>
              <div className={`px-6 py-3 rounded-2xl shadow-md ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-r from-orange-50 to-green-50 border border-gray-200'}`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <QuickReplies onQuickReply={handleQuickReply} />

      {/* Input */}
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} bg-gradient-to-r from-orange-50/30 to-green-50/30 dark:from-gray-800 dark:to-gray-800 rounded-b-xl`}>
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about PM Kisan, Ayushman Bharat, MUDRA loans, or any government scheme..."
              className={`w-full px-4 py-3 rounded-xl border-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 shadow-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-750' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-orange-50/20'
              }`}
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            {inputValue.length > 0 && (
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {inputValue.length}/500
              </div>
            )}
          </div>
          
          <motion.button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className={`p-3 rounded-xl transition-all duration-200 shadow-lg ${
              inputValue.trim() && !isTyping
                ? 'bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-white hover:from-orange-600 hover:via-yellow-600 hover:to-green-600 shadow-orange-200 dark:shadow-orange-900/20'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
            }`}
            whileHover={{ scale: inputValue.trim() && !isTyping ? 1.05 : 1 }}
            whileTap={{ scale: inputValue.trim() && !isTyping ? 0.95 : 1 }}
            title={inputValue.trim() ? 'Send message' : 'Type a message first'}
          >
            <Send size={20} />
          </motion.button>
        </div>
        
        {/* Quick stats */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
            35+ schemes available
          </span>
          <span className="flex items-center">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
            Real-time eligibility check
          </span>
          <span className="flex items-center">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
            Instant responses
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;