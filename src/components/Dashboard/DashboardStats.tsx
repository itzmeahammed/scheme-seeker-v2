import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { TrendingUp, Award, Clock, CheckCircle } from 'lucide-react';
import { RootState } from '../../store';

interface DashboardStatsProps {
  eligibilityTrends: any;
  savedSchemesCount: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  eligibilityTrends,
  savedSchemesCount
}) => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const stats = [
    {
      title: 'Eligible Schemes',
      value: eligibilityTrends?.eligible || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+12%',
      changeColor: 'text-green-600'
    },
    {
      title: 'Saved Schemes',
      value: savedSchemesCount,
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+5%',
      changeColor: 'text-blue-600'
    },
    {
      title: 'Applications',
      value: 8,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: '+3',
      changeColor: 'text-orange-600'
    },
    {
      title: 'Eligibility Rate',
      value: `${eligibilityTrends?.eligibilityRate || 0}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+8%',
      changeColor: 'text-purple-600'
    }
  ];

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
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 cursor-pointer`}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div className={`text-sm ${stat.changeColor} font-medium`}>
              {stat.change}
            </div>
          </div>
          <div>
            <p className={`text-2xl font-bold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {stat.value}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {stat.title}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;