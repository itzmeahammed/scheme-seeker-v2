import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Clock, MessageCircle, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { RootState } from '../../store';

const RecentActivity: React.FC = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const activities = [
    {
      id: 1,
      type: 'application',
      icon: FileText,
      title: 'Applied for PM-KISAN',
      description: 'Your application has been submitted successfully',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'chat',
      icon: MessageCircle,
      title: 'Chat with Assistant',
      description: 'Asked about healthcare schemes',
      timestamp: '1 day ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'scheme',
      icon: CheckCircle,
      title: 'Scheme Approved',
      description: 'PMJAY application approved',
      timestamp: '2 days ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'update',
      icon: AlertCircle,
      title: 'Profile Updated',
      description: 'Income information updated',
      timestamp: '3 days ago',
      status: 'warning'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-lg border`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className={`flex items-start space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-50'
              } hover:shadow-sm transition-all duration-200`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
              <activity.icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {activity.title}
              </h4>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {activity.description}
              </p>
              <div className="flex items-center mt-2">
                <Clock size={12} className="text-gray-400 mr-1" />
                <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;