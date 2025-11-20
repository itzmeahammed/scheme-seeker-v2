import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { User, Bot } from 'lucide-react';
import { RootState } from '../../store';
import { ChatMessage } from '../../types';
import SchemeCard from './SchemeCard';

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={`flex items-start space-x-3 max-w-4xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user'
              ? 'bg-orange-500 text-white'
              : 'bg-gradient-to-r from-orange-500 to-green-500 text-white'
              }`}>
              {message.sender === 'user' ? (
                <User size={16} />
              ) : (
                <Bot size={16} />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`px-4 py-2 rounded-2xl max-w-md shadow-md ${message.sender === 'user'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  : darkMode
                    ? 'bg-gray-800 text-gray-100 border border-gray-700'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 border border-gray-300'
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>

              {/* Schemes */}
              {message.schemes && message.schemes.length > 0 && (
                <div className="mt-3 space-y-2 w-full max-w-2xl">
                  {message.schemes.map((scheme) => (
                    <SchemeCard key={scheme.id} scheme={scheme} />
                  ))}
                </div>
              )}

              {/* Quick Replies */}
              {message.quickReplies && message.quickReplies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors hover:scale-105 transform ${darkMode
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                        : 'border-gray-400 text-gray-700 hover:bg-gray-200 hover:border-gray-500'
                        }`}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <div className="mt-1">
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatMessages;