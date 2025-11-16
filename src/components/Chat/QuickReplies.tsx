import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface QuickRepliesProps {
  onQuickReply: (reply: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ onQuickReply }) => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const quickReplies = [
    '🌾 Agriculture schemes',
    '🎓 Education schemes',
    '🏥 Healthcare schemes',
    '🏠 Housing schemes',
    '💼 Employment schemes',
    '🔍 Check eligibility',
    '📊 Show recommendations',
    '❓ Help me',
  ];

  return (
    <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply, index) => (
          <motion.button
            key={index}
            onClick={() => onQuickReply(reply)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {reply}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;